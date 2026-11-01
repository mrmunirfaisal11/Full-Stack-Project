// src/actions/auth.js
"use server";

import { z } from "zod";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { signupSchema, loginSchema } from "@/lib/schemas";
import {
  createUser,
  findUserByEmail,
  verifyPassword,
  DUMMY_HASH,
} from "@/lib/db";
import { createSession, deleteSession } from "@/lib/session";
import { rateLimit } from "@/lib/rate-limit";

function validationError(error) {
  return {
    success: false,
    message: "Please fix the errors below.",
    fieldErrors: z.flattenError(error).fieldErrors,
  };
}

// Sirf apni site ke paths allow (open redirect attack se bachata hai)
function safeRedirectPath(path) {
  if (typeof path === "string" && path.startsWith("/") && !path.startsWith("//")) {
    return path;
  }
  return "/dashboard";
}

export async function signup(input) {
  // Input pe kabhi bharosa nahi: yeh form se aaya ho zaroori nahi
  const parsed = signupSchema.safeParse(input);
  if (!parsed.success) return validationError(parsed.error);

  const { name, email, password } = parsed.data;

  // Async check: kya email pehle se registered hai?
  if (await findUserByEmail(email)) {
    return {
      success: false,
      message: "Please fix the errors below.",
      fieldErrors: { email: ["An account with this email already exists"] },
    };
  }

  const user = await createUser({ name, email, password });
  await createSession(user);
  redirect("/dashboard"); // redirect() jaan boojh kar throw karta hai
}

export async function login(input, callbackUrl) {
  const parsed = loginSchema.safeParse(input);
  if (!parsed.success) return validationError(parsed.error);

  const { email, password } = parsed.data;

  // Rate limit: email + IP par 15 minute mein 5 attempts
  const ip =
    (await headers()).get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  const limit = rateLimit(`login:${email}:${ip}`);
  if (!limit.ok) {
    return {
      success: false,
      message: `Too many attempts. Try again in ${limit.retryInMinutes} minutes.`,
    };
  }

  const user = await findUserByEmail(email);

  // Timing-safe: user na ho tab bhi bcrypt chalta hai
  const passwordOk =
    (await verifyPassword(password, user?.passwordHash ?? DUMMY_HASH)) &&
    user !== null;

  if (!passwordOk) {
    // "user nahi mila" aur "password ghalat" ka same message
    return { success: false, message: "Invalid email or password." };
  }

  await createSession(user);
  redirect(safeRedirectPath(callbackUrl));
}

export async function logout() {
  await deleteSession();
  redirect("/login");
}
