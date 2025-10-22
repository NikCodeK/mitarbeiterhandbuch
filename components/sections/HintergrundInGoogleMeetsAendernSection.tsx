'use client';

import { RichText } from '@/components/sections/RichText';
import type { SectionComponentProps } from '@/components/sections/types';

const html = /* html */ `<h2 class="text-4xl font-bold text-[var(--primary-darker)] mb-4">Hintergrund in Google Meets ändern 🏞️</h2>
                <div class="content-text" data-key="hintergrund-meets-text">
                    <p>Bei Meetings mit externen Personen, insbesondere mit Kunden, ist die Verwendung des offiziellen Thierhoff Consulting Hintergrunds <strong>verpflichtend</strong>. Dies sorgt für ein einheitliches und professionelles Erscheinungsbild.</p>
                    <ol class="list-decimal pl-5 space-y-2">
                        <li>Bevor du einem Meeting beitrittst, klicke in der Menüansicht unten rechts in deinem Kamerabild auf <strong>"Visuelle Effekte"</strong>.</li>
                        <li>Ein Menü öffnet sich. Unter der zweiten Rubrik <strong>"Wasserzeichen und eigene Hintergründe"</strong> findest du die Option <strong>"Persönlichen Hintergrund hinzufügen"</strong>.</li>
                        <li>Wähle dort den offiziellen Thierhoff Consulting Hintergrund aus.</li>
                    </ol>
                    <p><strong>Wo findest du den internen Hintergrund?</strong> Den Thierhoff Consulting Hintergrund findest du in Google Drive unter dem Pfad <strong>"6 Team intern" → "1 Dokumente" → "GoogleMeets Hintergründe"</strong>.</p>
                    <p><strong>PS:</strong> Nicht wundern, auf deinem eigenen Bildschirm wird der Hintergrund spiegelverkehrt angezeigt. Für alle anderen Teilnehmer ist er aber korrekt zu sehen.</p>
                </div>`;

export default function HintergrundInGoogleMeetsAendernSection({ slug }: SectionComponentProps) {
  return (
    <section id={slug} className="space-y-6">
      <RichText html={html} />
    </section>
  );
}
