'use client';

import { RichText } from '@/components/sections/RichText';
import type { SectionComponentProps } from '@/components/sections/types';

const html = /* html */ `<h2 class="text-4xl font-bold text-[var(--primary-darker)] mb-4">Peer-Feedback 👋</h2>
                <p class="text-lg text-gray-700 mb-8">Wähle einen Unterpunkt, um mehr über Peer-Feedback zu erfahren:</p>
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <button class="sub-category-button nested" data-target="peer-feedback-content">Peer-Feedback im Team</button>
                    <button class="sub-category-button nested" data-target="leitfaden-feedback-content">Leitfaden für dein Feedback-Gespräch</button>
                </div>`;

export default function PeerFeedbackSection({ slug }: SectionComponentProps) {
  return (
    <section id={slug} className="space-y-6">
      <RichText html={html} />
    </section>
  );
}
