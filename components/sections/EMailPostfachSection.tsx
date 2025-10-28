'use client';

import { RichText } from '@/components/sections/RichText';
import type { SectionComponentProps } from '@/components/sections/types';

const html = /* html */ `<h2 class="text-4xl font-bold text-[var(--primary-darker)] mb-4">E-Mail-Postfach 📧</h2>
                <div class="content-text" data-key="email-postfach-text">
                    <p>Ein aufgeräumtes Postfach ist super, aber bitte <strong>lösche niemals E-Mails</strong>. Sie könnten später noch wichtig sein. Wenn du eine E-Mail aus deinem Posteingang entfernen möchtest, nutze stattdessen die <strong>Archiv-Funktion</strong>. So bleibt die E-Mail erhalten, aber dein Postfach bleibt übersichtlich.</p>
                </div>`;

export default function EMailPostfachSection({ slug }: SectionComponentProps) {
  return (
    <section id={slug} className="space-y-6">
      <RichText html={html} />
    </section>
  );
}
