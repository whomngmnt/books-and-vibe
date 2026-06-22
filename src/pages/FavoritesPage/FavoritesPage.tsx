import { useCart } from '../../hooks/useCart.tsx';
import { useFavorites } from '../../hooks/useFavorites.tsx';
import { BookCard } from '../../components/shared/BookCard/BookCard.tsx';
import './FavoritesPage.scss';
import { useTranslation } from 'react-i18next';
import { useBooks } from '../../hooks/useBooks.ts';
import { useMinimumLoader } from '../../hooks/useMinimumLoader.ts';
import { PageLoader } from '../../components/shared/PageLoader/PageLoader.tsx';

export function FavoritesPage() {
  const { cartIds, addToCart } = useCart();
  const { favoriteIds, toggleFavorite } = useFavorites();
  const { t } = useTranslation();
  const { data: books = [], isLoading } = useBooks();

  const favoriteBooks = books.filter((book) => favoriteIds.includes(book.id));

  const count = favoriteBooks.length;

  const showLoader = useMinimumLoader(isLoading, 1500);

  if (showLoader) {
    return <PageLoader />;
  }

  return (
    <section className="page">
      <h1 className="favorites-title">{t('favorites.title')}</h1>
      <p className="favorites-count">
        {count} {t('favorites.books', { count })}
      </p>

      {favoriteBooks.length === 0 ?
        <p className="favorites-empty">{t('favorites.empty')}</p>
      : <div className="favorites-grid">
          {favoriteBooks.map((book) => (
            <BookCard
              key={book.id}
              book={book}
              onAddToCart={addToCart}
              onToggleFavorite={toggleFavorite}
              inCart={cartIds.includes(book.id)}
              isFavorite
            />
          ))}
        </div>
      }
    </section>
  );
}
