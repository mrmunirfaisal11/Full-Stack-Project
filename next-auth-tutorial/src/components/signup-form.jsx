// src/components/signup-form.jsx
"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signupSchema } from "@/lib/schemas";
import { signup } from "@/actions/auth";
import { FormField } from "@/components/form-field";

export function SignupForm() {
  const [formMessage, setFormMessage] = useState(null);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(signupSchema),
    mode: "onTouched", // field chhorne ke baad validate
    defaultValues: { name: "", email: "", password: "", confirmPassword: "" },
  });

  async function onSubmit(data) {
    setFormMessage(null);
    const result = await signup(data);

    // Success par action redirect karta hai, result undefined hota hai
    if (result && !result.success) {
      for (const [field, messages] of Object.entries(result.fieldErrors ?? {})) {
        setError(field, { type: "server", message: messages[0] });
      }
      setFormMessage(result.message);
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
      <FormField name="name" label="Name" register={register} errors={errors} />
      <FormField name="email" label="Email" type="email" register={register} errors={errors} />
      <FormField name="password" label="Password" type="password" register={register} errors={errors} />
      <FormField name="confirmPassword" label="Confirm password" type="password" register={register} errors={errors} />

      {formMessage && (
        <p role="alert" className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{formMessage}</p>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="mt-1 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#176b4a] px-5 py-3.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#10583c] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#176b4a] disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isSubmitting ? "Creating account..." : "Create account"} <span aria-hidden="true">→</span>
      </button>
    </form>
  );
}
