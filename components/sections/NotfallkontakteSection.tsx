'use client';

import { RichText } from '@/components/sections/RichText';
import type { SectionComponentProps } from '@/components/sections/types';

const html = /* html */ `<h2 class="text-4xl font-bold text-[var(--primary-darker)] mb-4">Notfallkontakte 🚨</h2>
                <div class="content-text" data-key="notfallkontakte-text">
                    <p>Hier findest du eine Liste der wichtigsten Ansprechpartner für spezifische Themen:</p>
                    <table class="min-w-full bg-white rounded-lg shadow-md mt-4">
                        <thead>
                            <tr class="bg-[var(--bg-light)] text-[var(--primary-darker)]">
                                <th class="py-3 px-4 text-left font-semibold">Thema</th>
                                <th class="py-3 px-4 text-left font-semibold">Ansprechpartner</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr class="border-b border-gray-200">
                                <td class="py-3 px-4"><strong>IT-Fragen</strong></td>
                                <td class="py-3 px-4">Konstantin</td>
                            </tr>
                            <tr class="border-b border-gray-200 bg-gray-50">
                                <td class="py-3 px-4"><strong>KI & technische Ideen</strong></td>
                                <td class="py-3 px-4">Nick</td>
                            </tr>
                            <tr class="border-b border-gray-200">
                                <td class="py-3 px-4"><strong>HR-Fragen</strong></td>
                                <td class="py-3 px-4">Dein Teamlead & Ramona</td>
                            </tr>
                            <tr class="border-b border-gray-200 bg-gray-50">
                                <td class="py-3 px-4"><strong>Partnerprogramm</strong></td>
                                <td class="py-3 px-4">Carolin</td>
                            </tr>
                            <tr class="border-b border-gray-200">
                                <td class="py-3 px-4"><strong>Abrechnung & Krankmeldungen</strong></td>
                                <td class="py-3 px-4">Elke</td>
                            </tr>
                            <tr class="bg-gray-50">
                                <td class="py-3 px-4"><strong>Urlaub, Abstimmungen & operative Themen</strong></td>
                                <td class="py-3 px-4">Dein Teamlead</td>
                            </tr>
                        </tbody>
                    </table>
                </div>`;

export default function NotfallkontakteSection({ slug }: SectionComponentProps) {
  return (
    <section id={slug} className="space-y-6">
      <RichText html={html} />
    </section>
  );
}
