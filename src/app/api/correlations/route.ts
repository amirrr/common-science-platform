import "server-only";
import { NextRequest, NextResponse } from "next/server";
import {
  getAllCorrelations,
  getExplanationsForGroup,
  getExplanationsWithMixedDirections,
} from "@/lib/data";
import { getSessionId } from "@/lib/session";
import { getRandomizedCorrelations, assignGroup } from "@/lib/randomization";
import { db } from "@/lib/firebase-admin";
import { EXPERIMENT_DESIGN } from "@/lib/experiment-config";

export async function GET(request: NextRequest) {
  const sessionId = await getSessionId();
  const allCorrelations = getAllCorrelations();

  const prolificPid = request.nextUrl.searchParams.get("PROLIFIC_PID");
  const prolificStudyId = request.nextUrl.searchParams.get("STUDY_ID");
  const prolificSessionId = request.nextUrl.searchParams.get("SESSION_ID");

  // ── Persist/Update tracking in Firestore ──
  const participantRef = db.collection("studyParticipants").doc(sessionId);
  const doc = await participantRef.get();

  const updates: Record<string, any> = {
    sessionId,
    designVersion: EXPERIMENT_DESIGN,
    status: "started",
    startedAt: new Date().toISOString(),
  };

  // V1: assign and store experiment group
  if (EXPERIMENT_DESIGN === "v1-group-based") {
    const experimentGroup = assignGroup(sessionId);
    updates.experimentGroup = experimentGroup;
  }
  // V2: no group — assignment is per-correlation

  // Prolific metadata
  if (prolificPid && (!doc.exists || !doc.data()?.prolificPid)) {
    updates.prolificPid = prolificPid;
    updates.prolificStudyId = prolificStudyId || null;
    updates.prolificSessionId = prolificSessionId || null;
    updates.fromProlific = true;
  }

  await participantRef.set(updates, { merge: true });

  // ── Select correlations for this session ──
  const selectedCorrelations = getRandomizedCorrelations(
    allCorrelations,
    sessionId,
    10,
  );

  const fullDetails = request.nextUrl.searchParams.get("full") === "true";

  if (fullDetails) {
    const fullData = selectedCorrelations.map((c) => {
      if (EXPERIMENT_DESIGN === "v2-within-subject") {
        const explanations = getExplanationsWithMixedDirections(c, sessionId);

        return {
          ...c,
          series1Name: c.labels.A,
          series2Name: c.labels.B,
          description: "",
          title: c.forward.title,
          designVersion: EXPERIMENT_DESIGN,
          suggestedExplanations: explanations,
        };
      } else {
        // V1
        const experimentGroup = assignGroup(sessionId);
        const directionData =
          experimentGroup === "forward" ? c.forward : c.backward;
        const explanations = getExplanationsForGroup(c, experimentGroup);

        return {
          ...c,
          series1Name: c.labels.A,
          series2Name: c.labels.B,
          description: "",
          title: directionData.title,
          experimentGroup,
          designVersion: EXPERIMENT_DESIGN,
          suggestedExplanations: explanations,
        };
      }
    });
    return NextResponse.json(fullData);
  }

  // Summary mode
  const summary = selectedCorrelations.map((c) => ({
    id: c.id,
    title: c.forward.title,
  }));

  return NextResponse.json(summary);
}
