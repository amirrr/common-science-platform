"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { CorrelationDisplay } from "@/components/correlation-analyzer/correlation-display";
import {
  ExplanationForm,
  type ExplanationFormValues,
} from "@/components/correlation-analyzer/explanation-form";
import type {
  CorrelationData,
  ExplanationOption,
  PersuasionMode,
  ProgressiveSavePayload,
} from "@/types/correlation";
import { MOCK_CORRELATIONS } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ArrowRight, Home } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import {
  RESPONSES_STORAGE_KEY,
  LAST_CHOSEN_MODE_KEY,
  USER_ID_STORAGE_KEY,
  NUM_POST_CORRELATION_PAGES_WITH_PROGRESS,
} from "@/types/correlation";

export default function CorrelationPage() {
  const router = useRouter();
  const params = useParams();
  const currentCorrelationId = params.id as string;

  const [currentCorrelation, setCurrentCorrelation] =
    useState<CorrelationData | null>(null);
  const [displayExplanations, setDisplayExplanations] = useState<
    ExplanationOption[]
  >([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [userResponses, setUserResponses] = useState<
    Record<string, ExplanationFormValues>
  >({});
  const [hasSubmittedCurrent, setHasSubmittedCurrent] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);

  const { toast } = useToast();

  const numCorrelations = MOCK_CORRELATIONS.length;
  const totalStudyParts =
    numCorrelations + NUM_POST_CORRELATION_PAGES_WITH_PROGRESS;
  const currentIndex = MOCK_CORRELATIONS.findIndex(
    (c) => c.id === currentCorrelationId
  );
  const currentOverallStep = currentIndex + 1;

  useEffect(() => {
    const storedUserId = localStorage.getItem(USER_ID_STORAGE_KEY);
    if (storedUserId) {
      setUserId(storedUserId);
    } else {
      // router.push('/'); // Should not happen if intro page sets it
    }

    const storedResponsesRaw = localStorage.getItem(RESPONSES_STORAGE_KEY);
    if (storedResponsesRaw) {
      setUserResponses(JSON.parse(storedResponsesRaw));
    }
  }, [router]);

  const handleNextCorrelation = useCallback(() => {
    if (currentIndex === -1) {
      router.push("/"); // Fallback if something went wrong
      return;
    }
    const nextIndex = currentIndex + 1;
    if (nextIndex < numCorrelations) {
      router.push(`/correlation/${MOCK_CORRELATIONS[nextIndex].id}`);
    } else {
      localStorage.removeItem(LAST_CHOSEN_MODE_KEY); // Clear mode for next section (CRT)
      router.push("/finish-study");
    }
  }, [currentIndex, numCorrelations, router]);

  const saveResponseToFirestore = async (formData: ExplanationFormValues) => {
    if (!userId || !currentCorrelationId) {
      toast({
        title: "Error",
        description:
          "User ID or Correlation ID missing. Cannot save to database.",
        variant: "destructive",
      });
      return;
    }
    // setIsSubmitting(true); // Handled by caller
    const payload: ProgressiveSavePayload = {
      userId,
      dataType: "correlationResponse",
      data: {
        correlationId: currentCorrelationId,
        formData,
      },
    };
    try {
      const response = await fetch("/api/submit-study-data", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.message || `HTTP error! Status: ${response.status}`
        );
      }
      // console.log(`Correlation response for ${currentCorrelationId} saved to DB.`);
    } catch (error) {
      console.error("Failed to save correlation response to Firestore:", error);
      toast({
        title: "Save Error",
        description: `Could not save response to database. It's saved locally. ${
          error instanceof Error ? error.message : ""
        }`,
        variant: "destructive",
      });
    }
    // finally { setIsSubmitting(false); } // Handled by caller
  };

  const handleSaveResponseAndNavigate = useCallback(
    async (formData: ExplanationFormValues) => {
      setIsSubmitting(true);
      const updatedResponses = {
        ...userResponses,
        [currentCorrelationId]: formData,
      };
      localStorage.setItem(
        RESPONSES_STORAGE_KEY,
        JSON.stringify(updatedResponses)
      );
      setUserResponses(updatedResponses);
      setHasSubmittedCurrent(true);

      if (currentCorrelation && formData.selectedExplanationId) {
        const chosenOption = currentCorrelation.suggestedExplanations.find(
          (opt) => opt.id === formData.selectedExplanationId
        );
        if (chosenOption) {
          localStorage.setItem(
            LAST_CHOSEN_MODE_KEY,
            JSON.stringify(chosenOption.persuasionMode)
          );
        }
      }

      await saveResponseToFirestore(formData); // Progressive save

      setIsSubmitting(false);

      toast({
        title: "Explanation Saved!",
        description:
          "Your explanation has been saved. Proceed to the next one.",
        variant: "default",
      });

      setTimeout(() => {
        handleNextCorrelation();
      }, 1000);
    },
    [
      userResponses,
      currentCorrelationId,
      toast,
      currentCorrelation,
      handleNextCorrelation,
      saveResponseToFirestore,
    ]
  );

  useEffect(() => {
    const correlation = MOCK_CORRELATIONS.find(
      (c) => c.id === currentCorrelationId
    );
    if (correlation) {
      setCurrentCorrelation(correlation);
      const currentResponse = userResponses[currentCorrelationId];
      setHasSubmittedCurrent(!!currentResponse);

      const explanations = [...correlation.suggestedExplanations];
      const lastChosenModeRaw = localStorage.getItem(LAST_CHOSEN_MODE_KEY);
      if (lastChosenModeRaw) {
        try {
          const lastChosenMode = JSON.parse(
            lastChosenModeRaw
          ) as PersuasionMode;
          const preferredIndex = explanations.findIndex(
            (exp) => exp.persuasionMode === lastChosenMode
          );
          if (preferredIndex > 0) {
            // Only move if not already first
            const [item] = explanations.splice(preferredIndex, 1);
            explanations.unshift(item);
          }
        } catch (e) {
          console.error("Error parsing last chosen mode:", e);
          localStorage.removeItem(LAST_CHOSEN_MODE_KEY); // Clear corrupted data
        }
      }
      setDisplayExplanations(explanations);
    } else {
      // router.push('/'); // Redirect if correlation not found
    }
  }, [currentCorrelationId, router, userResponses]);

  if (!currentCorrelation || displayExplanations.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <p className="text-foreground">Loading correlation...</p>
      </div>
    );
  }

  const progressValue =
    totalStudyParts > 0 ? (currentOverallStep / totalStudyParts) * 100 : 0;

  return (
    <div className="min-h-screen flex flex-col items-center bg-background text-foreground p-4 md:p-8">
      <header className="w-full max-w-4xl sticky top-0 bg-background/95 backdrop-blur-md py-3 z-50 border-b">
        <Progress value={progressValue} className="w-full h-2 mb-1" />
        <p className="text-xs text-muted-foreground text-center mb-2">
          Correlation {currentIndex + 1} of {numCorrelations} (Overall task{" "}
          {currentOverallStep} of {totalStudyParts})
        </p>
        <div className="text-center px-2">
          <h1 className="text-lg md:text-xl font-semibold text-primary leading-tight">
            {currentCorrelation.title}
          </h1>
          {/* <p className="text-xs md:text-sm text-muted-foreground mt-0.5">{currentCorrelation.description}</p> */}
        </div>
      </header>

      {/* Adjust mt-X value based on final sticky header height. Approx:
          py-3 (1.5rem) + progress (0.5rem+0.25rem) + step text (0.75rem+0.5rem) + title (1.25rem) + border = ~5rem
          Adding some buffer: mt-24 (6rem)
      */}
      <main className="w-full max-w-4xl space-y-6 md:space-y-8 mt-24">
        {/* The CorrelationDisplay still shows its own title/desc. Can be hidden later if redundant. */}
        <CorrelationDisplay correlation={currentCorrelation} />

        <ExplanationForm
          key={currentCorrelation.id} // Important for re-rendering form with new defaults
          explanationsToList={displayExplanations}
          onSubmitAttempt={handleSaveResponseAndNavigate}
          isSubmitting={isSubmitting}
          existingResponse={userResponses[currentCorrelationId] || null}
        />

        {hasSubmittedCurrent && (
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mt-8">
            <Button
              onClick={handleNextCorrelation}
              size="lg"
              className="bg-accent text-accent-foreground hover:bg-accent/90"
            >
              Next <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        )}
      </main>
      <footer className="w-full max-w-4xl mt-12 pt-8 border-t text-center text-muted-foreground text-sm">
        <p>
          &copy; {new Date().getFullYear()} Correlation Study. All data is
          anonymized.
        </p>
        <Link href="/" passHref className="mt-2 inline-block">
          <Button variant="link" size="sm">
            <Home className="mr-2 h-4 w-4" /> Return to Study Introduction
          </Button>
        </Link>
      </footer>
    </div>
  );
}
