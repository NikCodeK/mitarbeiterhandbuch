'use client';

import { RichText } from '@/components/sections/RichText';
import type { SectionComponentProps } from '@/components/sections/types';

const html = /* html */ `<h2 class="text-4xl font-bold text-[var(--primary-darker)] mb-4">Interne Kommunikation 💬</h2>
                <div class="content-text" data-key="interne-kommunikation-intro-text">
                    <p>Für unsere interne Kommunikation nutzen wir <strong>Google Chat</strong>. So bleiben wir schnell und direkt im Austausch.</p>
                    <p>Bitte vermeide interne E-Mails. Wir nutzen sie nur bei Weiterleitungen oder bei Themen, in denen der gesamte E-Mail-Verlauf für das Verständnis eines Themas notwendig ist.</p>
                    <p>Auch wichtig: Wenn es um Aufgaben geht, erstelle sie bitte immer direkt in dem dafür vorgesehenen Gruppenchat und signiere sie mit deinem Kürzel, damit man weiß von wem die Aufgabe kommt. Schreib sie nicht einfach in einen Chat, da sie dort schnell untergehen. Sobald Aufgaben als ToDo im Gruppenchat vermerkt sind, tauchen diese auch in deiner privaten ToDo Liste auf und du verlierst nie den Überblick.</p>
                </div>
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
                    <button class="sub-category-button nested" data-target="ordnerverteilung-in-googledrive">Ordnerverteilung in GoogleDrive 📁</button>
                    <button class="sub-category-button nested" data-target="chatgruppen">Chatgruppen 👥</button>
                    <button class="sub-category-button nested" data-target="e-mail-postfach">E-Mail-Postfach 📧</button>
                    <button class="sub-category-button nested" data-target="e-mail-signatur">E-Mail-Signatur ✍️</button>
                </div>`;

export default function InterneKommunikationSection({ slug }: SectionComponentProps) {
  return (
    <section id={slug} className="space-y-6">
      <RichText html={html} />
    </section>
  );
}
