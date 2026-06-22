const STORAGE_KEY = 'nice-book-favorites';

export const favoritesService = {
  getAll: (): string[] => {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as string[];
  },

  toggle: (id: string) => {
    const ids = favoritesService.getAll();

    if (ids.includes(id)) {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(ids.filter((favId) => favId !== id)),
      );
    } else {
      localStorage.setItem(STORAGE_KEY, JSON.stringify([...ids, id]));
    }
  },
};
