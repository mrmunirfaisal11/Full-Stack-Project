import { getCurrentUser } from "@/lib/dal";
import { LogoutButton } from "@/components/logout-button";
import Link from "next/link";

export default async function DashboardPage() {
  const user = await getCurrentUser();

  return (
    <main className="min-h-screen bg-[#f6f7f3]">
      <header className="border-b border-[#e5e9e2] bg-white/80">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8">
          <Link href="/" className="flex items-center gap-3" aria-label="Northstar home">
            <span className="grid size-9 place-items-center rounded-xl bg-[#176b4a] text-xs font-bold text-white">N.</span>
            <span className="font-semibold tracking-tight">northstar</span>
          </Link>
          <div className="flex items-center gap-3">
            <span className="hidden text-sm text-[#748078] sm:inline">Your workspace</span>
            <span className="grid size-9 place-items-center rounded-full bg-[#e4eee5] text-sm font-semibold text-[#37634b]" aria-label={`Signed in as ${user.name}`}>
              {user.name.trim().charAt(0).toUpperCase()}
            </span>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-5 py-10 sm:px-8 sm:py-14">
        <div className="mb-8">
          <p className="text-sm font-medium text-[#538367]">YOUR OVERVIEW</p>
          <h1 className="mt-2 text-3xl font-semibold tracking-[-0.04em] sm:text-4xl">Welcome back, {user.name}.</h1>
          <p className="mt-2 text-[#748078]">Here’s your Northstar account at a glance.</p>
        </div>

        <section className="relative overflow-hidden rounded-[1.75rem] bg-[#176b4a] p-7 text-white shadow-[0_20px_50px_-25px_rgba(23,107,74,0.55)] sm:p-10">
          <div className="absolute -right-12 -top-24 size-72 rounded-full border border-white/10" aria-hidden="true" />
          <div className="absolute -right-1 -top-12 size-52 rounded-full border border-white/10" aria-hidden="true" />
          <div className="relative max-w-2xl">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-xs font-medium text-[#d7ebdd]">
              <span className="size-1.5 rounded-full bg-[#9fe0b5]" /> Account active
            </span>
            <h2 className="mt-5 text-3xl font-semibold tracking-[-0.04em] sm:text-4xl">Good to have you here.</h2>
            <p className="mt-3 max-w-lg text-sm leading-6 text-white/75 sm:text-base">Your workspace is ready. This is your personal home for account details and secure access.</p>
          </div>
          <div className="relative mt-8 flex flex-wrap items-center gap-3 border-t border-white/15 pt-5 text-sm">
            <span className="text-white/60">Signed in as</span>
            <span className="font-medium">{user.email}</span>
          </div>
        </section>

        <div className="mt-6 grid gap-5 lg:grid-cols-[1.2fr_0.8fr]">
          <section className="rounded-[1.5rem] border border-[#e5e9e2] bg-white p-6 sm:p-8">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-medium text-[#748078]">PROFILE</p>
                <h2 className="mt-1 text-xl font-semibold tracking-tight">Your account</h2>
              </div>
              <span className="grid size-11 place-items-center rounded-2xl bg-[#eaf3eb] text-lg text-[#287653]" aria-hidden="true">◎</span>
            </div>
            <dl className="mt-6 divide-y divide-[#edf0eb]">
              <div className="flex flex-col gap-1 py-4 sm:flex-row sm:items-center sm:justify-between">
                <dt className="text-sm text-[#89948c]">Full name</dt><dd className="text-sm font-medium text-[#31443a]">{user.name}</dd>
              </div>
              <div className="flex flex-col gap-1 py-4 sm:flex-row sm:items-center sm:justify-between">
                <dt className="text-sm text-[#89948c]">Email address</dt><dd className="break-all text-sm font-medium text-[#31443a]">{user.email}</dd>
              </div>
              <div className="flex flex-col gap-1 py-4 sm:flex-row sm:items-center sm:justify-between">
                <dt className="text-sm text-[#89948c]">Account role</dt><dd className="capitalize text-sm font-medium text-[#31443a]">{user.role}</dd>
              </div>
            </dl>
          </section>

          <section className="flex flex-col rounded-[1.5rem] border border-[#e5e9e2] bg-white p-6 sm:p-8">
            <span className="grid size-11 place-items-center rounded-2xl bg-[#f3efe4] text-lg text-[#9a7946]" aria-hidden="true">✦</span>
            <h2 className="mt-5 text-xl font-semibold tracking-tight">Your account, protected.</h2>
            <p className="mt-2 flex-1 text-sm leading-6 text-[#748078]">You’re signed in with a secure session. Remember to log out when you’re done on a shared device.</p>
            {user.role === "admin" && (
              <Link href="/admin" className="mt-6 inline-flex items-center justify-between rounded-xl border border-[#e5e9e2] px-4 py-3 text-sm font-semibold text-[#176b4a] transition hover:border-[#b8cdbd] hover:bg-[#f8faf7]">
                Open admin panel <span aria-hidden="true">→</span>
              </Link>
            )}
          </section>
        </div>

        <div className="mt-7 flex flex-col items-start justify-between gap-4 border-t border-[#e5e9e2] pt-6 sm:flex-row sm:items-center">
          <p className="text-sm text-[#89948c]">You’re all set. Have a focused day.</p>
          <LogoutButton />
        </div>
      </div>
    </main>
  );
}
