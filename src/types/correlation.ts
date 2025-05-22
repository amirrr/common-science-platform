import type { z } from "zod";
import type { AnalyzeUserExplanationOutput } from "@/ai/flows/analyze-user-explanation";
// Import the Zod schema directly for ExplanationFormValues
import type { explanationFormSchema } from "@/components/correlation-analyzer/explanation-form";

export interface SeriesDataPoint {
  label: string; // e.g., Year, Month
  value1: number;
  value2: number;
}

export type PersuasionMode = "ethos" | "pathos" | "logos" | "other";

export interface ExplanationOption {
  id: string; // Unique ID for this specific explanation choice, e.g., "ice-cream-exp-1"
  text: string;
  persuasionMode: PersuasionMode;
  isCorrect?: boolean; // Optional: to mark the scientifically accepted explanation
}

export interface CorrelationData {
  id: string;
  title: string;
  description: string;
  series1Name: string;
  series2Name: string;
  data: SeriesDataPoint[];
  suggestedExplanations: ExplanationOption[];
  imagePlaceholder?: {
    url: string;
    alt: string;
    aiHint: string;
  };
}

export type AnalysisResultData = AnalyzeUserExplanationOutput;

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
  age: number | null;
  country: string;
  occupation: string;
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
  | "demographicsData";

export interface CorrelationResponsePayload {
  correlationId: string;
  formData: ExplanationFormValues;
}

export interface ProgressiveSavePayload {
  userId: string;
  dataType: ProgressiveSaveDataType;
  data: CorrelationResponsePayload | CRTData | DemographicsData;
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
