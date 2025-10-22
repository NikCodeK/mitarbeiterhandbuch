'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import { sectionGroups, sections } from '@/lib/sectionMap';
import type { SectionSlug } from '@/lib/types';
import { sectionComponents } from '@/components/sections';

type SectionRouterContextValue = {
  active: SectionSlug;
  previous: SectionSlug | null;
  stack: SectionSlug[];
  goTo: (slug: SectionSlug, options?: { replace?: boolean }) => void;
  goBack: () => void;
};

const SectionRouterContext = createContext<SectionRouterContextValue | null>(
  null,
);

const validSlugs = new Set(Object.keys(sections));

function isValidSlug(candidate: string | null | undefined): candidate is SectionSlug {
  return Boolean(candidate && validSlugs.has(candidate));
}

function readSlugFromLocation(): SectionSlug {
  if (typeof window === 'undefined') {
    return 'home';
  }
  const hash = window.location.hash?.replace(/^#/, '') ?? '';
  if (isValidSlug(hash)) {
    return hash;
  }
  const params = new URLSearchParams(window.location.search);
  const querySlug = params.get('s');
  if (isValidSlug(querySlug)) {
    return querySlug;
  }
  return 'home';
}

export function SectionRouterProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const stackRef = useRef<SectionSlug[]>(['home']);
  const skipHashEventRef = useRef(false);
  const [active, setActive] = useState<SectionSlug>('home');
  const [previous, setPrevious] = useState<SectionSlug | null>(null);
  const [stackSnapshot, setStackSnapshot] = useState<SectionSlug[]>([
    'home',
  ]);

  const syncStack = useCallback((next: SectionSlug[]) => {
    stackRef.current = next;
    setStackSnapshot(next);
    setPrevious(next.length > 1 ? next[next.length - 2] : null);
  }, []);

  useEffect(() => {
    const slug = readSlugFromLocation();
    setActive(slug);
    syncStack([slug]);

    // Persist slug in hash so parent frames read it reliably
    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href);
      url.hash = slug;
      window.history.replaceState(window.history.state, '', url.toString());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const goTo = useCallback(
    (target: SectionSlug, options?: { replace?: boolean }) => {
      if (typeof window === 'undefined') {
        return;
      }
      if (!isValidSlug(target)) {
        return;
      }
      const currentStack = stackRef.current;
      const last = currentStack[currentStack.length - 1];
      if (last === target && !options?.replace) {
        return;
      }

      const nextStack = options?.replace
        ? [...currentStack.slice(0, -1), target]
        : [...currentStack, target];

      syncStack(nextStack);
      setActive(target);

      const url = new URL(window.location.href);
      url.hash = target;
      skipHashEventRef.current = true;
      if (options?.replace) {
        window.history.replaceState(window.history.state, '', url.toString());
      } else {
        window.location.hash = target;
      }

      window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
    },
    [syncStack],
  );

  const goBack = useCallback(() => {
    if (typeof window === 'undefined') {
      return;
    }
    const currentStack = stackRef.current;
    if (currentStack.length <= 1) {
      goTo('home', { replace: true });
      return;
    }
    const nextStack = currentStack.slice(0, -1);
    const nextSlug = nextStack[nextStack.length - 1] ?? 'home';
    syncStack(nextStack);
    setActive(nextSlug);

    const url = new URL(window.location.href);
    url.hash = nextSlug;
    skipHashEventRef.current = true;
    window.history.replaceState(window.history.state, '', url.toString());
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  }, [goTo, syncStack]);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }
    const onHashChange = () => {
      if (skipHashEventRef.current) {
        skipHashEventRef.current = false;
        return;
      }
      const slug = readSlugFromLocation();
      const currentStack = stackRef.current;
      const last = currentStack[currentStack.length - 1];
      const secondLast =
        currentStack.length > 1
          ? currentStack[currentStack.length - 2]
          : null;

      if (slug === last) {
        setActive(slug);
        return;
      }
      if (slug === secondLast) {
        const nextStack = currentStack.slice(0, -1);
        syncStack(nextStack);
        setActive(slug);
        return;
      }
      if (isValidSlug(slug)) {
        const nextStack = [...currentStack, slug];
        syncStack(nextStack);
        setActive(slug);
      }
    };

    window.addEventListener('hashchange', onHashChange);
    return () => {
      window.removeEventListener('hashchange', onHashChange);
    };
  }, [syncStack]);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }
    const root = document.querySelector('main') || document.body;
    if (!root) {
      return;
    }
    const observer = new ResizeObserver(() => {
      const height =
        root instanceof HTMLElement ? root.scrollHeight : document.body.scrollHeight;
      window.parent?.postMessage(
        { type: 'handbook:height', height },
        '*',
      );
    });
    observer.observe(root);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }
    const onThemeMessage = (event: MessageEvent) => {
      if (
        event.data &&
        typeof event.data === 'object' &&
        event.data.type === 'handbook:set-theme'
      ) {
        const mode = event.data.mode === 'dark' ? 'dark' : 'light';
        document.documentElement.classList.toggle('dark', mode === 'dark');
      }
    };
    window.addEventListener('message', onThemeMessage);
    return () => window.removeEventListener('message', onThemeMessage);
  }, []);

  const value = useMemo<SectionRouterContextValue>(
    () => ({
      active,
      previous,
      stack: stackSnapshot,
      goTo,
      goBack,
    }),
    [active, goBack, goTo, previous, stackSnapshot],
  );

  return (
    <SectionRouterContext.Provider value={value}>
      {children}
    </SectionRouterContext.Provider>
  );
}

export function useSectionRouter() {
  const ctx = useContext(SectionRouterContext);
  if (!ctx) {
    throw new Error('useSectionRouter must be used within SectionRouterProvider');
  }
  return ctx;
}

export function SectionRenderer() {
  const { active, goTo, goBack } = useSectionRouter();
  const Component =
    sectionComponents[active] ?? sectionComponents['home'];
  const meta = sections[active] ?? sections['home'];

  if (!Component) {
    return null;
  }

  return <Component slug={active} meta={meta} goTo={goTo} goBack={goBack} />;
}

export const topLevelSections = sectionGroups.map((group) => group.slug);
