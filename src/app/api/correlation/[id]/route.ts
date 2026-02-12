import { NextRequest, NextResponse } from "next/server";
import { getCorrelationById } from "@/lib/data";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;

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

  if (includeAnswers) {
    return NextResponse.json(correlation);
  }

  // Strip sensitive fields
  const sanitizedCorrelation = {
    ...correlation,
    suggestedExplanations: correlation.suggestedExplanations.map(
      ({ ...rest }) => rest,
    ),
  };

  return NextResponse.json(sanitizedCorrelation);
}
