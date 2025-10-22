'use client';

import { RichText } from '@/components/sections/RichText';
import type { SectionComponentProps } from '@/components/sections/types';

const html = /* html */ `<h2 class="text-4xl font-bold text-[var(--primary-darker)] mb-4">Peer-Feedback im Team 👋</h2>
                <div class="content-text" data-key="peer-feedback-text">
                    <p>Wir führen 1-3 Mal pro Jahr Feedback-Gespräche im Team. Das Ziel ist es, voneinander zu lernen und uns gemeinsam weiterzuentwickeln. Die Informationen im Drive findest Du hier: <a href="https://drive.google.com/drive/folders/11TKbMWTdVrXtUdTNhp0sfHn9WpzAU7V7" class="text-[var(--primary-color)] hover:underline">7 1:1 Feedback</a>.</p>
                    <h4 class="text-xl font-medium text-[var(--primary-lighter)] mt-4 mb-2">So funktioniert es:</h4>
                    <ul class="list-disc pl-5 space-y-2">
                        <li>Wähle drei Kolleg*innen aus, mit denen du dich austauschen möchtest.</li>
                        <li>Vereinbare einen 20-minütigen Termin. Ob persönlich, bei einem Spaziergang oder digital – das liegt ganz bei euch.</li>
                    </ul>
                    <h4 class="text-xl font-medium text-[var(--primary-lighter)] mt-4 mb-2">Wichtige Grundsätze:</h4>
                    <ul class="list-disc pl-5 space-y-2">
                        <li><strong>Vertraulich:</strong> Was besprochen wird, bleibt zwischen euch beiden.</li>
                        <li><strong>Ehrlich und konstruktiv:</strong> Feedback sollte immer wohlwollend, positiv und ermutigend sein.</li>
                        <li><strong>Ich-Botschaften:</strong> Nutze Sätze wie "Ich nehme wahr, dass...", um deine Rückmeldung zu formulieren.</li>
                        <li><strong>Konkrete Beispiele:</strong> Gib Situationen an, die deine Rückmeldung verdeutlichen.</li>
                    </ul>
                </div>`;

export default function PeerFeedbackContentSection({ slug }: SectionComponentProps) {
  return (
    <section id={slug} className="space-y-6">
      <RichText html={html} />
    </section>
  );
}
