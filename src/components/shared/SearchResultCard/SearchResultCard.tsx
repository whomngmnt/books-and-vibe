import { Link } from 'react-router-dom';
import type { Book } from '../../../types/Book.ts';
import './SearchResultCard.scss';
import { getImageUrl } from '../../../services/getImageUrl.ts';

type Props = {
  book: Book;
  onCardClick?: () => void;
};

export function SearchResultCard({ book, onCardClick }: Props) {
  const price = book.price_discount ?? book.price_regular;
  const imageSrc = getImageUrl(book.images[0]);

  return (
    <Link
      to={`/products/${book.slug}`}
      className="search-result-card"
      onClick={onCardClick}
    >
      <img
        src={imageSrc}
        alt={book.name}
        className="search-result-card__image"
      />
      <div className="search-result-card__info">
        <p className="search-result-card__author">{book.author}</p>
        <h3 className="search-result-card__name">{book.name}</h3>
        {book.price_discount ?
          <div className="search-result-card__prices">
            <p className="search-result-card__price search-result-card__price--discount">
              ₴{book.price_discount}
            </p>
            <p className="search-result-card__price search-result-card__price--regular">
              ₴{book.price_regular}
            </p>
          </div>
        : <p className="search-result-card__price">₴{price}</p>}
      </div>
    </Link>
  );
}
