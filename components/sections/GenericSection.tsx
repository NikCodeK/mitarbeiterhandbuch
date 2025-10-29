import Link from 'next/link';
import { ArrowLeft, LayoutList, Pencil, Plus } from 'lucide-react';
import MarkdownPreview from '@uiw/react-markdown-preview';
import '@uiw/react-markdown-preview/dist/markdown.css';

import type { Entry, Parent } from '../../lib/types';
import { cn } from '../../lib/utils';

type GenericSectionProps = {
  parents: Parent[];
  active: string;
  onNavigate: (slug: string) => void;
  entries: Entry[];
  isAdmin?: boolean;
};

export default function GenericSection({
  parents,
  active,
  onNavigate,
  entries,
  isAdmin = false,
}: GenericSectionProps) {
  const publishedParents = parents.filter((parent) => parent.published !== false);
  const firstParentSlug = publishedParents[0]?.slug;
  const activeParent =
    publishedParents.find((parent) => parent.slug === active) ??
    (firstParentSlug ? publishedParents[0] : undefined);

  const showEntries = entries.length > 0;

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 py-8 lg:flex-row lg:gap-10">
      <aside className="lg:w-72">
        <div className="sticky top-6 rounded-3xl border border-border/60 bg-white/70 p-5 shadow-sm backdrop-blur">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">
            <LayoutList className="h-3.5 w-3.5" aria-hidden />
            Inhaltsverzeichnis
          </div>
          <nav className="mt-5 space-y-2">
            {publishedParents.map((parent) => {
              const isActive = activeParent?.slug === parent.slug;
              return (
                <div key={parent.id} className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => onNavigate(parent.slug)}
                    className={cn(
                      'flex-1 rounded-2xl px-4 py-3 text-left text-sm font-medium transition-all',
                      isActive
                        ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/25'
                        : 'text-muted-foreground hover:bg-muted/60 hover:text-foreground',
                    )}
                  >
                    <span className="block truncate">{parent.title}</span>
                  </button>
                  {isAdmin && (
                    <Link
                      href={`/admin?editParent=${parent.id}`}
                      className="rounded-full border border-border/70 bg-white/80 p-2 text-muted-foreground transition-colors hover:bg-muted/70 hover:text-foreground"
                      aria-label={`${parent.title} bearbeiten`}
                      prefetch={false}
                    >
                      <Pencil className="h-4 w-4" />
                    </Link>
                  )}
                </div>
              );
            })}

            {publishedParents.length === 0 && (
              <p className="rounded-2xl bg-muted/60 px-4 py-3 text-sm text-muted-foreground">
                {parents.length === 0 ? 'Lade Kategorien …' : 'Noch keine Bereiche angelegt.'}
              </p>
            )}

            {isAdmin && (
              <Link
                href="/admin"
                className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-2xl border border-dashed border-primary/40 bg-primary/10 px-4 py-2 text-sm font-semibold text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
                prefetch={false}
              >
                <Plus className="h-4 w-4" />
                Neuen Bereich anlegen
              </Link>
            )}
          </nav>
        </div>
      </aside>

      <section className="flex-1 space-y-6">
        <div className="rounded-3xl border border-border/60 bg-white/80 p-6 shadow-sm backdrop-blur">
          <div className="flex flex-wrap items-center justify-between gap-4 text-sm text-muted-foreground">
            <button
              type="button"
              className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-muted/60 px-3 py-1.5 text-xs font-semibold uppercase tracking-widest text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              onClick={() => {
                if (activeParent?.slug && firstParentSlug && activeParent.slug !== firstParentSlug) {
                  onNavigate(firstParentSlug);
                } else {
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }
              }}
            >
              <ArrowLeft className="h-3.5 w-3.5" aria-hidden />
              Zurück
            </button>
            {activeParent && (
              <span className="rounded-full bg-muted/60 px-3 py-1 text-xs font-medium uppercase tracking-widest text-muted-foreground">
                Ansicht: {activeParent.title}
              </span>
            )}
          </div>

          <div className="mt-6 space-y-4">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">
              Mitarbeiterhandbuch · Thierhoff Consulting
            </p>
            <div className="flex items-center gap-3">
              <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                {activeParent?.title ?? 'Handbuch'}
              </h1>
              {isAdmin && activeParent && (
                <Link
                  href={`/admin?editParent=${activeParent.id}`}
                  className="rounded-full border border-border/70 bg-white/80 p-2 text-muted-foreground transition-colors hover:bg-muted/70 hover:text-foreground"
                  aria-label={`${activeParent.title} bearbeiten`}
                  prefetch={false}
                >
                  <Pencil className="h-4 w-4" />
                </Link>
              )}
            </div>

            <p className="max-w-2xl text-base text-muted-foreground">
              {showEntries
                ? 'Alle relevanten Leitlinien, Prozesse und Best Practices für diesen Bereich auf einen Blick.'
                : 'Für diesen Bereich wurden noch keine Inhalte veröffentlicht.'}
            </p>
          </div>
        </div>

        {entries.map((entry) => (
          <article
            key={entry.id}
            className="rounded-3xl border border-border/60 bg-white/90 p-6 shadow-sm backdrop-blur"
          >
            <div className="flex items-center gap-3">
              <h2 className="text-2xl font-semibold text-foreground">{entry.title}</h2>
              {isAdmin && activeParent && (
                <Link
                  href={`/admin?editEntry=${entry.id}&parentId=${activeParent.id}`}
                  className="rounded-full border border-border/70 bg-white/80 p-2 text-muted-foreground transition-colors hover:bg-muted/70 hover:text-foreground"
                  aria-label={`${entry.title} bearbeiten`}
                  prefetch={false}
                >
                  <Pencil className="h-4 w-4" />
                </Link>
              )}
            </div>
            <div className="prose prose-sm mt-6 max-w-none text-muted-foreground md:prose-base">
              <MarkdownPreview source={entry.content_md ?? ''} className="bg-transparent" />
            </div>
          </article>
        ))}

        {!showEntries && (
          <div className="rounded-3xl border border-dashed border-border/70 bg-muted/30 p-10 text-center text-sm text-muted-foreground">
            <p className="mb-4">Keine Inhalte vorhanden.</p>
            {isAdmin && activeParent ? (
              <Link
                href={`/admin?addEntry=1&parentId=${activeParent.id}`}
                className="inline-flex items-center gap-2 rounded-full border border-primary/50 bg-primary/10 px-4 py-2 text-sm font-semibold text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
                prefetch={false}
              >
                <Plus className="h-4 w-4" />
                Neuen Eintrag hinzufügen
              </Link>
            ) : (
              <p>Nutze den Admin-Bereich, um Beiträge zu erstellen oder zu veröffentlichen.</p>
            )}
          </div>
        )}
      </section>
    </div>
  );
}
