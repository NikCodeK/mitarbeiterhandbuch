'use client';

import { RichText } from '@/components/sections/RichText';
import type { SectionComponentProps } from '@/components/sections/types';

const html = /* html */ `<h2 class="text-4xl font-bold text-[var(--primary-darker)] mb-4">Ordnerverteilung in GoogleDrive 📁</h2>
                <div class="content-text" data-key="ordnerverteilung-googledrive-text">
                    <p>Alle wichtigen Dokumente und Dateien werden in Google Drive organisiert. Dein Teamlead gibt dir Zugang zu den für deine Arbeit relevanten Ordnern. Standardmäßig sind das mindestens die Ordner "3 Projektmanagement" und "6 Team intern".</p>
                </div>`;

export default function OrdnerverteilungInGoogledriveSection({ slug }: SectionComponentProps) {
  return (
    <section id={slug} className="space-y-6">
      <RichText html={html} />
    </section>
  );
}
