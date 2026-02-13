import "server-only";
import { NextRequest, NextResponse } from "next/server";
import { getCorrelationById, getExplanationsForGroup } from "@/lib/data";
import { getSessionId } from "@/lib/session";
import { assignGroup } from "@/lib/randomization";
import { db } from "@/lib/firebase-admin";

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

  // 1. Determine Experiment Group (stability check)
  let experimentGroup: "X" | "Y";
  const participantDoc = await db
    .collection("studyParticipants")
    .doc(sessionId)
    .get();

  if (participantDoc.exists) {
    experimentGroup =
      (participantDoc.data()?.experimentGroup as "X" | "Y") ||
      assignGroup(sessionId);
  } else {
    experimentGroup = assignGroup(sessionId);
  }

  // 2. Apply Bidirectional Logic
  const directionData =
    experimentGroup === "X" ? correlation.forward : correlation.backward;
  const explanations = getExplanationsForGroup(correlation, experimentGroup);

  const includeAnswers =
    request.nextUrl.searchParams.get("includeAnswers") === "true";

  if (includeAnswers) {
    return NextResponse.json({
      ...correlation,
      series1Name: correlation.labels.A,
      series2Name: correlation.labels.B,
      description: "",
      title: directionData.title,
      suggestedExplanations: explanations,
    });
  }

  // Strip sensitive fields and apply experiment logic
  const sanitizedCorrelation = {
    ...correlation,
    series1Name: correlation.labels.A,
    series2Name: correlation.labels.B,
    description: "",
    title: directionData.title,
    experimentGroup, // Include for diagnostic/tracking
    suggestedExplanations: explanations,
  };

  return NextResponse.json(sanitizedCorrelation);
}
