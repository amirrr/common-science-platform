"use client";

import { useState, useEffect, useCallback } from "react";
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
  ProgressiveSavePayload,
} from "@/types/correlation";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ArrowRight, Home } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import {
  RESPONSES_STORAGE_KEY,
  LAST_CHOSEN_MODE_KEY,
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
  const [userResponses, setUserResponses] = useState<
    Record<string, ExplanationFormValues>
  >({});
  const [hasSubmittedCurrent, setHasSubmittedCurrent] = useState(false);

  const [allCorrelations, setAllCorrelations] = useState<
    { id: string; title: string }[]
  >([]);
  const [loading, setLoading] = useState(true);

  const { toast } = useToast();

  const numCorrelations = allCorrelations.length;
  const currentIndex = allCorrelations.findIndex(
    (c) => c.id === currentCorrelationId,
  );
  const totalStudyParts =
    numCorrelations > 0
      ? numCorrelations + NUM_POST_CORRELATION_PAGES_WITH_PROGRESS
      : 0;
  const currentOverallStep = currentIndex + 1;

  useEffect(() => {
    const storedResponsesRaw = localStorage.getItem(RESPONSES_STORAGE_KEY);
    if (storedResponsesRaw) {
      setUserResponses(JSON.parse(storedResponsesRaw));
    }

    // Fetch all correlations for navigation and progress
    const fetchAll = async () => {
      try {
        const response = await fetch("/api/correlations");
        if (response.ok) {
          const data = await response.json();
          setAllCorrelations(data);
        }
      } catch (error) {
        console.error("Failed to fetch all correlations:", error);
      }
    };
    fetchAll();
  }, []);

  const handleNextCorrelation = useCallback(() => {
    if (currentIndex === -1 || allCorrelations.length === 0) {
      router.push("/");
      return;
    }
    const nextIndex = currentIndex + 1;
    if (nextIndex < allCorrelations.length) {
      router.push(`/correlation/${allCorrelations[nextIndex].id}`);
    } else {
      localStorage.removeItem(LAST_CHOSEN_MODE_KEY);
      router.push("/finish-study");
    }
  }, [currentIndex, allCorrelations, router]);

  const saveResponseToFirestore = useCallback(
    async (formData: ExplanationFormValues) => {
      if (!currentCorrelationId) {
        toast({
          title: "Error",
          description: "Correlation ID missing. Cannot save to database.",
          variant: "destructive",
        });
        return;
      }
      const payload: ProgressiveSavePayload = {
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
            errorData.message || `HTTP error! Status: ${response.status}`,
          );
        }
      } catch (error) {
        console.error(
          "Failed to save correlation response to Firestore:",
          error,
        );
        throw error; // Rethrow to handle in caller
      }
    },
    [currentCorrelationId, toast],
  );

  const handleSaveResponseAndNavigate = useCallback(
    async (formData: ExplanationFormValues) => {
      // 1. Update local state and storage immediately
      const updatedResponses = {
        ...userResponses,
        [currentCorrelationId]: formData,
      };
      localStorage.setItem(
        RESPONSES_STORAGE_KEY,
        JSON.stringify(updatedResponses),
      );
      setUserResponses(updatedResponses);
      setHasSubmittedCurrent(true);

      // 2. Show a resolving toast
      const { update } = toast({
        title: "Saving response...",
        description: "Your answer is being synced to the server.",
      });

      // 3. Trigger background save (non-blocking)
      saveResponseToFirestore(formData)
        .then(() => {
          update({
            id: "save-success",
            title: "Response saved!",
            description: "Sync complete.",
            variant: "default",
          } as any);
        })
        .catch((err) => {
          update({
            id: "save-error",
            title: "Sync Error",
            description: "Could not sync to server. Answer is saved locally.",
            variant: "destructive",
          } as any);
        });

      // 4. Navigate immediately to the next correlation
      handleNextCorrelation();
    },
    [
      userResponses,
      currentCorrelationId,
      toast,
      handleNextCorrelation,
      saveResponseToFirestore,
    ],
  );

  useEffect(() => {
    if (!currentCorrelationId) return;

    const fetchCorrelation = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `/api/correlation/${currentCorrelationId}`,
        );
        if (response.ok) {
          const correlation = (await response.json()) as CorrelationData;
          setCurrentCorrelation(correlation);

          const currentResponse = userResponses[currentCorrelationId];
          setHasSubmittedCurrent(!!currentResponse);

          // Ordering logic removed because persuasionMode is stripped.
          // If needed, this should be handled by the API taking a preference parameter.
          setDisplayExplanations(correlation.suggestedExplanations);
        } else {
          router.push("/");
        }
      } catch (error) {
        console.error("Failed to fetch correlation:", error);
        router.push("/");
      } finally {
        setLoading(false);
      }
    };

    fetchCorrelation();
  }, [currentCorrelationId, router, userResponses]);

  if (loading || !currentCorrelation || displayExplanations.length === 0) {
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
          <h1 className="text-md md:text-md font-semibold leading-tight">
            <span>{currentCorrelation.series1Name}</span>
            <span className="text-muted-foreground mx-2">vs</span>
            <span>{currentCorrelation.series2Name}</span>
          </h1>
        </div>
      </header>

      <main className="w-full max-w-4xl space-y-6 md:space-y-8 mt-24">
        <CorrelationDisplay correlation={currentCorrelation} />

        <ExplanationForm
          key={currentCorrelation.id} // Important for re-rendering form with new defaults
          explanationsToList={displayExplanations}
          onSubmitAttempt={handleSaveResponseAndNavigate}
          onNext={handleNextCorrelation}
          isSubmitting={false}
          existingResponse={userResponses[currentCorrelationId] || null}
        />
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
