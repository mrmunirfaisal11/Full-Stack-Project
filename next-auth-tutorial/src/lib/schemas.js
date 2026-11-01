// src/lib/schemas.js  (client aur server dono yahin se import karte hain)
import { z } from "zod";

// Pehle string saaf karo (trim + lowercase), PHIR email check karo.
// .pipe() isi order ko guarantee karta hai.
const emailField = z
  .string()
  .trim()
  .toLowerCase()
  .pipe(z.email({ error: "Enter a valid email address" }));

export const loginSchema = z.object({
  email: emailField,
  password: z.string().min(1, { error: "Password is required" }),
});

export const signupSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(2, { error: "Name must be at least 2 characters" })
      .max(50, { error: "Name must be 50 characters or fewer" }),
    email: emailField,
    password: z
      .string()
      .min(8, { error: "At least 8 characters" })
      .regex(/[a-z]/, { error: "Include a lowercase letter" })
      .regex(/[A-Z]/, { error: "Include an uppercase letter" })
      .regex(/[0-9]/, { error: "Include a number" }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    error: "Passwords do not match",
    path: ["confirmPassword"], // error is field ke neeche dikhega
  });
