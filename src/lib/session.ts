import { cookies } from "next/headers";

const SESSION_COOKIE_NAME = "study_session_id";

/**
 * Gets the current session ID from the HttpOnly cookie.
 * If no session exists, it generates a new one and sets the cookie.
 * This should be called in Server Actions or Route Handlers.
 */
export async function getSessionId(): Promise<string> {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get(SESSION_COOKIE_NAME);

  if (sessionCookie?.value) {
    return sessionCookie.value;
  }

  // Generate a new unique session ID
  const sessionId = crypto.randomUUID();

  // Set the cookie (HttpOnly, Secure, SameSite=Strict)
  cookieStore.set(SESSION_COOKIE_NAME, sessionId, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 1 week
  });

  return sessionId;
}

/**
 * Clears the session cookie.
 */
export async function clearSession() {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE_NAME);
}
