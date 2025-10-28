'use client';

import SectionMenu from '@/components/menus/SectionMenu';
import type { SectionComponentProps } from '@/components/sections/types';
import { sections } from '@/lib/sectionMap';

const benefitItems = [
  {
    slug: 'deutschlandticket',
    description: 'Mobil bleiben dank Zuschuss zum Deutschlandticket.',
  },
  {
    slug: 'home-office',
    description: 'Flexibel im Homeoffice arbeiten und die wichtigsten Regeln kennen.',
  },
  {
    slug: 'flexible-arbeitszeiten',
    description: 'Arbeitszeiten flexibel gestalten und dennoch erreichbar bleiben.',
  },
  {
    slug: 'offsites',
    description: 'Gemeinsame Offsites für Austausch, Fokus und Teamgeist.',
  },
  {
    slug: 'workation',
    description: 'Workation planen und mit dem Team abstimmen.',
  },
  {
    slug: 'all-hands-days',
    description: 'So laufen unsere All Hands Days ab und das sind ihre Ziele.',
  },
  {
    slug: 'team-lunch',
    description: 'Gemeinsame Mittagessen für Austausch jenseits des Alltags.',
  },
  {
    slug: 'boni',
    description: 'Bonusmodelle und Kriterien im überblick.',
  },
];

export default function BenefitsMenuSection({ slug, goTo }: SectionComponentProps) {
  return (
    <section id={slug} className="space-y-6">
      <SectionMenu
        title={sections[slug]?.title ?? 'Benefits'}
        intro="Entdecke die Vorteile und Angebote, die wir dem Team zur Verfügung stellen."
        items={benefitItems.map((item) => ({
          slug: item.slug,
          title: sections[item.slug]?.title ?? item.slug,
          description: item.description,
        }))}
        onSelect={goTo}
      />
    </section>
  );
}
