import { requireAdmin } from "@/lib/dal";
import Link from "next/link";
import { LogoutButton } from "@/components/logout-button";

export default async function AdminPage() {
  const admin = await requireAdmin();
  return (
    <main className="min-h-screen bg-[#f6f7f3]">
      <header className="border-b border-[#e5e9e2] bg-white/80">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8">
          <Link href="/" className="flex items-center gap-3" aria-label="Northstar home">
            <span className="grid size-9 place-items-center rounded-xl bg-[#176b4a] text-xs font-bold text-white">N.</span>
            <span className="font-semibold tracking-tight">northstar</span>
          </Link>
          <Link href="/dashboard" className="text-sm font-medium text-[#526159] transition hover:text-[#176b4a]">← Back to workspace</Link>
        </div>
      </header>
      <div className="mx-auto max-w-7xl px-5 py-10 sm:px-8 sm:py-14">
        <div className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-medium text-[#538367]">NORTHSTAR / ADMINISTRATION</p>
            <h1 className="mt-2 text-3xl font-semibold tracking-[-0.04em] sm:text-4xl">Admin workspace</h1>
            <p className="mt-2 text-[#748078]">A secure area for workspace administrators.</p>
          </div>
          <span className="inline-flex w-fit items-center gap-2 rounded-full border border-[#dce6dd] bg-white px-3.5 py-2 text-xs font-semibold text-[#37634b]">
            <span className="size-2 rounded-full bg-[#48a875]" /> ADMIN ACCESS
          </span>
        </div>
        <section className="overflow-hidden rounded-[1.75rem] border border-[#e5e9e2] bg-white shadow-sm">
          <div className="bg-[#176b4a] px-6 py-8 text-white sm:px-9 sm:py-10">
            <p className="text-sm text-white/70">Administrator signed in</p>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">Hello, {admin.name}.</h2>
            <p className="mt-2 max-w-xl text-sm leading-6 text-white/75">You have administrator access to this workspace. Manage this access carefully and keep your sign-in details private.</p>
          </div>
          <div className="grid gap-px bg-[#edf0eb] sm:grid-cols-2">
            <div className="bg-white p-6 sm:p-8">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#89948c]">Signed-in account</p>
              <p className="mt-3 break-all text-base font-semibold text-[#31443a]">{admin.email}</p>
              <p className="mt-1 text-sm text-[#89948c]">Verified for this session</p>
            </div>
            <div className="bg-white p-6 sm:p-8">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#89948c]">Access level</p>
              <p className="mt-3 text-base font-semibold capitalize text-[#31443a]">{admin.role}</p>
              <p className="mt-1 text-sm text-[#89948c]">Administrator permissions</p>
            </div>
          </div>
          <div className="flex flex-col gap-4 border-t border-[#edf0eb] px-6 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-8">
            <p className="text-sm text-[#748078]">Need to leave? End your session when using a shared device.</p>
            <LogoutButton />
          </div>
        </section>
      </div>
    </main>
  );
}
