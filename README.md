## Mitarbeiterhandbuch (Next.js / Tailwind / shadcn)

iFrame-ready Single-Page-App fuer das TC-Mitarbeiterhandbuch. Stack: Next.js (App Router, TypeScript), Tailwind CSS 3.x, shadcn/ui, lucide-react.

## Voraussetzungen

- Node.js 20+
- pnpm (`corepack enable pnpm`)

## Projektstart

```bash
# Abhaengigkeiten installieren
pnpm install

# Entwicklung starten (http://localhost:3000)
pnpm dev

# Produktionsbuild erzeugen
pnpm build

# Linting ausfuehren
pnpm lint
```

## Strukturueberblick

- `app/` - App Router Einstieg (`layout.tsx`, `page.tsx`)
- `components/layout` - Shell (Sidebar, Buttons, ThemeProvider)
- `components/logic/SectionRouter.client.tsx` - Hash-Navigation, History, iFrame-Resize
- `components/sections` - Eine Datei pro Inhaltsbereich; Legacy-HTML via `RichText`
- `components/menus` - CTA- und Landing-Komponenten fuer Untermenues
- `components/home` - Startseite mit Suche und Inhaltsuebersicht
- `lib/sectionMap.ts` - Metadaten, Parent/Child-Relationen, Navigationsreihenfolge
- `lib/data.ts` - Abgeleitete Daten fuer Suche und Home-Grid

### Navigation & Suche

- `SectionRouter` liest den URL-Hash (`#slug`) und synchronisiert die Browser-History.
- `SearchBox` durchsucht `sections` nach Titel/Keywords und navigiert ueber `goTo(slug)`.
- Die Sidebar wird aus `sectionGroups` generiert und hebt aktive Parents hervor.

### Inhaltsdarstellung

- Mission, Kerngeschaeft und Menues sind handcodiert und nutzen shadcn-Komponenten.
- Umfangreiche Legacy-Inhalte werden als HTML in `RichText` gerendert; globale Styles in `globals.css` regeln Typografie, Tabellen und Links.
- Historische CSS-Variablen (`--primary-color`, `--primary-darker`, ...) sind weiterhin gesetzt, damit bestehende Utility-Klassen greifen.

## iFrame Integration

- Kind (Next.js): `SectionRouter` sendet `{ type: 'handbook:height', height }` und hoert auf `handbook:set-theme`.

Elternseite Beispiel:

```html
<iframe
  id="handbook"
  src="https://YOUR-VERCEL-APP.vercel.app"
  style="width:100%;border:0;"
  loading="lazy"
></iframe>
<script>
  (function () {
    const frame = document.getElementById('handbook');
    window.addEventListener('message', (event) => {
      if (event?.data?.type === 'handbook:height' && Number.isFinite(event.data.height)) {
        frame.style.height = event.data.height + 'px';
      }
    });
    // Beispiel fuer Theme-Forwarding:
    function setTheme(mode) {
      frame.contentWindow?.postMessage({ type: 'handbook:set-theme', mode }, '*');
    }
    // setTheme('dark');
  })();
</script>
```

`vercel.json` liefert einen CSP-Header mit `frame-ancestors 'self' https://example.com`. Domain bei Deploy anpassen.

## Deployment

1. `pnpm build`
2. Deploy (z. B. Vercel)
3. `frame-ancestors` auf Ziel-Domain setzen
4. Einbettung testen (Resize, Hash-Navigation, Theme-Forwarding)

## Nuetzliche Links

- [Next.js App Router Docs](https://nextjs.org/docs/app)
- [shadcn/ui](https://ui.shadcn.com)
- [Tailwind CSS 3.x](https://tailwindcss.com/docs)
