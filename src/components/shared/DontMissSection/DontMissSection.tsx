import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useBooks } from '../../../hooks/useBooks.ts';
import { getImageUrl } from '../../../services/getImageUrl.ts';
import './DontMissSection.scss';
import { useTranslation } from 'react-i18next';

export const DontMissSection = () => {
  const { data: books = [] } = useBooks();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  const [activeIndex, setActiveIndex] = useState(0);
  const { t } = useTranslation();

  const featuredBooks = books.slice(0, 6);

  useEffect(() => {
    if (inView) {
      const interval = setInterval(() => {
        setActiveIndex((prev) => (prev + 1) % featuredBooks.length);
      }, 3000);

      return () => clearInterval(interval);
    }
  }, [inView, featuredBooks.length]);

  return (
    <section
      className="dont-miss-section"
      ref={ref}
    >
      <motion.div
        className="dont-miss-section__content"
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        <div className="dont-miss-section__text">
          <span className="dont-miss-section__eyebrow">
            {t('dontMiss.eyebrow')}
          </span>
          <h2 className="dont-miss-section__title">{t('dontMiss.title')}</h2>
          <p className="dont-miss-section__subtitle">
            {t('dontMiss.subtitle')}
          </p>
        </div>

        <div className="dont-miss-section__books">
          {featuredBooks.map((book, index) => {
            const isActive = index === activeIndex;
            const offset =
              (index - activeIndex + featuredBooks.length) %
              featuredBooks.length;
            const x =
              offset === 0 ? 0
              : offset === 1 ? 120
              : offset === featuredBooks.length - 1 ? -120
              : 0;
            const scale = isActive ? 1.12 : 0.86;
            const opacity = isActive ? 1 : 0.55;
            const zIndex = isActive ? 12 : 6 - offset;

            return (
              <motion.div
                key={book.id}
                className="dont-miss-section__book"
                animate={{
                  x,
                  scale,
                  opacity,
                  zIndex,
                  rotate:
                    isActive ? 0
                    : index % 2 === 0 ? -4
                    : 4,
                }}
                transition={{
                  duration: 0.7,
                  ease: 'easeInOut',
                }}
                style={{ zIndex }}
              >
                <img
                  src={getImageUrl(book.images[0])}
                  alt={book.name}
                  className="dont-miss-section__book-image"
                />
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
};
