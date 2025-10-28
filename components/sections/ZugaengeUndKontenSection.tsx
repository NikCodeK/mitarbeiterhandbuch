'use client';

import { RichText } from '@/components/sections/RichText';
import type { SectionComponentProps } from '@/components/sections/types';

const html = /* html */ `<h2 class="text-4xl font-bold text-[var(--primary-darker)] mb-4">Zugänge und Konten 🔑</h2>
                <div class="content-text" data-key="zugange-konten-text">
                    <p>Für deine Arbeit bei uns benötigst du Zugriff auf verschiedene Tools. Dein Teamlead hilft dir, alle notwendigen Konten einzurichten.</p>
                    <ul class="list-disc pl-5 space-y-2">
                        <li><strong>Google Workspace:</strong> Dein <strong>Gmail-Konto</strong> ist die Basis für unsere gesamte Kommunikation und Zusammenarbeit.</li>
                        <li><strong>Airtable:</strong> Als unser zentrales Operating Tool benötigst du Zugriff auf <strong>Thierhoff Consulting OS</strong> und das <strong>Team Wiki</strong>.</li>
                        <li><strong>HeyLogin:</strong> Hier werden alle Passwörter sicher verwaltet. Du erhältst hier die Zugangsdaten für alle weiteren Tools.</li>
                        <li><strong>Fillout:</strong> Wenn du direkten Kundenkontakt hast, wirst du mit diesem Tool arbeiten.</li>
                        <li><strong>Google Drive:</strong> Um auf alle wichtigen Dokumente zugreifen zu können, sprich mit deinem Teamlead, welche Ordner für dich relevant sind. Standardmäßig sind das mindestens die Ordner <strong>"3 Projektmanagement"</strong> und <strong>"6 Team intern"</strong>.</li>
                        <li><strong>Chatgruppen:</strong> Eine Übersicht über unsere internen Chatgruppen und welche für dich wichtig sind, findest du im Bereich <strong>"Interne Kommunikation"</strong>.</li>
                    </ul>
                </div>`;

export default function ZugaengeUndKontenSection({ slug }: SectionComponentProps) {
  return (
    <section id={slug} className="space-y-6">
      <RichText html={html} />
    </section>
  );
}
