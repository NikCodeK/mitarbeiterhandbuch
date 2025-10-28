'use client';

import { FormEvent, useState } from 'react';
import { Pencil } from 'lucide-react';

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import type { SectionComponentProps } from '@/components/sections/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const stories = [
  {
    title: '1. Wir – das Team',
    description:
      'Wir beginnen mit "Wir", weil alles bei uns in der Gemeinschaft wurzelt. Jedes Teammitglied bringt sein Können, seine Expertise, seine Erfahrungen und Persönlichkeit ein. Wir vertrauen uns und dürfen viel voneinander erwarten. "Wir" ist kein loses Wort, sondern die feste Zusage, dass niemand allein in der Verantwortung ist. Das WIR motiviert und inspiriert uns und lässt uns regelmäßig stolz zurückblicken.',
  },
  {
    title: '2. DER Funding-Partner (unsere Kompetenz)',
    description:
      'Wir nennen uns DER Funding-Partner, weil Unternehmen bei uns nicht nur einen Förderantrag einreichen, sondern auf Augenhöhe einen kompetenten Berater, Wegbegleiter und Lotsen finden. Wir sind Experten in der Beratung von Forschungs- und Entwicklungsprojekten und der Guide im Dschungel von Förderprogrammen. Wir kennen die Vor- und Nachteile, die Do’s und Dont’s. Wir kennen das Kleingedruckte, sind Übersetzer und sprechen die Sprache von Gutachtern und Forschungs- und Entwicklungsteams. Unsere Expertise schafft Vertrauen und Leichtigkeit.',
  },
  {
    title: '3. Unternehmen im Fokus',
    description:
      'Wir sind für Unternehmen da – von Start-ups mit zukunftsweisenden Ideen bis zu etablierten Mittelständlern mit reicher Historie. Unser B2B-Ansatz bedeutet, dass wir nicht nur Forschungs- und Entwicklungsambitionen, sondern auch Geschäftsmodelle und Finanzierungsbedarfe verstehen. So entwickeln wir praxistaugliche und nachhaltige Lösungen, die echten Mehrwert schaffen, wo Innovationen und Wertschöpfung entstehen: direkt in den Unternehmen.',
  },
  {
    title: '4. Leichtigkeit (für alle)',
    description:
      'Leichtigkeit ist nicht nur ein Versprechen an den Kunden, sondern ein Bestandteil unserer DNA. Wir arbeiten und handeln stets lösungsorientiert. Wir optimieren Prozesse, sind offen und ehrlich, sprechen verständlich, feiern Erfolge und lassen Egos vor der Tür. Diese Leichtigkeit trägt uns durch hektische Tage und lässt unsere Kunden aufatmen, wenn sie merken: "Mit Clever Funding fühlt sich Förderung leicht an."',
  },
  {
    title: '5. Freude',
    description:
      'Humor und Freude sind immer in der Mitte unseres Teams. Gemeinsames Lachen macht komplexe Aufgaben leichter und schweißt uns zusammen. Spaß ist der Treibstoff, der Kreativität zündet und selbst den größten Fördermittel-Dschungel bunt macht.',
  },
  {
    title: '6. Respekt',
    description:
      'Respekt ist unser Betriebssystem. Er zeigt sich in ehrlichem Feedback, in offener Kommunikation und in der Wertschätzung der Zeit, der Kompetenz und der Achtung des Anderen. Bei uns wird jede Stimme gehört. Ein respektvoller Umgang mit uns, unseren Partnern und Kunden bedeutet auch, zu reflektieren, bevor wir handeln. Wir stehen zu unserem Wort: Wenn wir etwas versprechen, dann halten wir es ein.',
  },
  {
    title: '7. Schöne Orte',
    description:
      'Schöne Orte sind mehr als ein schickes Büro. Sie sind unser zweites Zuhause vor Ort und remote – im Kölner Loft, im Home-Office oder auf Off-Sites in den Bergen und am Meer. Wir glauben, dass inspirierende Umgebungen inspirierende Arbeit hervorbringen. Deshalb investieren wir in Räume, die Energie geben.',
  },
  {
    title: '8. Wirkungsvolle Innovationen',
    description:
      'Unser Antrieb ist Sinn. Wir möchten Forschungs-, Entwicklungs- und Innovationsprojekte und Unternehmen unterstützen, die echten Impact haben – ob in Medizin, Klima-Tech, Industrie oder Software. Wir schaffen dafür gemeinsam die notwendigen finanziellen Rahmenbedingungen, damit Entwicklungsteams ihre Ideen verwirklichen können.',
  },
  {
    title: '9. Zusammenarbeiten',
    description:
      'Am Ende kommt das "Zusammenarbeiten" – der Schlussakkord, der zum Auftakt "Wir" zurückführt. Unsere Zusammenarbeit ist geprägt von einem flexiblen Rollenverständnis, offenen Türen und Kalendern und der Gewissheit, dass niemand alleine läuft. Wir ziehen gemeinsam an einem Strang, weil wir wissen: Nur so erreichen wir unser Ziel – der Funding-Partner zu sein, der Innovationen erfolgreich möglich macht.',
  },
];

