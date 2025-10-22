import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import type { SectionComponentProps } from '@/components/sections/types';

const stories = [
  {
    title: '1. Wir – das Team',
    description:
      'Wir beginnen mit "Wir", weil alles bei uns in der Gemeinschaft wurzelt. Jedes Teammitglied bringt sein K\xf6nnen, seine Expertise, seine Erfahrungen und Pers\xf6nlichkeit ein. Wir vertrauen uns und d\xfcrfen viel voneinander erwarten. "Wir" ist kein loses Wort, sondern die feste Zusage, dass niemand allein in der Verantwortung ist. Das WIR motiviert und inspiriert uns und l\xe4sst uns regelm\xe4\xdfig stolz zur\xfcckblicken.',
  },
  {
    title: '2. DER Funding-Partner (unsere Kompetenz)',
    description:
      'Wir nennen uns DER Funding-Partner, weil Unternehmen bei uns nicht nur einen F\xf6rderantrag einreichen, sondern auf Augenh\xf6he einen kompetenten Berater, Wegbegleiter und Lotsen finden. Wir sind Experten in der Beratung von Forschungs- und Entwicklungsprojekten und der Guide im Dschungel von F\xf6rderprogrammen. Wir kennen die Vor- und Nachteile, die Do’s und Dont’s. Wir kennen das Kleingedruckte, sind \xdcbersetzer und sprechen die Sprache von Gutachtern und Forschungs- und Entwicklungsteams. Unsere Expertise schafft Vertrauen und Leichtigkeit.',
  },
  {
    title: '3. Unternehmen im Fokus',
    description:
      'Wir sind f\xfcr Unternehmen da – von Start-ups mit zukunftsweisenden Ideen bis zu etablierten Mittelst\xe4ndlern mit reicher Historie. Unser B2B-Ansatz bedeutet, dass wir nicht nur Forschungs- und Entwicklungsambitionen, sondern auch Gesch\xe4ftsmodelle und Finanzierungsbedarfe verstehen. So entwickeln wir praxistaugliche und nachhaltige L\xf6sungen, die echten Mehrwert schaffen, wo Innovationen und Wertsch\xf6pfung entstehen: direkt in den Unternehmen.',
  },
  {
    title: '4. Leichtigkeit (f\xfcr alle)',
    description:
      'Leichtigkeit ist nicht nur ein Versprechen an den Kunden, sondern ein Bestandteil unserer DNA. Wir arbeiten und handeln stets l\xf6sungsorientiert. Wir optimieren Prozesse, sind offen und ehrlich, sprechen verst\xe4ndlich, feiern Erfolge und lassen Egos vor der T\xfcr. Diese Leichtigkeit tr\xe4gt uns durch hektische Tage und l\xe4sst unsere Kunden aufatmen, wenn sie merken: "Mit Clever Funding f\xfchlt sich F\xf6rderung leicht an."',
  },
  {
    title: '5. Freude',
    description:
      'Humor und Freude sind immer in der Mitte unseres Teams. Gemeinsames Lachen macht komplexe Aufgaben leichter und schwei\xdft uns zusammen. Spa\xdf ist der Treibstoff, der Kreativit\xe4t z\xfcndet und selbst den gr\xf6\xdften F\xf6rdermittel-Dschungel bunt macht.',
  },
  {
    title: '6. Respekt',
    description:
      'Respekt ist unser Betriebssystem. Er zeigt sich in ehrlichem Feedback, in offener Kommunikation und in der Wertsch\xe4tzung der Zeit, der Kompetenz und der Achtung des Anderen. Bei uns wird jede Stimme geh\xf6rt. Ein respektvoller Umgang mit uns, unseren Partnern und Kunden bedeutet auch, zu reflektieren, bevor wir handeln. Wir stehen zu unserem Wort: Wenn wir etwas versprechen, dann halten wir es ein.',
  },
  {
    title: '7. Sch\xf6ne Orte',
    description:
      'Sch\xf6ne Orte sind mehr als ein schickes B\xfcro. Sie sind unser zweites Zuhause vor Ort und remote – im K\xf6lner Loft, im Home-Office oder auf Off-Sites in den Bergen und am Meer. Wir glauben, dass inspirierende Umgebungen inspirierende Arbeit hervorbringen. Deshalb investieren wir in R\xe4ume, die Energie geben.',
  },
  {
    title: '8. Wirkungsvolle Innovationen',
    description:
      'Unser Antrieb ist Sinn. Wir m\xf6chten Forschungs-, Entwicklungs- und Innovationsprojekte und Unternehmen unterst\xfctzen, die echten Impact haben – ob in Medizin, Klima-Tech, Industrie oder Software. Wir schaffen daf\xfcr gemeinsam die notwendigen finanziellen Rahmenbedingungen, damit Entwicklungsteams ihre Ideen verwirklichen k\xf6nnen.',
  },
  {
    title: '9. Zusammenarbeiten',
    description:
      'Am Ende kommt das "Zusammenarbeiten" – der Schlussakkord, der zum Auftakt "Wir" zur\xfcckf\xfchrt. Unsere Zusammenarbeit ist gepr\xe4gt von einem flexiblen Rollenverst\xe4ndnis, offenen T\xfcren und Kalendern und der Gewissheit, dass niemand alleine l\xe4uft. Wir ziehen gemeinsam an einem Strang, weil wir wissen: Nur so erreichen wir unser Ziel – der Funding-Partner zu sein, der Innovationen erfolgreich m\xf6glich macht.',
  },
];

