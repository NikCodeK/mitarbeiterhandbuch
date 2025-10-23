'use client';

import { RichText } from '@/components/sections/RichText';
import type { SectionComponentProps } from '@/components/sections/types';

const html = /* html */ `<h2 class="text-4xl font-bold text-[var(--primary-darker)] mb-4">Reisekosten 💸</h2>
                <div class="content-text" data-key="reisekosten-text">
                    <p>Du suchst Informationen zu Reisekosten? Alle wichtigen Regelungen und das Formular für die Beantragung findest du in einem PDF, das wir im Google Drive abgelegt haben. Klick einfach auf diesen Button, um direkt zum Ordner zu gelangen:</p>
                    <div class="flex justify-center my-6">
                        <a href="https://drive.google.com/drive/folders/1NDWo9mOPD-TvyU4r-AfqbEkH0PI0ktMR" target="_blank" class="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 font-semibold text-white !text-white shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 focus-visible:ring-offset-2">
                            <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M2 6a2 2 0 012-2h5l2 2h5a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"></path></svg>
                            Zum Reisekosten-Ordner im Drive
                        </a>
                    </div>
                </div>`;

export default function ReisekostenSection({ slug }: SectionComponentProps) {
  return (
    <section id={slug} className="space-y-6">
      <RichText html={html} />
    </section>
  );
}
