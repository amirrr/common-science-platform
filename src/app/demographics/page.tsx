'use client';

import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { ArrowRight, UserCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import type { DemographicsData, ProgressiveSavePayload } from '@/types/correlation';
import { DEMOGRAPHICS_STORAGE_KEY, NUM_POST_CORRELATION_PAGES_WITH_PROGRESS } from '@/types/correlation';
import { Progress } from '@/components/ui/progress';
import { useEffect, useState } from 'react';
import { COUNTRIES, EMPLOYMENT_STATUS_OPTIONS, GENDER_OPTIONS, EMPLOYMENT_INDUSTRY_OPTIONS } from '@/lib/demographic-options';

const demographicsSchema = z.object({
  birthYear: z.coerce.number()
    .min(1900, "Please enter a valid birth year (after 1900)")
    .max(new Date().getFullYear(), "Birth year cannot be in the future"),
  gender: z.string().min(1, "Gender is required"),
  genderOther: z.string().optional(),
  employmentStatus: z.string().min(1, "Employment status is required"),
  employmentIndustry: z.string().optional(),
  jobTitle: z.string().optional(),
  country: z.string().min(1, "Country is required"),
}).refine((data) => {
  if (data.gender === 'other' && !data.genderOther) {
    return false;
  }
  return true;
}, {
  message: "Please specify your gender",
  path: ["genderOther"],
});

type DemographicsFormValues = z.infer<typeof demographicsSchema>;

export default function DemographicsPage() {
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
  const currentOverallStep = numCorrelations + 2;
  const progressValue = totalStudyParts > 0 ? (currentOverallStep / totalStudyParts) * 100 : 0;

  const form = useForm<DemographicsFormValues>({
    resolver: zodResolver(demographicsSchema),
    defaultValues: {
      birthYear: undefined,
      gender: '',
      genderOther: '',
      employmentStatus: '',
      employmentIndustry: '',
      jobTitle: '',
      country: '',
    },
  });

  const selectedGender = form.watch('gender');
  const selectedEmploymentStatus = form.watch('employmentStatus');

  const showOccupationFields = [
    'employed', 
    'self_employed', 
    'looking_for_work', 
    'not_looking_for_work', 
    'retired'
  ].includes(selectedEmploymentStatus);

  const saveDemographicsToFirestore = async (demographicsData: DemographicsData) => {
    const payload: ProgressiveSavePayload = {
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
    } catch (error) {
      console.error("Failed to save demographics data to Firestore:", error);
      throw error;
    }
  };

  const onSubmit = async (data: DemographicsFormValues) => {
    // 1. Prepare data and update local storage immediately
    const demographicsData: DemographicsData = {
        birthYear: data.birthYear,
        gender: data.gender,
        genderOther: data.gender === 'other' ? data.genderOther : undefined,
        employmentStatus: data.employmentStatus,
        employmentIndustry: showOccupationFields ? data.employmentIndustry : undefined,
        jobTitle: showOccupationFields ? data.jobTitle : undefined,
        country: data.country,
    }
    localStorage.setItem(DEMOGRAPHICS_STORAGE_KEY, JSON.stringify(demographicsData));

    // 2. Show a resolving toast
    const { update } = toast({
      title: "Saving demographics...",
      description: "Your information is being synced to the server.",
    });

    // 3. Trigger background save (non-blocking)
    saveDemographicsToFirestore(demographicsData).then(() => {
      update({
        id: "save-success",
        title: "Demographics saved!",
        description: "Thank you for providing your information.",
        variant: "default",
      } as any);
    }).catch((err) => {
      update({
        id: "save-error",
        title: "Sync Error",
        description: "Could not sync demographics to server. They are saved locally.",
        variant: "destructive",
      } as any);
    });

    // 4. Navigate immediately
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
              Please provide the following information. All fields are required.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                
                {/* Birth Year */}
                <FormField
                  control={form.control}
                  name="birthYear"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>What year were you born?</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="4-digit year (e.g. 1990)"
                          {...field}
                          value={field.value || ''}
                          onChange={e => field.onChange(e.target.value === '' ? undefined : Number(e.target.value))}
                          
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Country */}
                <FormField
                  control={form.control}
                  name="country"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>What country do you live in?</FormLabel>
                      <Select 
                        onValueChange={field.onChange} 
                        defaultValue={field.value}
                        
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select your country" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {COUNTRIES.map(country => (
                            <SelectItem key={country} value={country}>{country}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Gender */}
                <FormField
                  control={form.control}
                  name="gender"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormLabel>What is your gender?</FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="flex flex-col space-y-1"
                          
                        >
                          {GENDER_OPTIONS.map(option => (
                            <FormItem key={option.value} className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem value={option.value} />
                              </FormControl>
                              <FormLabel className="font-normal">
                                {option.label}
                              </FormLabel>
                            </FormItem>
                          ))}
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {selectedGender === 'other' && (
                  <FormField
                    control={form.control}
                    name="genderOther"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Please enter your gender below:</FormLabel>
                        <FormControl>
                          <Input placeholder="Specify gender" {...field}  />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}

                {/* Employment Status */}
                <FormField
                  control={form.control}
                  name="employmentStatus"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Are you currently...</FormLabel>
                      <Select 
                        onValueChange={field.onChange} 
                        defaultValue={field.value}
                        
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select employment status" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {EMPLOYMENT_STATUS_OPTIONS.map(status => (
                            <SelectItem key={status.value} value={status.value}>{status.label}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {showOccupationFields && (
                  <>
                    <FormField
                      control={form.control}
                      name="employmentIndustry"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>In which industry do you work?</FormLabel>
                          <Select 
                            onValueChange={field.onChange} 
                            defaultValue={field.value}
                            
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select industry" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {EMPLOYMENT_INDUSTRY_OPTIONS.map(industry => (
                                <SelectItem key={industry} value={industry}>{industry}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="jobTitle"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>What is your job title?</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g. Software Engineer" {...field}  />
                          </FormControl>
                          <CardDescription className="text-xs">
                            Please provide your specific job title if you are currently employed.
                          </CardDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </>
                )}

                <Button type="submit" size="lg" className="w-full bg-accent text-accent-foreground hover:bg-accent/90" >
                  Proceed to Results
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </main>
      <footer className="w-full max-w-lg mt-12 pt-8 border-t text-center text-muted-foreground text-sm">
        <p>&copy; {new Date().getFullYear()} Correlation Study. All data is handled responsibly.</p>
      </footer>
    </div>
  );
}
