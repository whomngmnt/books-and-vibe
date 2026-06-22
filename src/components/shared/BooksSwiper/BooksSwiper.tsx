import { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { BookCard } from '../BookCard/BookCard';
import { useCart } from '../../../hooks/useCart';
import { useFavorites } from '../../../hooks/useFavorites';
import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { Book } from '../../../types/Book.ts';
import './BooksSwiper.scss';

import 'swiper/css';
import { PageLoader } from '../PageLoader/PageLoader.tsx';
import { useTranslation } from 'react-i18next';
import { useMinimumLoader } from '../../../hooks/useMinimumLoader.ts';

interface BooksSwiperProps {
  title: string;
  books: Book[];
  isLoading: boolean;
}

export const BooksSwiper = ({
  title,
  books = [],
  isLoading,
}: BooksSwiperProps) => {
  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);
  const { cartIds, addToCart } = useCart();
  const { favoriteIds, toggleFavorite } = useFavorites();
  const { t } = useTranslation();
  const showLoader = useMinimumLoader(isLoading, 1500);

  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  if (showLoader) {
    return <PageLoader />;
  }

  return (
    <section
      className="books-swiper"
      ref={ref}
    >
      <motion.div
        className="books-swiper__header"
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        <h2 className="books-swiper__title">{t(title)}</h2>

        <div className="books-swiper__nav">
          <button
            ref={prevRef}
            className="books-swiper__arrow books-swiper__arrow--prev"
            aria-label="Previous slide"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            ref={nextRef}
            className="books-swiper__arrow books-swiper__arrow--next"
            aria-label="Next slide"
          >
            <ChevronRight size={24} />
          </button>
        </div>
      </motion.div>

      <motion.div
        className="books-swiper__slider-wrapper"
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
      >
        <Swiper
          modules={[Navigation]}
          spaceBetween={24}
          slidesPerGroup={1}
          observer
          observeParents
          resizeObserver
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
          className="books-swiper__container"
        >
          {books.map((book) => (
            <SwiperSlide
              key={book.id}
              className="books-swiper__slide"
            >
              {!isLoading ?
                <BookCard
                  book={book}
                  onAddToCart={addToCart}
                  onToggleFavorite={toggleFavorite}
                  inCart={cartIds.includes(book.id)}
                  isFavorite={favoriteIds.includes(book.id)}
                />
              : <div className="books-swiper__skeleton" />}
            </SwiperSlide>
          ))}
        </Swiper>
      </motion.div>
    </section>
  );
};
