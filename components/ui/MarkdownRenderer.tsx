import React from 'react';
import dynamic from 'next/dynamic';

import { cn } from '@/lib/utils';

type MarkdownRendererProps = {
  content: string;
  className?: string;
};

const ReactMarkdown = dynamic(() => import('react-markdown'), {
  ssr: false,
  loading: () => null,
});

const remarkGfmPromise = import('remark-gfm').then((mod) => mod.default || mod);

export function MarkdownRenderer({ content, className }: MarkdownRendererProps) {
  const [gfm, setGfm] = React.useState<any>(null);

  React.useEffect(() => {
    let mounted = true;
    remarkGfmPromise.then((plugin) => {
      if (mounted) {
        setGfm(() => plugin);
      }
    });
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <ReactMarkdown
      {...(gfm ? { remarkPlugins: [gfm] } : {})}
      className={cn(
        'prose prose-sm max-w-none text-muted-foreground md:prose-base',
        '[&_.anchor]:hidden [&_a]:text-primary [&_a]:underline-offset-4 [&_a:hover]:underline',
        '[&_strong]:text-foreground [&_strong]:font-semibold',
        '[&_code]:rounded [&_code]:bg-muted [&_code]:px-1.5 [&_code]:py-0.5',
        '[&_pre]:bg-muted [&_pre]:text-foreground [&_pre]:shadow-sm',
        className,
      )}
    >
      {content || ''}
    </ReactMarkdown>
  );
}
