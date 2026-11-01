import "./globals.css";

export const metadata = {
  title: {
    default: "Northstar — Workspace",
    template: "%s | Northstar",
  },
  description: "A calm, secure space to manage your account and workspace.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen">{children}</body>
    </html>
  );
}
