'use client';

import { RichText } from '@/components/sections/RichText';
import type { SectionComponentProps } from '@/components/sections/types';

const html = /* html */ `<h2 class="text-4xl font-bold text-[var(--primary-darker)] mb-4">Arbeitszeiterfassung ⏰</h2>
                <div class="content-text" data-key="arbeitszeiterfassung-text">
                    <p>Für eine präzise und gesetzeskonforme Arbeitszeiterfassung ist es unerlässlich, kundenspezifische Anforderungen zu berücksichtigen. Ein zentraler Aspekt hierbei ist die korrekte Erfassung von Pausenzeiten.</p>
                    <h3 class="text-2xl font-semibold text-[var(--primary-color)] mt-6 mb-3">Pausenzeiten: Gesetzliche Vorgaben und deren Umsetzung</h3>
                    <p>Gemäß den gesetzlichen Bestimmungen muss die Arbeitszeit durch definierte Pausen unterbrochen werden, um die Gesundheit und das Wohlbefinden der Mitarbeiter zu gewährleisten. Konkret bedeutet dies:</p>
                    <ul class="list-disc pl-5 space-y-2">
                        <li><strong>Nach 6 Stunden Arbeitszeit:</strong> Es muss eine Pause von mindestens 30 Minuten gewährt werden.</li>
                        <li><strong>Nach 9 Stunden Arbeitszeit:</strong> Die Gesamtpausenzeit muss sich auf mindestens 45 Minuten erhöhen. Dies kann entweder durch eine einzelne 45-minütige Pause oder durch eine Kombination von Pausen erfolgen (z.B. 30 Minuten und weitere 15 Minuten).</li>
                    </ul>
                    <p>Diese Pausenzeiten müssen exakt erfasst und dokumentiert werden, um sowohl den gesetzlichen Anforderungen zu genügen als auch eine transparente Abrechnung der Arbeitsstunden zu ermöglichen.</p>
                    <h3 class="text-2xl font-semibold text-[var(--primary-color)] mt-8 mb-3">Dokumentation der Tätigkeiten: Transparenz und Nachvollziehbarkeit</h3>
                    <p>Ein weiterer wichtiger Punkt ist die detaillierte Dokumentation der ausgeführten Tätigkeiten. Es ist von entscheidender Bedeutung, dass jeder Mitarbeiter präzise festhält, welche Aufgaben in welchem Zeitraum erledigt wurden. Dies dient mehreren Zwecken:</p>
                    <ul class="list-disc pl-5 space-y-2">
                        <li><strong>Nachvollziehbarkeit:</strong> Es wird transparent, welche Leistungen erbracht wurden, was besonders bei der Abrechnung von Projekten / Einstufung von Kunden relevant ist.</li>
                        <li><strong>Effizienzsteigerung:</strong> Eine genaue Dokumentation kann helfen, Arbeitsabläufe zu analysieren und Optimierungspotenziale zu identifizieren.</li>
                        <li><strong>Qualitätssicherung:</strong> Bei späteren Rückfragen oder Problemen kann schnell nachvollzogen werden, welche Schritte unternommen wurden.</li>
                    </ul>
                    <h3 class="text-2xl font-semibold text-[var(--primary-color)] mt-8 mb-3">Standardisierung der Prozesse: Einheitlichkeit für alle Mitarbeiter</h3>
                    <p>Um eine konsistente und faire Arbeitszeiterfassung zu gewährleisten, ist eine Standardisierung der internen Prozesse unerlässlich. Dies bedeutet, dass die Regeln und Richtlinien für die Zeiterfassung und Tätigkeitsdokumentation für jeden Mitarbeiter identisch sein müssen. Eine einheitliche Vorgehensweise bietet folgende Vorteile:</p>
                    <ul class="list-disc pl-5 space-y-2">
                        <li><strong>Gleichbehandlung:</strong> Alle Mitarbeiter werden nach denselben Kriterien beurteilt und abgerechnet.</li>
                        <li><strong>Fehlerreduzierung:</strong> Klare und einheitliche Prozesse minimieren Missverständnisse und Fehler bei der Zeiterfassung.</li>
                        <li><strong>Einfache Einarbeitung:</strong> Neue Mitarbeiter können sich leichter in ein etabliertes und standardisiertes System einfinden.</li>
                        <li><strong>Compliance:</strong> Eine Standardisierung erleichtert die Einhaltung gesetzlicher Vorschriften und interner Richtlinien.</li>
                    </ul>
                    <p>Konkret bedeutet dies, dass die <strong>Stunden</strong> in TellenHR explizit auf den dafür vorgesehenen <strong>Kundencode gebucht</strong> werden. Sofern <strong>Arbeiten</strong> in einem <strong>spezifischen Projekt</strong> anfallen, sollten diese auf die <strong>Projektcodes</strong> des Kunden gebucht werden. Zu jeder Buchung soll in kurzen <strong>Stichpunkten ein Hinweis vermerkt</strong> werden, um nachvollziehen zu können, welche Buchung mit welchen Tätigkeiten korrespondiert.</p>
                </div>`;

export default function ArbeitszeiterfassungSection({ slug }: SectionComponentProps) {
  return (
    <section id={slug} className="space-y-6">
      <RichText html={html} />
    </section>
  );
}
