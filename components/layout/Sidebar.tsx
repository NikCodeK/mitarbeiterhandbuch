'use client';

import * as Icons from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

import { useSectionRouter } from '@/components/logic/SectionRouter.client';
import { SidebarLink } from '@/components/layout/SidebarLink';
import { sectionGroups, sections } from '@/lib/sectionMap';
import { cn } from '@/lib/utils';
import { ScrollArea } from '@/components/ui/scroll-area';

const iconSet = Icons as unknown as Record<string, LucideIcon>;

export default function Sidebar() {
  const { active, goTo } = useSectionRouter();
  const activeMeta = sections[active];
  const activeGroupSlug = activeMeta?.parent ?? active;

  return (
    <aside className="w-full max-w-xs shrink-0 rounded-xl border border-border bg-card shadow-sm">
      <div className="border-b border-border px-4 py-3">
        <p className="text-sm font-semibold text-muted-foreground">
          Inhaltsverzeichnis
        </p>
      </div>
      <ScrollArea className="h-[calc(100vh-8rem)] px-2 py-4 lg:h-[calc(100vh-6rem)]">
        <nav aria-label="Handbuch Navigation" className="space-y-1">
          {sectionGroups.map((group) => {
            const Icon =
              (group.icon && iconSet[group.icon]) ||
              iconSet.Dot ||
              iconSet.Circle;

            const isGroupActive =
              active === group.slug || activeGroupSlug === group.slug;

            return (
              <div key={group.slug} className="space-y-1">
                <button
                  type="button"
                  onClick={() => goTo(group.slug)}
                  className={cn(
                    'flex w-full items-center gap-2 rounded-md px-3 py-2 text-left text-sm font-semibold transition-colors',
                    isGroupActive
                      ? 'bg-primary text-primary-foreground shadow-sm'
                      : 'text-foreground hover:bg-muted',
                  )}
                >
                  <Icon className="h-4 w-4" aria-hidden />
                  <span className="truncate">{group.title}</span>
                </button>
                {group.children.length > 0 && (
                  <div className={cn('pl-1', !isGroupActive && 'hidden lg:block')}>
                    {group.children.map((child) => {
                      const childMeta = sections[child];
                      if (!childMeta) {
                        return null;
                      }
                      return (
                        <SidebarLink
                          key={child}
                          slug={child}
                          label={childMeta.title}
                          isChild
                          isActive={active === child}
                          onSelect={goTo}
                        />
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </nav>
      </ScrollArea>
    </aside>
  );
}
