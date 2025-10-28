'use client';

import { RichText } from '@/components/sections/RichText';
import type { SectionComponentProps } from '@/components/sections/types';

const html = /* html */ `<h2 class="text-4xl font-bold text-[var(--primary-darker)] mb-4">Software und Tools 🛠️</h2>
                <div class="content-text" data-key="software-tools-text">
                    <p>Wir nutzen folgende Programme, um unsere tägliche Arbeit zu erleichtern. Diese und mehr findest du ebenfalls auf der Startseite des Intranets oder für deinen Bereich spezifisch auch unter dem Reiter “Links”:</p>
                    <table class="min-w-full bg-white rounded-lg shadow-md mt-4">
                        <thead>
                            <tr class="bg-[var(--bg-light)] text-[var(--primary-darker)]">
                                <th class="py-3 px-4 text-left font-semibold">Tool</th>
                                <th class="py-3 px-4 text-left font-semibold">Beschreibung</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr class="border-b border-gray-200">
                                <td class="py-3 px-4"><strong>Airtable</strong></td>
                                <td class="py-3 px-4">Unser Operating System - wird als CRM von uns genutzt und wurde eigens für uns angefertigt.</td>
                            </tr>
                            <tr class="border-b border-gray-200 bg-gray-50">
                                <td class="py-3 px-4"><strong>Google Workspace</strong></td>
                                <td class="py-3 px-4">Die Grundlage unserer internen Kommunikation (Gmail, Drive, Docs, etc.).</td>
                            </tr>
                            <tr class="border-b border-gray-200">
                                <td class="py-3 px-4"><strong>HeyLogin</strong></td>
                                <td class="py-3 px-4">Unser Tool zur sicheren Passwortverwaltung.</td>
                            </tr>
                            <tr class="border-b border-gray-200 bg-gray-50">
                                <td class="py-3 px-4"><strong>tl;dv</strong></td>
                                <td class="py-3 px-4">Wird für die Aufnahme von Meeting-Mitschriften genutzt.</td>
                            </tr>
                            <tr class="border-b border-gray-200">
                                <td class="py-3 px-4"><strong>Fillout</strong></td>
                                <td class="py-3 px-4">Zum Erstellen von Formularen für Kunden.</td>
                            </tr>
                            <tr class="bg-gray-50">
                                <td class="py-3 px-4"><strong>Monday</strong></td>
                                <td class="py-3 px-4">Wird im Projektmanagement-Bereich genutzt.</td>
                            </tr>
                        </tbody>
                    </table>
                    <p class="mt-4">Für weitere spezifische Zugänge oder Tools, die du für deine Arbeit benötigst, sprich bitte mit deinem <strong>Teamlead</strong>.</p>
                </div>`;

export default function SoftwareUndToolsSection({ slug }: SectionComponentProps) {
  return (
    <section id={slug} className="space-y-6">
      <RichText html={html} />
    </section>
  );
}
