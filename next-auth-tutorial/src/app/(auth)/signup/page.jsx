import Link from "next/link";
import { SignupForm } from "@/components/signup-form";

export default function SignupPage() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden px-5 py-12">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-[#e5efe5] via-[#f6f7f3] to-[#f6f7f3]" aria-hidden="true" />
      <div className="relative w-full max-w-md">
        <Link href="/" className="mb-8 inline-flex items-center gap-3" aria-label="Northstar home">
          <span className="grid size-10 place-items-center rounded-xl bg-[#176b4a] text-sm font-bold text-white shadow-sm">N.</span>
          <span className="text-lg font-semibold tracking-tight">northstar</span>
        </Link>
        <section className="rounded-[1.75rem] border border-white bg-white/90 p-7 shadow-[0_24px_70px_-35px_rgba(31,65,46,0.3)] backdrop-blur sm:p-9">
          <div className="mb-7">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#538367]">Get started</p>
            <h1 className="mt-2 text-3xl font-semibold tracking-[-0.04em] text-[#17211d]">Create your account</h1>
            <p className="mt-2 text-sm leading-6 text-[#748078]">A calmer workspace is just a few details away.</p>
          </div>
          <SignupForm />
          <p className="mt-7 border-t border-[#edf0eb] pt-6 text-center text-sm text-[#748078]">
            Already have an account? <Link href="/login" className="font-semibold text-[#176b4a] transition hover:text-[#10583c]">Log in</Link>
          </p>
        </section>
        <p className="mt-6 text-center text-xs text-[#89948c]">Your information stays yours.</p>
      </div>
    </main>
  );
}
