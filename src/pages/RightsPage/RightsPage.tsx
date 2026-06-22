import { useTranslation } from 'react-i18next';
import styles from './RightsPage.module.scss';

export const RightsPage = () => {
  const { t } = useTranslation();

  return (
    <section className={styles.rights}>
      <div className={`${styles['rights__container']}`}>
        <aside className={styles['rights__aside']}>
          <h1 className={styles['rights__title']}>{t('rights.title')}</h1>
        </aside>

        <div className={styles['rights__content']}>
          <section className={styles['rights__section']}>
            <h2>{t('rights.welcomeTitle')}</h2>
            <p>{t('rights.welcomeText')}</p>
          </section>

          <section className={styles['rights__section']}>
            <h2>{t('rights.accountTitle')}</h2>
            <p>{t('rights.accountText')}</p>
          </section>

          <section className={styles['rights__section']}>
            <h2>{t('rights.productsTitle')}</h2>
            <p>{t('rights.productsText')}</p>
          </section>

          <section className={styles['rights__section']}>
            <h2>{t('rights.ordersTitle')}</h2>
            <p>{t('rights.ordersText')}</p>
          </section>

          <section className={styles['rights__section']}>
            <h2>{t('rights.propertyTitle')}</h2>
            <p>{t('rights.propertyText')}</p>
          </section>

          <section className={styles['rights__section']}>
            <h2>{t('rights.privacyTitle')}</h2>
            <p>{t('rights.privacyText')}</p>
          </section>

          <section className={styles['rights__section']}>
            <h2>{t('rights.thirdPartyTitle')}</h2>
            <p>{t('rights.thirdPartyText')}</p>
          </section>

          <section className={styles['rights__section']}>
            <h2>{t('rights.limitationTitle')}</h2>
            <p>{t('rights.limitationText')}</p>
          </section>

          <section className={styles['rights__section']}>
            <h2>{t('rights.changesTitle')}</h2>
            <p>{t('rights.changesText')}</p>
          </section>

          <section className={styles['rights__section']}>
            <h2>{t('rights.contactsTitle')}</h2>
            <p>{t('rights.contactsText')}</p>
          </section>
        </div>
      </div>
    </section>
  );
};
