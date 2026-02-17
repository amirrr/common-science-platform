import "server-only";
import { NextRequest, NextResponse } from "next/server";
import {
  getCorrelationById,
  getExplanationsForGroup,
  getExplanationsWithMixedDirections,
} from "@/lib/data";
import { getSessionId } from "@/lib/session";
import { assignGroup } from "@/lib/randomization";
import { db } from "@/lib/firebase-admin";
import { EXPERIMENT_DESIGN } from "@/lib/experiment-config";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const sessionId = await getSessionId();

  // Validate correlationId
  const VALID_ID_REGEX = /^[a-zA-Z0-9_-]+$/;
  if (!VALID_ID_REGEX.test(id)) {
    return NextResponse.json(
      { message: "Invalid correlationId." },
      { status: 400 },
    );
  }

  const correlation = getCorrelationById(id);

  if (!correlation) {
    return NextResponse.json(
      { message: "Correlation not found." },
      { status: 404 },
    );
  }

  const includeAnswers =
    request.nextUrl.searchParams.get("includeAnswers") === "true";

  // ── V2: Within-subject mixed directions ──
  if (EXPERIMENT_DESIGN === "v2-within-subject") {
    // Deterministic per session+correlation (seeded random, refresh-safe)
    const explanations = getExplanationsWithMixedDirections(
      correlation,
      sessionId,
    );

    // Neutral title since explanations come from mixed directions
    const title = `${correlation.labels.A} correlates with ${correlation.labels.B}`;

    if (includeAnswers) {
      return NextResponse.json({
        ...correlation,
        series1Name: correlation.labels.A,
        series2Name: correlation.labels.B,
        description: "",
        title,
        suggestedExplanations: explanations,
        designVersion: EXPERIMENT_DESIGN,
      });
    }

    return NextResponse.json({
      ...correlation,
      series1Name: correlation.labels.A,
      series2Name: correlation.labels.B,
      description: "",
      title,
      suggestedExplanations: explanations,
      designVersion: EXPERIMENT_DESIGN,
      // No experimentGroup — direction is per-explanation
    });
  }

  // ── V1: Group-based (original logic, unchanged) ──

  // 1. Determine Experiment Group (stability check from Firestore)
  let experimentGroup: "forward" | "backward";
  const participantDoc = await db
    .collection("studyParticipants")
    .doc(sessionId)
    .get();

  if (participantDoc.exists) {
    experimentGroup =
      (participantDoc.data()?.experimentGroup as "forward" | "backward") ||
      assignGroup(sessionId);
  } else {
    experimentGroup = assignGroup(sessionId);
  }

  // 2. Apply Bidirectional Logic
  const directionData =
    experimentGroup === "forward" ? correlation.forward : correlation.backward;
  const explanations = getExplanationsForGroup(correlation, experimentGroup);

  if (includeAnswers) {
    return NextResponse.json({
      ...correlation,
      series1Name: correlation.labels.A,
      series2Name: correlation.labels.B,
      description: "",
      title: directionData.title,
      suggestedExplanations: explanations,
      designVersion: EXPERIMENT_DESIGN,
    });
  }

  // Strip sensitive fields and apply experiment logic
  const sanitizedCorrelation = {
    ...correlation,
    series1Name: correlation.labels.A,
    series2Name: correlation.labels.B,
    description: "",
    title: directionData.title,
    experimentGroup,
    suggestedExplanations: explanations,
    designVersion: EXPERIMENT_DESIGN,
  };

  return NextResponse.json(sanitizedCorrelation);
}
