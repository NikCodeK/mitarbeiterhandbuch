'use client';

import { RichText } from '@/components/sections/RichText';
import type { SectionComponentProps } from '@/components/sections/types';

const html = /* html */ `<h2 class="text-4xl font-bold text-[var(--primary-darker)] mb-4">Offsites 🗺️</h2>
                <div class="content-text" data-key="offsites-text">
                    <p>Wir veranstalten zweimal im Jahr eine Offsite, um gemeinsam Zeit zu verbringen.</p>
                    <ul class="list-disc pl-5 space-y-2">
                        <li><strong>Frühjahrsoffsite:</strong> Einmal im Frühjahr fahren wir für vier Tage in eine Region nahe Deutschland und Köln. Wir haben eine Agenda mit Workshops, Vorträgen und Freizeitaktivitäten – die perfekte Mischung aus Arbeit, Spaß und Teamgeist.</li>
                        <li><strong>Workation-Offsite:</strong> Später im Jahr gibt es eine freiwillige Offsite, die etwas weiter weg stattfindet. Hier steht das Daily Business im Vordergrund, aber es bleibt genug Zeit für gemeinsame Team-Aktivitäten und Freizeit.</li>
                    </ul>
                    <p>Für beide Offsites übernehmen wir die Kosten für Reise, Unterkunft und Verpflegung.</p>
                </div>`;

export default function OffsitesSection({ slug }: SectionComponentProps) {
  return (
    <section id={slug} className="space-y-6">
      <RichText html={html} />
    </section>
  );
}
