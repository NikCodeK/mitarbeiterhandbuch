'use client';

import { RichText } from '@/components/sections/RichText';
import type { SectionComponentProps } from '@/components/sections/types';

const html = /* html */ `<h2 class="text-4xl font-bold text-[var(--primary-darker)] mb-4">Airtable 📊</h2>
                <div class="content-text" data-key="airtable-text">
                    <p>Airtable ist das zentrale Tool, mit dem wir bei TC arbeiten. Es ist die Basis für alle unsere Kernprozesse – von <strong>Sales, Projektmanagement, Research & Development</strong>, <strong>Financial Consultants</strong> bis hin zu den <strong>Abrufen</strong> und den gesamten <strong>Finance-Prozessen</strong>. Airtable hilft uns, effizient und transparent zusammenzuarbeiten.</p>
                    <p>Jeder <strong>Teamlead</strong> ist für seinen spezifischen Bereich in Airtable verantwortlich. Dazu gehört auch die Koordination von Automatisierungen mit anderen Abteilungen, um einen reibungslosen Workflow zu garantieren.</p>
                    <p>Wenn du <strong>Feedback, Verbesserungsvorschläge oder Wünsche</strong> hast, wende dich bitte immer zuerst an deinen <strong>Teamlead</strong>. So stellen wir sicher, dass alle Anliegen koordiniert und effektiv umgesetzt werden können.</p>
                </div>`;

export default function AirtableSection({ slug }: SectionComponentProps) {
  return (
    <section id={slug} className="space-y-6">
      <RichText html={html} />
    </section>
  );
}
