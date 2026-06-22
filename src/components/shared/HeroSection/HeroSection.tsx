import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useTheme } from '../../layout/Header/useTheme';
import './HeroSection.scss';
import { useTranslation } from 'react-i18next';

export const HeroSection = () => {
  const { isDark } = useTheme();
  const heroImage = `${import.meta.env.BASE_URL}img/hero/hero-photo.jpg`;
  const nightHeroImage = `${import.meta.env.BASE_URL}img/hero/night-theme-hero.jpg`;
  const { t } = useTranslation();

  return (
    <section className="hero">
      <motion.div
        className="hero__background"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, ease: 'easeOut' }}
        style={{
          backgroundImage: `url(${isDark ? nightHeroImage : heroImage})`,
        }}
      />
      <div className="hero__content">
        <motion.div
          className="hero__text"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5, ease: 'easeOut' }}
        >
          <h1 className="hero__title">
            {t('home.titleP1')} <br />
            <span className="hero__accent">{t('home.titleP2')}</span>
          </h1>
          <p className="hero__subtitle">{t('home.titleDescription')}</p>
          <Link
            to="/catalog"
            className="hero__button"
          >
            {t('hero.shopNow')}
            <ArrowRight size={20} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};
