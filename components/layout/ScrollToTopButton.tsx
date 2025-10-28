'use client';

import { ArrowUp } from 'lucide-react';
import { useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';

export default function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }
    const onScroll = () => {
      setIsVisible(window.scrollY > 240);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  if (!isVisible) {
    return null;
  }

  return (
    <Button
      type="button"
      variant="secondary"
      className="fixed bottom-6 right-6 z-50 shadow-lg md:bottom-12 md:right-12"
      onClick={() =>
        typeof window !== 'undefined' &&
        window.scrollTo({ top: 0, behavior: 'smooth' })
      }
    >
      <ArrowUp className="mr-2 h-4 w-4" aria-hidden />
      Nach oben
    </Button>
  );
}
