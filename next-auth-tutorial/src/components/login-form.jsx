// src/components/login-form.jsx
"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "@/lib/schemas";
import { login } from "@/actions/auth";
import { FormField } from "@/components/form-field";

export function LoginForm({ callbackUrl }) {
  const [formMessage, setFormMessage] = useState(null);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  async function onSubmit(data) {
    setFormMessage(null);
    const result = await login(data, callbackUrl);

    if (result && !result.success) {
      for (const [field, messages] of Object.entries(result.fieldErrors ?? {})) {
        setError(field, { type: "server", message: messages[0] });
      }
      setFormMessage(result.message);
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
      <FormField name="email" label="Email" type="email" register={register} errors={errors} />
      <FormField name="password" label="Password" type="password" register={register} errors={errors} />

      {formMessage && (
        <p role="alert" className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{formMessage}</p>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="mt-1 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#176b4a] px-5 py-3.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#10583c] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#176b4a] disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isSubmitting ? "Signing in..." : "Log in securely"} <span aria-hidden="true">→</span>
      </button>
    </form>
  );
}
