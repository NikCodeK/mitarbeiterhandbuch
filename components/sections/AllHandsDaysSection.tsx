'use client';

import { RichText } from '@/components/sections/RichText';
import type { SectionComponentProps } from '@/components/sections/types';

const html = /* html */ `<h2 class="text-4xl font-bold text-[var(--primary-darker)] mb-4">All-Hands-Days 🗓️</h2>
                <div class="content-text" data-key="all-hands-days-text">
                    <p>Alle drei Monate treffen wir uns zu unseren All-Hands Days im Kölner Büro. An diesen Tagen versammelt sich das gesamte Team, um über wichtige Anliegen und Themen zu sprechen, die alle betreffen. Deine Fahrtkosten, Unterkunft (falls du weiter weg wohnst) und die Verpflegung werden von uns übernommen.</p>
                </div>`;

export default function AllHandsDaysSection({ slug }: SectionComponentProps) {
  return (
    <section id={slug} className="space-y-6">
      <RichText html={html} />
    </section>
  );
}
