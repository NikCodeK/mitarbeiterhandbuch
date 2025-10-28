'use client';

import { RichText } from '@/components/sections/RichText';
import type { SectionComponentProps } from '@/components/sections/types';

const html = /* html */ `<h2 class="text-4xl font-bold text-[var(--primary-darker)] mb-4">Workation 🌴</h2>
                <div class="content-text" data-key="workation-text">
                    <p>Du hast die Möglichkeit, so viel Workation zu machen, wie du möchtest, solange dadurch das operative Geschäft nicht leidet. Wichtig ist, dass du deine Workations immer frühzeitig mit deinem Teamlead absprichst. Bitte beachte, dass du dich bei einer Workation selbst um deine Versicherung kümmern musst.</p>
                    <p>Wir freuen uns trotzdem, dich auch regelmäßig im Büro zu sehen – denn nichts ersetzt die persönliche Zeit miteinander!</p>
                </div>`;

export default function WorkationSection({ slug }: SectionComponentProps) {
  return (
    <section id={slug} className="space-y-6">
      <RichText html={html} />
    </section>
  );
}
