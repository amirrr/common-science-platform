"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import type { CRTData, ProgressiveSavePayload } from "@/types/correlation";
import { CRT_RESPONSES_STORAGE_KEY, NUM_POST_CORRELATION_PAGES_WITH_PROGRESS } from "@/types/correlation";

const crtSchema = z.object({
  crtAnswer1: z.string().min(1, "Please provide an answer"),
  crtAnswer2: z.string().min(1, "Please provide an answer"),
  crtAnswer3: z.string().min(1, "Please provide an answer"),
});

type CRTFormValues = z.infer<typeof crtSchema>;

export default function CRTTestPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [numCorrelations, setNumCorrelations] = useState(0);

  useEffect(() => {
    const fetchCount = async () => {
      try {
        const response = await fetch("/api/correlations");
        if (response.ok) {
          const data = await response.json();
          setNumCorrelations(data.length);
        }
      } catch (error) {
        console.error("Failed to fetch correlations:", error);
      }
    };
    fetchCount();
  }, []);

  const totalStudyParts = numCorrelations + NUM_POST_CORRELATION_PAGES_WITH_PROGRESS;
  const currentOverallStep = numCorrelations + 1;
  const progressValue = (currentOverallStep / totalStudyParts) * 100;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CRTFormValues>({
    resolver: zodResolver(crtSchema),
    defaultValues: {
      crtAnswer1: "",
      crtAnswer2: "",
      crtAnswer3: "",
    },
  });

  const saveCRTToFirestore = async (data: CRTData) => {
    const payload: ProgressiveSavePayload = {
      dataType: "crtData",
      data,
    };
    try {
      const response = await fetch("/api/submit-study-data", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
    } catch (error) {
      console.error("Failed to save CRT responses to Firestore:", error);
      throw error;
    }
  };

  const onSubmit = async (data: CRTFormValues) => {
    // 1. Update local storage immediately
    localStorage.setItem(CRT_RESPONSES_STORAGE_KEY, JSON.stringify(data));

    // 2. Show a resolving toast
    const { update } = toast({
      title: "Saving test answers...",
      description: "Your answers are being synced to the server.",
    });

    // 3. Trigger background save (non-blocking)
    saveCRTToFirestore(data).then(() => {
      update({
        id: "save-success",
        title: "Answers saved!",
        description: "Moving to demographics section.",
        variant: "default",
      } as any);
    }).catch((err) => {
      update({
        id: "save-error",
        title: "Sync Error",
        description: "Could not sync answers to server. They are saved locally.",
        variant: "destructive",
      } as any);
    });

    // 4. Navigate immediately
    router.push("/demographics");
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-background text-foreground p-4 md:p-8">
      <header className="w-full max-w-2xl sticky top-0 bg-background/95 backdrop-blur-md py-3 z-50 border-b mb-8">
        <Progress value={progressValue} className="w-full h-2 mb-1" />
        <p className="text-xs text-muted-foreground text-center">
          Step {currentOverallStep} of {totalStudyParts}
        </p>
      </header>

      <main className="w-full max-w-2xl space-y-8">
        <Card>
          <CardHeader>
            <CardTitle>Cognitive Reflection Test</CardTitle>
            <CardDescription>
              Please answer the following three questions. Don&apos;t spend too much time on each; just provide what you think is the best answer.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="space-y-3">
                <Label htmlFor="crtAnswer1">
                  A bat and a ball cost $1.10 in total. The bat costs $1.00 more than the ball. How much does the ball cost? _____ cents.
                </Label>
                <Input
                  id="crtAnswer1"
                  placeholder="Your answer in cents"
                  {...register("crtAnswer1")}
                />
                {errors.crtAnswer1 && (
                  <p className="text-sm text-destructive">{errors.crtAnswer1.message}</p>
                )}
              </div>

              <div className="space-y-3">
                <Label htmlFor="crtAnswer2">
                  If it takes 5 machines 5 minutes to make 5 widgets, how long would it take 100 machines to make 100 widgets? _____ minutes.
                </Label>
                <Input
                  id="crtAnswer2"
                  placeholder="Your answer in minutes"
                  {...register("crtAnswer2")}
                />
                {errors.crtAnswer2 && (
                  <p className="text-sm text-destructive">{errors.crtAnswer2.message}</p>
                )}
              </div>

              <div className="space-y-3">
                <Label htmlFor="crtAnswer3">
                  In a lake, there is a patch of lily pads. Every day, the patch doubles in size. If it takes 48 days for the patch to cover the entire lake, how long would it take for the patch to cover half of the lake? _____ days.
                </Label>
                <Input
                  id="crtAnswer3"
                  placeholder="Your answer in days"
                  {...register("crtAnswer3")}
                />
                {errors.crtAnswer3 && (
                  <p className="text-sm text-destructive">{errors.crtAnswer3.message}</p>
                )}
              </div>

              <Button type="submit" className="w-full">
                Continue to Demographics
              </Button>
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
