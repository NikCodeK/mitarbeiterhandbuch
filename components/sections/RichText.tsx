'use client';

type RichTextProps = {
  html: string;
};

export function RichText({ html }: RichTextProps) {
  return (
    <div
      className="rich-text space-y-4 text-sm leading-relaxed text-muted-foreground"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
