'use client';

import { navigationGroups } from '@/lib/data';
import type { SectionSlug } from '@/lib/types';

import { Button } from '@/components/ui/button';
import { Card, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

type HomeTocGridProps = {
  onSelect: (slug: SectionSlug) => void;
};

export default function HomeTocGrid({ onSelect }: HomeTocGridProps) {
  return (
    <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
      {navigationGroups.map((group) => {
        const label = group.slug === 'home' ? 'Startseite' : 'Weiterlesen';

        return (
          <Card key={group.slug} className="flex h-full flex-col justify-between transition hover:border-primary">
            <CardHeader className="p-4">
              <CardTitle className="text-base font-semibold">{group.title}</CardTitle>
            </CardHeader>
            <CardFooter className="border-t border-border px-4 py-3">
              <Button
                className="w-full justify-center"
                variant="outline"
                onClick={() => onSelect(group.slug)}
              >
                {label}
              </Button>
            </CardFooter>
          </Card>
        );
      })}
    </div>
  );
}
