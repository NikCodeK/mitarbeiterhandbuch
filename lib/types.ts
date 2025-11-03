export type Parent = {
  id: string;
  slug: string;
  title: string;
  sort?: number;
  published?: boolean;
};

export type Entry = {
  id: string;
  parentId: string;
  parentSlug?: string;
  slug: string;
  title: string;
  content_md?: string;
  sort?: number;
  status?: 'Draft' | 'Published';
};
