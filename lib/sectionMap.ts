import type { SectionGroup, SectionMeta } from "./types";

export const sections: Record<string, SectionMeta> = {
  home: { title: "Startseite" },
  "unsere-mission": {
    title: "Unsere Mission",
    keywords: ["mission", "leitbild", "prinzipien"],
  },
  "kerngeschäft": {
    title: "Kerngeschäft",
    keywords: ["forschungszulage", "fzl", "prozess"],
  },
  "policies-menu": {
    title: "Policies",
    keywords: ["office", "arbeitszeit", "krankheit", "urlaub", "reisekosten"],
  },
  office: {
    title: "Office & Infrastruktur",
    parent: "policies-menu",
    keywords: ["büro", "arbeitsplatz", "hardware"],
  },
  "arbeitszeiterfassung": {
    title: "Arbeitszeiterfassung",
    parent: "policies-menu",
    keywords: ["arbeitszeit", "timely", "zeiterfassung"],
  },
  "krankheit": {
    title: "Krankmeldungen",
    parent: "policies-menu",
    keywords: ["krankheit", "au", "attest", "krankmeldung"],
  },
  "überstunden": {
    title: "Überstunden & Mehrarbeit",
    parent: "policies-menu",
    keywords: ["überstunden", "mehrarbeit", "freizeitausgleich"],
  },
  "urlaubstage": {
    title: "Urlaubstage",
    parent: "policies-menu",
    keywords: ["urlaub", "abwesenheit", "plan"],
  },
  "reisekosten": {
    title: "Reisekosten",
    parent: "policies-menu",
    keywords: ["reise", "auslagen", "spesen"],
  },
  "mitarbeiter-gespräche-menu": {
    title: "Mitarbeitergespräche",
    keywords: ["feedback", "gespräch", "entwicklung"],
  },
  "peer-feedback-section": {
    title: "Peer Feedback",
    parent: "mitarbeiter-gespräche-menu",
    keywords: ["peer", "feedback", "kolleg:innen"],
  },
  "peer-feedback-content": {
    title: "Peer Feedback Ablauf",
    parent: "mitarbeiter-gespräche-menu",
    keywords: ["peer feedback", "prozessschritte"],
  },
  "leitfaden-feedback-content": {
    title: "Leitfaden für Feedback",
    parent: "mitarbeiter-gespräche-menu",
    keywords: ["leitfaden", "feedback tipps"],
  },
  "feedback-gespräch": {
    title: "Feedback Gespräch",
    parent: "mitarbeiter-gespräche-menu",
    keywords: ["feedback gespräch", "ablauf"],
  },
  "mitarbeiter-gespräche-detail": {
    title: "Mitarbeitergespräche Details",
    parent: "mitarbeiter-gespräche-menu",
    keywords: ["mitarbeitergespräch", "ablauf"],
  },
  airtable: {
    title: "Airtable Grundlagen",
    parent: "mitarbeiter-gespräche-menu",
    keywords: ["airtable", "prozesse", "automation"],
  },
  weiteres: {
    title: "Weitere Hinweise",
    parent: "mitarbeiter-gespräche-menu",
    keywords: ["prozesse", "ressourcen"],
  },
  "ki-leitfaden": {
    title: "KI-Leitfaden",
    keywords: ["ki", "prompting", "automation"],
  },
  "benefits-menu": {
    title: "Benefits",
    keywords: ["benefits", "leistungen", "vergünstigung"],
  },
  deutschlandticket: {
    title: "Deutschlandticket",
    parent: "benefits-menu",
    keywords: ["ticket", "jobticket", "bahn"],
  },
  "home-office": {
    title: "Home-Office",
    parent: "benefits-menu",
    keywords: ["homeoffice", "remote"],
  },
  "flexible-arbeitszeiten": {
    title: "Flexible Arbeitszeiten",
    parent: "benefits-menu",
    keywords: ["flexible zeit", "arbeitszeiten"],
  },
  offsites: {
    title: "Offsites",
    parent: "benefits-menu",
    keywords: ["offsite", "events"],
  },
  workation: {
    title: "Workation",
    parent: "benefits-menu",
    keywords: ["workation", "remote", "reisen"],
  },
  "all-hands-days": {
    title: "All Hands Days",
    parent: "benefits-menu",
    keywords: ["all hands", "teamtag"],
  },
  "team-lunch": {
    title: "Team Lunch",
    parent: "benefits-menu",
    keywords: ["team lunch", "essen"],
  },
  boni: {
    title: "Boni",
    parent: "benefits-menu",
    keywords: ["bonus", "gratifikation"],
  },
  "zusammenarbeit-menu": {
    title: "Zusammenarbeit",
    keywords: ["kommunikation", "prozesse", "tools"],
  },
  "google-kalender-section": {
    title: "Google Kalender",
    parent: "zusammenarbeit-menu",
    keywords: ["kalender", "organisation"],
  },
  "kalender-abonnieren": {
    title: "Kalender abonnieren",
    parent: "zusammenarbeit-menu",
    keywords: ["kalender", "abonnieren"],
  },
  "büroanwesenheit-eintragen": {
    title: "Büroanwesenheit eintragen",
    parent: "zusammenarbeit-menu",
    keywords: ["anwesenheit", "office"],
  },
  "zeiträume-blocken": {
    title: "Zeiträume blocken",
    parent: "zusammenarbeit-menu",
    keywords: ["blocker", "kalender"],
  },
  "interne-kommunikation-section": {
    title: "Interne Kommunikation",
    parent: "zusammenarbeit-menu",
    keywords: ["kommunikation", "slack", "email"],
  },
  "ordnerverteilung-in-googledrive": {
    title: "Ordner in Google Drive",
    parent: "zusammenarbeit-menu",
    keywords: ["drive", "struktur"],
  },
  chatgruppen: {
    title: "Chatgruppen",
    parent: "zusammenarbeit-menu",
    keywords: ["chat", "slack"],
  },
  "e-mail-postfach": {
    title: "E-Mail Postfach",
    parent: "zusammenarbeit-menu",
    keywords: ["email", "postfach"],
  },
  "e-mail-signatur": {
    title: "E-Mail Signatur",
    parent: "zusammenarbeit-menu",
    keywords: ["email", "signatur"],
  },
  "externe-kommunikation-section": {
    title: "Externe Kommunikation",
    parent: "zusammenarbeit-menu",
    keywords: ["kunden", "kommunikation"],
  },
  kundenkommunikation: {
    title: "Kundenkommunikation",
    parent: "zusammenarbeit-menu",
    keywords: ["kunden", "kommunikation"],
  },
  "hintergrund-in-google-meets-ändern": {
    title: "Hintergrund in Google Meets ändern",
    parent: "zusammenarbeit-menu",
    keywords: ["google meets", "hintergrund"],
  },
  "onboarding-menu": {
    title: "Onboarding",
    keywords: ["onboarding", "start", "accounts"],
  },
  "dein-onboarding-prozess": {
    title: "Onboarding Prozess",
    parent: "onboarding-menu",
    keywords: ["onboarding", "zeitplan", "ziele"],
  },
  "zugänge-und-konten": {
    title: "Zugänge & Konten",
    parent: "onboarding-menu",
    keywords: ["zugänge", "konten", "tools"],
  },
  "software-und-tools": {
    title: "Software & Tools",
    parent: "onboarding-menu",
    keywords: ["software", "tools", "setup"],
  },
  "tc-kultur-und-werte": {
    title: "TC Kultur & Werte",
    keywords: ["werte", "kultur", "zusammenarbeit"],
  },
  notfallkontakte: {
    title: "Notfallkontakte",
    keywords: ["notfall", "kontakte"],
  },
};

