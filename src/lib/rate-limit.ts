const rateLimitMap = new Map<string, { count: number; lastReset: number }>();

/**
 * Simple in-memory rate limiter.
 * @param key Unique key for rate limiting (e.g., session ID or IP).
 * @param limit Maximum number of requests allowed in the window.
 * @param windowMs Time window in milliseconds.
 * @returns boolean True if the request is allowed, false otherwise.
 */
export function rateLimit(
  key: string,
  limit: number,
  windowMs: number,
): boolean {
  const now = Date.now();
  const userData = rateLimitMap.get(key);

  if (!userData || now - userData.lastReset > windowMs) {
    rateLimitMap.set(key, { count: 1, lastReset: now });
    return true;
  }

  if (userData.count >= limit) {
    return false;
  }

  userData.count++;
  return true;
}

/**
 * Cleanup function to prevent memory leaks in long-running processes.
 * Can be called periodically if needed.
 */
export function cleanupRateLimitMap() {
  const now = Date.now();
  for (const [key, data] of rateLimitMap.entries()) {
    if (now - data.lastReset > 3600000) {
      // Cleanup entries older than 1 hour
      rateLimitMap.delete(key);
    }
  }
}
