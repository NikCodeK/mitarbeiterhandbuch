'use client';

import { RichText } from '@/components/sections/RichText';
import type { SectionComponentProps } from '@/components/sections/types';

const html = /* html */ `<h2 class="text-4xl font-bold text-[var(--primary-darker)] mb-4">Leitfaden für dein Feedback-Gespräch 📝</h2>
                <div class="content-text" data-key="leitfaden-feedback-text">
                    <p>Dieser Leitfaden hilft dir, das Gespräch vorzubereiten und zu strukturieren. Die Idee ist, dass du dir ein bis zweimal pro Jahr Feedback von 3-4 Kolleg*innen einholst.</p>
                    <h3 class="text-2xl font-semibold text-[var(--primary-color)] mt-6 mb-3">Vorbereitung:</h3>
                    <ul class="list-disc pl-5 space-y-2">
                        <li>Wähle Personen, die dich in deiner Arbeit erlebt haben. Das können Teammitglieder oder Kolleg*innen aus anderen Bereichen sein. Es geht um ehrliche Rückmeldung, nicht nur um die von deinen engsten Vertrauten.</li>
                        <li>Die Ergebnisse sind nur für dich. Mache dir während des Gesprächs Notizen.</li>
                    </ul>
                    <h3 class="text-2xl font-semibold text-[var(--primary-color)] mt-8 mb-3">Ablauf des 45-minütigen Gesprächs:</h3>
                    <ul class="list-disc pl-5 space-y-2">
                        <li><strong>Check-in:</strong> Beginnt kurz damit, wie es euch geht.</li>
                        <li><strong>Gesprächsbeginn:</strong> Erkläre, warum du die jeweilige Person für dieses Feedback-Gespräch ausgewählt hast.</li>
                        <li><strong>Feedback-Struktur: Keeps - Ideas - Highlights</strong>
                            <ul class="list-circle pl-5 mt-2">
                                <li><strong>Keeps:</strong> Was funktioniert richtig gut? Was solltest du unbedingt beibehalten? Nenne mindestens 3 konkrete Punkte.</li>
                                <li><strong>Ideas:</strong> Was könntest du besser oder anders machen? Wo siehst du Entwicklungspotenzial? Nenne auch hier mindestens 3 Aspekte.</li>
                                <li><strong>Highlights:</strong> Was macht dich in deiner Arbeit besonders?</li>
                            </ul>
                        </li>
                        <li><strong>Check-out:</strong> Schließt das Gespräch ab, indem ihr kurz darüber sprecht, wie ihr es erlebt habt.</li>
                    </ul>
                    <h3 class="text-2xl font-semibold text-[var(--primary-color)] mt-8 mb-3">Tipps für dein Feedback-Gespräch:</h3>
                    <ul class="list-disc pl-5 space-y-2">
                        <li><strong>Als Feedback-Empfänger:</strong> Höre gut zu und frage nach, ohne dich zu rechtfertigen.</li>
                        <li><strong>Als Feedback-Geber:</strong> Bereite dich auf das Gespräch vor. Sei präzise, respektvoll und habe den Mut, ehrlich zu sein. Vertrauen ist die Basis.</li>
                    </ul>
                </div>`;

export default function LeitfadenFeedbackContentSection({ slug }: SectionComponentProps) {
  return (
    <section id={slug} className="space-y-6">
      <RichText html={html} />
    </section>
  );
}
