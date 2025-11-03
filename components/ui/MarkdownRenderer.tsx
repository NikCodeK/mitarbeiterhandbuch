import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

import { cn } from '@/lib/utils';

type MarkdownRendererProps = {
  content: string;
  className?: string;
};

export function MarkdownRenderer({ content, className }: MarkdownRendererProps) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
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
