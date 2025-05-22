"use client";

import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Slider } from "@/components/ui/slider";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { ExplanationOption } from "@/types/correlation";
import { Loader2, Info } from "lucide-react";
import { Label } from "@/components/ui/label";

export const explanationFormSchema = z.object({
  selectedExplanationId: z.string().min(1, {
    message: "Please select an explanation.",
  }),
  rating: z.number().min(1).max(5),
  explanationText: z
    .string()
    .max(500, {
      message: "Your explanation must not exceed 500 characters.",
    })
    .optional()
    .default(""),
});

export type ExplanationFormValues = z.infer<typeof explanationFormSchema>;

interface ExplanationFormProps {
  explanationsToList: ExplanationOption[];
  onSubmitAttempt: (data: ExplanationFormValues) => void;
  isSubmitting: boolean;
  existingResponse?: ExplanationFormValues | null;
}

export function ExplanationForm({
  explanationsToList,
  onSubmitAttempt,
  isSubmitting,
  existingResponse,
}: ExplanationFormProps) {
  const form = useForm<ExplanationFormValues>({
    resolver: zodResolver(explanationFormSchema),
    defaultValues: existingResponse
      ? {
          selectedExplanationId: existingResponse.selectedExplanationId || "",
          rating:
            existingResponse.rating !== undefined ? existingResponse.rating : 3,
          explanationText: existingResponse.explanationText || "",
        }
      : {
          selectedExplanationId: "",
          rating: 3,
          explanationText: "",
        },
    disabled: !!existingResponse || isSubmitting,
  });

  function handleSubmit(values: ExplanationFormValues) {
    onSubmitAttempt(values);
  }

  return (
    <Card className="w-full mt-6 shadow-lg">
      <CardHeader>
        <CardTitle className="text-xl font-semibold">Your Analysis</CardTitle>
      </CardHeader>
      <CardContent>
        {existingResponse && (
          <div className="mb-6 p-3 bg-secondary/50 border border-border rounded-md flex items-center text-sm text-muted-foreground">
            <Info className="h-5 w-5 mr-2 shrink-0" />
            <span>
              You have already submitted an explanation for this correlation.
              Your previous answers are shown below and cannot be changed.
            </span>
          </div>
        )}
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-8"
          >
            <FormField
              control={form.control}
              name="selectedExplanationId"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel className="text-lg font-medium">
                    Which explanation seems most plausible for the observed
                    correlation?
                  </FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      value={field.value}
                      className="flex flex-col space-y-2"
                      disabled={field.disabled}
                    >
                      {explanationsToList.map((explanation) => (
                        <FormItem
                          key={explanation.id}
                          className="flex items-start space-x-3 space-y-0 p-3 rounded-md border border-input hover:bg-accent/10 transition-colors data-[disabled]:opacity-70 data-[disabled]:hover:bg-transparent"
                        >
                          <FormControl>
                            <RadioGroupItem
                              value={explanation.id}
                              id={`explanation-${explanation.id}`}
                              disabled={field.disabled}
                              className="mt-1" // Align radio button with first line of text
                            />
                          </FormControl>
                          <Label
                            htmlFor={`explanation-${explanation.id}`}
                            className="font-normal cursor-pointer flex-1"
                          >
                            {explanation.text}
                          </Label>
                        </FormItem>
                      ))}
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="rating"
              render={({
                field: { onChange, value, disabled, ...fieldProps },
              }) => (
                <FormItem>
                  <FormLabel className="text-lg font-medium">
                    Rate your confidence in your chosen explanation (1-5):{" "}
                    {value}
                  </FormLabel>
                  <FormControl>
                    <div className="flex items-center space-x-4 pt-2">
                      <Slider
                        value={[value]}
                        min={1}
                        max={5}
                        step={1}
                        onValueChange={(val) => onChange(val[0])}
                        className="w-[60%]"
                        aria-label="Confidence rating"
                        disabled={disabled}
                        {...fieldProps}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="explanationText"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg font-medium">
                    Provide your reasoning or any other insights (Optional):
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="e.g., I believe this explanation is most likely because..."
                      className="resize-none min-h-[100px]"
                      {...field}
                      disabled={field.disabled}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {!existingResponse && (
              <Button
                type="submit"
                disabled={isSubmitting || form.formState.disabled}
                size="lg"
                className="w-full sm:w-auto"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  "Submit Explanation"
                )}
              </Button>
            )}
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
