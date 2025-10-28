'use client';

import { RichText } from '@/components/sections/RichText';
import type { SectionComponentProps } from '@/components/sections/types';

const html = /* html */ `<h2 class="text-4xl font-bold text-[var(--primary-darker)] mb-4">Boni 💰</h2>
                <div class="content-text" data-key="boni-text">
                    <p>Zusätzlich zu all diesen Benefits gibt es die Möglichkeit einer freiwilligen Bonuszahlung. Vierteljährlich wird entschieden, ob basierend auf der Leistung des gesamten Unternehmens ein Bonus ausgezahlt werden kann. Am Ende des Quartals erhältst du eine E-Mail, in der du bestätigen musst, dass du die Bonuszahlung als freiwillige Zulage akzeptierst. Antworte einfach kurz und knapp auf die Mail, um den Bonus zu bestätigen.</p>
                </div>`;

export default function BoniSection({ slug }: SectionComponentProps) {
  return (
    <section id={slug} className="space-y-6">
      <RichText html={html} />
    </section>
  );
}
