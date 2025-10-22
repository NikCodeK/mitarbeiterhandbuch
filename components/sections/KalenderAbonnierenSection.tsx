'use client';

import { RichText } from '@/components/sections/RichText';
import type { SectionComponentProps } from '@/components/sections/types';

const html = /* html */ `<h2 class="text-4xl font-bold text-[var(--primary-darker)] mb-4">Kalender abonnieren ✅</h2>
                <div class="content-text" data-key="kalender-abonnieren-text">
                    <p>Um die Verfügbarkeit deines Teams auf einen Blick zu sehen, kannst du die Kalender deiner Kolleg:innen abonnieren.</p>
                    <p><strong>So geht's:</strong> <a href="https://scribehow.com/shared/Add_a_Calendar_Subscription_in_Google_Calendar__KNM9mLiKSt6H8zjjrNbhkQ" class="text-[var(--primary-color)] hover:underline">Anleitung hier</a></p>
                </div>`;

export default function KalenderAbonnierenSection({ slug }: SectionComponentProps) {
  return (
    <section id={slug} className="space-y-6">
      <RichText html={html} />
    </section>
  );
}
