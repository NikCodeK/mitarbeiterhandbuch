'use client';

import SectionMenu from '@/components/menus/SectionMenu';
import type { SectionComponentProps } from '@/components/sections/types';
import { sections } from '@/lib/sectionMap';

const policyItems = [
  {
    slug: 'office',
    description: 'Arbeitsplatzregeln, Clean Desk Policy und Umgang mit den Räumen.',
  },
  {
    slug: 'arbeitszeiterfassung',
    description: 'So erfasst du deine Zeiten korrekt und transparent.',
  },
  {
    slug: 'krankheit',
    description: 'Abläufe für Krankmeldungen und Atteste.',
  },
  {
    slug: 'überstunden',
    description: 'Überstunden handhaben und ausgleichen.',
  },
  {
    slug: 'urlaubstage',
    description: 'Urlaubsplanung, Freigaben und Abwesenheiten.',
  },
  {
    slug: 'reisekosten',
    description: 'Reisekosten abrechnen und Richtlinien einhalten.',
  },
];

export default function PoliciesMenuSection({ slug, goTo }: SectionComponentProps) {
  return (
    <section id={slug} className="space-y-6">
      <SectionMenu
        title={sections[slug]?.title ?? 'Policies'}
        intro="Schneller Einstieg in unsere grundlegenden Richtlinien."
        items={policyItems.map((item) => ({
          slug: item.slug,
          title: sections[item.slug]?.title ?? item.slug,
          description: item.description,
        }))}
        onSelect={goTo}
      />
    </section>
  );
}
