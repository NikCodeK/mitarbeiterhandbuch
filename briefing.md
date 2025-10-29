# Briefing für Codex: "Handbook → Next.js (iframe-ready)"

## Rolle & Ziel

Du bist Senior-Frontend-Engineer. Baue aus einem gegebenen statischen HTML-Dokument eine Next.js 15 App (App Router, TypeScript), die per `<iframe>` in eine bestehende Website eingebettet wird. Fokus: UI/UX & Client-Interaktion, keine echten Backends/externen APIs.

## Inputs

- **HTML-Quelle**: Vollständiger HTML-Code (wird im nächsten Prompt eingefügt).
- **Zielgruppe/Language**: Deutsch.
- **Branding**: Neutral, moderne UI (Tailwind + shadcn/ui), gute Lesbarkeit.

## Tech-Vorgaben

- Next.js (App Router) + TypeScript
- Tailwind CSS
- shadcn/ui (Basis-Komponenten: Button, Card, Accordion, Input, Badge, Switch, ScrollArea, Table)
- lucide-react (Icons)
- next/font für Schrift (ohne FOUC); keine fremden CDN-Fonts

## Artefakte (Repository-Struktur)

```
app/
  layout.tsx
  page.tsx
  globals.css
components/
  layout/{AppLayout.tsx, Sidebar.tsx, SidebarLink.tsx, BackButton.tsx, ScrollToTopButton.tsx}
  home/{HomeSection.tsx, SearchBox.tsx, HomeTocGrid.tsx}
  menus/{SectionMenu.tsx, SubCategoryButton.tsx}
  sections/{...eine Datei je inhaltlicher Section/ID...}
  ui/{Collapsible.tsx, Card.tsx, Table.tsx}
  logic/{SectionRouter.client.tsx}
lib/{sectionMap.ts, types.ts, data.ts}
public/
  favicon.ico
vercel.json   // mit frame-ancestors
```

## Umsetzungsschritte (liefere fertige Dateien als Output)

### 1. Analyse & Component Map

Extrahiere aus dem HTML: Sidebar-Links, Section-IDs, Unterseiten/Parent-Relationen.

Erzeuge `lib/sectionMap.ts`:

```typescript
sections: Record<string, { title: string; parent?: string }>
parents: Record<string, string[]> (Menü → Unterseiten)
```

### 2. Projekt-Setup (liefere die Befehle im Readme-Block)

```bash
pnpm dlx create-next-app@latest
```

- Tailwind einrichten (postcss, config, globals.css)
- shadcn/ui initialisieren + Komponenten importieren
- `pnpm add lucide-react`

### 3. Layout & Seiten

**app/layout.tsx:**
- `<html lang="de">`, Font via next/font
- Theme-Provider (class-based), Skip-Link

**app/page.tsx:**
- Render AppLayout → Sidebar, BackButton, SectionRouter, HomeSection

### 4. Interaktion (React statt Inline-Script)

