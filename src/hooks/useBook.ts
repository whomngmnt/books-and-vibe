import { useQuery } from '@tanstack/react-query';

import { booksKeys } from '../services/books/books.keys';
import { booksService } from '../services/books/books.service';

export const useBook = (slug: string) => {
  return useQuery({
    queryKey: booksKeys.details(slug),
    queryFn: () => booksService.getBookBySlug(slug),

    enabled: !!slug,
  });
};
