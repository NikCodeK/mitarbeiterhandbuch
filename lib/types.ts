export type SectionSlug = string;

export type SectionMeta = {
  title: string;
  parent?: SectionSlug;
  keywords?: string[];
  description?: string;
};

export type SectionGroup = {
  slug: SectionSlug;
  title: string;
  description?: string;
  icon?: string;
  children: SectionSlug[];
};

export type SearchItem = {
  slug: SectionSlug;
  title: string;
  parent?: SectionSlug;
  keywords: string[];
};

export type NavLink = {
  slug: SectionSlug;
  label: string;
  parent?: SectionSlug;
};
