declare module '@uiw/react-md-editor' {
  import type * as React from 'react';
  type MDEditorProps = {
    value?: string;
    onChange?: (value?: string) => void;
    height?: number;
    id?: string;
    [key: string]: unknown;
  };
  const MDEditor: React.FC<MDEditorProps>;
  export default MDEditor;
}

declare module '@uiw/react-markdown-preview' {
  import type * as React from 'react';
  type MarkdownPreviewProps = {
    source?: string;
    className?: string;
    wrapperElement?: {
      'data-color-mode'?: 'light' | 'dark' | 'auto';
      [key: string]: unknown;
    };
    [key: string]: unknown;
  };
  const MarkdownPreview: React.FC<MarkdownPreviewProps>;
  export default MarkdownPreview;
}