export const sectionGroups: SectionGroup[] = [
  {
    slug: "home",
    title: "Startseite",
    children: [],
    icon: "Home",
  },
  {
    slug: "unsere-mission",
    title: "Unsere Mission",
    children: [],
    icon: "ScrollText",
  },
  {
    slug: "kerngeschäft",
    title: "Kerngeschäft",
    children: [],
    icon: "BriefcaseBusiness",
  },
  {
    slug: "policies-menu",
    title: "Policies",
    children: [
      "office",
      "arbeitszeiterfassung",
      "krankheit",
      "überstunden",
      "urlaubstage",
      "reisekosten",
    ],
    icon: "FileText",
  },
  {
    slug: "mitarbeiter-gespräche-menu",
    title: "Mitarbeitergespräche",
    children: [
      "peer-feedback-section",
      "peer-feedback-content",
      "leitfaden-feedback-content",
      "feedback-gespräch",
      "mitarbeiter-gespräche-detail",
      "airtable",
      "weiteres",
    ],
    icon: "Users",
  },
  {
    slug: "ki-leitfaden",
    title: "KI-Leitfaden",
    children: [],
    icon: "Bot",
  },
  {
    slug: "benefits-menu",
    title: "Benefits",
    children: [
      "deutschlandticket",
      "home-office",
      "flexible-arbeitszeiten",
      "offsites",
      "workation",
      "all-hands-days",
      "team-lunch",
      "boni",
    ],
    icon: "Sparkles",
  },
  {
    slug: "zusammenarbeit-menu",
    title: "Zusammenarbeit",
    children: [
      "google-kalender-section",
      "kalender-abonnieren",
      "büroanwesenheit-eintragen",
      "zeiträume-blocken",
      "interne-kommunikation-section",
      "ordnerverteilung-in-googledrive",
      "chatgruppen",
      "e-mail-postfach",
      "e-mail-signatur",
      "externe-kommunikation-section",
      "kundenkommunikation",
      "hintergrund-in-google-meets-ändern",
    ],
    icon: "UsersRound",
  },
  {
    slug: "onboarding-menu",
    title: "Onboarding",
    children: [
      "dein-onboarding-prozess",
      "zugänge-und-konten",
      "software-und-tools",
    ],
    icon: "Rocket",
  },
  {
    slug: "tc-kultur-und-werte",
    title: "TC Kultur & Werte",
    children: [],
    icon: "HeartHandshake",
  },
  {
    slug: "notfallkontakte",
    title: "Notfallkontakte",
    children: [],
    icon: "LifeBuoy",
  },
];

export const parents: Record<string, string[]> = sectionGroups.reduce(
  (acc, group) => {
    if (group.children.length) {
      acc[group.slug] = group.children;
    }
    return acc;
  },
  {} as Record<string, string[]>,
);

export const orderedSlugs = sectionGroups.map((group) => group.slug);
