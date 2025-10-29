'use client';

import { useEffect, useMemo, useRef, useState } from 'react';

import GenericSection from '../sections/GenericSection';
import type { Entry, Parent } from '../../lib/types';

type ParentResponse = { parents?: Parent[] };
type EntriesResponse = { entries?: Entry[] };

type SectionRouterProps = {
  isAdmin?: boolean;
};

export default function SectionRouter({ isAdmin = false }: SectionRouterProps) {
  const [parents, setParents] = useState<Parent[]>([]);
  const [active, setActive] = useState<string>('start');
  const [entries, setEntries] = useState<Entry[]>([]);
  const cacheRef = useRef<Record<string, Entry[]>>({});
  const [healthError, setHealthError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    void (async () => {
      try {
        const response = await fetch('/api/handbook/health', { cache: 'no-store' });
        if (!response.ok) {
          const data = await response.json().catch(() => ({}));
          throw new Error(data?.error || `health request failed: ${response.status}`);
        }
        if (!cancelled) {
          setHealthError(null);
        }
      } catch (error) {
        if (!cancelled) {
          const message = error instanceof Error ? error.message : 'Unbekannter Fehler';
          setHealthError(message);
        }
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [isAdmin]);

  useEffect(() => {
    void (async () => {
      try {
        const response = await fetch('/api/handbook/parents', {
          cache: 'no-store',
          ...(isAdmin ? { credentials: 'include' as const } : {}),
        });
        if (!response.ok) {
          throw new Error(`parents request failed: ${response.status}`);
        }
        const data: ParentResponse = await response.json().catch(() => ({}));
        const validParents = (data.parents ?? []).filter((parent) => parent.slug && parent.title);
        setParents(validParents);

        const initialSlug = (() => {
          if (typeof window !== 'undefined' && window.location.hash) {
            return window.location.hash.replace('#', '');
          }
          return validParents[0]?.slug ?? 'start';
        })();

        setActive(initialSlug || 'start');
      } catch (error) {
        console.error('Failed to load parents', error);
        // Set empty parents array on error
        setParents([]);
      }
    })();
  }, []);

  useEffect(() => {
    if (!parents.length) {
      return;
    }
    const hasActive = parents.some((parent) => parent.slug === active);
    if (!hasActive) {
      setActive(parents[0]?.slug ?? 'start');
    }
  }, [parents, active]);

  useEffect(() => {
    void (async () => {
      if (!active) {
        return;
      }

      if (cacheRef.current[active]) {
        setEntries(cacheRef.current[active]);
        return;
      }

      try {
        const params = new URLSearchParams({ parent: active });
        const response = await fetch(`/api/handbook/entries?${params.toString()}`, {
          cache: 'no-store',
          ...(isAdmin ? { credentials: 'include' as const } : {}),
        });
        if (!response.ok) {
          throw new Error(`entries request failed: ${response.status}`);
        }
        const data: EntriesResponse = await response.json().catch(() => ({}));
        const parentEntries = (data.entries ?? []).filter((entry) => entry.title && entry.title.trim() !== '');
        cacheRef.current[active] = parentEntries;
        setEntries(parentEntries);

        if (typeof window !== 'undefined') {
          const url = new URL(window.location.href);
          url.hash = active;
          window.history.replaceState({ slug: active }, '', url);
          window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
        }
      } catch (error) {
        console.error(`Failed to load entries for ${active}`, error);
        setEntries([]);
      }
    })();
  }, [active, isAdmin]);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const main = document.querySelector('main') || document.body;
    if (!main) {
      return;
    }

    const resizeObserver = new ResizeObserver(() => {
      const height = main instanceof HTMLElement ? main.scrollHeight : document.body.scrollHeight;
      window.parent?.postMessage({ type: 'handbook:height', height }, '*');
    });

    resizeObserver.observe(main);
    return () => resizeObserver.disconnect();
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const onThemeMessage = (event: MessageEvent) => {
      if (event.data && typeof event.data === 'object' && event.data.type === 'handbook:set-theme') {
        const mode = event.data.mode === 'dark' ? 'dark' : 'light';
        document.documentElement.classList.toggle('dark', mode === 'dark');
      }
    };

    window.addEventListener('message', onThemeMessage);
    return () => window.removeEventListener('message', onThemeMessage);
  }, []);

  const sortedParents = useMemo(
    () => [...parents].sort((a, b) => (a.sort ?? 0) - (b.sort ?? 0)),
    [parents],
  );

  return (
    <>
      {healthError && (
        <div className="mx-auto w-full max-w-5xl px-4 pt-6">
          <div className="rounded-lg border border-destructive/40 bg-destructive/10 px-4 py-3 text-sm text-destructive">
            Airtable-Verbindung fehlgeschlagen: {healthError}
          </div>
        </div>
      )}
      <GenericSection
        parents={sortedParents}
        active={active}
        onNavigate={setActive}
        entries={entries}
        isAdmin={isAdmin}
      />
    </>
  );
}
