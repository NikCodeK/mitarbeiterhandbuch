'use client';

import { RichText } from '@/components/sections/RichText';
import type { SectionComponentProps } from '@/components/sections/types';

const html = /* html */ `<h2 class="text-4xl font-bold text-[var(--primary-darker)] mb-4">Krankheit 🤒</h2>
    <div class="content-text" data-key="krankheit-text">
        <h3 class="text-2xl font-semibold text-[var(--primary-color)] mt-6 mb-3">Was tun, wenn du krank bist?</h3>
        <p>Deine Gesundheit hat bei uns oberste Priorität. Solltest du einmal krankheitsbedingt ausfallen, sind die folgenden Schritte zu beachten. So stellen wir sicher, dass alle wichtigen Informationen fließen und der Betriebsablauf so reibungslos wie möglich weiterläuft.</p>
        
        <div class="space-y-6 mt-6">
            <div>
                <h4 class="text-lg font-bold">1. Dein Team informieren und Aufgaben übergeben</h4>
                <p class="mt-2">Bitte informiere so früh wie möglich, idealerweise noch vor deinem regulären Arbeitsbeginn, deine direkten Kolleg:innen und deinen Lead über deine Abwesenheit. Eine kurze Nachricht per Chat ist ausreichend. So können sich deine Kolleg:innen organisieren und wichtige Aufgaben übernehmen.</p>
                <ul class="list-disc pl-5 mt-2 space-y-1">
                    <li>Bitte gib ihnen dabei auch relevante inhaltliche Hinweise zu deinen dringendsten Projekten und Kunden.</li>
                    <li>Übergebe deine Termine entweder oder sage diese selbst ab.</li>
                    <li>Dein Fokus liegt auf deiner Genesung, du sollst während einer Krankheit nicht arbeiten.</li>
                </ul>
            </div>


            <div>
                <h4 class="text-lg font-bold">2. Personalbuchhaltung benachrichtigen und AU Bescheinigung einreichen</h4>
                <p class="mt-2">Neben deinem Team ist die Personalbuchhaltung eine wichtige Anlaufstelle. Bitte schicke am ersten Tag deiner Arbeitsunfähigkeit eine E-Mail an <a href="mailto:buchhaltung@thierhoff-consulting.de" class="text-[var(--primary-color)] hover:underline">buchhaltung@thierhoff-consulting.de</a>.</p>
                <ul class="list-disc pl-5 mt-2 space-y-1">
                    <li>Gib darin den ersten Krankheitstag und die voraussichtliche Dauer deiner Abwesenheit an.</li>
                    <li>Bei einer Verlängerung der Krankschreibung informiere die Buchhaltung bitte umgehend erneut.</li>
                    <li>Ab dem 1. Fehltag (bzw. gem. Arbeitsvertrag) ist eine Arbeitsunfähigkeitsbescheinigung (AU) erforderlich, reiche diese notfalls nach.</li>
                    <li><strong>Elektronische AU (eAU):</strong> Falls du eine elektronische AU erhältst, teile dies bitte der Personalbuchhaltung mit. Sie kann die eAU direkt von deiner Krankenkasse abrufen.</li>
                    <li><strong>Papierform:</strong> Wenn du die AU in Papierform bekommst, scanne sie bitte ein und füge sie der Mail bei. Das Original bewahre bitte gut auf.</li>
                </ul>
            </div>


            <div>
                <h4 class="text-lg font-bold">3. Abwesenheit in tellentHR erfassen</h4>
                <p class="mt-2">Um eine korrekte Stundenabrechnung sicherzustellen, ist es unerlässlich, dass du deine Abwesenheit auch in unserem HR-System tellentHR einträgst.</p>
                <ul class="list-disc pl-5 mt-2 space-y-1">
                    <li>Trage deine Abwesenheit bitte so schnell wie möglich als „Krank“ ein.</li>
                    <li>Wird deine Abwesenheit nicht explizit in tellentHR erfasst, werden deine Krankheitsstunden nicht erfasst und dein Soll nicht erreicht.</li>
                </ul>
            </div>
        </div>


        <p class="mt-6">Mit diesen Schritten stellst du sicher, dass deine Abwesenheit korrekt kommuniziert, dokumentiert und verarbeitet wird. Wir wünschen dir gute Besserung und schnelle Genesung!</p>
    </div>`;

export default function KrankheitSection({ slug }: SectionComponentProps) {
  return (
    <section id={slug} className="space-y-6">
      <RichText html={html} />
    </section>
  );
}
