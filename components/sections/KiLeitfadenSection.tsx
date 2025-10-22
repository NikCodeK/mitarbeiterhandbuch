'use client';

import { RichText } from '@/components/sections/RichText';
import type { SectionComponentProps } from '@/components/sections/types';

const html = /* html */ `<h2 class="text-4xl font-bold text-[var(--primary-darker)] mb-4">KI-Leitfaden 🤖</h2>
                <div class="content-text" data-key="ki-leitfaden-text">
                    <p>Willkommen im Zeitalter der künstlichen Intelligenz (KI)! Dieser Leitfaden soll dir zeigen, wie du KI in deinem Arbeitsalltag nutzen kannst, um effizienter und kreativer zu sein. Keine Sorge, du brauchst kein Technikexperte zu sein. Wir zeigen dir einfache Anwendungen und geben dir Tipps für gute Prompts, damit du das Beste aus KI herausholen kannst.</p>
                    <h3 class="text-2xl font-semibold text-[var(--primary-color)] mt-6 mb-3">Was ist KI und warum ist sie nützlich für dich?</h3>
                    <p>KI ist wie ein intelligenter Assistent, der dir bei vielen Aufgaben helfen kann. Sie kann Texte zusammenfassen, Ideen generieren, Daten analysieren und vieles mehr. Stell dir vor, du hättest einen Mitarbeiter, der 24/7 verfügbar ist und dir bei Routineaufgaben hilft, damit du dich auf die wirklich wichtigen Dinge konzentrieren kannst.</p>
                    <h3 class="text-2xl font-semibold text-[var(--primary-color)] mt-8 mb-3">Anwendungsbeispiele im Wissensarbeiter-Alltag</h3>
                    <ul class="list-disc pl-5 space-y-2">
                        <li><strong>E-Mail-Management:</strong> KI kann dir helfen, E-Mails zu priorisieren, Entwürfe zu erstellen oder sogar Antworten zu formulieren.</li>
                        <li><strong>Recherche und Informationsbeschaffung:</strong> Nutze KI, um schnell relevante Informationen zu finden und zusammenzufassen.</li>
                        <li><strong>Texterstellung und -bearbeitung:</strong> KI kann dir helfen, Texte zu schreiben, zu überarbeiten oder zu übersetzen.</li>
                        <li><strong>Ideenfindung und Brainstorming:</strong> KI kann dir neue Perspektiven und kreative Ideen liefern.</li>
                        <li><strong>Datenanalyse und Berichterstellung:</strong> KI kann große Datenmengen analysieren und Berichte erstellen.</li>
                    </ul>
                    <h3 class="text-2xl font-semibold text-[var(--primary-color)] mt-8 mb-3">How to Prompt</h3>
                    <p>Ein guter Prompt ist der Schlüssel zur erfolgreichen Nutzung von KI. Hier ist eine bewährte Struktur:</p>
                    <pre class="bg-gray-100 p-4 rounded-md text-sm whitespace-pre-wrap"><code># Role and Objective Definiere deine Rolle und das Ziel des Prompts.
# Instructions Gib klare Anweisungen, was die KI tun soll.
## Sub-categories for more detailed instructions Unterteile komplexe Anweisungen in kleinere Schritte.
# Reasoning Steps Beschreibe die Denkweise, die die KI anwenden soll.
# Output Format Gib an, welches Format das Ergebnis haben soll (z.B. Liste, Text, Tabelle).
# Examples Füge Beispiele hinzu, um die Anweisungen zu verdeutlichen.
## Example 1 Kontext und spezifische Anweisungen für das Beispiel.
# Final instructions and prompt to think step by step Abschließende Anweisungen und Aufforderung, Schritt für Schritt vorzugehen.
                    </code></pre>
                    <p>oder nutze Lyra, um deine Prompts besser zu machen. So gehts: Einfach den Text im Folgenden kopieren, in die KI einfügen und Nachricht senden und dann auf die Fragen antworten. So einfach:</p>
                    <pre class="bg-gray-100 p-4 rounded-md text-sm whitespace-pre-wrap"><code>“You are Lyra, a master-level AI prompt optimization specialist. Your mission: transform any user input into precision-crafted prompts that unlock AI's full potential across all platforms.
## THE 4-D METHODOLOGY


### 1. DECONSTRUCT
- Extract core intent, key entities, and context
- Identify output requirements and constraints
- Map what's provided vs. what's missing
### 2. DIAGNOSE
- Audit for clarity gaps and ambiguity
- Check specificity and completeness
- Assess structure and complexity needs
### 3. DEVELOP
- Select optimal techniques based on request type:
  - *Creative* → Multi-perspective + tone emphasis
  - *Technical* → Constraint-based + precision focus
  - *Educational* → Few-shot examples + clear structure
  - *Complex* → Chain-of-thought + systematic frameworks
- Assign appropriate AI role/expertise
- Enhance context and implement logical structure


### 4. DELIVER
- Construct optimized prompt
- Format based on complexity
- Provide implementation guidance


## OPTIMIZATION TECHNIQUES


*Foundation:* Role assignment, context layering, output specs, task decomposition
*Advanced:* Chain-of-thought, few-shot learning, multi-perspective analysis, constraint optimization
*Platform Notes:*
- *ChatGPT/GPT-4:* Structured sections, conversation starters
- *Claude:* Longer context, reasoning frameworks
- *Gemini:* Creative tasks, comparative analysis
- *Others:* Apply universal best practices


## OPERATING MODES


*DETAIL MODE:* - Gather context with smart defaults
- Ask 2-3 targeted clarifying questions
- Provide comprehensive optimization


*BASIC MODE:*
- Quick fix primary issues
- Apply core techniques only
- Deliver ready-to-use prompt


## RESPONSE FORMATS


*Simple Requests:*


**Your Optimized Prompt:**
[Improved prompt]


**What Changed:** [Key improvements]


*Complex Requests:*
**Your Optimized Prompt:**
[Improved prompt]
**Key Improvements:**
• [Primary changes and benefits]


**Techniques Applied:** [Brief mention]


**Pro Tip:** [Usage guidance]


## WELCOME MESSAGE (REQUIRED)
When activated, display EXACTLY:
"Hello! I'm Lyra, your AI prompt optimizer. I transform vague requests into precise, effective prompts that deliver better results.


*What I need to know:*
- *Target AI:* ChatGPT, Claude, Gemini, or Other
- *Prompt Style:* DETAIL (I'll ask clarifying questions first) or BASIC (quick optimization)
*Examples:*
- "DETAIL using ChatGPT — Write me a marketing email"
- "BASIC using Claude — Help with my resume"
Just share your rough prompt and I'll handle the optimization!"


## PROCESSING FLOW


1. Auto-detect complexity:
   - Simple tasks → BASIC mode
   - Complex/professional → DETAIL mode
2. Inform user with override option
3. Execute chosen mode protocol
4. Deliver optimized prompt


*Memory Note:* Do not save any information from optimization sessions to memory.
From here on write everything in german”
                    </code></pre>
                    <h3 class="text-2xl font-semibold text-[var(--primary-color)] mt-8 mb-3">Weitere Beispiele</h3>
                    <h4 class="text-xl font-medium text-[var(--primary-lighter)] mt-4 mb-2">Beispiel 1: Zusammenfassung eines langen Artikels</h4>
                    <pre class="bg-gray-100 p-4 rounded-md text-sm whitespace-pre-wrap"><code># Role and Objective Du bist ein Zusammenfassungsassistent.
# Instructions Fasse den folgenden Artikel in 3-5 Sätzen zusammen.
# Output Format Kurze Zusammenfassung in Aufzählungsform.
# Examples ## Example 1 Artikel: [Hier den Artikel einfügen]
# Final instructions and prompt to think step by step Lies den Artikel sorgfältig und fasse die wichtigsten Punkte zusammen. Gehe Schritt für Schritt vor.
                    </code></pre>
                    <h4 class="text-xl font-medium text-[var(--primary-lighter)] mt-4 mb-2">Beispiel 2: Ideen für einen Social-Media-Post</h4>
                    <pre class="bg-gray-100 p-4 rounded-md text-sm whitespace-pre-wrap"><code># Role and Objective Du bist ein Social-Media-Experte.
# Instructions Generiere 5 Ideen für einen Social-Media-Post zum Thema "Nachhaltigkeit".
# Output Format Liste mit 5 Ideen.
# Final instructions and prompt to think step by step Denke kreativ und berücksichtige die Zielgruppe.
                    </code></pre>
                    <h3 class="text-2xl font-semibold text-[var(--primary-color)] mt-8 mb-3">Tipps und Tricks</h3>
                    <ul class="list-disc pl-5 space-y-2">
                        <li>Sei präzise in deinen Prompts.</li>
                        <li>Experimentiere mit verschiedenen Formulierungen.</li>
                        <li>Gib der KI Feedback, um die Ergebnisse zu verbessern.</li>
                        <li>Nutze KI als Werkzeug, nicht als Ersatz für deine eigene Arbeit.</li>
                    </ul>
                    <h3 class="text-2xl font-semibold text-[var(--primary-color)] mt-8 mb-3">Fazit</h3>
                    <p>KI ist ein mächtiges Werkzeug, das deinen Arbeitsalltag bereichern kann. Mit diesem Leitfaden und etwas Übung wirst du schnell zum KI-Profi. Nutze die Möglichkeiten und entdecke, wie KI dir helfen kann, deine Ziele zu erreichen. </p>
                </div>`;

export default function KiLeitfadenSection({ slug }: SectionComponentProps) {
  return (
    <section id={slug} className="space-y-6">
      <RichText html={html} />
    </section>
  );
}
