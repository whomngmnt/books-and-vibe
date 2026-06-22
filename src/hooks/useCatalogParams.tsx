import { useSearchParams } from 'react-router-dom';

export type SortOption = 'price-asc' | 'price-desc' | 'newest' | 'oldest';
export type TypeFilter = 'all' | 'audiobook' | 'kindle' | 'paperback';
export type PerPage = 8 | 16 | 32;

export function useCatalogParams() {
  const [searchParams, setSearchParams] = useSearchParams();

  const sort = (searchParams.get('sort') as SortOption) ?? 'newest';
  const type = (searchParams.get('type') as TypeFilter) ?? 'all';
  const perPage = (Number(searchParams.get('perPage')) as PerPage) || 16;
  const page = Number(searchParams.get('page')) || 1;

  const setParam = (key: string, value: string) => {
    const next = new URLSearchParams(searchParams);
    next.set(key, value);

    if (key !== 'page') {
      next.set('page', '1');
    }

    setSearchParams(next);
  };

  return { sort, type, perPage, page, setParam };
}
