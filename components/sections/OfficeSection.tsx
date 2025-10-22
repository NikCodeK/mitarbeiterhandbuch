'use client';

import { RichText } from '@/components/sections/RichText';
import type { SectionComponentProps } from '@/components/sections/types';

const html = /* html */ `<h2 class="text-4xl font-bold text-[var(--primary-darker)] mb-4">Office 🏢</h2>
                <div class="content-text" data-key="office-rules-text">
                    <p>Büroregeln und Leitlinien für eine angenehme Arbeitsumgebung:</p>
                    <ul class="list-disc pl-5 space-y-2">
                        <li><strong>Arbeitsplätze und Clean Desk Policy:</strong> Es gibt keine fest zugewiesenen Sitzplätze, um Flexibilität zu gewährleisten. Wir bitten jedoch alle Mitarbeitenden, die seltener im Büro sind, die bevorzugten Plätze für Kolleg:innen freizuhalten, die häufiger vor Ort arbeiten. Dies fördert eine faire Nutzung der Ressourcen. Wir legen Wert auf eine konsequente "Clean Desk Policy". Das bedeutet, dass alle Tische nach der Benutzung vollständig aufgeräumt und sauber hinterlassen werden müssen. Persönliche Gegenstände sollten am Ende des Arbeitstages mitgenommen oder in den dafür vorgesehenen Körben verstaut werden, um ein ordentliches und hygienisches Arbeitsumfeld für alle zu gewährleisten.</li>
                        <li><strong>Nutzung der Meetingräume und Telefonboxen:</strong> Die Meetingräume können nicht im Voraus reserviert werden. Wir bitten darum, bei Einzelkundengesprächen oder Telefonaten nach Möglichkeit die dafür vorgesehenen Telefonboxen zu nutzen. Für größere Gesprächsrunden und Team-Meetings sollen die Meetingräume bedarfsgerecht genutzt und nach Beendigung des Termins umgehend für andere Kolleg:innen freigegeben werden. Auch hier ist es unerlässlich, die Räume sauber und ordentlich zu hinterlassen.</li>
                        <li><strong>Küchenbereich und Sauberkeit:</strong> Ein sauberer Küchenbereich ist eine gemeinsame Verantwortung. Bitte räumt die Spülmaschine aus, sobald diese fertig ist, und stellt sie an, wenn sie voll ist. Geschirr sollte entweder direkt in die Spülmaschine gestellt oder umgehend von Hand gespült werden. Die Kaffeemaschine ist ein Herzstück unseres Büros. Wir bitten die Person, die die Kaffeemaschine zuletzt am Freitag benutzt, diese gründlich zu reinigen, um eine hygienische Nutzung für die gesamte nächste Woche sicherzustellen.</li>
                        <li><strong>Haustiere im Büro:</strong> Hunde sind in unserem Büro erlaubt und es wird darum gebeten Streichelpausen einzuhalten. Solltest Du Berührungsängste oder Allergien gegenüber Hunden haben, bitten wir Dich, dies direkt und offen zu kommunizieren. So können sich die Hundebesitzer:innen besser darauf einstellen und Rücksicht nehmen, um ein harmonisches Miteinander für alle zu gewährleisten.</li>
                        <li><strong>Allgemeine Sauberkeit und Hygiene:</strong> Eine externe Reinigungsfirma kommt einmal pro Woche. Sollte jedoch zwischendurch vermehrt Schmutz anfallen, bitten wir alle Mitarbeitenden, diesen umgehend zu beseitigen und für Sauberkeit zu sorgen. Ein sauberes und gepflegtes Büro trägt maßgeblich zum Wohlbefinden und zur Produktivität bei. In den Toiletten müssen die Handtücher eigenständig nachgelegt werden, sofern man diese aufgebraucht hat. Die Toiletten selbst sollten von allen Nutzenden sauber gehalten werden, sodass jede:r diese in einem guten und hygienischen Zustand vorfindet. Ihre Mithilfe ist entscheidend, um ein angenehmes Umfeld für alle zu erhalten.</li>
                    </ul>
                </div>`;

export default function OfficeSection({ slug }: SectionComponentProps) {
  return (
    <section id={slug} className="space-y-6">
      <RichText html={html} />
    </section>
  );
}
