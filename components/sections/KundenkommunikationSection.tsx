'use client';

import { RichText } from '@/components/sections/RichText';
import type { SectionComponentProps } from '@/components/sections/types';

const html = /* html */ `<h2 class="text-4xl font-bold text-[var(--primary-darker)] mb-4">Kundenkommunikation 🗣️</h2>
                <div class="content-text" data-key="kundenkommunikation-text">
                    <p>Der Aufbau von starken Kundenbeziehungen ist entscheidend für unseren Erfolg. Jede Interaktion mit einem Kunden ist eine Chance, unsere Expertise und Professionalität unter Beweis zu stellen.</p>
                    <h3 class="text-2xl font-semibold text-[var(--primary-color)] mt-6 mb-3">Grundsätze der Kundenkommunikation:</h3>
                    <ul class="list-disc pl-5 space-y-2">
                        <li><strong>Sei professionell:</strong> Egal ob per E-Mail, Anruf oder im Meeting – deine Haltung sollte immer respektvoll und positiv sein. Jede Interaktion spiegelt unsere hohen Standards wider.</li>
                        <li><strong>Sei persönlich und freundlich:</strong> Baue eine Beziehung auf, indem du persönlich, nett und nahbar auftrittst. Gleichzeitig bleibst du professionell und zielgerichtet in deinem Vorgehen.</li>
                        <li><strong>Sei klar und präzise:</strong> Vermeide Fachjargon, der für den Kunden unverständlich ist. Formuliere deine Botschaften einfach, direkt und verständlich.</li>
                        <li><strong>Höre aktiv zu:</strong> Verstehe die Bedürfnisse und Anliegen des Kunden, indem du aufmerksam zuhörst. Stelle offene Fragen, um Missverständnisse zu vermeiden und die Beziehung zu stärken.</li>
                        <li><strong>Dokumentiere wichtige Informationen:</strong> Halte Absprachen, Entscheidungen und wichtige Erkenntnisse schriftlich fest. Das schafft Klarheit und dient als wichtige Referenz.</li>
                    </ul>
                    <p>Wenn du dir bei der Kommunikation unsicher bist oder Fragen hast, wende dich immer an deinen Teamlead.</p>
                </div>`;

export default function KundenkommunikationSection({ slug }: SectionComponentProps) {
  return (
    <section id={slug} className="space-y-6">
      <RichText html={html} />
    </section>
  );
}
