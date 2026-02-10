import "server-only";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import admin from "firebase-admin";
import { initializeApp, getApps, cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import type {
  ProgressiveSavePayload,
  CorrelationResponsePayload,
  CRTData,
  DemographicsData,
} from "@/types/correlation";
import { getSessionId } from "@/lib/session";
import { rateLimit } from "@/lib/rate-limit";

// Firebase Admin SDK Initialization
const serviceAccount = {
  projectId: process.env.FIREBASE_PROJECT_ID,
  clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
  privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
};

if (!getApps().length) {
  try {
    initializeApp({
      credential: cert(serviceAccount as admin.ServiceAccount),
    });
    console.log("Firebase Admin SDK initialized successfully.");
  } catch (e) {
    console.error("Firebase Admin SDK initialization error:", e);
  }
}

let db: admin.firestore.Firestore | null = null;
try {
  db = getFirestore();
} catch (e) {
  console.error("Error getting Firestore instance:", e);
}

export async function POST(request: NextRequest) {
  if (!db) {
    console.error("Firestore DB not initialized. Cannot process request.");
    return NextResponse.json(
      { message: "Server configuration error: Firestore not available." },
      { status: 500 },
    );
  }

  try {
    // 1. Get sessionId from HttpOnly cookie (Server-side generated)
    // This replaces client-side userId and prevents spoofing.
    const sessionId = await getSessionId();

    // 2. Apply Rate Limiting (e.g., 20 submissions per 5 minutes per session)
    if (!rateLimit(sessionId, 20, 5 * 60 * 1000)) {
      return NextResponse.json(
        { message: "Too many requests. Please slow down." },
        { status: 429 },
      );
    }

    const payload = (await request.json()) as ProgressiveSavePayload;
    const { dataType, data } = payload;
    // We ignore userId in payload and use sessionId for security

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
      case "correlationResponse":
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

        // Validate the correlationId (Prevent Path Injection)
        const VALID_ID_REGEX = /^[a-zA-Z0-9_-]+$/;
        if (!VALID_ID_REGEX.test(crData.correlationId)) {
          return NextResponse.json(
            { message: "Invalid correlationId." },
            { status: 400 },
          );
        }

        // Validate the shape and size of formData
        const { selectedExplanationId, rating, explanationText } =
          crData.formData;
        if (
          typeof selectedExplanationId !== "string" ||
          selectedExplanationId.length > 100
        ) {
          return NextResponse.json(
            { message: "Invalid selectedExplanationId." },
            { status: 400 },
          );
        }
        if (typeof rating !== "number" || rating < 1 || rating > 5) {
          return NextResponse.json(
            { message: "Invalid rating value." },
            { status: 400 },
          );
        }
        if (
          explanationText !== undefined &&
          (typeof explanationText !== "string" || explanationText.length > 5000)
        ) {
          return NextResponse.json(
            { message: "Explanation text too long or invalid." },
            { status: 400 },
          );
        }

        // Only save the fields you expect
        const sanitizedFormData = {
          selectedExplanationId,
          rating,
          explanationText,
          submittedAt: timestamp,
        };

        // Store correlation responses in a map
        updateData[`correlationResponses.${crData.correlationId}`] =
          sanitizedFormData;
        break;
      case "crtData":
        updateData.crtResponses = {
          ...(data as CRTData),
          submittedAt: timestamp,
        };
        break;
      case "demographicsData":
        updateData.demographics = {
          ...(data as DemographicsData),
          submittedAt: timestamp,
        };
        break;
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
