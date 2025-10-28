'use client';

import { RichText } from '@/components/sections/RichText';
import type { SectionComponentProps } from '@/components/sections/types';

const html = /* html */ `<h2 class="text-4xl font-bold text-[var(--primary-darker)] mb-4">Mitarbeiter Gespräch 🤝</h2>
                <div class="content-text" data-key="mitarbeiter-gespraech-detail-text">
                    <p>Einmal jährlich, für gewöhnlich im Januar, findet ein umfassenderes Mitarbeitergespräch mit deinem <strong>Teamlead und Head of</strong> statt. Dieses Gespräch ist eine Gelegenheit, gemeinsam deine <strong>Erfolge und deinen Beitrag</strong> zum Unternehmen zu reflektieren. Wir sprechen über deine Karriereziele und wie das Unternehmen dich auf diesem Weg bestmöglich unterstützen kann. Es dient dazu, deine Rolle im größeren Kontext zu evaluieren und deine Zukunft bei uns zu gestalten.</p>
                </div>`;

export default function MitarbeiterGespraecheDetailSection({ slug }: SectionComponentProps) {
  return (
    <section id={slug} className="space-y-6">
      <RichText html={html} />
    </section>
  );
}
