import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#f6f7f3]">
      <header className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6 sm:px-10 lg:px-12">
        <Link href="/" className="flex items-center gap-3" aria-label="Northstar home">
          <span className="grid size-10 place-items-center rounded-xl bg-[#176b4a] text-sm font-bold tracking-tight text-white shadow-sm">N.</span>
          <span className="text-lg font-semibold tracking-tight">northstar</span>
        </Link>
        <nav aria-label="Main navigation" className="flex items-center gap-3 sm:gap-7">
          <Link href="/login" className="text-sm font-medium text-[#526159] transition hover:text-[#176b4a]">Log in</Link>
          <Link href="/signup" className="rounded-full bg-[#176b4a] px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#10583c] sm:px-5">Get started <span aria-hidden="true">→</span></Link>
        </nav>
      </header>

      <section className="mx-auto grid max-w-7xl items-center gap-14 px-6 pb-20 pt-12 sm:px-10 sm:pt-20 lg:grid-cols-[1.05fr_0.95fr] lg:px-12 lg:pb-28 lg:pt-24">
        <div className="max-w-2xl">
          <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-[#dce6dd] bg-white/70 px-3.5 py-2 text-xs font-semibold tracking-wide text-[#37634b] shadow-sm">
            <span className="size-2 rounded-full bg-[#48a875]" />
            A BETTER HOME FOR YOUR WORK
          </div>
          <h1 className="text-5xl font-semibold leading-[1.08] tracking-[-0.055em] text-[#17211d] sm:text-6xl lg:text-7xl">
            Make room for <span className="text-[#287653]">your best work.</span>
          </h1>
          <p className="mt-7 max-w-xl text-base leading-7 text-[#68746d] sm:text-lg sm:leading-8">
            A thoughtful, secure workspace that keeps your account and the things that matter right where they belong.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Link href="/signup" className="inline-flex items-center justify-center gap-3 rounded-full bg-[#176b4a] px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-[#176b4a]/15 transition hover:-translate-y-0.5 hover:bg-[#10583c]">
              Create your account <span aria-hidden="true">↗</span>
            </Link>
            <Link href="/login" className="inline-flex items-center justify-center rounded-full border border-[#dce3dd] bg-white px-6 py-3.5 text-sm font-semibold text-[#31443a] transition hover:border-[#9db9a6] hover:bg-[#fbfcfa]">
              I already have an account
            </Link>
          </div>
          <div className="mt-10 flex items-center gap-3 text-sm text-[#68746d]">
            <span className="flex -space-x-2" aria-hidden="true">
              <span className="grid size-8 place-items-center rounded-full border-2 border-[#f6f7f3] bg-[#dce9df] text-[10px] font-bold text-[#3d684e]">01</span>
              <span className="grid size-8 place-items-center rounded-full border-2 border-[#f6f7f3] bg-[#eee5d8] text-[10px] font-bold text-[#85643c]">02</span>
              <span className="grid size-8 place-items-center rounded-full border-2 border-[#f6f7f3] bg-[#e5e0ef] text-[10px] font-bold text-[#62537d]">03</span>
            </span>
            <span>Simple by design. Secure by default.</span>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-xl">
          <div className="absolute -right-10 -top-10 size-40 rounded-full bg-[#dcecdf] blur-3xl" aria-hidden="true" />
          <div className="absolute -bottom-12 -left-10 size-44 rounded-full bg-[#e8ead5] blur-3xl" aria-hidden="true" />
          <div className="relative rounded-[2rem] border border-white bg-white/80 p-3 shadow-[0_30px_90px_-40px_rgba(27,62,43,0.28)] backdrop-blur">
            <div className="rounded-[1.5rem] bg-[#f4f7f2] p-5 sm:p-7">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#89958c]">Your workspace</p>
                  <p className="mt-1 text-lg font-semibold tracking-tight">A little more focus.</p>
                </div>
                <span className="grid size-10 place-items-center rounded-full bg-white text-[#287653] shadow-sm" aria-hidden="true">✳</span>
              </div>
              <div className="mt-7 rounded-2xl bg-[#176b4a] p-6 text-white sm:p-7">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-white/70">Good things take focus</p>
                    <p className="mt-2 text-2xl font-semibold tracking-tight">Start with what matters.</p>
                  </div>
                  <span className="text-2xl text-[#b8dfc7]" aria-hidden="true">↗</span>
                </div>
                <div className="mt-9 flex items-end justify-between border-t border-white/15 pt-4">
                  <span className="text-xs text-white/70">A calmer way to work</span>
                  <span className="text-xs font-medium text-[#d9f0e0]">NORTHSTAR / 01</span>
                </div>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-3">
                <div className="rounded-2xl border border-[#e5ebe3] bg-white p-4">
                  <span className="grid size-9 place-items-center rounded-xl bg-[#eaf3eb] text-[#287653]" aria-hidden="true">✓</span>
                  <p className="mt-4 text-sm font-semibold">Your space, protected</p>
                  <p className="mt-1 text-xs leading-5 text-[#849087]">Private access, just for you.</p>
                </div>
                <div className="rounded-2xl border border-[#e5ebe3] bg-white p-4">
                  <span className="grid size-9 place-items-center rounded-xl bg-[#f3efe4] text-[#9a7946]" aria-hidden="true">✦</span>
                  <p className="mt-4 text-sm font-semibold">Everything in its place</p>
                  <p className="mt-1 text-xs leading-5 text-[#849087]">A clear view of your account.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="mx-auto flex max-w-7xl flex-col gap-3 border-t border-[#e5e9e2] px-6 py-6 text-xs text-[#879188] sm:flex-row sm:items-center sm:justify-between sm:px-10 lg:px-12">
        <span>© {new Date().getFullYear()} Northstar workspace</span>
        <span>Designed for a little more clarity.</span>
      </footer>
    </main>
  );
}