type StoryContent = (typeof stories)[number];
type StoryItem = StoryContent & { id: number };

const principles = [
  {
    title: 'Wir handeln im Sinne des Unternehmens',
    description:
      'Jede deiner Entscheidungen und Handlungen sollte darauf abzielen, das Unternehmen voranzubringen. Wenn du ein Problem erkennst, pack es proaktiv an und versuche, es selbstständig zu lösen.',
  },
  {
    title: 'Unsere Feedback-Kultur',
    description:
      'Wir legen großen Wert auf offenes und ehrliches Feedback. Gib deinen Kolleg:innen konstruktive Rückmeldungen und nimm Feedback von anderen an, um persönlich und als Team zu wachsen.',
  },
  {
    title: 'Gesund Arbeiten',
    description:
      'Wir legen Wert auf ein Umfeld, in dem wir uns wohlfühlen. Dazu gehört ein schönes Büro, die Zusammenarbeit mit freundlichen und netten Kolleg:innen, Spaß im Arbeitsalltag und auch im Privatleben. All das trägt zu einer gesunden Work-Life-Balance bei, die uns langfristig motiviert und leistungsfähig hält.',
  },
  {
    title: 'Gesunde Beziehungen',
    description:
      'Vertrauen und Wertschätzung sind die Basis für unseren Erfolg. Das gilt sowohl für die Zusammenarbeit im Team als auch für den Umgang mit unseren Kunden.',
  },
  {
    title: 'Gesund Wachsen',
    description:
      'Unser Ziel ist ein nachhaltiges Wachstum. Das bedeutet, wir wollen stetig besser werden und uns weiterentwickeln. Dabei steht nicht die Geschwindigkeit im Vordergrund, sondern das Wohlbefinden des Teams. Wichtig ist, dass wir weiterhin glücklich sind und Spaß an dem haben, was wir tun.',
  },
];

