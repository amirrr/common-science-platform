import { NextResponse } from "next/server";
import { getSessionId } from "@/lib/session";

export async function GET() {
  try {
    const sessionId = await getSessionId();
    return NextResponse.json({ sessionId }, { status: 200 });
  } catch (error) {
    console.error("Failed to get session ID:", error);
    return NextResponse.json(
      { message: "Failed to retrieve session info." },
      { status: 500 },
    );
  }
}
