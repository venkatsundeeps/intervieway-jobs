import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "Intervieway",
  description: "Role-specific career services from working professionals.",
};

function Shell({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="bg-slate-50 antialiased">
        <header className="border-b border-slate-200 bg-white">
          <nav className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3 text-sm">
            <Link href="/" className="font-bold">Intervieway</Link>
            <div className="flex gap-4">
              <Link href="/roles">Roles</Link>
              <Link href="/resume-builder">Resume Builder</Link>
              <Link href="/admin">Admin</Link>
            </div>
          </nav>
        </header>
        {children}
      </body>
    </html>
  );
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const clerkKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;

  if (!clerkKey) {
    return <Shell>{children}</Shell>;
  }

  return (
    <ClerkProvider publishableKey={clerkKey}>
      <Shell>{children}</Shell>
    </ClerkProvider>
  );
}
