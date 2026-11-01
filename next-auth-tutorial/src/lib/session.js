// src/lib/session.js
import "server-only";
import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";

export const SESSION_COOKIE = "session";
const SESSION_DURATION_MS = 7 * 24 * 60 * 60 * 1000; // 7 din

const secret = process.env.SESSION_SECRET;
if (!secret) throw new Error("SESSION_SECRET is missing from .env.local");
const key = new TextEncoder().encode(secret);

// 1. Payload ko sign karke JWT string banao
export async function signToken(payload) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(key);
}

// 2. JWT verify karo. Valid ho to payload, warna null (expired/tampered)
export async function verifyToken(token) {
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, key, { algorithms: ["HS256"] });
    return payload;
  } catch {
    return null;
  }
}

// 3. Signup/login ke baad cookie banao
export async function createSession(user) {
  const expiresAt = new Date(Date.now() + SESSION_DURATION_MS);
  const token = await signToken({ userId: user.id, role: user.role });
  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE, token, {
    httpOnly: true, // browser JS cookie nahi padh sakta
    secure: process.env.NODE_ENV === "production", // production mein sirf HTTPS
    sameSite: "lax", // basic CSRF protection
    path: "/",
    expires: expiresAt,
  });
}

// 4. Current session padho aur verify karo (DAL use karta hai)
export async function getSession() {
  const cookieStore = await cookies();
  return verifyToken(cookieStore.get(SESSION_COOKIE)?.value);
}

// 5. Logout
export async function deleteSession() {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE);
}
