'use client';

import SectionMenu from '@/components/menus/SectionMenu';
import type { SectionComponentProps } from '@/components/sections/types';
import { sections } from '@/lib/sectionMap';

const conversationItems = [
  {
    slug: 'peer-feedback-section',
    description: 'Warum Peer-Feedback für uns wichtig ist und wie wir es leben.',
  },
  {
    slug: 'peer-feedback-content',
    description: 'Ablauf und Verantwortlichkeiten beim Peer-Feedback.',
  },
  {
    slug: 'leitfaden-feedback-content',
    description: 'Best Practices und Leitfragen für wirksames Feedback.',
  },
  {
    slug: 'feedback-gespräch',
    description: 'Struktur und Vorbereitung des Feedback-Gesprächs.',
  },
  {
    slug: 'mitarbeiter-gespräche-detail',
    description: 'Die unterschiedlichen Formate unserer Mitarbeitergespräche.',
  },
  {
    slug: 'airtable',
    description: 'So dokumentieren wir Feedback und Prozesse in Airtable.',
  },
  {
    slug: 'weiteres',
    description: 'Weitere Quellen und Dokumentationen.',
  },
];

export default function MitarbeiterGespraecheMenuSection({
  slug,
  goTo,
}: SectionComponentProps) {
  return (
    <section id={slug} className="space-y-6">
      <SectionMenu
        title={sections[slug]?.title ?? 'Mitarbeitergespräche'}
        intro="Alles rund um Feedback, Gespräche und Dokumentation."
        items={conversationItems.map((item) => ({
          slug: item.slug,
          title: sections[item.slug]?.title ?? item.slug,
        }))}
        onSelect={goTo}
      />
    </section>
  );
}
