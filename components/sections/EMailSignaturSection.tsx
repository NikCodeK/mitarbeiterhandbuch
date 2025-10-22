'use client';

import { RichText } from '@/components/sections/RichText';
import type { SectionComponentProps } from '@/components/sections/types';

const html = /* html */ `<h2 class="text-4xl font-bold text-[var(--primary-darker)] mb-4">E-Mail-Signatur ✍️</h2>
                <div class="content-text" data-key="email-signatur-text">
                    <p>Deine E-Mail-Signatur wird standardmäßig von uns vorgegeben. Achte bitte darauf, dass deine <strong>Abwesenheitsnotiz (Out of Office)</strong> korrekt eingerichtet ist, damit externe Kontakte informiert sind, wenn du nicht erreichbar bist. Eine genaue Anleitung dazu findest du hier:</p>
                    <div class="flex justify-center my-6">
                        <a href="https://www.loom.com/share/1a76e670e4b547018335c19686b6abad?sid=6102a05b-ebed-4ebd-84d9-8900d592f23c" target="_blank" class="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-full shadow-lg transition duration-300 ease-in-out flex items-center">
                            <svg class="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10 12a2 2 0 100-4 2 2 0 000 4z"></path><path fill-rule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clip-rule="evenodd"></path></svg>
                            Anleitung zur Abwesenheitsnotiz
                        </a>
                    </div>
                </div>`;

export default function EMailSignaturSection({ slug }: SectionComponentProps) {
  return (
    <section id={slug} className="space-y-6">
      <RichText html={html} />
    </section>
  );
}
