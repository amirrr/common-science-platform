import "server-only";
import { NextResponse } from "next/server";
import { getAllCorrelations } from "@/lib/data";
import { getSessionId } from "@/lib/session";
import { getRandomizedCorrelations, assignGroup } from "@/lib/randomization";
import { db } from "@/lib/firebase-admin";

export async function GET() {
  const sessionId = await getSessionId();
  const allCorrelations = getAllCorrelations();

  // 1. Assign Group Deterministically
  const experimentGroup = assignGroup(sessionId);

  // 2. Persist/Update tracking in Firestore (Fire and forget, but handled here for start)
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

  // 3. Randomly select 10 correlations for this user session (stable due to sessionId seed)
  const selectedCorrelations = getRandomizedCorrelations(
    allCorrelations,
    sessionId,
    10,
  );

  const summary = selectedCorrelations.map((c) => ({
    id: c.id,
    title: c.forward.title,
  }));

  return NextResponse.json(summary);
}
