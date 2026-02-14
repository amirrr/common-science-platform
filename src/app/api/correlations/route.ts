import "server-only";
import { NextRequest, NextResponse } from "next/server";
import { getAllCorrelations, getExplanationsForGroup } from "@/lib/data";
import { getSessionId } from "@/lib/session";
import { getRandomizedCorrelations, assignGroup } from "@/lib/randomization";
import { db } from "@/lib/firebase-admin";

export async function GET(request: NextRequest) {
  const sessionId = await getSessionId();
  const allCorrelations = getAllCorrelations();

  // 1. Assign Group Deterministically
  const experimentGroup = assignGroup(sessionId);

  // 2. Persist/Update tracking in Firestore
  const participantRef = db.collection("studyParticipants").doc(sessionId);
  const doc = await participantRef.get();

  if (!doc.exists) {
    await participantRef.set(
      {
        sessionId,
        experimentGroup,
        status: "started",
        startedAt: new Date().toISOString(),
      },
      { merge: true },
    );
  }

  // 3. Randomly select 10 correlations for this user session
  const selectedCorrelations = getRandomizedCorrelations(
    allCorrelations,
    sessionId,
    10,
  );

  const fullDetails = request.nextUrl.searchParams.get("full") === "true";

  if (fullDetails) {
    const fullData = selectedCorrelations.map((c) => {
      const directionData = experimentGroup === "X" ? c.forward : c.backward;
      const explanations = getExplanationsForGroup(c, experimentGroup);

      return {
        ...c,
        series1Name: c.labels.A,
        series2Name: c.labels.B,
        description: "",
        title: directionData.title,
        experimentGroup,
        suggestedExplanations: explanations,
      };
    });
    return NextResponse.json(fullData);
  }

  const summary = selectedCorrelations.map((c) => ({
    id: c.id,
    title: c.forward.title,
  }));

  return NextResponse.json(summary);
}
