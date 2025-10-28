"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

import BackButton from "@/components/layout/BackButton";
import ScrollToTopButton from "@/components/layout/ScrollToTopButton";
import Sidebar from "@/components/layout/Sidebar";
import { Button } from "@/components/ui/button";
import {
  SectionRenderer,
  useSectionRouter,
} from "@/components/logic/SectionRouter.client";
import { sections } from "@/lib/sectionMap";

interface AppLayoutProps {
  isAdmin?: boolean;
}

export default function AppLayout({ isAdmin = false }: AppLayoutProps) {
  const { active } = useSectionRouter();
  const router = useRouter();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const activeTitle = sections[active]?.title ?? "Übersicht";

  async function handleLogout() {
    setIsLoggingOut(true);
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      router.refresh();
    } finally {
      setIsLoggingOut(false);
    }
  }

  return (
    <div className="relative flex min-h-screen flex-col bg-muted/20">
      <a
        href="#main-content"
        className="absolute left-1/2 top-4 -translate-x-1/2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground opacity-0 focus-visible:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        Zum Inhalt springen
      </a>

      <header className="border-b border-border bg-background/70 backdrop-blur">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-3 px-4 py-5 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
              Mitarbeiterhandbuch
            </p>
            <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
              Thierhoff Consulting
            </h1>
          </div>
          <div className="flex flex-col items-start gap-2 text-sm text-muted-foreground sm:items-end">
            <span>Ansicht: {activeTitle}</span>
            {isAdmin ? (
              <div className="flex flex-wrap items-center gap-2 text-xs">
                <span className="rounded-full bg-emerald-100 px-2 py-1 font-medium text-emerald-700">
                  Bearbeitungsmodus aktiv
                </span>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={handleLogout}
                  disabled={isLoggingOut}
                >
                  {isLoggingOut ? "Wird abgemeldet ..." : "Logout"}
                </Button>
              </div>
            ) : (
              <Button size="sm" variant="outline" asChild>
                <Link href="/admin/login">Admin Login</Link>
              </Button>
            )}
          </div>
        </div>
      </header>

      <div className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-6 px-4 py-6 lg:flex-row">
        <Sidebar />
        <main
          id="main-content"
          className="flex-1 overflow-hidden rounded-xl border border-border bg-background shadow-sm"
        >
          <div className="flex flex-col gap-4 p-6 sm:p-8">
            {isAdmin && (
              <div className="rounded-lg border border-dashed border-emerald-300 bg-emerald-50 p-4 text-sm text-emerald-800">
                <p className="font-medium">Bearbeitungsoberfläche (Preview)</p>
                <p className="mt-1 text-emerald-900/80">
                  Du bist angemeldet. Hier entsteht der Editor für Inhalte und zukünftige Integrationen (z. B. Airtable & Rollen). Aktuell ist dies nur ein Platzhalter.
                </p>
              </div>
            )}
            <BackButton />
            <SectionRenderer isAdmin={isAdmin} />
          </div>
        </main>
      </div>
      <ScrollToTopButton />
    </div>
  );
}
