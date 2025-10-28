'use client';

import { RichText } from '@/components/sections/RichText';
import type { SectionComponentProps } from '@/components/sections/types';

const html = /* html */ `<h2 class="text-4xl font-bold text-[var(--primary-darker)] mb-4">Flexible Arbeitszeiten 🤸</h2>
                <div class="content-text" data-key="flexible-arbeitszeiten-text">
                    <p>Bei uns kannst du deine Arbeitszeiten so gestalten, wie es am besten für dich passt. Du kannst starten und aufhören, wann du möchtest, solange das operative Geschäft dadurch nicht beeinträchtigt wird. Es ist völlig in Ordnung, wenn du zum Beispiel am Morgen arbeitest, eine längere Pause machst und am Abend weitermachst. Hauptsache, deine Wochenarbeitszeit wird erfüllt.</p>
                </div>`;

export default function FlexibleArbeitszeitenSection({ slug }: SectionComponentProps) {
  return (
    <section id={slug} className="space-y-6">
      <RichText html={html} />
    </section>
  );
}
