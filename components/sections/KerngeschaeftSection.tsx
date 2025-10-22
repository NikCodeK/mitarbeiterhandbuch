import type { SectionComponentProps } from '@/components/sections/types';

import { Button } from '@/components/ui/button';

const introParagraphs = [
  'Unser Kerngeschäft dreht sich um die Forschungszulage (FZL). Dabei handelt es sich um eine staatliche Förderung, die Unternehmen bei ihren Forschungs- und Entwicklungsprojekten finanziell unterstützt. Sie ist technologieoffen, branchenunabhängig und richtet sich an alle steuerpflichtigen Unternehmen in Deutschland, unabhängig von ihrer Größe. Die FZL ermöglicht es, einen Teil der Personalkosten, die bei internen Forschungs- und Entwicklungsprojekten anfallen, sowie Lohnkosten von extern beauftragten Forschungen, in Form einer Steuergutschrift zurückzuerhalten.',
  'Die FZL ermöglicht es, einen Teil der Personalkosten, die bei internen Forschungs- und Entwicklungsprojekten anfallen, sowie Lohnkosten von extern beauftragten Forschungen in Form einer Steuergutschrift zurückzuerhalten.',
];

const steps = [
  {
    title: 'Vorbereitung',
    description:
      'Wir starten mit einer detaillierten Analyse der Projekte des Kunden, um zu bewerten, welche davon für die Förderung infrage kommen. Hier prüfen wir, ob die Projekte die Kriterien der Forschungszulage erfüllen, zum Beispiel ob sie systematisch und neuartig sind und einem wissenschaftlichen Ziel dienen.',
  },
  {
    title: 'Antragstellung',
    description:
      'Wir erstellen die notwendigen Antragsdokumente. Dazu gehören die fachliche Beschreibung der Projekte und die dazugehörigen Kalkulationen. Die Unterlagen reichen wir anschließend digital bei der BSFZ ein.',
  },
  {
    title: 'Auszahlung',
    description:
      'Nach erfolgreicher Prüfung durch die BSFZ erhält der Kunde eine Bescheinigung, die ihm die Auszahlung der Forschungszulage über das Finanzamt ermöglicht.',
  },
];

export default function KerngeschaeftSection({ slug, meta }: SectionComponentProps) {
  return (
    <section id={slug} className="space-y-8">
      <header className="space-y-3">
        <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          {meta.title} – Forschungszulage im Fokus
        </h2>
        <p className="text-base text-muted-foreground">
          Unser Kerngeschäft dreht sich um die Forschungszulage: Wir unterstützen Unternehmen dabei,
          Forschungsausgaben effizient geltend zu machen.
        </p>
      </header>

      <article className="space-y-4 text-sm leading-relaxed text-muted-foreground">
        {introParagraphs.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </article>

      <div className="flex flex-col gap-4 rounded-xl border border-border bg-card p-6 shadow-sm sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-1">
          <p className="text-sm font-semibold text-foreground">Schnellüberblick zur Forschungszulage</p>
          <p className="text-sm text-muted-foreground">
            Erfahre in wenigen Minuten, wie die FZL funktioniert und welche Vorteile sie bietet.
          </p>
        </div>
        <Button asChild variant="outline" className="gap-2">
          <a href="https://youtu.be/0cZJGC454NQ?t=268" target="_blank" rel="noreferrer">
            Video ansehen
          </a>
        </Button>
      </div>

      <section className="space-y-4">
        <h3 className="text-2xl font-semibold tracking-tight">
          Die Beantragung der Forschungszulage Schritt für Schritt
        </h3>
        <p className="text-sm text-muted-foreground">
          Die Beantragung der Forschungszulage bei der Bescheinigungsstelle Forschungszulage (BSFZ) ist ein
          mehrstufiger Prozess, den wir für unsere Kund:innen komplett übernehmen:
        </p>
        <ol className="space-y-4 rounded-xl border border-border bg-muted/30 p-6 text-sm leading-relaxed">
          {steps.map((step) => (
            <li key={step.title} className="space-y-1">
              <p className="font-semibold text-foreground">{step.title}</p>
              <p className="text-muted-foreground">{step.description}</p>
            </li>
          ))}
        </ol>
        <p className="text-sm text-muted-foreground">
          Wir betreuen unsere Kund:innen während des gesamten Prozesses, stellen reibungslose Abläufe sicher und
          reduzieren den Aufwand auf ein Minimum.
        </p>
      </section>
    </section>
  );
}
