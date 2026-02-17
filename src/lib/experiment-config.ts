/**
 * Experiment Design Configuration
 *
 * "v1-group-based": Original design.
 *   - Users assigned to a group (forward OR backward) via sessionId hash
 *   - All explanations come from the same direction
 *   - 2 of 3 types shown per correlation (random, non-seeded)
 *
 * "v2-within-subject": New within-subject design.
 *   - No group assignment at user level
 *   - Per correlation: 2 of 3 types selected (seeded random)
 *   - One type shown from forward, one from backward (randomly assigned, seeded)
 *   - Selection is deterministic per session+correlation (page refresh safe)
 *
 * To revert to the old design, set EXPERIMENT_DESIGN=v1-group-based in your .env
 */
export type ExperimentDesign = "v1-group-based" | "v2-within-subject";

export const EXPERIMENT_DESIGN: ExperimentDesign =
  (process.env.EXPERIMENT_DESIGN as ExperimentDesign) || "v2-within-subject";
