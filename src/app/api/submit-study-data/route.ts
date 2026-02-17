import "server-only";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import type admin from "firebase-admin";
import { db } from "@/lib/firebase-admin";
import {
  explanationFormSchema,
  type ProgressiveSavePayload,
  type CorrelationResponsePayload,
  type CRTData,
  type DemographicsData,
} from "@/types/correlation";
import { getSessionId } from "@/lib/session";
import { rateLimit } from "@/lib/rate-limit";
import { EXPERIMENT_DESIGN } from "@/lib/experiment-config";

export async function POST(request: NextRequest) {
  if (!db) {
    console.error("Firestore DB not initialized. Cannot process request.");
    return NextResponse.json(
      { message: "Server configuration error: Firestore not available." },
      { status: 500 },
    );
  }

  try {
    const sessionId = await getSessionId();

    if (!rateLimit(sessionId, 20, 5 * 60 * 1000)) {
      return NextResponse.json(
        { message: "Too many requests. Please slow down." },
        { status: 429 },
      );
    }

    const payload = (await request.json()) as ProgressiveSavePayload;
    const { dataType, data } = payload;

    if (!dataType || !data) {
      return NextResponse.json(
        { message: "Missing required data fields (dataType, data)." },
        { status: 400 },
      );
    }

    const participantRef = db.collection("studyParticipants").doc(sessionId);
    const timestamp = new Date().toISOString();
    let updateData: Partial<admin.firestore.DocumentData> = {
      sessionId,
      lastSubmittedAt: timestamp,
    };

    switch (dataType) {
      case "correlationResponse": {
        const crData = data as CorrelationResponsePayload;
        if (!crData.correlationId || crData.formData === undefined) {
          return NextResponse.json(
            {
              message:
                "Missing correlationId or formData for correlationResponse.",
            },
            { status: 400 },
          );
        }

        const VALID_ID_REGEX = /^[a-zA-Z0-9_-]+$/;
        if (!VALID_ID_REGEX.test(crData.correlationId)) {
          return NextResponse.json(
            { message: "Invalid correlationId." },
            { status: 400 },
          );
        }

        // Validate with Zod (schema now accepts both v1 and v2 shapes)
        const result = explanationFormSchema.safeParse(crData.formData);
        if (!result.success) {
          return NextResponse.json(
            { message: result.error.errors[0].message || "Invalid form data." },
            { status: 400 },
          );
        }

        const { rankedExplanations, experimentGroup } = result.data;

        // V2 example in Firestore:
        // correlationResponses."correlation-9161" = {
        //   designVersion: "v2-within-subject",
        //   rankedExplanations: [
        //     { type: "confounderType",     direction: "forward",  text: "...", conviction: "very-convinced" },      ← preferred (rank 1)
        //     { type: "chainMediatorsType", direction: "backward", text: "...", conviction: "slightly-convinced" }   ← not preferred (rank 2)
        //   ],
        //   submittedAt: "2025-..."
        // }
        //
        // V1 example in Firestore:
        // correlationResponses."correlation-9161" = {
        //   designVersion: "v1-group-based",
        //   experimentGroup: "forward",
        //   rankedExplanations: [
        //     { type: "confounderType",           text: "...", conviction: "very-convinced" },      ← preferred
        //     { type: "twoSeperateMediatorType",  text: "...", conviction: "slightly-convinced" }   ← not preferred
        //   ],
        //   submittedAt: "2025-..."
        // }

        const sanitizedFormData: Record<string, any> = {
          designVersion: EXPERIMENT_DESIGN,
          rankedExplanations: rankedExplanations.map((e) => {
            const entry: Record<string, any> = {
              type: e.type,
              text: e.text,
              conviction: e.conviction,
            };
            // Only include direction if present (v2)
            if (e.direction) {
              entry.direction = e.direction;
            }
            return entry;
          }),
          submittedAt: timestamp,
        };

        // V1: also store the group-level direction
        if (experimentGroup) {
          sanitizedFormData.experimentGroup = experimentGroup;
        }

        updateData[`correlationResponses.${crData.correlationId}`] =
          sanitizedFormData;
        break;
      }
      case "crtData": {
        updateData.crtResponses = {
          ...(data as CRTData),
          submittedAt: timestamp,
        };
        break;
      }
      case "demographicsData": {
        updateData.demographics = {
          ...(data as DemographicsData),
          submittedAt: timestamp,
        };
        updateData.status = "finished";
        updateData.finishedAt = timestamp;
        break;
      }
      case "feedback": {
        const feedbackData = data as { message: string };
        if (
          !feedbackData.message ||
          typeof feedbackData.message !== "string" ||
          feedbackData.message.length < 10 ||
          feedbackData.message.length > 500
        ) {
          return NextResponse.json(
            { message: "Feedback message must be at least 10 characters." },
            { status: 400 },
          );
        }
        updateData.feedback = {
          message: feedbackData.message,
          submittedAt: timestamp,
        };
        break;
      }
      default:
        return NextResponse.json(
          { message: "Invalid dataType." },
          { status: 400 },
        );
    }

    await participantRef.set(updateData, { merge: true });

    console.log(
      `Data type '${dataType}' for session '${sessionId}' successfully saved to Firestore.`,
    );
    return NextResponse.json(
      { message: `Data submitted successfully.` },
      { status: 200 },
    );
  } catch (error) {
    console.error(`Error processing progressive save:`, error);
    return NextResponse.json(
      { message: "Failed to submit data." },
      { status: 500 },
    );
  }
}
