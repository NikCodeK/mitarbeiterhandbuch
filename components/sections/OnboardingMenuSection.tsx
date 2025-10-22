'use client';

import SectionMenu from '@/components/menus/SectionMenu';
import type { SectionComponentProps } from '@/components/sections/types';
import { sections } from '@/lib/sectionMap';

const onboardingItems = [
  {
    slug: 'dein-onboarding-prozess',
    description: 'Ablauf, Ziele und Erwartungen in den ersten Wochen.',
  },
  {
    slug: 'zugänge-und-konten',
    description: 'Zugänge anfordern und Accounts einrichten.',
  },
  {
    slug: 'software-und-tools',
    description: 'Alle wichtigen Tools im Überblick.',
  },
];

export default function OnboardingMenuSection({ slug, goTo }: SectionComponentProps) {
  return (
    <section id={slug} className="space-y-6">
      <SectionMenu
        title={sections[slug]?.title ?? 'Onboarding'}
        intro="Dein Start bei uns: von den ersten Tagen bis zum Tech-Setup."
        items={onboardingItems.map((item) => ({
          slug: item.slug,
          title: sections[item.slug]?.title ?? item.slug,
          description: item.description,
        }))}
        onSelect={goTo}
      />
    </section>
  );
}
