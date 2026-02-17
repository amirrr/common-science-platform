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
        // v2: each explanation carries its own direction
        direction: z.enum(["forward", "backward"]).optional(),
        text: z.string().max(500),
        conviction: convictionLevelSchema,
      }),
    )
    .length(2, {
      message: "Please select an explanation.",
    }),
  // v1: single group for all explanations; v2: omitted (direction is per-explanation)
  experimentGroup: z.enum(["forward", "backward"]).optional(),
  // Which design produced this response
  designVersion: z.string().optional(),
});

export interface SeriesDataPoint {
  label: string;
  value1: number;
  value2: number;
}

export interface ExplanationOption {
  id: string;
  text: string;
  /** v2: which direction (forward/backward) this explanation was drawn from */
  direction?: "forward" | "backward";
}

export interface CorrelationData {
  id: string;
  title: string;
  description: string;
  series1Name: string;
  series2Name: string;
  data: SeriesDataPoint[];
  suggestedExplanations: ExplanationOption[];
  /** v1: the group this user was assigned to */
  experimentGroup?: "forward" | "backward";
  /** Which experiment design version produced this data */
  designVersion?: string;
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

export type ExplanationFormValues = z.infer<typeof explanationFormSchema>;

export interface UserCorrelationResponse {
  correlationId: string;
  formData: ExplanationFormValues;
  analysis?: AnalysisResultData | null;
}

export interface DemographicsData {
  birthYear: number;
  gender: string;
  genderOther?: string;
  employmentStatus: string;
  employmentIndustry?: string;
  jobTitle?: string;
  country: string;
}

export interface CRTData {
  crtAnswer1: string;
  crtAnswer2: string;
  crtAnswer3: string;
}

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
  userId?: string;
  dataType: ProgressiveSaveDataType;
  data:
    | CorrelationResponsePayload
    | CRTData
    | DemographicsData
    | FeedbackPayload;
}

// Storage Keys
export const USER_ID_STORAGE_KEY = "correlation_analyzer_user_id";
export const RESPONSES_STORAGE_KEY = "correlation_analyzer_responses";
export const DEMOGRAPHICS_STORAGE_KEY = "correlation_analyzer_demographics";
export const CRT_RESPONSES_STORAGE_KEY = "correlation_analyzer_crt_responses";
export const LAST_CHOSEN_MODE_KEY = "correlation_analyzer_last_mode";
export const COOKIE_CONSENT_KEY = "correlation_analyzer_cookie_consent";

export const REQUIRED_CORRELATIONS = 10;
export const REQUIRED_CRT = true;
export const REQUIRED_DEMOGRAPHICS = true;

export const PROLIFIC_COMPLETION_CODE = "C1ODYYUA";
export const PROLIFIC_BASE_URL =
  "https://app.prolific.com/submissions/complete?cc=";

export const NUM_POST_CORRELATION_PAGES_WITH_PROGRESS = 2;
