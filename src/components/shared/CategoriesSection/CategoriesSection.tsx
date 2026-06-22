import { categories } from './categories';
import { CategoryCard } from './CategoryCard';
import './CategoriesSection.scss';
import { useTranslation } from 'react-i18next';
import { useBooks } from '../../../hooks/useBooks.ts';
import { useTimeCounter } from '../../../hooks/useTimeCounter.ts';
import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';

export const CategoriesSection = () => {
  const { data = [] } = useBooks();
  const counts = data.reduce(
    (acc, book) => {
      acc[book.type]++;

      return acc;
    },
    {
      audiobook: 0,
      kindle: 0,
      paperback: 0,
    },
  );

  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  const audiobooksCount = useTimeCounter(counts.audiobook * 33, 3, inView);

  const kindlesCount = useTimeCounter(counts.kindle * 39, 4, inView);

  const paperbacksCount = useTimeCounter(counts.paperback * 29, 6, inView);

  const { t } = useTranslation();

  return (
    <section
      className="categories"
      ref={ref}
    >
      <motion.h2
        className="categories__title"
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        {t('category.shopByCategory')}
      </motion.h2>

      <motion.div
        className="categories__grid"
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
      >
        <CategoryCard
          {...categories[0]}
          amount={audiobooksCount}
        />

        <CategoryCard
          {...categories[1]}
          amount={kindlesCount}
        />

        <CategoryCard
          {...categories[2]}
          amount={paperbacksCount}
        />
      </motion.div>
    </section>
  );
};
