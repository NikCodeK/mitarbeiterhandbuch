'use client';

import { RichText } from '@/components/sections/RichText';
import type { SectionComponentProps } from '@/components/sections/types';

const html = /* html */ `<h2 class="text-4xl font-bold text-[var(--primary-darker)] mb-4">Weiteres ➕</h2>
                <div class="content-text" data-key="weiteres-text">
                    <p>Alle weiteren Prozesse werden intern kommuniziert und in <a href="https://drive.google.com/drive/folders/16n8Qf5LvEyD7icDKdN3VQ2IqHcF4BedW" class="text-[var(--primary-color)] hover:underline">diesem Ordner</a> festgehalten.</p>
                </div>`;

export default function WeiteresSection({ slug }: SectionComponentProps) {
  return (
    <section id={slug} className="space-y-6">
      <RichText html={html} />
    </section>
  );
}
