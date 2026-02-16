"use client";

import { useState, useEffect, useCallback } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type {
  UserCorrelationResponse,
  DemographicsData,
  CorrelationData,
  ExplanationFormValues,
  CRTData,
} from "@/types/correlation";
import {
  RESPONSES_STORAGE_KEY,
  DEMOGRAPHICS_STORAGE_KEY,
  CRT_RESPONSES_STORAGE_KEY,
  NUM_POST_CORRELATION_PAGES_WITH_PROGRESS,
} from "@/types/correlation";
import {
  Loader2,
  Home,
  BarChart3,
  UserCheck2,
  Lightbulb,
  Info,
  MessageCircleWarning,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { EMPLOYMENT_STATUS_OPTIONS } from "@/lib/demographic-options";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

export default function ResultsPage() {
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [demographics, setDemographics] = useState<DemographicsData | null>(
    null,
  );
  const [crtResponses, setCrtResponses] = useState<CRTData | null>(null);
  const [userResponsesWithAnalysis, setUserResponsesWithAnalysis] = useState<
    UserCorrelationResponse[]
  >([]);
  const [isLoading, setIsLoading] = useState(true);
  const [correlationsMap, setCorrelationsMap] = useState<
    Record<string, CorrelationData>
  >({});
  const [numCorrelations, setNumCorrelations] = useState(0);
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);
  const [feedbackLoading, setFeedbackLoading] = useState(false);
  // Feedback form schema
  const FeedbackSchema = z.object({
    feedback: z
      .string()
      .min(10, { message: "Feedback must be at least 10 characters." })
      .max(500, {
        message: "Feedback must not be longer than 500 characters.",
      }),
  });

  const feedbackForm = useForm<z.infer<typeof FeedbackSchema>>({
    resolver: zodResolver(FeedbackSchema),
    defaultValues: { feedback: "" },
  });

  const handleFeedbackSubmit = async (
    values: z.infer<typeof FeedbackSchema>,
  ) => {
    setFeedbackLoading(true);
    try {
      const res = await fetch("/api/submit-study-data", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          dataType: "feedback",
          data: { message: values.feedback },
        }),
      });
      if (!res.ok) throw new Error("Failed to submit feedback");
      setFeedbackSubmitted(true);
      toast({
        title: "Feedback submitted!",
        description: "Thank you for your feedback.",
        variant: "default",
      });
    } catch (e) {
      toast({
        title: "Error submitting feedback",
        description: "Could not submit your feedback. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setFeedbackLoading(false);
    }
  };

  const { toast } = useToast();

  const totalStudyPartsForDisplay =
    numCorrelations > 0
      ? numCorrelations + NUM_POST_CORRELATION_PAGES_WITH_PROGRESS + 1
      : 0;
  const currentOverallStepForDisplay = totalStudyPartsForDisplay;
  const progressValue = 100;

  const getCorrelationTitle = (correlationId: string): string => {
    return correlationsMap[correlationId]?.title || "Unknown Correlation";
  };

  const processResponses = useCallback(
    async (
      rawResponses: Record<string, ExplanationFormValues>,
      correlations: Record<string, CorrelationData>,
    ) => {
      const analyzedResponses: UserCorrelationResponse[] = [];
      for (const correlationId in rawResponses) {
        const responseData = {
          correlationId,
          formData: rawResponses[correlationId],
          analysis: null,
        };

        try {
          const correlationDetails = correlations[correlationId];
          if (!correlationDetails) {
            analyzedResponses.push({
              ...responseData,
              analysis: {
                keyMisconceptions: ["Could not find correlation details."],
                sentiment: "Error",
                explanationQuality: "Error processing.",
              },
            });
            continue;
          }

          analyzedResponses.push({ ...responseData });
        } catch (error) {
          console.error(
            `Error processing response for ${correlationId}:`,
            error,
          );
          analyzedResponses.push({
            ...responseData,
            analysis: {
              keyMisconceptions: ["Analysis failed."],
              sentiment: "Error",
              explanationQuality: "Error",
            },
          });
        }
      }
      return analyzedResponses;
    },
    [],
  );

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      try {
        // Fetch session ID from API
        const sessionRes = await fetch("/api/session");
        if (sessionRes.ok) {
          const sessionData = await sessionRes.json();
          setSessionId(sessionData.sessionId);
        }

        // Fetch full correlation details in one batch call
        const listResponse = await fetch("/api/correlations?full=true");
        if (!listResponse.ok) throw new Error("Failed to fetch correlations");

        const fullCorrelations =
          (await listResponse.json()) as CorrelationData[];
        setNumCorrelations(fullCorrelations.length);

        const fetchedCorrelations: Record<string, CorrelationData> = {};
        fullCorrelations.forEach((c) => {
          fetchedCorrelations[c.id] = c;
        });
        setCorrelationsMap(fetchedCorrelations);

        const storedResponsesRaw = localStorage.getItem(RESPONSES_STORAGE_KEY);
        const allCorrelationResponses = storedResponsesRaw
          ? (JSON.parse(storedResponsesRaw) as Record<
              string,
              ExplanationFormValues
            >)
          : {};

        const storedDemographicsRaw = localStorage.getItem(
          DEMOGRAPHICS_STORAGE_KEY,
        );
        if (storedDemographicsRaw) {
          setDemographics(JSON.parse(storedDemographicsRaw));
        }

        const storedCrtRaw = localStorage.getItem(CRT_RESPONSES_STORAGE_KEY);
        if (storedCrtRaw) {
          setCrtResponses(JSON.parse(storedCrtRaw));
        }

        const analyzedResponses = await processResponses(
          allCorrelationResponses,
          fetchedCorrelations,
        );
        setUserResponsesWithAnalysis(analyzedResponses);
      } catch (e) {
        console.error("Error loading data:", e);
        toast({
          title: "Error loading data",
          description: "Could not load all study data from your browser.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };
    loadData();
  }, [processResponses, toast]);

  const calculateCRTScore = () => {
    if (!crtResponses) return { correct: 0, total: 3 };
    let correct = 0;
    if (crtResponses.crtAnswer1.trim() === "5") correct++;
    if (crtResponses.crtAnswer2.trim() === "5") correct++;
    if (crtResponses.crtAnswer3.trim() === "47") correct++;
    return { correct, total: 3 };
  };

  const getCRTFeedback = (qIndex: number, answer: string) => {
    const correctAnswers = [
      { value: "5", label: "5 cents" },
      { value: "5", label: "5 minutes" },
      { value: "47", label: "47 days" },
    ];
    const intuitiveAnswers = ["10", "100", "24"];
    const isCorrect = answer.trim() === correctAnswers[qIndex - 1].value;
    const isIntuitive = answer.trim() === intuitiveAnswers[qIndex - 1];

    if (isCorrect) return { status: "correct", text: "Correct!" };
    if (isIntuitive)
      return {
        status: "intuitive",
        text: `Incorrect. This is the common "intuitive" but wrong answer. The correct answer is ${correctAnswers[qIndex - 1].label}.`,
      };
    return {
      status: "incorrect",
      text: `Incorrect. The correct answer is ${correctAnswers[qIndex - 1].label}.`,
    };
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background text-foreground p-4">
        <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
        <p className="text-lg">Loading your results...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center bg-background text-foreground p-4 md:p-8">
      <header className="w-full max-w-5xl sticky top-0 bg-background/80 backdrop-blur-md py-4 z-10 mb-8">
        <Progress value={progressValue} className="w-full h-3 mb-2" />
        <p className="text-sm text-muted-foreground text-center">
          Study Results (Final Step {currentOverallStepForDisplay} of{" "}
          {totalStudyPartsForDisplay})
        </p>
      </header>
      <main className="w-full max-w-5xl space-y-8">
        <div className="text-center mb-10">
          <BarChart3 className="h-16 w-16 text-accent mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-primary">
            Study Results & Analysis
          </h1>
          <p className="text-lg text-muted-foreground mt-2">
            Thank you for your participation! Here&apos;s a summary of your
            responses.
          </p>
        </div>

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl flex items-center">
              <Info className="mr-2 h-6 w-6 text-primary" />
              Data Saving
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Your responses were saved progressively to our secure database.
              All data collected is anonymized and session-protected.
            </p>
            {sessionId && (
              <p className="text-xs text-muted-foreground mt-2 font-mono">
                Session ID: {sessionId}
              </p>
            )}
          </CardContent>
        </Card>

        {!feedbackSubmitted ? (
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl flex items-center">
                <MessageCircleWarning className="mr-2 h-6 w-6 text-primary" />
                Submit Feedback (Optional)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                We value your feedback! If you have any comments about the study
                or your experience, please let us know.
              </p>
              <Form {...feedbackForm}>
                <form
                  onSubmit={feedbackForm.handleSubmit(handleFeedbackSubmit)}
                  className="grid w-full gap-4"
                >
                  <FormField
                    control={feedbackForm.control}
                    name="feedback"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Feedback</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Type your message here."
                            className="resize-none"
                            {...field}
                            disabled={feedbackLoading}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" disabled={feedbackLoading}>
                    {feedbackLoading ? "Sending..." : "Send message"}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        ) : (
          <Card className="shadow-lg border-green-500">
            <CardHeader>
              <CardTitle className="text-xl flex items-center text-green-600">
                <Info className="mr-2 h-6 w-6" />
                Feedback Submitted
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Thank you for submitting your feedback! We appreciate your input
                and will use it to improve future studies.
              </p>
            </CardContent>
          </Card>
        )}

        {demographics && (
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl flex items-center">
                <UserCheck2 className="mr-2 h-6 w-6 text-primary" />
                Demographic Information
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm space-y-1">
              <p>
                <strong>Birth Year:</strong> {demographics.birthYear}
              </p>
              <p>
                <strong>Gender:</strong>{" "}
                {demographics.gender === "other"
                  ? demographics.genderOther
                  : demographics.gender}
              </p>
              <p>
                <strong>Employment Status:</strong>{" "}
                {EMPLOYMENT_STATUS_OPTIONS.find(
                  (opt) => opt.value === demographics.employmentStatus,
                )?.label || demographics.employmentStatus}
              </p>
              {demographics.employmentIndustry && (
                <p>
                  <strong>Industry:</strong> {demographics.employmentIndustry}
                </p>
              )}
              {demographics.jobTitle && (
                <p>
                  <strong>Job Title:</strong> {demographics.jobTitle}
                </p>
              )}
              <p>
                <strong>Country:</strong> {demographics.country}
              </p>
            </CardContent>
          </Card>
        )}

        {crtResponses && (
          <Card className="shadow-lg mt-6">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xl flex items-center">
                <Lightbulb className="mr-2 h-6 w-6 text-primary" />
                Cognitive Reflection Test Results
              </CardTitle>
              <div className="text-2xl font-bold text-accent">
                {calculateCRTScore().correct} / {calculateCRTScore().total}
              </div>
            </CardHeader>
            <CardContent className="text-sm space-y-4 mt-2">
              {[1, 2, 3].map((num) => {
                const answer =
                  crtResponses[`crtAnswer${num}` as keyof CRTData] || "";
                const feedback = getCRTFeedback(num, answer);
                return (
                  <div
                    key={num}
                    className="border-l-4 pl-4 py-1"
                    style={{
                      borderColor:
                        feedback.status === "correct"
                          ? "hsl(var(--success, 142 76% 36%))"
                          : feedback.status === "intuitive"
                            ? "hsl(var(--warning, 38 92% 50%))"
                            : "hsl(var(--destructive))",
                    }}
                  >
                    <p className="font-semibold">
                      {num === 1 &&
                        "Q1: A bat and a ball cost $1.10 in total. The bat costs $1.00 more than the ball. How much does the ball cost (in cents)?"}
                      {num === 2 &&
                        "Q2: If it takes 5 machines 5 minutes to make 5 widgets, how long would it take 100 machines to make 100 widgets (in minutes)?"}
                      {num === 3 &&
                        "Q3: In a lake, there is a patch of lily pads. Every day, the patch doubles in size. If it takes 48 days for the patch to cover the entire lake, how long would it take for the patch to cover half of the lake (in days)?"}
                    </p>
                    <p className="mt-1">
                      Your Answer: <span className="font-mono">{answer}</span>
                    </p>
                    <p
                      className={`text-xs mt-1 ${feedback.status === "correct" ? "text-green-600 dark:text-green-400" : feedback.status === "intuitive" ? "text-amber-600 dark:text-amber-400" : "text-destructive"}`}
                    >
                      {feedback.text}
                    </p>
                  </div>
                );
              })}
            </CardContent>
          </Card>
        )}

        <h2 className="text-2xl font-semibold text-primary mt-8 pt-4 border-t">
          Individual Correlation Responses
        </h2>
        {userResponsesWithAnalysis.length > 0 ? (
          userResponsesWithAnalysis.map((response, index) => {
            const rankedExplanations =
              response.formData.rankedExplanations || [];

            return (
              <Card key={index} className="mt-6 shadow-md border-primary/10">
                <CardHeader className="bg-muted/30 pb-3">
                  <CardTitle className="text-lg font-semibold text-primary/80">
                    {getCorrelationTitle(response.correlationId)}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 pt-4">
                  <div className="space-y-4">
                    <h4 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground flex items-center">
                      <BarChart3 className="h-4 w-4 mr-2" />
                      Your Ranking & Conviction
                    </h4>
                    <div className="space-y-3">
                      {rankedExplanations.length > 0 ? (
                        rankedExplanations.map((item, rankIndex) => {
                          const conviction = item.conviction;
                          return (
                            <div
                              key={item.text}
                              className="flex items-start gap-4 p-4 rounded-xl bg-secondary/30 border border-border/50 group"
                            >
                              <div className="flex items-center justify-center h-8 w-8 rounded-full bg-primary/10 text-primary font-bold text-sm shrink-0 mt-0.5">
                                {rankIndex + 1}
                              </div>
                              <div className="flex-1 space-y-2">
                                <p className="text-sm font-medium leading-relaxed">
                                  {item.text}
                                </p>
                                {conviction && (
                                  <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-accent/10 text-accent border border-accent/20">
                                    <Lightbulb className="w-3 h-3 mr-1" />
                                    {conviction
                                      .split("-")
                                      .map(
                                        (word) =>
                                          word.charAt(0).toUpperCase() +
                                          word.slice(1),
                                      )
                                      .join(" ")}
                                  </div>
                                )}
                              </div>
                            </div>
                          );
                        })
                      ) : (
                        <p className="text-sm text-muted-foreground italic px-1">
                          No explanation selected.
                        </p>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })
        ) : (
          <div className="text-center py-12 bg-muted/20 rounded-xl border-2 border-dashed border-border">
            <p className="text-muted-foreground">
              No correlation responses found. Start the study to see your
              results!
            </p>
          </div>
        )}

        <div className="mt-12 text-center pb-12">
          <Link href="/" passHref>
            <Button size="lg" variant="outline">
              <Home className="mr-2 h-5 w-5" /> Return to Introduction
            </Button>
          </Link>
        </div>
      </main>
    </div>
  );
}
