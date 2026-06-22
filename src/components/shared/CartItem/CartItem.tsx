import { Icon } from '../../ui/Icon';
import type { Book } from '../../../types/Book.ts';
import './CartItem.scss';
import { getImageUrl } from '../../../services/getImageUrl.ts';

type Props = {
  book: Book;
  quantity: number;
  onIncrease: () => void;
  onDecrease: () => void;
  onRemove: () => void;
};

export function CartItem({
  book,
  quantity,
  onIncrease,
  onDecrease,
  onRemove,
}: Props) {
  const price = book.price_discount ?? book.price_regular;
  const imageSrc = getImageUrl(book.images[0]);

  return (
    <div className="cart-item">
      <img
        src={imageSrc}
        alt={book.name}
        className="cart-item__image"
      />

      <div className="cart-item__info">
        <p className="cart-item__author">{book.author}</p>
        <h3 className="cart-item__name">{book.name}</h3>
        <p className="cart-item__price">₴{price}</p>
      </div>

      <div className="cart-item__quantity">
        <button
          type="button"
          className="cart-item__qty-btn"
          onClick={onDecrease}
        >
          <Icon name="minus" />
        </button>
        <span>{quantity}</span>
        <button
          type="button"
          className="cart-item__qty-btn"
          onClick={onIncrease}
        >
          <Icon name="plus" />
        </button>
      </div>

      <button
        type="button"
        className="cart-item__remove-btn"
        onClick={onRemove}
      >
        <Icon name="close" />
      </button>
    </div>
  );
}
