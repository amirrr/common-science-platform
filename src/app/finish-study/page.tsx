"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PartyPopper, ArrowRight } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { MOCK_CORRELATIONS } from "@/lib/data";

const NUM_POST_CORRELATION_PAGES_WITH_PROGRESS = 2; // CRT, Demographics

export default function FinishStudyPage() {
  const numCorrelations = MOCK_CORRELATIONS.length;
  const totalStudyParts =
    numCorrelations + NUM_POST_CORRELATION_PAGES_WITH_PROGRESS;
  // This page is an interstitial before the CRT test, which is the (numCorrelations + 1)th task.
  const currentOverallStep = numCorrelations + 1;
  const progressValue =
    totalStudyParts > 0 ? (currentOverallStep / totalStudyParts) * 100 : 0;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background text-foreground p-4 md:p-8">
      <header className="w-full max-w-lg sticky top-0 bg-background/80 backdrop-blur-md py-4 z-10 mb-8">
        <Progress value={progressValue} className="w-full h-3 mb-2" />
        <p className="text-sm text-muted-foreground text-center">
          Proceeding to Cognitive Reflection Test (Overall task{" "}
          {currentOverallStep} of {totalStudyParts})
        </p>
      </header>
      <main className="w-full max-w-lg text-center space-y-8">
        <div className="mb-8">
          <PartyPopper className="h-16 w-16 text-accent mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-primary">
            Correlations Completed!
          </h1>
          <p className="text-lg text-muted-foreground mt-2">
            Thank you for completing the correlation analysis section.
          </p>
        </div>

        <section className="text-center space-y-4 p-6 bg-card rounded-lg shadow">
          <p>You have successfully analyzed all the correlations.</p>
          <p>
            The next step is a short Cognitive Reflection Test. This will be
            followed by brief demographic questions.
          </p>
        </section>

        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mt-8">
          <Link href="/crt-test" passHref>
            <Button
              size="lg"
              className="bg-accent text-accent-foreground hover:bg-accent/90"
            >
              Proceed to CRT Test <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </main>
      <footer className="w-full max-w-4xl mt-12 pt-8 border-t text-center text-muted-foreground text-sm">
        <p>
          &copy; {new Date().getFullYear()} Correlation Study. Your
          participation is valuable.
        </p>
      </footer>
    </div>
  );
}
