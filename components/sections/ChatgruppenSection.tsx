'use client';

import { RichText } from '@/components/sections/RichText';
import type { SectionComponentProps } from '@/components/sections/types';

const html = /* html */ `<h2 class="text-4xl font-bold text-[var(--primary-darker)] mb-4">Chatgruppen 👥</h2>
                <div class="content-text" data-key="chatgruppen-text">
                    <h3 class="text-2xl font-semibold text-[var(--primary-color)] mt-6 mb-3">Unsere Chatgruppen und ihre Nutzung</h3>
                    <p>Um die Kommunikation im Team effizient zu gestalten, nutzen wir verschiedene Chatgruppen. Hier ist eine Übersicht, wofür die wichtigsten Gruppen gedacht sind:</p>
                    <h4 class="text-xl font-medium text-[var(--primary-lighter)] mt-4 mb-2">Für alle:</h4>
                    <ul class="list-disc pl-5 space-y-2">
                        <li><strong>Team intern & Office:</strong> Hier besprechen wir alle teaminternen und Office-bezogenen Themen. Dazu gehören Team-Lunch, Krankmeldungen, Geburtstagswünsche und allgemeine Bürorichtlinien.</li>
                        <li><strong>Announcements:</strong> In dieser Gruppe teilt unser Sekretariat per Automatisierung wichtige Anrufe, indem betroffene Personen direkt verlinkt werden sollten. Außerdem werden hier erfolgreich abgeschlossene Sales-Projekte und andere wichtige Neuigkeiten für alle kommuniziert.</li>
                        <li><strong>Kundenabwicklung:</strong> Hier werden alle eingereichten Anträge, Nachforderungen sowie positive und teilweise positive Bescheide und Abrufe geteilt.</li>
                        <li><strong>Continuous Improvement:</strong> Deine Vorschläge für Prozess- und Tool-Verbesserungen sind hier willkommen.</li>
                        <li><strong>AI Playground:</strong> Dieser Chat ist für alle, die sich mit KI beschäftigen. Hier tauschen wir uns über technische Ideen, Kreativität und Vorschläge zur Arbeitserleichterung aus.</li>
                    </ul>
                    <h4 class="text-xl font-medium text-[var(--primary-lighter)] mt-4 mb-2">Spezifische Gruppen:</h4>
                    <ul class="list-disc pl-5 space-y-2">
                        <li><strong>Projektmanagement:</strong> Dies ist der zentrale Chat für <strong>Projektmanager, R&D-, Financial- und Abruf-Consultants</strong>. Hier werden alle kundenspezifischen Themen besprochen.</li>
                        <li><strong>R&D und PM:</strong> Speziell für <strong>R&D- und Projektmanager</strong>. Hier werden inhaltliche Details für die Antragstellung geklärt.</li>
                        <li><strong>Systems Engineering:</strong> Dieser Chat ist für <strong>Teamleads und Airtable-Operatoren</strong>. Hier werden IT-Anliegen und technische Probleme besprochen.</li>
                        <li><strong>Textcheck:</strong> Diese Gruppe ist ausschließlich für <strong>R&D-Mitarbeiter</strong> gedacht, um sich über inhaltliche Prüfungen von Kundentexten auszutauschen.</li>
                    </ul>
                    <p>Für Veranstaltungen wie <strong>Messen oder Offsites</strong> erstellen wir jeweils eine eigene, temporäre Chatgruppe.</p>
                    <p>Damit unsere Chatgruppen übersichtlich bleiben, antworte auf Nachrichten bitte <strong>innerhalb einer Unterhaltung</strong>. Klick dazu einfach auf die entsprechende Nachricht, um einen separaten Chat zu öffnen. So bleibt der Haupt-Chat sauber und alle Themen sind klar voneinander getrennt.</p>
                </div>`;

export default function ChatgruppenSection({ slug }: SectionComponentProps) {
  return (
    <section id={slug} className="space-y-6">
      <RichText html={html} />
    </section>
  );
}
