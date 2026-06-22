import { useQuery } from '@tanstack/react-query';

import { booksKeys } from '../services/books/books.keys';
import { booksService } from '../services/books/books.service';

export const useBooks = () => {
  return useQuery({
    queryKey: booksKeys.list(),
    queryFn: booksService.getBooks,
    staleTime: 1000 * 60 * 5,
  });
};
