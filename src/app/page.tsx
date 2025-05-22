"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { MOCK_CORRELATIONS } from "@/lib/data";
import { useEffect } from "react";
import {
  USER_ID_STORAGE_KEY,
  RESPONSES_STORAGE_KEY,
  DEMOGRAPHICS_STORAGE_KEY,
  CRT_RESPONSES_STORAGE_KEY,
  LAST_CHOSEN_MODE_KEY,
} from "@/types/correlation";

export default function ResearchNoticePage() {
  const firstCorrelationId =
    MOCK_CORRELATIONS.length > 0 ? MOCK_CORRELATIONS[0].id : "";

  useEffect(() => {
    // Ensure a userId exists or generate a new one
    if (!localStorage.getItem(USER_ID_STORAGE_KEY)) {
      localStorage.setItem(USER_ID_STORAGE_KEY, crypto.randomUUID());
    }
  }, []);

  const handleStartStudy = () => {
    // Clear previous study data when starting anew, except for userId and cookie consent
    Object.keys(localStorage).forEach((key) => {
      if (
        key !== USER_ID_STORAGE_KEY &&
        key !== "correlation_analyzer_cookie_consent"
      ) {
        // Persist cookie consent
        localStorage.removeItem(key);
      }
    });
    // Clear specific study-related keys more explicitly
    localStorage.removeItem(RESPONSES_STORAGE_KEY);
    localStorage.removeItem(DEMOGRAPHICS_STORAGE_KEY);
    localStorage.removeItem(CRT_RESPONSES_STORAGE_KEY);
    localStorage.removeItem(LAST_CHOSEN_MODE_KEY);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background text-foreground p-4 md:p-8">
      <main className="w-full max-w-2xl text-center space-y-8">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-primary">
            Research Study Notice
          </h1>
          <p className="text-lg text-muted-foreground mt-2">
            Understanding How People Interpret Correlations
          </p>
        </header>

        <section className="text-left space-y-4 p-6 bg-card rounded-lg shadow">
          <p>
            Welcome! You are invited to participate in a research study designed
            to help us understand how people perceive and explain statistical
            correlations.
          </p>
          <p>
            In this study, you will be presented with a series of data
            visualizations showing correlations between two variables. For each
            visualization, you will be asked to:
          </p>
          <ul className="list-disc list-inside space-y-1 pl-4">
            <li>Review the presented correlation.</li>
            <li>
              Choose what you believe is the most plausible explanation from a
              given list.
            </li>
            <li>Rate your confidence in your chosen explanation.</li>
            <li>Briefly provide your reasoning (optional).</li>
          </ul>
          <p>
            You will also be asked to complete a short Cognitive Reflection Test
            and provide some anonymous demographic information.
          </p>
          <p>
            Your anonymous responses will be used to analyze common patterns in
            reasoning and potential misconceptions. This research aims to
            improve how data literacy and critical thinking about statistics are
            taught.
          </p>
          <h2 className="text-lg font-semibold text-primary pt-3">
            Data Privacy & GDPR
          </h2>
          <p>
            We are committed to protecting your privacy. All data collected is
            anonymized using a randomly generated participant ID. We do not
            collect any directly identifiable personal information unless
            explicitly provided by you (e.g., optional demographic fields). The
            data, including your responses, CRT answers, and demographic
            information, will be stored securely and used solely for research
            purposes as described. This study uses browser `localStorage` to
            save your progress and responses temporarily until they are
            submitted. This data is stored only on your device until submission.
            By proceeding, you acknowledge and consent to this use of
            `localStorage` for the functionality of the study.
          </p>
          <p>
            Participation is voluntary, and you can withdraw at any time by
            closing your browser window. The study is expected to take
            approximately 15-20 minutes to complete.
          </p>
        </section>

        {firstCorrelationId ? (
          <div className="mt-8">
            <Link href={`/correlation/${firstCorrelationId}`} passHref>
              <Button
                size="lg"
                className="bg-accent text-accent-foreground hover:bg-accent/90"
                onClick={handleStartStudy}
              >
                Proceed to Study <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        ) : (
          <p className="text-destructive mt-8">
            No correlations available to start the study.
          </p>
        )}
      </main>
      <footer className="w-full max-w-4xl mt-12 pt-8 border-t text-center text-muted-foreground text-sm">
        <p>
          &copy; {new Date().getFullYear()} Research Project. All data is
          anonymized and handled responsibly.
        </p>
      </footer>
    </div>
  );
}
