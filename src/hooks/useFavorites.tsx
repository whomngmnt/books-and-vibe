import { useQuery, useQueryClient } from '@tanstack/react-query';

import { favoritesService } from '../services';

import { favoritesKeys } from '../services/favorites/favorites.keys';

export function useFavorites() {
  const queryClient = useQueryClient();

  const { data: favoriteIds = [] } = useQuery({
    queryKey: favoritesKeys.all,
    queryFn: favoritesService.getAll,

    staleTime: Infinity,
  });

  const toggleFavorite = (id: string) => {
    favoritesService.toggle(id);

    queryClient.setQueryData(favoritesKeys.all, favoritesService.getAll());
  };

  return {
    favoriteIds,
    favoritesCount: favoriteIds.length,

    toggleFavorite,
  };
}
