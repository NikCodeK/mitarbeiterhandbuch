'use client';

import type { SectionSlug } from '@/lib/types';

import { SubCategoryButton } from '@/components/menus/SubCategoryButton';

type SectionMenuItem = {
  slug: SectionSlug;
  title: string;
  description?: string;
};

type SectionMenuProps = {
  title: string;
  intro: string;
  items: SectionMenuItem[];
  onSelect: (slug: SectionSlug) => void;
};

export default function SectionMenu({
  title,
  intro,
  items,
  onSelect,
}: SectionMenuProps) {
  return (
    <section className="space-y-6">
      <header className="space-y-2">
        <h2 className="text-3xl font-semibold tracking-tight">{title}</h2>
        <p className="text-sm text-muted-foreground sm:text-base">{intro}</p>
      </header>
      <div className="grid gap-3 sm:grid-cols-2">
        {items.map((item) => (
          <SubCategoryButton
            key={item.slug}
            slug={item.slug}
            title={item.title}
            description={item.description}
            onSelect={onSelect}
          />
        ))}
      </div>
    </section>
  );
}
