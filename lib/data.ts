import { sectionGroups, sections } from './sectionMap';
import type { SearchItem, SectionGroup } from './types';

export const searchItems: SearchItem[] = Object.entries(sections).map(
  ([slug, meta]) => ({
    slug,
    title: meta.title,
    parent: meta.parent,
    keywords: Array.from(
      new Set([
        meta.title.toLowerCase(),
        ...(meta.keywords ?? []).map((keyword) => keyword.toLowerCase()),
      ]),
    ),
  }),
);

export const navigationGroups: SectionGroup[] = sectionGroups;
