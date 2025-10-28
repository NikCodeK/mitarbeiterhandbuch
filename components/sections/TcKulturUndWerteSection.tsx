'use client';

import { RichText } from '@/components/sections/RichText';
import type { SectionComponentProps } from '@/components/sections/types';

const html = /* html */ `<h2 class="text-4xl font-bold text-[var(--primary-darker)] mb-4">TC-Kultur und Werte ❤️</h2>
                <div class="content-text" data-key="tc-kultur-werte-text">
                    <p>Unsere Grundprinzipien – <strong>Gesund Arbeiten, Gesunde Beziehungen und Gesund Wachsen</strong> – sind der Kern unserer Unternehmenskultur.</p>
                    <ul class="list-disc pl-5 space-y-2">
                        <li><strong>Gesund Arbeiten:</strong> Wir achten auf eine nachhaltige Work-Life-Balance. Das bedeutet, dass wir nicht nur Wert auf ein schönes Büro und flexible Arbeitszeiten legen, sondern auch Spaß im Team haben – sei es beim gemeinsamen Mittagessen oder bei unseren Offsites.</li>
                        <li><strong>Gesunde Beziehungen:</strong> Unsere Arbeit basiert auf Vertrauen und Wertschätzung. Wir pflegen offene und ehrliche Beziehungen, sowohl im Team als auch zu unseren Kunden. Wir hören aktiv zu, kommunizieren klar und arbeiten gemeinsam an den besten Lösungen.</li>
                        <li><strong>Gesund Wachsen:</strong> Unser Ziel ist ein nachhaltiges Wachstum, bei dem die Zufriedenheit und das Wohlbefindens des Teams immer im Vordergrund stehen. Es geht nicht nur darum, größer zu werden, sondern besser – indem wir unsere Prozesse optimieren und uns persönlich weiterentwickeln.</li>
                    </ul>
                    <p>Mehr findest Du unter dem Reiter ‘Unsere Mission’.</p>
                </div>`;

export default function TcKulturUndWerteSection({ slug }: SectionComponentProps) {
  return (
    <section id={slug} className="space-y-6">
      <RichText html={html} />
    </section>
  );
}
