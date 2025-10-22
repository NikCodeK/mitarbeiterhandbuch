'use client';

import { ArrowRight } from 'lucide-react';

import type { SectionSlug } from '@/lib/types';
import { cn } from '@/lib/utils';

type SubCategoryButtonProps = {
  slug: SectionSlug;
  title: string;
  description?: string;
  onSelect: (slug: SectionSlug) => void;
};

export function SubCategoryButton({
  slug,
  title,
  description,
  onSelect,
}: SubCategoryButtonProps) {
  return (
    <button
      type="button"
      onClick={() => onSelect(slug)}
      className="group flex w-full items-center justify-between rounded-lg border border-border bg-background px-4 py-3 text-left transition-transform hover:-translate-y-0.5 hover:border-primary hover:shadow"
    >
      <span className="flex flex-col">
        <span className="text-sm font-semibold leading-tight">{title}</span>
        {description && (
          <span className="text-xs text-muted-foreground">{description}</span>
        )}
      </span>
      <ArrowRight
        className={cn(
          'h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-primary',
        )}
        aria-hidden
      />
    </button>
  );
}
