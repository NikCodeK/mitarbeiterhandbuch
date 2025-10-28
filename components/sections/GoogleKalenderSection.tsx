'use client';

import { RichText } from '@/components/sections/RichText';
import type { SectionComponentProps } from '@/components/sections/types';

const html = /* html */ `<h2 class="text-4xl font-bold text-[var(--primary-darker)] mb-4">Google-Kalender 📅</h2>
                <div class="content-text" data-key="google-kalender-intro-text">
                    <p>Der Google Kalender ist unser zentrales Tool, um Termine zu koordinieren und unsere Verfügbarkeiten transparent zu machen. Hier sind die wichtigsten Funktionen:</p>
                </div>
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
                    <button class="sub-category-button nested" data-target="kalender-abonnieren">Kalender abonnieren ✅</button>
                    <button class="sub-category-button nested" data-target="büroanwesenheit-eintragen">Büroanwesenheit eintragen 🖊️</button>
                    <button class="sub-category-button nested" data-target="zeiträume-blocken">Zeiträume blocken 🚫</button>
                </div>`;

export default function GoogleKalenderSection({ slug }: SectionComponentProps) {
  return (
    <section id={slug} className="space-y-6">
      <RichText html={html} />
    </section>
  );
}
