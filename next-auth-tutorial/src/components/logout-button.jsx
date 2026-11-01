// src/components/logout-button.jsx
import { logout } from "@/actions/auth";

export function LogoutButton() {
  return (
    <form action={logout}>
      <button type="submit" className="inline-flex items-center gap-2 rounded-xl border border-[#dfe5dd] bg-white px-4 py-2.5 text-sm font-semibold text-[#526159] transition hover:border-[#c5d5c9] hover:bg-[#f8faf7] hover:text-[#176b4a] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#176b4a]">
        Log out <span aria-hidden="true">↗</span>
      </button>
    </form>
  );
}