export default function UnsereMissionSection({
  slug,
  meta,
  isAdmin = false,
}: SectionComponentProps) {
  const [currentTitle, setCurrentTitle] = useState(meta.title);
  const [titleDraft, setTitleDraft] = useState(meta.title);
  const [isEditingTitle, setIsEditingTitle] = useState(false);

  const [storyItems, setStoryItems] = useState<StoryItem[]>(() =>
    stories.map((story, index) => ({ ...story, id: index })),
  );
  const [editingStoryIndex, setEditingStoryIndex] = useState<number | null>(null);
  const [storyDraft, setStoryDraft] = useState('');

  const isTitleDraftValid = titleDraft.trim().length > 0;
  const isStoryDraftValid = storyDraft.trim().length > 0;

  function startTitleEdit() {
    setTitleDraft(currentTitle);
    setIsEditingTitle(true);
  }

  function cancelTitleEdit() {
    setTitleDraft(currentTitle);
    setIsEditingTitle(false);
  }

  function handleTitleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!isTitleDraftValid) {
      return;
    }
    setCurrentTitle(titleDraft.trim());
    setIsEditingTitle(false);
  }

  function startStoryEdit(index: number) {
    if (!isAdmin) {
      return;
    }
    const story = storyItems[index];
    if (!story) {
      return;
    }
    setStoryDraft(story.title);
    setEditingStoryIndex(index);
  }

  function cancelStoryEdit() {
    setEditingStoryIndex(null);
    setStoryDraft('');
  }

  function handleStorySubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (editingStoryIndex === null || !isStoryDraftValid) {
      return;
    }
    const nextTitle = storyDraft.trim();
    setStoryItems((prev) =>
      prev.map((story, idx) =>
        idx === editingStoryIndex ? { ...story, title: nextTitle } : story,
      ),
    );
    setEditingStoryIndex(null);
    setStoryDraft('');
  }

  return (
    <section id={slug} className="space-y-8">
      <header className="space-y-3">
        {isEditingTitle ? (
          <form
            className="flex flex-col gap-3 sm:flex-row sm:items-center"
            onSubmit={handleTitleSubmit}
          >
            <Input
              value={titleDraft}
              onChange={(event) => setTitleDraft(event.currentTarget.value)}
              className="w-full sm:max-w-md"
              aria-label="Abschnittstitel bearbeiten"
              autoFocus
            />
            <div className="flex items-center gap-2">
              <Button size="sm" type="submit" disabled={!isTitleDraftValid}>
                Speichern
              </Button>
              <Button
                size="sm"
                type="button"
                variant="ghost"
                onClick={cancelTitleEdit}
              >
                Abbrechen
              </Button>
            </div>
          </form>
        ) : (
          <div className="flex flex-wrap items-center gap-2">
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              {currentTitle}
            </h2>
            {isAdmin && (
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={startTitleEdit}
                aria-label="Überschrift bearbeiten"
              >
                <Pencil className="h-4 w-4" aria-hidden="true" />
              </Button>
            )}
          </div>
        )}
        <p className="text-base text-muted-foreground">
          Wir sind der Funding-Partner für Unternehmen: ein Expertenteam, das mit
          Leichtigkeit, Freude und Respekt inspirierend zusammenarbeitet, um
          wirkungsvolle Innovationen zu ermöglichen.
        </p>
      </header>

      <Accordion type="multiple" className="space-y-4">
        <AccordionItem value="stories" className="rounded-lg border border-border bg-card px-4 py-2">
          <AccordionTrigger className="text-left text-lg font-semibold">
            Die Stories zu unseren Schlüsselbegriffen
          </AccordionTrigger>
          <AccordionContent>
            <ul className="space-y-4 text-sm leading-relaxed">
              {storyItems.map((story, index) => {
                const isEditingStory = editingStoryIndex === index;
                return (
                  <li key={story.id} className="space-y-1">
                    {isEditingStory ? (
                      <form
                        className="flex flex-col gap-3 sm:flex-row sm:items-center"
                        onSubmit={handleStorySubmit}
                      >
                        <Input
                          value={storyDraft}
                          onChange={(event) => setStoryDraft(event.currentTarget.value)}
                          className="w-full sm:max-w-md"
                          aria-label={`Überschrift für ${story.title} bearbeiten`}
                          autoFocus
                        />
                        <div className="flex items-center gap-2">
                          <Button size="sm" type="submit" disabled={!isStoryDraftValid}>
                            Speichern
                          </Button>
                          <Button
                            size="sm"
                            type="button"
                            variant="ghost"
                            onClick={cancelStoryEdit}
                          >
                            Abbrechen
                          </Button>
                        </div>
                      </form>
                    ) : (
                      <div className="flex items-start gap-2">
                        <p className="flex-1 font-semibold text-foreground">{story.title}</p>
                        {isAdmin && (
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            onClick={() => startStoryEdit(index)}
                            aria-label={`Überschrift ${story.title} bearbeiten`}
                          >
                            <Pencil className="h-4 w-4" aria-hidden="true" />
                          </Button>
                        )}
                      </div>
                    )}
                    <p className="text-muted-foreground">{story.description}</p>
                  </li>
                );
              })}
            </ul>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="principles" className="rounded-lg border border-border bg-card px-4 py-2">
          <AccordionTrigger className="text-left text-lg font-semibold">
            Unsere Prinzipien
          </AccordionTrigger>
          <AccordionContent>
            <p className="mb-4 text-sm text-muted-foreground">
              Unsere Mission stützt sich auf folgende zentrale Prinzipien:
            </p>
            <ul className="space-y-3 text-sm leading-relaxed">
              {principles.map((principle) => (
                <li key={principle.title}>
                  <p className="font-semibold text-foreground">{principle.title}</p>
                  <p className="text-muted-foreground">{principle.description}</p>
                </li>
              ))}
            </ul>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </section>
  );
}
