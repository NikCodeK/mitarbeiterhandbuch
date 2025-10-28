'use client';

import { RichText } from '@/components/sections/RichText';
import type { SectionComponentProps } from '@/components/sections/types';

const html = /* html */ `<h2 class="text-4xl font-bold text-[var(--primary-darker)] mb-4">Zeiträume blocken 🚫</h2>
                <div class="content-text" data-key="zeitraeume-blocken-text">
                    <p>Wenn du aus privaten Gründen (z. B. Arzttermin, Kinder abholen) zu einer bestimmten Zeit nicht verfügbar bist, setze bitte einen <strong>„Blocker“</strong> in deinem Kalender. Das erleichtert die Planung von Meetings und stellt sicher, dass alle wissen, wann sie dich erreichen können.</p>
                    <p><strong>So geht's:</strong> <a href="https://scribehow.com/shared/Schedule_a_Block_from_930_to_1530_in_Google_Calendar__HiMgGwvJRzCQ7LXd8H4HFQ" class="text-[var(--primary-color)] hover:underline">Anleitung hier</a></p>
                </div>`;

export default function ZeitraeumeBlockenSection({ slug }: SectionComponentProps) {
  return (
    <section id={slug} className="space-y-6">
      <RichText html={html} />
    </section>
  );
}
