'use client';

import { RichText } from '@/components/sections/RichText';
import type { SectionComponentProps } from '@/components/sections/types';

const html = /* html */ `<h2 class="text-4xl font-bold text-[var(--primary-darker)] mb-4">Feedback Gespräch ✅</h2>
                <div class="content-text" data-key="feedback-gespraech-text">
                    <p>Einmal jährlich, für gewöhnlich in den Sommermonaten, findet ein persönliches Feedback-Gespräch mit deinem <strong>Teamlead</strong> statt. Dieses Gespräch dient dazu, deine Entwicklung, deine Wünsche und deine Ziele zu besprechen. Es ist eine Gelegenheit für einen offenen Austausch über deine Arbeit und wie dein Team-Lead dich bestmöglich unterstützen kann.</p>
                </div>`;

export default function FeedbackGespraechSection({ slug }: SectionComponentProps) {
  return (
    <section id={slug} className="space-y-6">
      <RichText html={html} />
    </section>
  );
}
