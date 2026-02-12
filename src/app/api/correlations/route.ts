import { NextResponse } from "next/server";
import { getAllCorrelations } from "@/lib/data";
import { getSessionId } from "@/lib/session";
import { getRandomizedCorrelations } from "@/lib/randomization";

export async function GET() {
  const sessionId = await getSessionId();
  const allCorrelations = getAllCorrelations();

  // Randomly select 15 correlations for this user session
  const selectedCorrelations = getRandomizedCorrelations(
    allCorrelations,
    sessionId,
    10,
  );

  const summary = selectedCorrelations.map((c) => ({
    id: c.id,
    title: c.title,
  }));

  return NextResponse.json(summary);
}
