'use client';

import { RichText } from '@/components/sections/RichText';
import type { SectionComponentProps } from '@/components/sections/types';

const html = /* html */ `<h2 class="text-4xl font-bold text-[var(--primary-darker)] mb-4">Urlaubstage 🏖️</h2>
                <div class="content-text" data-key="urlaubstage-text">
                    <p>Die aktuelle Fassung unserer Urlaubstage findest Du im Drive unter diesem <a href="https://docs.google.com/document/d/19M28FraNJMq-32t1wUqtR5ydAn2mOEWZI0-5ujJjPkk/edit?tab=t.0" class="text-[var(--primary-color)] hover:underline">Link</a>.</p>
                    <p>Jahresurlaub ist geplant für das gesamte Jahr und soll in diesem Jahr genutzt werden.</p>
                    <h3 class="text-2xl font-semibold text-[var(--primary-color)] mt-6 mb-3">Geschenkte Feiertage:</h3>
                    <ul class="list-disc pl-5 space-y-2">
                        <li>Weiberfastnacht (½ Tag)</li>
                        <li>Rosenmontag (1 Tag)</li>
                        <li>Heiligabend (1 Tag)</li>
                        <li>Silvester (½ Tag)</li>
                    </ul>
                    <h3 class="text-2xl font-semibold text-[var(--primary-color)] mt-6 mb-3">Sonderurlaubstage:</h3>
                    <ul class="list-disc pl-5 space-y-2">
                        <li>Eigene Hochzeit (1 Tag)</li>
                        <li>Verlust eines nahen Angehörigen (1. Grad) (1 Tag)</li>
                        <li>Umzug (½ Tag)</li>
                    </ul>
                    <p>Geschenkte Feiertage werden in TellentHR bei der Beantragung von Urlaub automatisch berücksichtigt.</p>
                    <p>Sonderurlaubstage können über den neuen Abwesenheitsmodus “Sonderurlaub” beantragt werden.</p>
                    <p>Weiterer Bedarf für freie Zeit wird über Überstunden und Urlaub berücksichtigt und nach Möglichkeit sehr flexibel und auch kurzfristig ermöglicht. Zusätzlicher Bedarf an freier Zeit, der über den regulären Urlaub hinausgeht, kann durch Überstunden ausgeglichen werden, die dann in Freizeit umgewandelt werden können. Wir sind bestrebt, diese zusätzlichen Freizeitanträge so flexibel wie möglich zu handhaben, und werden auch kurzfristige Anfragen nach Möglichkeit berücksichtigen.</p>
                </div>`;

export default function UrlaubstageSection({ slug }: SectionComponentProps) {
  return (
    <section id={slug} className="space-y-6">
      <RichText html={html} />
    </section>
  );
}
