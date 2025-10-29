'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import SectionRouter from '../logic/SectionRouter.client';
import ScrollToTopButton from './ScrollToTopButton';
import { Button } from '../ui/button';

interface AppLayoutProps {
  isAdmin?: boolean;
}

export default function AppLayout({ isAdmin = false }: AppLayoutProps) {
  const router = useRouter();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  async function handleLogout() {
    setIsLoggingOut(true);
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      router.refresh();
    } finally {
      setIsLoggingOut(false);
    }
  }

  return (
    <div className="relative flex min-h-screen flex-col bg-[#fdf2e7]">
      <a
        href="#main-content"
        className="absolute left-1/2 top-4 -translate-x-1/2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground opacity-0 focus-visible:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        Zum Inhalt springen
      </a>

      <header className="border-b border-border/60 bg-[#f8e8d6]/90 backdrop-blur">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-4 py-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-1">
            <p className="text-xs font-semibold uppercase tracking-[0.4em] text-muted-foreground">
              Mitarbeiterhandbuch
            </p>
            <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              Thierhoff Consulting
            </h1>
            <p className="text-sm text-muted-foreground">
              Richtlinien, Prozesse und Best Practices für das gesamte Team – jederzeit verfügbar.
            </p>
          </div>
          <div className="flex flex-col items-start gap-2 text-sm text-muted-foreground sm:items-end">
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
                  {isLoggingOut ? 'Wird abgemeldet ...' : 'Logout'}
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

      <main id="main-content" className="flex-1">
        <SectionRouter isAdmin={Boolean(isAdmin)} />
      </main>

      <ScrollToTopButton />
    </div>
  );
}
