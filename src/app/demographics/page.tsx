
'use client';

import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, UserCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import type { DemographicsData, ProgressiveSavePayload } from '@/types/correlation';
import { DEMOGRAPHICS_STORAGE_KEY, USER_ID_STORAGE_KEY, NUM_POST_CORRELATION_PAGES_WITH_PROGRESS } from '@/types/correlation';
import { Progress } from '@/components/ui/progress';
import { MOCK_CORRELATIONS } from '@/lib/data';
import { useEffect, useState } from 'react';

const demographicsSchema = z.object({
  age: z.coerce.number().min(1, "Age is required").max(120, "Please enter a valid age.").optional().nullable().default(null),
  country: z.string().min(2, "Country is required."),
  occupation: z.string().min(2, "Occupation is required."),
});

type DemographicsFormValues = z.infer<typeof demographicsSchema>;

export default function DemographicsPage() {
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
  const currentOverallStep = numCorrelations + 2;
  const progressValue = totalStudyParts > 0 ? (currentOverallStep / totalStudyParts) * 100 : 0;

  const form = useForm<DemographicsFormValues>({
    resolver: zodResolver(demographicsSchema),
    defaultValues: {
      age: null,
      country: '',
      occupation: '',
    },
  });

  const saveDemographicsToFirestore = async (demographicsData: DemographicsData) => {
    if (!userId) {
      toast({ title: "Error", description: "User ID missing. Cannot save demographics to database.", variant: "destructive" });
      return;
    }
    setIsSubmitting(true);
    const payload: ProgressiveSavePayload = {
      userId,
      dataType: 'demographicsData',
      data: demographicsData,
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
      // console.log("Demographics data saved to DB.");
    } catch (error) {
      console.error("Failed to save demographics data to Firestore:", error);
      toast({ title: "Save Error", description: `Could not save demographic info to database. It's saved locally. ${error instanceof Error ? error.message : ''}`, variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
  };

  const onSubmit = async (data: DemographicsFormValues) => {
    const demographicsData: DemographicsData = {
        age: data.age ?? null,
        country: data.country,
        occupation: data.occupation,
    }
    localStorage.setItem(DEMOGRAPHICS_STORAGE_KEY, JSON.stringify(demographicsData));
    await saveDemographicsToFirestore(demographicsData);

    toast({
      title: "Demographics Saved!",
      description: "Thank you for providing your information.",
    });
    router.push('/results');
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-background text-foreground p-4 md:p-8">
       <header className="w-full max-w-lg sticky top-0 bg-background/80 backdrop-blur-md py-4 z-10 mb-8">
        <Progress value={progressValue} className="w-full h-3 mb-2" />
        <p className="text-sm text-muted-foreground text-center">
          Demographic Information (Overall task {currentOverallStep} of {totalStudyParts})
        </p>
      </header>
      <main className="w-full max-w-lg space-y-8">
        <Card className="shadow-lg">
          <CardHeader className="text-center">
            <UserCircle className="h-12 w-12 text-accent mx-auto mb-3" />
            <CardTitle className="text-2xl font-bold text-primary">Demographic Information</CardTitle>
            <CardDescription>
              Please provide some basic information. This data is anonymized and used for research purposes only.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="age"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="age">Age</FormLabel>
                      <FormControl>
                        <Input
                          id="age"
                          type="number"
                          placeholder="Your age"
                          {...field}
                          value={field.value === null || field.value === undefined ? '' : String(field.value)}
                           onChange={e => {
                            const value = e.target.value;
                            field.onChange(value === '' ? null : Number(value));
                          }}
                          disabled={isSubmitting}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="country"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="country">Country of Residence</FormLabel>
                      <FormControl>
                        <Input id="country" placeholder="e.g., United States" {...field} disabled={isSubmitting} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="occupation"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="occupation">Occupation / Field of Study</FormLabel>
                      <FormControl>
                        <Input id="occupation" placeholder="e.g., Student, Engineer, Artist" {...field} disabled={isSubmitting} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" size="lg" className="w-full bg-accent text-accent-foreground hover:bg-accent/90" disabled={isSubmitting}>
                  {isSubmitting ? "Submitting..." : "Proceed to Results"}
                  {!isSubmitting && <ArrowRight className="ml-2 h-5 w-5" />}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </main>
      <footer className="w-full max-w-4xl mt-12 pt-8 border-t text-center text-muted-foreground text-sm">
        <p>&copy; {new Date().getFullYear()} Correlation Study. All data is handled responsibly.</p>
      </footer>
    </div>
  );
}
