'use client';

import { forwardRef } from 'react';

import { cn } from '@/lib/utils';

type SidebarLinkProps = {
  label: string;
  slug: string;
  isActive: boolean;
  isChild?: boolean;
  onSelect: (slug: string) => void;
};

export const SidebarLink = forwardRef<
  HTMLAnchorElement,
  SidebarLinkProps
>(function SidebarLink(
  { label, slug, isActive, isChild = false, onSelect },
  ref,
) {
  return (
    <a
      ref={ref}
      href={`#${slug}`}
      onClick={(event) => {
        event.preventDefault();
        onSelect(slug);
      }}
      aria-current={isActive ? 'page' : undefined}
      className={cn(
        'group flex w-full items-center rounded-md px-3 py-2 text-sm font-medium transition-colors',
        isChild ? 'pl-8 text-muted-foreground' : 'text-foreground',
        isActive
          ? 'bg-primary/10 text-primary'
          : 'hover:bg-muted hover:text-foreground',
      )}
    >
      <span className="truncate">{label}</span>
    </a>
  );
});
