'use client';

import { RichText } from '@/components/sections/RichText';
import type { SectionComponentProps } from '@/components/sections/types';

const html = /* html */ `<h2 class="text-4xl font-bold text-[var(--primary-darker)] mb-4">Deutschlandticket 🚌</h2>
                <div class="content-text" data-key="deutschlandticket-text">
                    <p>Als attraktive Zusatzleistung bieten wir dir die Möglichkeit, das <strong>Deutschlandticket</strong> zu nutzen. Damit kannst du den öffentlichen Nahverkehr in ganz Deutschland unbegrenzt nutzen. Wie du das Ticket beantragen kannst, erfährst du von deinem Teamlead.</p>
                    <h3 class="text-2xl font-semibold text-[var(--primary-color)] mt-6 mb-3">Hinweis für Teamleads:</h3>
                    <p>Hier findest du eine Anleitung, wie du ein neues Deutschlandticket-Abonnement anlegst. Bitte nur nach Absprache mit deines ‘Head of’ beantragen!:</p>
                    <ol class="list-decimal pl-5 space-y-2">
                        <li>Logge dich mit dem TC-Account bei der KVB ein. Die Zugangsdaten findest du im Shared-Tresor in Heylogin.</li>
                        <li>Folge anschließend dieser Schritt-für-Schritt-Anleitung: <a href="https://scribehow.com/viewer/Neues_Deutschland-Ticket_Abo_anlegen__6R6UCQRrQJK1sv_QAk0tng" target="_blank" class="text-[var(--primary-color)] hover:underline">Anleitung hier</a></li>
                    </ol>
                </div>`;

export default function DeutschlandticketSection({ slug }: SectionComponentProps) {
  return (
    <section id={slug} className="space-y-6">
      <RichText html={html} />
    </section>
  );
}
