"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import {
  explanationFormSchema,
  type ExplanationFormValues,
  type ExplanationOption,
  CONVICTION_LEVELS,
} from "@/types/correlation";
import { Loader2, Info, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface ExplanationFormProps {
  explanationsToList: ExplanationOption[];
  onSubmitAttempt: (data: ExplanationFormValues) => void;
  onNext?: () => void;
  isSubmitting: boolean;
  existingResponse?: ExplanationFormValues | null;
  experimentGroup: "X" | "Y";
}

export function ExplanationForm({
  explanationsToList,
  onSubmitAttempt,
  onNext,
  isSubmitting,
  existingResponse,
  experimentGroup,
}: ExplanationFormProps) {
  const form = useForm<ExplanationFormValues>({
    resolver: zodResolver(explanationFormSchema),
    defaultValues: {
      rankedExplanations: existingResponse?.rankedExplanations || [],
      experimentGroup: existingResponse?.experimentGroup || experimentGroup,
    },
    mode: "onChange",
  });

  // Determine which options to show.
  // CRITICAL: If we have an existing response, we MUST use the explanations from there
  // to avoid the shuffling issue on refresh.
  const initialExplanations =
    existingResponse?.rankedExplanations &&
    existingResponse.rankedExplanations.length === 2
      ? existingResponse.rankedExplanations.map((e) => ({
          id: e.type,
          text: e.text,
        }))
      : explanationsToList;

  const optionA = initialExplanations[0];
  const optionB = initialExplanations[1];
  if (!optionA || !optionB) {
    return <div>Error: Missing explanation options</div>;
  }

  const rankedExplanations = form.watch("rankedExplanations") || [];
  const selectedType = rankedExplanations[0]?.type;
  const convictionA = rankedExplanations.find(
    (e) => e.type === optionA?.id,
  )?.conviction;
  const convictionB = rankedExplanations.find(
    (e) => e.type === optionB?.id,
  )?.conviction;

  const convictionToIndex = (level: string | undefined) => {
    if (!level) return null;
    return CONVICTION_LEVELS.indexOf(level as any);
  };
  const handleOptionSelect = (optionId: string) => {
    const selectedOption = optionId === optionA.id ? optionA : optionB;
    const otherOption = optionId === optionA.id ? optionB : optionA;

    // We preserve existing convictions if we're just flipping the rank
    const currentExplanations = form.getValues("rankedExplanations");
    const getConviction = (id: string) =>
      currentExplanations.find((e) => e.type === id)?.conviction;

    form.setValue(
      "rankedExplanations",
      [
        {
          type: selectedOption.id,
          text: selectedOption.text,
          conviction: getConviction(selectedOption.id) as any,
        },
        {
          type: otherOption.id,
          text: otherOption.text,
          conviction: getConviction(otherOption.id) as any,
        },
      ],
      {
        shouldValidate: true,
        shouldDirty: true,
      },
    );
  };

  const handleConvictionChange = (option: "A" | "B", value: number[]) => {
    const optionId = option === "A" ? optionA.id : optionB.id;
    const stringValue = CONVICTION_LEVELS[value[0]];

    const currentExplanations = form.getValues("rankedExplanations");
    // Ensure we have both options in the array if they weren't selected yet
    let newExplanations = [...currentExplanations];

    if (newExplanations.length < 2) {
      // If nothing selected yet, we put this one first?
      // Actually, if they haven't ranked, we should probably initialize it.
      // But the schema requires 2. Let's initialize if empty.
      if (newExplanations.length === 0) {
        newExplanations = [
          {
            type: optionA.id,
            text: optionA.text,
            conviction: undefined as any,
          },
          {
            type: optionB.id,
            text: optionB.text,
            conviction: undefined as any,
          },
        ];
      }
    }

    const index = newExplanations.findIndex((e) => e.type === optionId);

    if (index !== -1) {
      newExplanations[index].conviction = stringValue;
    }

    form.setValue("rankedExplanations", newExplanations as any, {
      shouldValidate: true,
      shouldDirty: true,
    });
  };

  function handleSubmit(values: ExplanationFormValues) {
    onSubmitAttempt(values);
  }

  const convictionLabels = [
    "Not convinced",
    "Slightly convinced",
    "Moderately convinced",
    "Very convinced",
  ];

  const isDisabled = existingResponse !== null || isSubmitting;

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
              name="rankedExplanations"
              render={() => (
                <FormItem className="space-y-6">
                  <div>
                    <FormLabel className="text-lg font-medium">
                      Which of these explanations do you think is more likely to
                      be true?
                    </FormLabel>
                    <p className="text-sm text-muted-foreground mt-1">
                      Select one option and rate your conviction for each
                      explanation.
                    </p>
                  </div>

                  {/* Radio Cards Row */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <RadioOptionCard
                      id={optionA.id}
                      label="Option A"
                      text={optionA.text}
                      selected={selectedType === optionA.id}
                      onSelect={() => handleOptionSelect(optionA.id)}
                      disabled={isDisabled}
                    />
                    <RadioOptionCard
                      id={optionB.id}
                      label="Option B"
                      text={optionB.text}
                      selected={selectedType === optionB.id}
                      onSelect={() => handleOptionSelect(optionB.id)}
                      disabled={isDisabled}
                    />
                  </div>

                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Conviction Sliders Row */}
            <div className="space-y-4">
              <FormLabel className="text-lg font-medium">
                How convinced are you of each explanation?
              </FormLabel>
              <p className="text-sm text-muted-foreground">
                Slide to rate your conviction level for each option.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-4">
                <FormField
                  control={form.control}
                  name="rankedExplanations" // This name is used for validation of the array, not individual convictions
                  render={() => (
                    <FormItem className="space-y-4">
                      <div className="flex flex-col items-center">
                        <FormLabel className="text-sm font-semibold mb-4">
                          Option A Conviction
                        </FormLabel>
                        <div className="flex items-center gap-6 w-full justify-center">
                          <Slider
                            value={[convictionToIndex(convictionA) ?? 0]}
                            onValueChange={(value: number[]) =>
                              handleConvictionChange("A", value)
                            }
                            min={0}
                            max={3}
                            step={1}
                            disabled={isDisabled}
                            className={cn(
                              "h-64 md:h-48 transition-all",
                              !convictionA &&
                                !isDisabled &&
                                "grayscale opacity-60",
                            )}
                            orientation="vertical"
                          />
                          <div className="flex flex-col justify-between h-64 md:h-48 text-xs text-muted-foreground py-2">
                            {[...convictionLabels]
                              .reverse()
                              .map((label, idx) => (
                                <button
                                  key={idx}
                                  type="button"
                                  onClick={() =>
                                    handleConvictionChange("A", [3 - idx])
                                  }
                                  disabled={isDisabled}
                                  className={cn(
                                    "text-right hover:text-primary transition-colors",
                                    !isDisabled && "cursor-pointer",
                                  )}
                                >
                                  {label}
                                </button>
                              ))}
                          </div>
                        </div>
                        {convictionA && (
                          <p className="text-sm font-medium mt-4 text-center">
                            {
                              convictionLabels[
                                convictionToIndex(convictionA) ?? 0
                              ]
                            }
                          </p>
                        )}
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="rankedExplanations" // This name is used for validation of the array, not individual convictions
                  render={() => (
                    <FormItem className="space-y-4">
                      <div className="flex flex-col items-center">
                        <FormLabel className="text-sm font-semibold mb-4">
                          Option B Conviction
                        </FormLabel>
                        <div className="flex items-center gap-6 w-full justify-center">
                          <Slider
                            value={[convictionToIndex(convictionB) ?? 0]}
                            onValueChange={(value: number[]) =>
                              handleConvictionChange("B", value)
                            }
                            min={0}
                            max={3}
                            step={1}
                            disabled={isDisabled}
                            className={cn(
                              "h-64 md:h-48 transition-all",
                              !convictionB &&
                                !isDisabled &&
                                "grayscale opacity-60",
                            )}
                            orientation="vertical"
                          />
                          <div className="flex flex-col justify-between h-64 md:h-48 text-xs text-muted-foreground py-2">
                            {[...convictionLabels]
                              .reverse()
                              .map((label, idx) => (
                                <button
                                  key={idx}
                                  type="button"
                                  onClick={() =>
                                    handleConvictionChange("B", [3 - idx])
                                  }
                                  disabled={isDisabled}
                                  className={cn(
                                    "text-right hover:text-primary transition-colors",
                                    !isDisabled && "cursor-pointer",
                                  )}
                                >
                                  {label}
                                </button>
                              ))}
                          </div>
                        </div>
                        {convictionB && (
                          <p className="text-sm font-medium mt-4 text-center">
                            {
                              convictionLabels[
                                convictionToIndex(convictionB) ?? 0
                              ]
                            }
                          </p>
                        )}
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {existingResponse ? (
              <Button
                type="button"
                onClick={onNext}
                size="lg"
                className="bg-accent text-accent-foreground hover:bg-accent/90"
              >
                Next Correlation <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            ) : (
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

interface RadioOptionCardProps {
  id: string;
  label: string;
  text: string;
  selected: boolean;
  onSelect: () => void;
  disabled?: boolean;
}

function RadioOptionCard({
  id,
  label,
  text,
  selected,
  onSelect,
  disabled,
}: RadioOptionCardProps) {
  return (
    <button
      type="button"
      onClick={onSelect}
      disabled={disabled}
      className={cn(
        "relative p-6 rounded-xl border-2 transition-all duration-200 text-left",
        "hover:shadow-md focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2",
        selected
          ? "border-primary bg-primary/5 shadow-sm"
          : "border-border bg-card hover:border-primary/50",
        disabled && "opacity-70 cursor-not-allowed hover:shadow-none",
      )}
    >
      <div className="flex items-start gap-4">
        <div className="shrink-0 mt-1">
          <div
            className={cn(
              "h-5 w-5 rounded-full border-2 flex items-center justify-center transition-colors",
              selected
                ? "border-primary bg-primary"
                : "border-muted-foreground/40 bg-background",
            )}
          >
            {selected && <div className="h-2 w-2 rounded-full bg-background" />}
          </div>
        </div>
        <div className="flex-1 min-w-0">
          <div className="font-semibold text-sm mb-2 text-foreground">
            {label}
          </div>
          <p className="text-sm leading-relaxed text-foreground/90">{text}</p>
        </div>
      </div>
    </button>
  );
}
