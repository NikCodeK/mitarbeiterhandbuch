'use client';

import { RichText } from '@/components/sections/RichText';
import type { SectionComponentProps } from '@/components/sections/types';

const html = /* html */ `<h2 class="text-4xl font-bold text-[var(--primary-darker)] mb-4">Home-Office 🏠</h2>
                <div class="content-text" data-key="home-office-text">
                    <p>Du kannst jederzeit gerne von zu Hause aus arbeiten. Bitte vermerke deine Home-Office-Tage einfach in deinem Kalender. Eine Anleitung dazu findest du unter "Zusammenarbeit" und "Google Kalender".</p>
                    <p>In der Regel musst du dich dafür nicht vorher absprechen, außer es wurde explizit anders vereinbart. Wir möchten dich aber daran erinnern, dass wir ein wunderschönes Büro haben und uns sehr freuen, wenn du so oft wie möglich vor Ort bist. Die persönliche Zusammenarbeit stärkt unseren Teamgeist und macht die Arbeit effektiver und angenehmer.</p>
                </div>`;

export default function HomeOfficeSection({ slug }: SectionComponentProps) {
  return (
    <section id={slug} className="space-y-6">
      <RichText html={html} />
    </section>
  );
}
