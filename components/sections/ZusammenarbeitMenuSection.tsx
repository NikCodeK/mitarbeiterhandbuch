'use client';

import SectionMenu from '@/components/menus/SectionMenu';
import type { SectionComponentProps } from '@/components/sections/types';
import { sections } from '@/lib/sectionMap';

const collaborationItems = [
  {
    slug: 'google-kalender-section',
    description: 'Grundlagen zur gemeinsamen Kalendernutzung.',
  },
  {
    slug: 'kalender-abonnieren',
    description: 'Teamkalender abonnieren und behalten.',
  },
  {
    slug: 'büroanwesenheit-eintragen',
    description: 'Anwesenheiten im Büro transparent planen.',
  },
  {
    slug: 'zeiträume-blocken',
    description: 'Fokuszeiten und Blocker richtig eintragen.',
  },
  {
    slug: 'interne-kommunikation-section',
    description: 'Kanäle und Leitplanken für die interne Kommunikation.',
  },
  {
    slug: 'ordnerverteilung-in-googledrive',
    description: 'Struktur und Zuständigkeiten in Google Drive.',
  },
  {
    slug: 'chatgruppen',
    description: 'Chat-Gruppen sinnvoll nutzen und einordnen.',
  },
  {
    slug: 'e-mail-postfach',
    description: 'Gemeinsame Postfächer organisieren und pflegen.',
  },
  {
    slug: 'e-mail-signatur',
    description: 'E-Mail-Signaturen einrichten und konsistent halten.',
  },
  {
    slug: 'externe-kommunikation-section',
    description: 'Professionelle Kommunikation mit Kund:innen und Partnern.',
  },
  {
    slug: 'kundenkommunikation',
    description: 'Best Practices für die direkte Kundenkommunikation.',
  },
  {
    slug: 'hintergrund-in-google-meets-ändern',
    description: 'Virtuelle Hintergründe für Meetings verwenden.',
  },
];

export default function ZusammenarbeitMenuSection({ slug, goTo }: SectionComponentProps) {
  return (
    <section id={slug} className="space-y-6">
      <SectionMenu
        title={sections[slug]?.title ?? 'Zusammenarbeit'}
        intro="Alle Infos rund um Zusammenarbeit, Kommunikation und gemeinsame Tools."
        items={collaborationItems.map((item) => ({
          slug: item.slug,
          title: sections[item.slug]?.title ?? item.slug,
          description: item.description,
        }))}
        onSelect={goTo}
      />
    </section>
  );
}
