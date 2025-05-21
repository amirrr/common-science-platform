
'use client';

import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, Lightbulb } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import type { CRTData, ProgressiveSavePayload } from '@/types/correlation';
import { CRT_RESPONSES_STORAGE_KEY, USER_ID_STORAGE_KEY, NUM_POST_CORRELATION_PAGES_WITH_PROGRESS } from '@/types/correlation';
import { Progress } from '@/components/ui/progress';
import { MOCK_CORRELATIONS } from '@/lib/data';
import { useEffect, useState } from 'react';

const crtSchema = z.object({
  crtAnswer1: z.string().trim().min(1, "Answer is required.").max(100, "Answer is too long."),
  crtAnswer2: z.string().trim().min(1, "Answer is required.").max(100, "Answer is too long."),
  crtAnswer3: z.string().trim().min(1, "Answer is required.").max(100, "Answer is too long."),
});

type CRTFormValues = z.infer<typeof crtSchema>;

const CRT_QUESTIONS = [
  { id: 'crtAnswer1', label: 'Question 1:', text: "A bat and a ball cost $1.10 in total. The bat costs $1.00 more than the ball. How much does the ball cost (in cents)?" },
  { id: 'crtAnswer2', label: 'Question 2:', text: "If it takes 5 machines 5 minutes to make 5 widgets, how long would it take 100 machines to make 100 widgets (in minutes)?" },
  { id: 'crtAnswer3', label: 'Question 3:', text: "In a lake, there is a patch of lily pads. Every day, the patch doubles in size. If it takes 48 days for the patch to cover the entire lake, how long would it take for the patch to cover half of the lake (in days)?" },
];


export default function CRTTestPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [userId, setUserId] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const storedUserId = localStorage.getItem(USER_ID_STORAGE_KEY);
    if (storedUserId) {
      setUserId(storedUserId);
    } else {
      router.push('/'); // Redirect if no user ID
    }
  }, [router]);

  const numCorrelations = MOCK_CORRELATIONS.length;
  const totalStudyParts = numCorrelations + NUM_POST_CORRELATION_PAGES_WITH_PROGRESS;
  const currentOverallStep = numCorrelations + 1;
  const progressValue = totalStudyParts > 0 ? (currentOverallStep / totalStudyParts) * 100 : 0;

  const form = useForm<CRTFormValues>({
    resolver: zodResolver(crtSchema),
    defaultValues: {
      crtAnswer1: '',
      crtAnswer2: '',
      crtAnswer3: '',
    },
  });

  const saveCRTToFirestore = async (crtData: CRTData) => {
    if (!userId) {
      toast({ title: "Error", description: "User ID missing. Cannot save CRT to database.", variant: "destructive" });
      return;
    }
    setIsSubmitting(true);
    const payload: ProgressiveSavePayload = {
      userId,
      dataType: 'crtData',
      data: crtData,
    };
    try {
      const response = await fetch('/api/submit-study-data', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `HTTP error! Status: ${response.status}`);
      }
      // console.log("CRT data saved to DB.");
    } catch (error) {
      console.error("Failed to save CRT data to Firestore:", error);
      toast({ title: "Save Error", description: `Could not save CRT answers to database. They're saved locally. ${error instanceof Error ? error.message : ''}`, variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
  };

  const onSubmit = async (data: CRTFormValues) => {
    const crtData: CRTData = {
      crtAnswer1: data.crtAnswer1,
      crtAnswer2: data.crtAnswer2,
      crtAnswer3: data.crtAnswer3,
    };
    localStorage.setItem(CRT_RESPONSES_STORAGE_KEY, JSON.stringify(crtData));
    await saveCRTToFirestore(crtData);

    toast({
      title: "CRT Answers Saved!",
      description: "Thank you for completing the test.",
    });
    router.push('/demographics');
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-background text-foreground p-4 md:p-8">
      <header className="w-full max-w-xl sticky top-0 bg-background/80 backdrop-blur-md py-4 z-10 mb-8">
        <Progress value={progressValue} className="w-full h-3 mb-2" />
        <p className="text-sm text-muted-foreground text-center">
          Cognitive Reflection Test (Overall task {currentOverallStep} of {totalStudyParts})
        </p>
      </header>
      <main className="w-full max-w-xl space-y-8">
        <Card className="shadow-lg">
          <CardHeader className="text-center">
            <Lightbulb className="h-12 w-12 text-accent mx-auto mb-3" />
            <CardTitle className="text-2xl font-bold text-primary">Cognitive Reflection Test</CardTitle>
            <CardDescription>
              Please answer the following questions to the best of your ability.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                {CRT_QUESTIONS.map((q) => (
                  <FormField
                    key={q.id}
                    control={form.control}
                    name={q.id as keyof CRTFormValues}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel htmlFor={q.id} className="font-semibold">{q.label}</FormLabel>
                        <p className="text-sm text-muted-foreground mb-1">{q.text}</p>
                        <FormControl>
                          <Input
                            id={q.id}
                            placeholder="Your answer"
                            {...field}
                            disabled={isSubmitting}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                ))}
                <Button type="submit" size="lg" className="w-full bg-accent text-accent-foreground hover:bg-accent/90" disabled={isSubmitting}>
                  {isSubmitting ? "Submitting..." : "Submit Answers & Proceed to Demographics"}
                  {!isSubmitting && <ArrowRight className="ml-2 h-5 w-5" />}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </main>
      <footer className="w-full max-w-4xl mt-12 pt-8 border-t text-center text-muted-foreground text-sm">
        <p>&copy; {new Date().getFullYear()} Correlation Study. Your responses are valuable.</p>
      </footer>
    </div>
  );
}
