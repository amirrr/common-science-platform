"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";

export default function ResearchNoticePage() {
  const [firstCorrelationId, setFirstCorrelationId] = useState<string>("");

  useEffect(() => {
    // Fetch first correlation ID
    const fetchCorrelations = async () => {
      try {
        const response = await fetch("/api/correlations");
        if (response.ok) {
          const data = (await response.json()) as {
            id: string;
            title: string;
          }[];
          if (data.length > 0) {
            // Check for first unanswered
            const storedResponsesRaw = localStorage.getItem(
              "correlation_analyzer_responses",
            );
            const userResponses = storedResponsesRaw
              ? (JSON.parse(storedResponsesRaw) as Record<string, any>)
              : {};

            const firstUnanswered = data.find((c) => !userResponses[c.id]);
            setFirstCorrelationId(
              firstUnanswered ? firstUnanswered.id : data[0].id,
            );
          }
        }
      } catch (error) {
        console.error("Failed to fetch correlations:", error);
      }
    };
    fetchCorrelations();
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background text-foreground p-4 md:p-8">
      <main className="w-full max-w-2xl text-center space-y-8">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-primary">
            Research Study Notice
          </h1>
        </header>

        <section className="text-left space-y-4 p-6 bg-card rounded-lg shadow">
          <p>
            Welcome! You are invited to participate in a research study designed
            to help us understand how people select explanations for phenomena.
          </p>
          <p>
            In this study, you will be presented with a series of correlations
            between two variables. For each visualization, you will be asked to:
          </p>
          <ul className="list-disc list-inside space-y-1 pl-4">
            <li>Review the presented correlation.</li>
            <li>Review the candidate explanations.</li>
            <li>
              Choose the explanation that you think is most likely to be true.
            </li>
          </ul>
          <p>
            You will also be asked to complete a short Cognitive Reflection Test
            and provide some anonymous demographic information.
          </p>
          <p>
            Your anonymous responses will be used to study how people understand
            explanations. Upon completion, your anonymized data (including a
            unique participant ID, your responses to correlations, CRT answers,
            and demographic information) will be submitted for research
            analysis.
          </p>
          <p>
            Participation is voluntary, and you can withdraw at any time. The
            study is expected to take approximately 10-15 minutes to complete.
          </p>
        </section>

        {firstCorrelationId ? (
          <div className="mt-8">
            <Link href={`/correlation/${firstCorrelationId}`} passHref>
              <Button
                size="lg"
                className="bg-accent text-accent-foreground hover:bg-accent/90"
              >
                Proceed to Study <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        ) : (
          <p className="text-red-500 mt-8">Loading...</p>
        )}
      </main>
      <footer className="w-full max-w-5xl mt-12 pt-8 border-t text-center text-muted-foreground text-sm">
        <p>
          &copy; {new Date().getFullYear()} Research Project. All data is
          anonymized and handled responsibly.
        </p>
      </footer>
    </div>
  );
}
