'use client';

import BackButton from '@/components/layout/BackButton';
import ScrollToTopButton from '@/components/layout/ScrollToTopButton';
import Sidebar from '@/components/layout/Sidebar';
import { SectionRenderer, useSectionRouter } from '@/components/logic/SectionRouter.client';
import { sections } from '@/lib/sectionMap';

export default function AppLayout() {
  const { active } = useSectionRouter();
  const activeTitle = sections[active]?.title ?? 'Übersicht';

  return (
    <div className="relative flex min-h-screen flex-col bg-muted/20">
      <a
        href="#main-content"
        className="absolute left-1/2 top-4 -translate-x-1/2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground opacity-0 focus-visible:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        Zum Inhalt springen
      </a>

      <header className="border-b border-border bg-background/70 backdrop-blur">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-1 px-4 py-5 sm:flex-row sm:items-baseline sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
              Mitarbeiterhandbuch
            </p>
            <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
              Thierhoff Consulting
            </h1>
          </div>
          <span className="text-sm text-muted-foreground">
            Ansicht: {activeTitle}
          </span>
        </div>
      </header>

      <div className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-6 px-4 py-6 lg:flex-row">
        <Sidebar />
        <main
          id="main-content"
          className="flex-1 overflow-hidden rounded-xl border border-border bg-background shadow-sm"
        >
          <div className="flex flex-col gap-4 p-6 sm:p-8">
            <BackButton />
            <SectionRenderer />
          </div>
        </main>
      </div>
      <ScrollToTopButton />
    </div>
  );
}
