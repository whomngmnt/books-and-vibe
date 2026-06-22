import styles from './PageLoader.module.scss';
import loaderGif from '../../../../public/loader-gif.gif';

export const PageLoader = () => {
  return (
    <div className={styles.loader}>
      <div className={styles.overlay} />

      <img
        src={loaderGif}
        alt="Loading..."
        className={styles.image}
      />

      <div className={styles.dots}>
        <span />
        <span />
        <span />
      </div>
    </div>
  );
};
