import { useTranslation } from 'react-i18next';
import styles from './LanguageSwitcher.module.scss';

export const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const isEnglish = i18n.language === 'en';

  const handleToggle = () => {
    const nextLanguage = isEnglish ? 'uk' : 'en';

    i18n.changeLanguage(nextLanguage);
    localStorage.setItem('language', nextLanguage);
  };

  return (
    <button
      type="button"
      className={styles.switcher}
      onClick={handleToggle}
      aria-label="Change language"
    >
      <span className={!isEnglish ? styles.active : ''}>UA</span>

      <div className={styles.track}>
        <div
          className={`${styles.thumb} ${isEnglish ? styles.thumbRight : ''}`}
        />
      </div>

      <span className={isEnglish ? styles.active : ''}>EN</span>
    </button>
  );
};
