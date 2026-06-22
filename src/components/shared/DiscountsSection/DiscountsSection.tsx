import { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { BookCard } from '../BookCard/BookCard';
import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Tag } from 'lucide-react';
import { useCart } from '../../../hooks/useCart';
import { useFavorites } from '../../../hooks/useFavorites';
import type { Book } from '../../../types/Book.ts';
import './DiscountsSection.scss';

import 'swiper/css';
import { useTranslation } from 'react-i18next';

interface DiscountsSectionProps {
  books: Book[];
  isLoading: boolean;
}

export const DiscountsSection = ({
  books = [],
  isLoading,
}: DiscountsSectionProps) => {
  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);
  const { cartIds, addToCart } = useCart();
  const { favoriteIds, toggleFavorite } = useFavorites();
  const { t } = useTranslation();

  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  const discountedBooks = books.filter((book) => book.price_discount);
  const promoBooks =
    discountedBooks.length > 0 ? discountedBooks : books.slice(0, 8);

  return (
    <section
      className="discounts-section"
      ref={ref}
    >
      <motion.div
        className="discounts-section__header"
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        <div className="discounts-section__title-wrapper">
          <Tag
            className="discounts-section__icon"
            size={32}
          />
          <h2 className="discounts-section__title">
            {' '}
            {t('home.discountTitle')}
          </h2>
        </div>
        <p className="discounts-section__subtitle">
          {t('home.discountDescription')}
        </p>
      </motion.div>

      <motion.div
        className="discounts-section__slider-wrapper"
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
      >
        <div className="discounts-section__nav">
          <button
            ref={prevRef}
            className="discounts-section__arrow discounts-section__arrow--prev"
            aria-label="Previous slide"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            ref={nextRef}
            className="discounts-section__arrow discounts-section__arrow--next"
            aria-label="Next slide"
          >
            <ChevronRight size={24} />
          </button>
        </div>

        <Swiper
          modules={[Navigation]}
          spaceBetween={24}
          slidesPerGroup={1}
          navigation={true}
          onBeforeInit={(swiper) => {
            if (
              swiper.params.navigation &&
              typeof swiper.params.navigation !== 'boolean'
            ) {
              swiper.params.navigation.prevEl = prevRef.current;
              swiper.params.navigation.nextEl = nextRef.current;
            }
          }}
          breakpoints={{
            320: {
              slidesPerView: 1,
            },
            480: {
              slidesPerView: 2,
            },
            768: {
              slidesPerView: 3,
            },
            1120: {
              slidesPerView: 4,
            },
          }}
          className="discounts-section__container"
        >
          {promoBooks.map((book) => (
            <SwiperSlide
              key={book.id}
              className="discounts-section__slide"
            >
              {!isLoading ?
                <BookCard
                  book={book}
                  onAddToCart={addToCart}
                  onToggleFavorite={toggleFavorite}
                  inCart={cartIds.includes(book.id)}
                  isFavorite={favoriteIds.includes(book.id)}
                />
              : <div className="discounts-section__skeleton" />}
            </SwiperSlide>
          ))}
        </Swiper>
      </motion.div>
    </section>
  );
};
