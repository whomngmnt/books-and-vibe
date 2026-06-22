import { AppButton } from '../../ui/Button';
import { LikeButton } from '../../ui/LikeButton';
import type { Book } from '../../../types/Book.ts';
import './BookCard.scss';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { getImageUrl } from '../../../services/getImageUrl.ts';
import { Headphones, Truck } from 'lucide-react';
import { toast } from 'sonner';
import { animateFlyingIcon } from '../../../services/animations/animateFlyingIcon';

type Props = {
  book: Book;
  onAddToCart: (id: string) => void;
  onToggleFavorite: (id: string) => void;
  inCart: boolean;
  isFavorite: boolean;
};

export function BookCard({
  book,
  onAddToCart,
  onToggleFavorite,
  inCart,
  isFavorite,
}: Props) {
  const price = book.price_discount ?? book.price_regular;
  const imageSrc = getImageUrl(book.images[0]);

  const { t } = useTranslation();

  const handleAddToFavorite = () => {
    onToggleFavorite(book.id);

    if (!isFavorite) {
      toast.success(
        `${book.name} ${t('product.addedToFavorites', { defaultValue: t('product.addedToFavorites') })}`,
      );
    } else {
      toast.info(
        `${book.name} ${t('product.removedFromFavorites', { defaultValue: t('product.removedFromFavorites') })}`,
      );
    }
  };

  const handleAddToCart = () => {
    onAddToCart(book.id);

    toast.success(
      `${book.name} ${t('product.addedToCartSuccess', { defaultValue: t('product.addedToCartSuccess') })}`,
    );
  };

  return (
    <article className="book-card">
      <div className="book-card__image-wrap">
        <Link to={`/products/${book.slug}`}>
          <img
            src={imageSrc}
            alt={book.name}
            className="book-card__image"
          />
        </Link>
        {book.type === 'audiobook' && (
          <span className="book-card__badge">
            <Headphones size={16} />
          </span>
        )}
      </div>

      <div className="book-card__body">
        <p className="book-card__author">{book.author}</p>
        <div className="book-card__name-container">
          <Link
            to={`/products/${book.slug}`}
            className="book-card__name"
          >
            {book.name}
          </Link>
        </div>
        <div className="book-card__prices">
          <span className="book-card__price">${price}</span>
          {book.price_discount && (
            <span className="book-card__old-price">₴{book.price_regular}</span>
          )}
        </div>
        <p className="book-card__stock">
          <Truck size={14} />
          {t('product.inStock')}
        </p>
      </div>

      <div className="book-card__actions">
        <AppButton
          variant={inCart ? 'selected' : 'primary'}
          onClick={(event) => {
            if (inCart) return;

            handleAddToCart();

            animateFlyingIcon({
              source: event.currentTarget,
              targetSelector: '[data-cart-target]',
              content: '🛒',
            });
          }}
        >
          {inCart ? t('product.added') : t('product.addToCart')}
        </AppButton>
        <LikeButton
          isSelected={isFavorite}
          onClick={(event) => {
            handleAddToFavorite();

            if (!isFavorite) {
              animateFlyingIcon({
                source: event.currentTarget,
                targetSelector: '[data-favorites-target]',
                content: '❤️',
              });
            }
          }}
          colored
        />
      </div>
    </article>
  );
}
