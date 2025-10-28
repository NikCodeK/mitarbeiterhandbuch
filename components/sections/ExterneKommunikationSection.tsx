'use client';

import { RichText } from '@/components/sections/RichText';
import type { SectionComponentProps } from '@/components/sections/types';

const html = /* html */ `<h2 class="text-4xl font-bold text-[var(--primary-darker)] mb-4">Externe Kommunikation 📞</h2>
                <div class="content-text" data-key="externe-kommunikation-intro-text">
                    <p>Die Art und Weise, wie wir mit externen Partnern und Kunden kommunizieren, prägt unser Image. Hier sind unsere Richtlinien für eine professionelle und effektive externe Kommunikation.</p>
                </div>
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
                    <button class="sub-category-button nested" data-target="kundenkommunikation">Kundenkommunikation 🗣️</button>
                    <button class="sub-category-button nested" data-target="hintergrund-in-google-meets-ändern">Hintergrund in Google Meets ändern 🏞️</button>
                </div>`;

export default function ExterneKommunikationSection({ slug }: SectionComponentProps) {
  return (
    <section id={slug} className="space-y-6">
      <RichText html={html} />
    </section>
  );
}
