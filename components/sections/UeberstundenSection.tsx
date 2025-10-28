'use client';

import { RichText } from '@/components/sections/RichText';
import type { SectionComponentProps } from '@/components/sections/types';

const html = /* html */ `<h2 class="text-4xl font-bold text-[var(--primary-darker)] mb-4">Überstunden ⏳</h2>
                <div class="content-text" data-key="ueberstunden-text">
                    <p>Wir legen Wert auf eine gesunde Work-Life-Balance und möchten, dass Überstunden die Ausnahme bleiben. Wir bitten dich, Überstunden so schnell wie möglich abzubauen. Das sorgt nicht nur für einen besseren Ausgleich, sondern hilft auch bei der Planung im Team.</p>
                    <p>Es dürfen maximal Überstunden im Umfang einer Arbeitswoche gesammelt werden (Vollzeit: max. 40 Stunden, Teilzeit: reguläre Wochenstunden). Diese Überstunden können eigenverantwortlich abgebaut werden, solange das operative Geschäft nicht beeinträchtigt wird. Bitte beachte dabei folgende Regelungen.</p>
                    <ol class="list-decimal pl-5 space-y-2">
                        <li><strong>Regelung für Überstunden unter der Wochenstundenanzahl</strong><br>Können eigenverantwortlich abgebaut werden, sofern das operative Geschäft nicht beeinträchtigt wird. Sofern der Überstundenabbau einen Arbeitstag oder mehr beinhaltet, muss dieser Ausgleich mit dem Team-Lead abgestimmt werden und ein Überstundenausgleich Antrag über TellentHR gestellt werden.</li>
                    </ol>
                    <p>Sollten mehr als die genannte Anzahl an Überstunden anfallen, muss dies <strong>vorab</strong> mit deinem Teamlead abgestimmt werden.</p>
                    <ol start="2" class="list-decimal pl-5 space-y-2">
                        <li><strong>Regelung für Überstunden über der Wochenstundenanzahl</strong><br>Muss vorab mit dem Teamlead abgestimmt werden und nur nach Abstimmung dürfen mehr Stunden gesammelt werden. Wenn Du Überstundenfrei beantragen möchtest, muss dies ausschließlich über unser HR-Tool TellenHR beantragt und von deinem Team-Lead freigegeben werden.</li>
                    </ol>
                    <p>Bitte kommuniziere dies frühzeitig, damit wir gemeinsam die beste Lösung finden können.</p>
                </div>`;

export default function UeberstundenSection({ slug }: SectionComponentProps) {
  return (
    <section id={slug} className="space-y-6">
      <RichText html={html} />
    </section>
  );
}
