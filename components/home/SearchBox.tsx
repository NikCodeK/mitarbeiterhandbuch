'use client';

import { ArrowUpRight, Search } from 'lucide-react';
import { useMemo, useState } from 'react';

import { searchItems } from '@/lib/data';
import { sections } from '@/lib/sectionMap';
import type { SectionSlug } from '@/lib/types';

import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';

type SearchBoxProps = {
  onSelect: (slug: SectionSlug) => void;
  variant?: 'default' | 'compact';
};

export default function SearchBox({ onSelect, variant = 'default' }: SearchBoxProps) {
  const [query, setQuery] = useState('');

  const sanitizedQuery = query.trim().toLowerCase();

  const results = useMemo(() => {
    if (sanitizedQuery.length < 2) {
      return [];
    }
    return searchItems.filter((item) =>
      item.keywords.some((keyword) => keyword.includes(sanitizedQuery)),
    );
  }, [sanitizedQuery]);

  const inputPlaceholder =
    variant === 'compact'
      ? 'Schnell suchen …'
      : 'Beispiel: Urlaub, Google Kalender, Airtable';

  return (
    <div className="space-y-3">
      <label className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
        <Search className="h-3.5 w-3.5" aria-hidden />
        Stichwortsuche
      </label>
      <Input
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder={inputPlaceholder}
        aria-label="Im Handbuch suchen"
        className={variant === 'compact' ? 'h-9 text-sm' : ''}
      />
      <div className="space-y-2">
        {sanitizedQuery.length > 0 && results.length === 0 && (
          <p className="rounded-md border border-dashed border-border bg-muted/40 p-3 text-sm text-muted-foreground">
            Keine Treffer gefunden. Probiere ein anderes Stichwort oder einen allgemeineren Begriff.
          </p>
        )}
        {results.slice(0, 6).map((item) => (
          <button
            key={item.slug}
            type="button"
            onClick={() => {
              onSelect(item.slug);
              setQuery('');
            }}
            className="flex w-full items-center justify-between rounded-md border border-border bg-card px-3 py-2 text-left text-sm transition-colors hover:border-primary hover:text-primary"
          >
            <span className="flex flex-col">
              <span className="font-medium">{item.title}</span>
              {item.parent && (
                <Badge variant="outline" className="mt-1 w-fit text-[10px] uppercase tracking-wide">
                  {sections[item.parent]?.title ?? item.parent}
                </Badge>
              )}
            </span>
            <ArrowUpRight className="h-4 w-4" aria-hidden />
          </button>
        ))}
      </div>
    </div>
  );
}
