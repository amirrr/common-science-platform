import { z } from "zod";

export const CONVICTION_LEVELS = [
  "not-convinced",
  "slightly-convinced",
  "moderately-convinced",
  "very-convinced",
] as const;

export const convictionLevelSchema = z
  .enum(CONVICTION_LEVELS)
  .or(z.undefined())
  .refine((val) => val !== undefined, {
    message: "Please rate your conviction.",
  });

export const explanationFormSchema = z.object({
  rankedExplanations: z
    .array(
      z.object({
        type: z.string(),
        text: z.string().max(500),
        conviction: convictionLevelSchema,
      }),
    )
    .length(2, {
      message: "Please select an explanation.",
    }),
  experimentGroup: z.enum(["X", "Y"]),
});

export interface SeriesDataPoint {
  label: string; // e.g., Year, Month
  value1: number;
  value2: number;
}

export interface ExplanationOption {
  id: string;
  text: string;
}

export interface CorrelationData {
  id: string;
  title: string;
  description: string;
  series1Name: string;
  series2Name: string;
  data: SeriesDataPoint[];
  suggestedExplanations: ExplanationOption[];
  experimentGroup?: "X" | "Y";
  imagePlaceholder?: {
    url: string;
    alt: string;
    aiHint: string;
  };
}

export type AnalysisResultData = {
  keyMisconceptions: string[];
  sentiment: string;
  explanationQuality: string;
};

// Type for the data submitted from the explanation form, derived from Zod schema
export type ExplanationFormValues = z.infer<typeof explanationFormSchema>;

// Type for storing user responses with correlation ID for local storage and AI processing
export interface UserCorrelationResponse {
  correlationId: string;
  formData: ExplanationFormValues;
  analysis?: AnalysisResultData | null;
}

// Type for demographic data
export interface DemographicsData {
  birthYear: number;
  gender: string;
  genderOther?: string;
  employmentStatus: string;
  employmentIndustry?: string;
  jobTitle?: string;
  country: string;
}

// Type for CRT data
export interface CRTData {
  crtAnswer1: string;
  crtAnswer2: string;
  crtAnswer3: string;
}

// Types for progressive save API payload

export type ProgressiveSaveDataType =
  | "correlationResponse"
  | "crtData"
  | "demographicsData"
  | "feedback";

export interface CorrelationResponsePayload {
  correlationId: string;
  formData: ExplanationFormValues;
}


export interface FeedbackPayload {
  message: string;
}

export interface ProgressiveSavePayload {
  userId?: string; // Optional: handled by session cookie on server
  dataType: ProgressiveSaveDataType;
  data: CorrelationResponsePayload | CRTData | DemographicsData | FeedbackPayload;
}

// Storage Keys
export const USER_ID_STORAGE_KEY = "correlation_analyzer_user_id";
export const RESPONSES_STORAGE_KEY = "correlation_analyzer_responses";
export const DEMOGRAPHICS_STORAGE_KEY = "correlation_analyzer_demographics";
export const CRT_RESPONSES_STORAGE_KEY = "correlation_analyzer_crt_responses";
export const LAST_CHOSEN_MODE_KEY = "correlation_analyzer_last_mode";
export const COOKIE_CONSENT_KEY = "correlation_analyzer_cookie_consent";

// Study flow constants
export const NUM_POST_CORRELATION_PAGES_WITH_PROGRESS = 2; // CRT Test, Demographics
