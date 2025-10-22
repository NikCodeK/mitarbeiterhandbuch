'use client';

import { ArrowRight } from 'lucide-react';

import { navigationGroups } from '@/lib/data';
import { sections } from '@/lib/sectionMap';
import type { SectionSlug } from '@/lib/types';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

type HomeTocGridProps = {
  onSelect: (slug: SectionSlug) => void;
};

export default function HomeTocGrid({ onSelect }: HomeTocGridProps) {
  return (
    <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
      {navigationGroups.map((group) => {
        const hasChildren = group.children.length > 0;
        const childBadges = group.children.slice(0, 4);

        return (
          <button
            key={group.slug}
            type="button"
            onClick={() => onSelect(group.slug)}
            className="group block h-full w-full text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2"
          >
            <Card className="grid h-full grid-rows-[auto_1fr_auto] transition hover:border-primary">
              <CardHeader className="space-y-2 p-4 pb-3">
                <CardTitle className="flex items-center gap-2 text-base font-semibold">
                  {group.title}
                  {hasChildren && (
                    <Badge variant="secondary" className="text-[10px] uppercase">
                      {group.children.length} Themen
                    </Badge>
                  )}
                </CardTitle>
                {group.description && (
                  <CardDescription className="text-sm leading-relaxed">
                    {group.description}
                  </CardDescription>
                )}
              </CardHeader>

              <CardContent className="px-4 pb-4 pt-0 text-xs text-muted-foreground">
                {hasChildren ? (
                  <div className="flex flex-wrap gap-2">
                    {childBadges.map((child) => (
                      <Badge key={child} variant="outline">
                        {sections[child]?.title ?? child}
                      </Badge>
                    ))}
                    {group.children.length > 4 && (
                      <Badge variant="outline">mehr …</Badge>
                    )}
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground/80">
                    {group.description ?? 'Weiterlesen, um mehr zu erfahren.'}
                  </p>
                )}
              </CardContent>

              <div className="flex items-center justify-between border-t border-border px-4 py-2 text-sm text-muted-foreground">
                Weiterlesen
                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" aria-hidden />
              </div>
            </Card>
          </button>
        );
      })}
    </div>
  );
}
