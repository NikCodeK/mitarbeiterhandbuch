'use client';

import { RichText } from '@/components/sections/RichText';
import type { SectionComponentProps } from '@/components/sections/types';

const html = /* html */ `<h2 class="text-4xl font-bold text-[var(--primary-darker)] mb-4">Dein Onboarding-Prozess 👋</h2>
                <div class="content-text" data-key="onboarding-prozess-text">
                    <p>Herzlich willkommen bei Thierhoff Consulting! In deinen ersten Tagen und Wochen wirst du von deinem <strong>Teamlead</strong> begleitet, der dein erster Ansprechpartner für alle Fragen ist. Da wir ein dynamisches Unternehmen sind, gibt es noch keinen standardisierten Einarbeitungsplan – dein Teamlead wird dich individuell in alle Abläufe und Tools einführen. Scheu dich nicht, jederzeit Fragen zu stellen.</p>
                </div>`;

export default function DeinOnboardingProzessSection({ slug }: SectionComponentProps) {
  return (
    <section id={slug} className="space-y-6">
      <RichText html={html} />
    </section>
  );
}
