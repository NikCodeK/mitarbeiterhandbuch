import type { SectionMeta, SectionSlug } from '@/lib/types';

export type SectionComponentProps = {
  slug: SectionSlug;
  meta: SectionMeta;
  goTo: (slug: SectionSlug) => void;
  goBack: () => void;
};
