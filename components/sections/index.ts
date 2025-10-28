import type { ComponentType } from "react";

import HomeSection from '@/components/home/HomeSection';
import UnsereMissionSection from '@/components/sections/UnsereMissionSection';
import KerngeschaeftSection from '@/components/sections/KerngeschaeftSection';
import PoliciesMenuSection from '@/components/sections/PoliciesMenuSection';
import MitarbeiterGespraecheMenuSection from '@/components/sections/MitarbeiterGespraecheMenuSection';
import BenefitsMenuSection from '@/components/sections/BenefitsMenuSection';
import ZusammenarbeitMenuSection from '@/components/sections/ZusammenarbeitMenuSection';
import OnboardingMenuSection from '@/components/sections/OnboardingMenuSection';
import OfficeSection from '@/components/sections/OfficeSection';
import ArbeitszeiterfassungSection from '@/components/sections/ArbeitszeiterfassungSection';
import KrankheitSection from '@/components/sections/KrankheitSection';
import UeberstundenSection from '@/components/sections/UeberstundenSection';
import UrlaubstageSection from '@/components/sections/UrlaubstageSection';
import ReisekostenSection from '@/components/sections/ReisekostenSection';
import PeerFeedbackSection from '@/components/sections/PeerFeedbackSection';
import PeerFeedbackContentSection from '@/components/sections/PeerFeedbackContentSection';
import LeitfadenFeedbackContentSection from '@/components/sections/LeitfadenFeedbackContentSection';
import FeedbackGespraechSection from '@/components/sections/FeedbackGespraechSection';
import MitarbeiterGespraecheDetailSection from '@/components/sections/MitarbeiterGespraecheDetailSection';
import AirtableSection from '@/components/sections/AirtableSection';
import WeiteresSection from '@/components/sections/WeiteresSection';
import KiLeitfadenSection from '@/components/sections/KiLeitfadenSection';
import DeutschlandticketSection from '@/components/sections/DeutschlandticketSection';
import HomeOfficeSection from '@/components/sections/HomeOfficeSection';
import FlexibleArbeitszeitenSection from '@/components/sections/FlexibleArbeitszeitenSection';
import OffsitesSection from '@/components/sections/OffsitesSection';
import WorkationSection from '@/components/sections/WorkationSection';
import AllHandsDaysSection from '@/components/sections/AllHandsDaysSection';
import TeamLunchSection from '@/components/sections/TeamLunchSection';
import BoniSection from '@/components/sections/BoniSection';
import GoogleKalenderSection from '@/components/sections/GoogleKalenderSection';
import KalenderAbonnierenSection from '@/components/sections/KalenderAbonnierenSection';
import BueroanwesenheitEintragenSection from '@/components/sections/BueroanwesenheitEintragenSection';
import ZeitraeumeBlockenSection from '@/components/sections/ZeitraeumeBlockenSection';
import InterneKommunikationSection from '@/components/sections/InterneKommunikationSection';
import OrdnerverteilungInGoogledriveSection from '@/components/sections/OrdnerverteilungInGoogledriveSection';
import ChatgruppenSection from '@/components/sections/ChatgruppenSection';
import EMailPostfachSection from '@/components/sections/EMailPostfachSection';
import EMailSignaturSection from '@/components/sections/EMailSignaturSection';
import ExterneKommunikationSection from '@/components/sections/ExterneKommunikationSection';
import KundenkommunikationSection from '@/components/sections/KundenkommunikationSection';
import HintergrundInGoogleMeetsAendernSection from '@/components/sections/HintergrundInGoogleMeetsAendernSection';
import DeinOnboardingProzessSection from '@/components/sections/DeinOnboardingProzessSection';
import ZugaengeUndKontenSection from '@/components/sections/ZugaengeUndKontenSection';
import SoftwareUndToolsSection from '@/components/sections/SoftwareUndToolsSection';
import TcKulturUndWerteSection from '@/components/sections/TcKulturUndWerteSection';
import NotfallkontakteSection from '@/components/sections/NotfallkontakteSection';

import type { SectionComponentProps } from '@/components/sections/types';

type SectionComponent = ComponentType<SectionComponentProps>;

export const sectionComponents: Record<string, SectionComponent> = {
  'home': HomeSection,
  'unsere-mission': UnsereMissionSection,
  'kerngeschäft': KerngeschaeftSection,
  'policies-menu': PoliciesMenuSection,
  'mitarbeiter-gespräche-menu': MitarbeiterGespraecheMenuSection,
  'benefits-menu': BenefitsMenuSection,
  'zusammenarbeit-menu': ZusammenarbeitMenuSection,
  'onboarding-menu': OnboardingMenuSection,
  'office': OfficeSection,
  'arbeitszeiterfassung': ArbeitszeiterfassungSection,
  'krankheit': KrankheitSection,
  'überstunden': UeberstundenSection,
  'urlaubstage': UrlaubstageSection,
  'reisekosten': ReisekostenSection,
  'peer-feedback-section': PeerFeedbackSection,
  'peer-feedback-content': PeerFeedbackContentSection,
  'leitfaden-feedback-content': LeitfadenFeedbackContentSection,
  'feedback-gespräch': FeedbackGespraechSection,
  'mitarbeiter-gespräche-detail': MitarbeiterGespraecheDetailSection,
  'airtable': AirtableSection,
  'weiteres': WeiteresSection,
  'ki-leitfaden': KiLeitfadenSection,
  'deutschlandticket': DeutschlandticketSection,
  'home-office': HomeOfficeSection,
  'flexible-arbeitszeiten': FlexibleArbeitszeitenSection,
  'offsites': OffsitesSection,
  'workation': WorkationSection,
  'all-hands-days': AllHandsDaysSection,
  'team-lunch': TeamLunchSection,
  'boni': BoniSection,
  'google-kalender-section': GoogleKalenderSection,
  'kalender-abonnieren': KalenderAbonnierenSection,
  'büroanwesenheit-eintragen': BueroanwesenheitEintragenSection,
  'zeiträume-blocken': ZeitraeumeBlockenSection,
  'interne-kommunikation-section': InterneKommunikationSection,
  'ordnerverteilung-in-googledrive': OrdnerverteilungInGoogledriveSection,
  'chatgruppen': ChatgruppenSection,
  'e-mail-postfach': EMailPostfachSection,
  'e-mail-signatur': EMailSignaturSection,
  'externe-kommunikation-section': ExterneKommunikationSection,
  'kundenkommunikation': KundenkommunikationSection,
  'hintergrund-in-google-meets-ändern': HintergrundInGoogleMeetsAendernSection,
  'dein-onboarding-prozess': DeinOnboardingProzessSection,
  'zugänge-und-konten': ZugaengeUndKontenSection,
  'software-und-tools': SoftwareUndToolsSection,
  'tc-kultur-und-werte': TcKulturUndWerteSection,
  'notfallkontakte': NotfallkontakteSection,
};
