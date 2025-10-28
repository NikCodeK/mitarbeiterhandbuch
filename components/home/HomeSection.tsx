'use client';

import SearchBox from '@/components/home/SearchBox';
import HomeTocGrid from '@/components/home/HomeTocGrid';
import type { SectionComponentProps } from '@/components/sections/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

export default function HomeSection({ goTo }: SectionComponentProps) {
  return (
    <section
      id="home"
      className="space-y-10"
      style={{ maxWidth: '1180px', marginInline: 'auto', paddingInline: '1.5rem' }}
    >
      <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
        <header className="max-w-2xl space-y-3">
          <p className="text-sm font-semibold uppercase tracking-wide text-primary">Handbuch</p>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Willkommen im Mitarbeiterhandbuch
          </h2>
          <p className="text-base leading-relaxed text-muted-foreground sm:text-lg">
            Dein schneller Zugang zu Richtlinien, Tools und Abläufen – alles auf einen Blick.
          </p>
        </header>
        <Card className="w-full max-w-sm shadow-sm">
          <CardContent className="p-4 sm:p-5">
            <SearchBox onSelect={goTo} variant="compact" />
          </CardContent>
        </Card>
      </div>

      <Card className="shadow-sm">
        <CardHeader className="gap-2 pb-2 sm:pb-3">
          <CardTitle className="text-lg font-semibold sm:text-xl">Schnellnavigation</CardTitle>
          <CardDescription className="text-sm text-muted-foreground">
            Wähle einen Bereich, um direkt zur passenden Sektion zu springen.
          </CardDescription>
        </CardHeader>
        <CardContent className="pb-6">
          <HomeTocGrid onSelect={goTo} />
        </CardContent>
      </Card>

      <article className="space-y-4 rounded-xl border border-dashed border-primary/20 bg-primary/5 p-5 text-sm leading-relaxed text-muted-foreground md:flex md:items-center md:justify-between md:gap-6 md:text-base">
        <div className="space-y-2">
          <p className={cn('font-medium text-primary')}>Bleib auf dem Laufenden</p>
          <p>
            Das Handbuch wächst ständig weiter. Fehlende Infos oder Ideen? Sag dem Team Bescheid –
            so bleibt alles aktuell und hilfreich.
          </p>
        </div>
        <p className="md:max-w-sm">
          Tipp: Als Bookmark speichern oder als App zum Homescreen hinzufügen – so hast du alle
          Inhalte immer parat.
        </p>
      </article>
    </section>
  );
}
