"use client";

import { usePathname } from "next/navigation";
import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/admin");

  if (isAdmin) {
    return <main className="relative z-10">{children}</main>;
  }

  return (
    <>
      <Navbar />
      <main className="relative z-10">{children}</main>
      <Footer />
    </>
  );
}