**components/logic/SectionRouter.client.tsx:**
- State für aktive Section (via URL-Hash #slug oder Query ?s=slug; wähle einen Weg und begründe in Kommentar)
- Methoden: goTo(slug), goBack(), Active-State für Sidebar/Parent, History-Stack
- Side-Effects: Scroll to top bei Section-Wechsel

### 5. Suche

SearchBox durchsucht Section-Titel/IDs (aus sectionMap.ts)
Result-Klick → goTo(slug)

### 6. UI-Übertragung

Überführe Inhalte des HTML in modulare `components/sections/*`
- Tabellen → shadcn/ui Table, Collapsibles → shadcn/ui Accordion
- Semantik (header/nav/main/section/footer), Überschrift-Hierarchie
- Responsiveness (Mobile-First, sinnvolle Container-Breiten)

### 7. Iframe-Integration

**Auto-Resize im iFrame** (Kind, in SectionRouter.client.tsx oder dedizierter Hook):

```typescript
useEffect(() => {
  const root = document.querySelector('main') || document.body;
  const obs = new ResizeObserver(() => {
    const height = root.scrollHeight;
    window.parent?.postMessage({ type: 'handbook:height', height }, '*');
  });
  if (root) obs.observe(root);
  return () => obs.disconnect();
}, []);
```

**Parent-Seite** (Snippet in README ausgeben):

```html
<iframe id="handbook" src="https://YOUR-VERCEL-APP.vercel.app" style="width:100%;border:0;" loading="lazy"></iframe>
<script>
  (function() {
    const frame = document.getElementById('handbook');
    window.addEventListener('message', (e) => {
      if (e?.data?.type === 'handbook:height' && Number.isFinite(e.data.height)) {
        frame.style.height = e.data.height + 'px';
      }
    });
    // optional Theme-Forwarding:
    function setTheme(mode){ frame.contentWindow.postMessage({type:'handbook:set-theme',mode}, '*'); }
  })();
</script>
```

**Optional: Theme-Forwarding Listener im Kind:**

```typescript
useEffect(() => {
  const onMsg = (e: MessageEvent) => {
    if (e.data?.type === 'handbook:set-theme') {
      document.documentElement.classList.toggle('dark', e.data.mode === 'dark');
    }
  };
  window.addEventListener('message', onMsg);
  return () => window.removeEventListener('message', onMsg);
}, []);
```

**Security: vercel.json mit frame-ancestors** (ersetze https://example.com):

```json
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        { "key": "Content-Security-Policy", "value": "frame-ancestors https://example.com https://*.example.com;" }
      ]
    }
  ]
}
```

### 8. A11y & Qualität

- Landmark-Rollen, Labels, Tastatur-Fokus, Kontrast
- Fokus-Ring sichtbar, Skip-Link funktionsfähig
- Lighthouse > 90 (Performance/A11y/Best Practices)

### 9. Deploy-Hinweise

- README-Abschnitt mit `pnpm build && pnpm start` lokal
- Vercel Deploy (Production URL ins README schreiben)

## Wichtige Code-Skelette (bitte liefern)

### lib/types.ts

```typescript
export type NavLink = { label: string; slug: string; parent?: string };
export type SectionMeta = { title: string; parent?: string };
export type SearchItem = { title: string; slug: string; parent?: string };
```

### lib/sectionMap.ts (Template, fülle aus HTML)

```typescript
import type { SectionMeta } from './types';

export const sections: Record<string, SectionMeta> = {
  // "home": { title: "Start" },
  // "unsere-mission": { title: "Unsere Mission" },
  // ...
};

export const parents: Record<string, string[]> = {
  // "onboarding-menu": ["zugange-und-konten", "software-und-tools", ...],
  // ...
};
```

### components/logic/SectionRouter.client.tsx (Kernlogik – bitte vollständig liefern)

```typescript
'use client';
import { useEffect, useMemo, useRef, useState } from 'react';
import { sections } from '@/lib/sectionMap';

export default function SectionRouter() {
  const [active, setActive] = useState<string>(() => initialSlug());
  const historyRef = useRef<string[]>([]);

  function initialSlug() {
    if (typeof window === 'undefined') return 'home';
    const hash = window.location.hash?.replace(/^#/, '');
    return hash && sections[hash] ? hash : 'home';
  }

  const goTo = (slug: string) => {
    if (!sections[slug]) return;
    historyRef.current.push(active);
    setActive(slug);
    const url = new URL(window.location.href);
    url.hash = slug;
    window.history.pushState({ slug }, '', url.toString());
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  };

  const goBack = () => {
    const prev = historyRef.current.pop();
    if (prev && sections[prev]) {
      setActive(prev);
      const url = new URL(window.location.href);
      url.hash = prev;
      window.history.pushState({ slug: prev }, '', url.toString());
      window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
    }
  };

  useEffect(() => {
    const onPop = (e: PopStateEvent) => {
      const slug = (e.state && e.state.slug) || window.location.hash.replace(/^#/, '');
      if (slug && sections[slug]) setActive(slug);
    };
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);

  // iFrame Auto-Resize (siehe Briefing)
  useEffect(() => {
    const root = document.querySelector('main') || document.body;
    const obs = new ResizeObserver(() => {
      const height = (root as HTMLElement).scrollHeight;
      window.parent?.postMessage({ type: 'handbook:height', height }, '*');
    });
    if (root) obs.observe(root);
    return () => obs.disconnect();
  }, []);

  // TODO: Sidebar Active-State, Parent-Hervorhebung → via Context/Props

  return (
    <>
      {/* hier aktiven Section-Component rendern */}
      {/* Beispiel: */}
      {/* {active === 'home' && <HomeSection onGoTo={goTo} />} */}
    </>
  );
}
```

### components/layout/Sidebar.tsx (Auszug)

```typescript
import { sections, parents } from '@/lib/sectionMap';

export default function Sidebar({ active, onNavigate }:{ active:string; onNavigate:(slug:string)=>void }) {
  // baue hier die Hauptpunkte & Kinder aus `parents`
  return (
    <nav aria-label="Hauptnavigation" className="...">
      {/* mappe Links; setze Active-Styles */}
    </nav>
  );
}
```

## Akzeptanzkriterien

1. App startet lokal ohne Fehler, `pnpm build` erfolgreich.
2. Alle ursprünglichen HTML-Sections sind als React-Komponenten vorhanden und über Sidebar/Buttons erreichbar.
3. URL-Hash spiegelt aktive Section wider; Back-Button der App (und Browser) funktioniert.
4. Suche findet Sections (Titel/ID) und navigiert korrekt.
5. Im iFrame passt sich die Höhe flüssig an (keine Scrollbars im iFrame, außer Content-Überlänge).
6. A11y-Basics erfüllt (Landmarks, Labels, Fokus, Kontrast).
7. vercel.json enthält frame-ancestors (Platzhalter-Domain).
8. Keine externen, blockierenden Ressourcen; Fonts via next/font.

## Test-Checkliste (manuell)

- **Navigation**: Sidebar → verschiedene Sections → Hash aktualisiert sich.
- **Untermenüs**: Parent-Link aktiviert, Unterseite markiert.
- **Suche**: "kalender", "onboarding" etc. → Treffer anklickbar.
- **Fensterbreite 360px/768px/1280px**: Layout bricht sinnvoll um.
- **iFrame-Demo**: Parent-HTML-Snippet verwenden; Höhe ändert sich bei Section-Wechseln.
- **Dark-Mode (optional)**: Toggle schaltet Theme, iFrame-Parent kann Mode per postMessage setzen.
