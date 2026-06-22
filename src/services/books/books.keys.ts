export const booksKeys = {
  all: ['books'] as const,

  list: () => [...booksKeys.all, 'list'] as const,

  details: (slug: string) => [...booksKeys.all, slug] as const,
};
