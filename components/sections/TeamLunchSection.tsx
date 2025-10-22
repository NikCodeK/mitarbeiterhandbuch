'use client';

import { RichText } from '@/components/sections/RichText';
import type { SectionComponentProps } from '@/components/sections/types';

const html = /* html */ `<h2 class="text-4xl font-bold text-[var(--primary-darker)] mb-4">Team-Lunch 🍔</h2>
                <div class="content-text" data-key="team-lunch-text">
                    <p>Jeden Mittwoch gibt es bei uns im Büro ein gemeinsames Mittagessen. Die Kosten dafür übernehmen wir. Wir stimmen uns vorher in der Slack-Gruppe "Team intern & Office" ab. Wenn du dabei sein möchtest, melde dich dort bitte an, damit wir besser planen können. Solltest du nicht im Büro sein, aber trotzdem teilnehmen wollen, schalten wir dich gerne per Video zu – gib uns in diesem Fall bitte mindestens einen Tag vorher Bescheid.</p>
                </div>`;

export default function TeamLunchSection({ slug }: SectionComponentProps) {
  return (
    <section id={slug} className="space-y-6">
      <RichText html={html} />
    </section>
  );
}
