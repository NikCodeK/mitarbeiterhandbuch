'use client';

import { ArrowLeft } from 'lucide-react';

import { useSectionRouter } from '@/components/logic/SectionRouter.client';
import { Button } from '@/components/ui/button';

export default function BackButton() {
  const { previous, goBack } = useSectionRouter();
  const canGoBack = Boolean(previous);

  if (!canGoBack) {
    return null;
  }

  return (
    <div className="mb-4">
      <Button
        type="button"
        variant="ghost"
        className="gap-2"
        onClick={goBack}
      >
        <ArrowLeft className="h-4 w-4" aria-hidden />
        Zurück
      </Button>
    </div>
  );
}
