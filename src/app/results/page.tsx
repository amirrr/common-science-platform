
'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AnalysisResultCard } from '@/components/correlation-analyzer/analysis-result-card';
import { analyzeUserExplanation, type AnalyzeUserExplanationInput } from '@/ai/flows/analyze-user-explanation';
import type { UserCorrelationResponse, DemographicsData, CorrelationData, ExplanationFormValues, CRTData } from '@/types/correlation';
import { USER_ID_STORAGE_KEY, RESPONSES_STORAGE_KEY, DEMOGRAPHICS_STORAGE_KEY, CRT_RESPONSES_STORAGE_KEY, NUM_POST_CORRELATION_PAGES_WITH_PROGRESS } from '@/types/correlation';
import { MOCK_CORRELATIONS } from '@/lib/data';
import { Loader2, Home, BarChart3, UserCheck2, Lightbulb, Info } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Progress } from '@/components/ui/progress';


export default function ResultsPage() {
  const [userId, setUserId] = useState<string | null>(null);
  const [demographics, setDemographics] = useState<DemographicsData | null>(null);
  const [crtResponses, setCrtResponses] = useState<CRTData | null>(null);
  const [userResponsesWithAnalysis, setUserResponsesWithAnalysis] = useState<UserCorrelationResponse[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const { toast } = useToast();

  const numCorrelations = MOCK_CORRELATIONS.length;
  // For display purposes, the "Results" page is the final step after correlations and other tasks.
  const totalStudyPartsForDisplay = numCorrelations + NUM_POST_CORRELATION_PAGES_WITH_PROGRESS + 1;
  const currentOverallStepForDisplay = totalStudyPartsForDisplay; // Results page is the last step
  const progressValue = 100; // Always 100% on results page

  const getCorrelationTitle = (correlationId: string): string => {
    const correlation = MOCK_CORRELATIONS.find(c => c.id === correlationId);
    return correlation ? correlation.title : 'Unknown Correlation';
  };

  const getCorrelationDetails = (correlationId: string): CorrelationData | undefined => {
    return MOCK_CORRELATIONS.find(c => c.id === correlationId);
  };

  const processResponses = useCallback(async (rawResponses: Record<string, ExplanationFormValues>) => {
    const responsesToAnalyze: UserCorrelationResponse[] = [];
    for (const correlationId in rawResponses) {
      responsesToAnalyze.push({
        correlationId,
        formData: rawResponses[correlationId],
        analysis: null,
      });
    }

    const analyzedResponses: UserCorrelationResponse[] = [];
    for (const response of responsesToAnalyze) {
      try {
        const correlationDetails = getCorrelationDetails(response.correlationId);
        if (!correlationDetails) {
            analyzedResponses.push({ ...response, analysis: { keyMisconceptions: ['Could not find correlation details.'], sentiment: 'Error', explanationQuality: 'Error processing.' } });
            continue;
        }

        const chosenOption = correlationDetails.suggestedExplanations.find(
          opt => opt.id === response.formData.selectedExplanationId
        );

        if (!chosenOption) {
            analyzedResponses.push({ ...response, analysis: { keyMisconceptions: ['Could not find chosen explanation details.'], sentiment: 'Error', explanationQuality: 'Error processing.' } });
            continue;
        }

        const aiInput: AnalyzeUserExplanationInput = {
          correlationId: response.correlationId,
          rating: response.formData.rating,
          chosenExplanationText: chosenOption.text,
          userProvidedReasoning: response.formData.explanationText || undefined,
          allPresentedExplanationTexts: correlationDetails.suggestedExplanations.map(opt => opt.text),
        };
        const analysisResult = await analyzeUserExplanation(aiInput);
        analyzedResponses.push({ ...response, analysis: analysisResult });
      } catch (error) {
        console.error(`Error analyzing response for ${response.correlationId}:`, error);
        toast({
          title: `Analysis Error for ${getCorrelationTitle(response.correlationId)}`,
          description: "Could not analyze this response. Skipping.",
          variant: "destructive",
        });
        analyzedResponses.push({ ...response, analysis: { keyMisconceptions: ['Analysis failed to run.'], sentiment: 'Error', explanationQuality: 'Error' } });
      }
    }
    return analyzedResponses;
  }, [toast]);


  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      let finalAnalyzedResponses: UserCorrelationResponse[] = [];
      // let allCorrelationResponses: Record<string, ExplanationFormValues> | null = null;
      // let currentCrtData: CRTData | null = null;
      // let currentDemographicsData: DemographicsData | null = null;
      let currentUserId: string | null = null;

      try {
        currentUserId = localStorage.getItem(USER_ID_STORAGE_KEY);
        setUserId(currentUserId);
        
        const storedDemographicsRaw = localStorage.getItem(DEMOGRAPHICS_STORAGE_KEY);
        if (storedDemographicsRaw) {
          // currentDemographicsData = JSON.parse(storedDemographicsRaw);
          setDemographics(JSON.parse(storedDemographicsRaw));
        }

        const storedCrtRaw = localStorage.getItem(CRT_RESPONSES_STORAGE_KEY);
        if (storedCrtRaw) {
          // currentCrtData = JSON.parse(storedCrtRaw);
          setCrtResponses(JSON.parse(storedCrtRaw));
        }

        const storedResponsesRaw = localStorage.getItem(RESPONSES_STORAGE_KEY);
        if (storedResponsesRaw) {
          const allCorrelationResponses = JSON.parse(storedResponsesRaw) as Record<string, ExplanationFormValues>;
          finalAnalyzedResponses = await processResponses(allCorrelationResponses);
          setUserResponsesWithAnalysis(finalAnalyzedResponses);
        }
      } catch (e) {
        console.error("Error loading data from localStorage:", e);
        toast({ title: "Error loading data", description: "Could not load all study data from your browser.", variant: "destructive"});
      } finally {
        setIsLoading(false);
        // Bulk submission removed, data is saved progressively.
      }
    };
    loadData();
  }, [processResponses, toast]);

  const calculateOverallScore = () => {
    if (!userResponsesWithAnalysis.length) return "N/A";
    let qualitySum = 0;
    let validAnalyses = 0;
    userResponsesWithAnalysis.forEach(response => {
      if (response.analysis && response.analysis.explanationQuality) {
        const quality = response.analysis.explanationQuality.toLowerCase();
        if (quality.includes("excellent") || quality.includes("insightful") || quality.includes("thorough") || quality.includes("good insight")) qualitySum += 5;
        else if (quality.includes("good") || quality.includes("reasonable") || quality.includes("sound")) qualitySum += 4;
        else if (quality.includes("fair") || quality.includes("adequate")) qualitySum += 3;
        else if (quality.includes("basic") || quality.includes("superficial") || quality.includes("vague")) qualitySum += 2;
        else if (quality.includes("poor") || quality.includes("unclear") || quality.includes("misconception")) qualitySum += 1;
        else if (quality !== "Error" && !quality.includes("error processing.")) qualitySum += 2.5; // Generic positive
        if(quality !== "Error" && !quality.includes("error processing.")) validAnalyses++;
      }
    });
    if (validAnalyses === 0) return "N/A (No valid analyses)";
    const averageScore = (qualitySum / validAnalyses);
    if (averageScore >= 4.5) return `Excellent (${averageScore.toFixed(1)}/5.0)`;
    if (averageScore >= 3.5) return `Good (${averageScore.toFixed(1)}/5.0)`;
    if (averageScore >= 2.5) return `Fair (${averageScore.toFixed(1)}/5.0)`;
    if (averageScore >= 1.5) return `Basic (${averageScore.toFixed(1)}/5.0)`;
    return `Needs Improvement (${averageScore.toFixed(1)}/5.0)`;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background text-foreground p-4">
        <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
        <p className="text-lg">Loading and analyzing your results...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center bg-background text-foreground p-4 md:p-8">
      <header className="w-full max-w-4xl sticky top-0 bg-background/80 backdrop-blur-md py-4 z-10 mb-8">
        <Progress value={progressValue} className="w-full h-3 mb-2" />
        <p className="text-sm text-muted-foreground text-center">
          Study Results (Final Step {currentOverallStepForDisplay} of {totalStudyPartsForDisplay})
        </p>
      </header>
      <main className="w-full max-w-4xl space-y-8">
        <div className="text-center mb-10">
           <BarChart3 className="h-16 w-16 text-accent mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-primary">Study Results & Analysis</h1>
          <p className="text-lg text-muted-foreground mt-2">
            Thank you for your participation! Here's a summary of your responses and our AI's feedback.
          </p>
        </div>

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl flex items-center"><Info className="mr-2 h-6 w-6 text-primary"/>Data Saving</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Your responses were saved progressively to our secure database as you completed each section.
              All data collected is anonymized and will be used for research purposes only.
            </p>
          </CardContent>
        </Card>

        {demographics && (
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl flex items-center"><UserCheck2 className="mr-2 h-6 w-6 text-primary"/>Demographic Information</CardTitle>
            </CardHeader>
            <CardContent className="text-sm space-y-1">
              <p><strong>User ID:</strong> {userId || 'Not available'}</p>
              <p><strong>Age:</strong> {demographics.age ?? 'Not provided'}</p>
              <p><strong>Country:</strong> {demographics.country}</p>
              <p><strong>Occupation/Field:</strong> {demographics.occupation}</p>
            </CardContent>
          </Card>
        )}

        {crtResponses && (
           <Card className="shadow-lg mt-6">
            <CardHeader>
              <CardTitle className="text-xl flex items-center"><Lightbulb className="mr-2 h-6 w-6 text-primary"/>Cognitive Reflection Test Answers</CardTitle>
            </CardHeader>
            <CardContent className="text-sm space-y-2">
                <div>
                    <p className="font-semibold">Q1: A bat and a ball cost $1.10 in total. The bat costs $1.00 more than the ball. How much does the ball cost (in cents)?</p>
                    <p>Your Answer: {crtResponses.crtAnswer1}</p>
                </div>
                <div>
                    <p className="font-semibold">Q2: If it takes 5 machines 5 minutes to make 5 widgets, how long would it take 100 machines to make 100 widgets (in minutes)?</p>
                    <p>Your Answer: {crtResponses.crtAnswer2}</p>
                </div>
                <div>
                    <p className="font-semibold">Q3: In a lake, there is a patch of lily pads. Every day, the patch doubles in size. If it takes 48 days for the patch to cover the entire lake, how long would it take for the patch to cover half of the lake (in days)?</p>
                    <p>Your Answer: {crtResponses.crtAnswer3}</p>
                </div>
            </CardContent>
          </Card>
        )}

        <Card className="shadow-lg mt-6">
            <CardHeader>
                <CardTitle className="text-xl text-primary">Overall Explanation Score</CardTitle>
                 <CardDescription>This score reflects a general assessment of the quality of your explanations across all correlations, based on AI analysis.</CardDescription>
            </CardHeader>
            <CardContent>
                <p className="text-2xl font-semibold text-accent">{calculateOverallScore()}</p>
            </CardContent>
        </Card>

        <h2 className="text-2xl font-semibold text-primary mt-8 pt-4 border-t">Individual Correlation Analysis</h2>
        {userResponsesWithAnalysis.length > 0 ? (
          userResponsesWithAnalysis.map((response, index) => {
            const correlation = getCorrelationDetails(response.correlationId);
            const chosenExplanation = correlation?.suggestedExplanations.find(opt => opt.id === response.formData.selectedExplanationId);

            return (
              <Card key={index} className="mt-6 shadow-md">
                <CardHeader>
                  <CardTitle className="text-lg font-medium">{getCorrelationTitle(response.correlationId)}</CardTitle>
                  <CardDescription>Your submitted explanation for this correlation.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3 text-sm">
                  <p><strong>Your Chosen Explanation:</strong> {chosenExplanation?.text || 'N/A'}</p>
                  <p><strong>Your Confidence:</strong> {response.formData.rating} / 5</p>
                  <p><strong>Your Reasoning:</strong> {response.formData.explanationText ? `"${response.formData.explanationText}"` : "No reasoning provided."}</p>
                  {response.analysis ? (
                    <AnalysisResultCard analysis={response.analysis} />
                  ) : (
                    <div className="flex items-center text-muted-foreground p-4 border rounded-md">
                      <Loader2 className="h-4 w-4 animate-spin mr-2" /> Analyzing...
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })
        ) : (
          <p className="text-muted-foreground">No correlation responses found to analyze.</p>
        )}

        <div className="mt-12 text-center">
          <p className="text-sm text-muted-foreground mb-4">
            To start a new session or clear your data from this browser, return to the introduction.
          </p>
          <Link href="/" passHref>
            <Button size="lg" variant="outline">
              <Home className="mr-2 h-5 w-5" /> Return to Study Introduction & Clear Data
            </Button>
          </Link>
        </div>
      </main>
       <footer className="w-full max-w-4xl mt-12 pt-8 border-t text-center text-muted-foreground text-sm">
        <p>&copy; {new Date().getFullYear()} Correlation Study. Thank you for contributing to our research!</p>
      </footer>
    </div>
  );
}
