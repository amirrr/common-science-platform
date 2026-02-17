/**
 * Simple seeded random number generator (LCG)
 * Used for session-stable randomization
 */
class SeededRandom {
  private state: number;
  constructor(seed: string) {
    // Basic string hashing to numeric seed
    let hash = 0;
    for (let i = 0; i < seed.length; i++) {
      hash = (hash << 5) - hash + seed.charCodeAt(i);
      hash |= 0;
    }
    this.state = Math.abs(hash);
  }

  next() {
    this.state = (this.state * 1664525 + 1013904223) % 4294967296;
    return this.state / 4294967296;
  }
}

/**
 * Shuffles an array using a seeded random number generator
 */
export function seededShuffle<T>(array: T[], seed: string): T[] {
  const rng = new SeededRandom(seed);
  const result = [...array];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(rng.next() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

export function getRandomizedCorrelations<T>(
  items: T[],
  seed: string,
  count = 15,
): T[] {
  const shuffled = seededShuffle(items, seed);
  return shuffled.slice(0, count);
}

/**
 * Deterministically assigns a group (X or Y) based on the sessionId.
 * This ensures stable assignment without race conditions in high-concurrency.
 */
export function assignGroup(sessionId: string): "forward" | "backward" {
  let hash = 0;
  for (let i = 0; i < sessionId.length; i++) {
    hash = (hash << 5) - hash + sessionId.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash) % 2 === 0 ? "forward" : "backward";
}
