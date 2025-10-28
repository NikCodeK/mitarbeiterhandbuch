'use client';

import { RichText } from '@/components/sections/RichText';
import type { SectionComponentProps } from '@/components/sections/types';

const html = /* html */ `<h2 class="text-4xl font-bold text-[var(--primary-darker)] mb-4">Büroanwesenheit eintragen 🖊️</h2>
                <div class="content-text" data-key="bueroanwesenheit-eintragen-text">
                    <p>Damit wir wissen, wer wann im Büro ist, und um besser planen zu können, trage deine Anwesenheit bitte in den Kalender ein. So behalten alle den Überblick.</p>
                    <ul class="list-disc pl-5 space-y-2">
                        <li><strong>Für spontane Tage:</strong> Trage deinen Home-Office-Tag einfach manuell ein. <a href="https://scribehow.com/shared/Adding_Home_Event_from_900_to_1700_in_Google_Calendar__mfjIMlFhQemR4dmm93yoMw" class="text-[var(--primary-color)] hover:underline">Anleitung hier</a></li>
                        <li><strong>Für feste Tage:</strong> Wenn du regelmäßig an bestimmten Tagen im Büro oder im Home-Office bist, kannst du das als Standardeinstellung hinterlegen. <a href="https://scribehow.com/shared/Set_Google_Calendar_Work_and_Home_Locations_Guide__CWl-61STQ0mayqN0Q3ToTg" class="text-[var(--primary-color)] hover:underline">Anleitung hier</a></li>
                    </ul>
                </div>`;

export default function BueroanwesenheitEintragenSection({ slug }: SectionComponentProps) {
  return (
    <section id={slug} className="space-y-6">
      <RichText html={html} />
    </section>
  );
}
