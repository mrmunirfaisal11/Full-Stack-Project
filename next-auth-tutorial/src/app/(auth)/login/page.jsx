import Link from "next/link";
import { LoginForm } from "@/components/login-form";

export default async function LoginPage({ searchParams }) {
  const { callbackUrl } = await searchParams; // Next.js 15+ mein Promise hai
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden px-5 py-12">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-[#e5efe5] via-[#f6f7f3] to-[#f6f7f3]" aria-hidden="true" />
      <div className="relative w-full max-w-md">
        <Link href="/" className="mb-8 inline-flex items-center gap-3" aria-label="Northstar home">
          <span className="grid size-10 place-items-center rounded-xl bg-[#176b4a] text-sm font-bold text-white shadow-sm">N.</span>
          <span className="text-lg font-semibold tracking-tight">northstar</span>
        </Link>
        <section className="rounded-[1.75rem] border border-white bg-white/90 p-7 shadow-[0_24px_70px_-35px_rgba(31,65,46,0.3)] backdrop-blur sm:p-9">
          <div className="mb-7">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#538367]">Welcome back</p>
            <h1 className="mt-2 text-3xl font-semibold tracking-[-0.04em] text-[#17211d]">Log in to your account</h1>
            <p className="mt-2 text-sm leading-6 text-[#748078]">Pick up right where you left off.</p>
          </div>
          <LoginForm callbackUrl={callbackUrl} />
          <p className="mt-7 border-t border-[#edf0eb] pt-6 text-center text-sm text-[#748078]">
            New to Northstar? <Link href="/signup" className="font-semibold text-[#176b4a] transition hover:text-[#10583c]">Create an account</Link>
          </p>
        </section>
        <p className="mt-6 text-center text-xs text-[#89948c]">A more thoughtful place for your work.</p>
      </div>
    </main>
  );
}