const principles = [
  {
    title: 'Wir handeln im Sinne des Unternehmens',
    description:
      'Jede deiner Entscheidungen und Handlungen sollte darauf abzielen, das Unternehmen voranzubringen. Wenn du ein Problem erkennst, pack es proaktiv an und versuche, es selbstst\xe4ndig zu l\xf6sen.',
  },
  {
    title: 'Unsere Feedback-Kultur',
    description:
      'Wir legen gro\xdfen Wert auf offenes und ehrliches Feedback. Gib deinen Kolleg:innen konstruktive R\xfcckmeldungen und nimm Feedback von anderen an, um pers\xf6nlich und als Team zu wachsen.',
  },
  {
    title: 'Gesund Arbeiten',
    description:
      'Wir legen Wert auf ein Umfeld, in dem wir uns wohlf\xfchlen. Dazu geh\xf6rt ein sch\xf6nes B\xfcro, die Zusammenarbeit mit freundlichen und netten Kolleg:innen, Spa\xdf im Arbeitsalltag und auch im Privatleben. All das tr\xe4gt zu einer gesunden Work-Life-Balance bei, die uns langfristig motiviert und leistungsf\xe4hig h\xe4lt.',
  },
  {
    title: 'Gesunde Beziehungen',
    description:
      'Vertrauen und Wertsch\xe4tzung sind die Basis f\xfcr unseren Erfolg. Das gilt sowohl f\xfcr die Zusammenarbeit im Team als auch f\xfcr den Umgang mit unseren Kunden.',
  },
  {
    title: 'Gesund Wachsen',
    description:
      'Unser Ziel ist ein nachhaltiges Wachstum. Das bedeutet, wir wollen stetig besser werden und uns weiterentwickeln. Dabei steht nicht die Geschwindigkeit im Vordergrund, sondern das Wohlbefinden des Teams. Wichtig ist, dass wir weiterhin gl\xfccklich sind und Spa\xdf an dem haben, was wir tun.',
  },
];

export default function UnsereMissionSection({ slug, meta }: SectionComponentProps) {
  return (
    <section id={slug} className="space-y-8">
      <header className="space-y-3">
        <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          {meta.title}
        </h2>
        <p className="text-base text-muted-foreground">
          Wir sind der Funding-Partner f\xfcr Unternehmen: ein Expertenteam, das mit
          Leichtigkeit, Freude und Respekt inspirierend zusammenarbeitet, um
          wirkungsvolle Innovationen zu erm\xf6glichen.
        </p>
      </header>

      <Accordion type="multiple" className="space-y-4">
        <AccordionItem value="stories" className="rounded-lg border border-border bg-card px-4 py-2">
          <AccordionTrigger className="text-left text-lg font-semibold">
            Die Stories zu unseren Schl\xfcsselbegriffen
          </AccordionTrigger>
          <AccordionContent>
            <ul className="space-y-4 text-sm leading-relaxed">
              {stories.map((story) => (
                <li key={story.title}>
                  <p className="font-semibold text-foreground">{story.title}</p>
                  <p className="text-muted-foreground">{story.description}</p>
                </li>
              ))}
            </ul>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="principles" className="rounded-lg border border-border bg-card px-4 py-2">
          <AccordionTrigger className="text-left text-lg font-semibold">
            Unsere Prinzipien
          </AccordionTrigger>
          <AccordionContent>
            <p className="mb-4 text-sm text-muted-foreground">
              Unsere Mission st\xfctzt sich auf folgende zentrale Prinzipien:
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
