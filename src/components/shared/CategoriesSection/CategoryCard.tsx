import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

type Props = {
  titleKey: string;
  type: string;
  video: string;
  poster: string;
  amount: number;
};

export const CategoryCard = ({
  titleKey,
  type,
  video,
  poster,
  amount,
}: Props) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const isMobile = window.innerWidth <= 639;

  const handleMouseEnter = () => {
    videoRef.current?.play();
  };

  const handleMouseLeave = () => {
    if (!videoRef.current) {
      return;
    }

    videoRef.current.pause();
    videoRef.current.currentTime = 0;
  };

  const { t } = useTranslation();

  return (
    <Link
      to={`/catalog?type=${type}`}
      className={`category-card category-card--${type}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="category-card__media">
        {isMobile ?
          <img
            src={poster}
            alt={t(titleKey)}
            className="category-card__video"
          />
        : <video
            ref={videoRef}
            className="category-card__video"
            poster={poster}
            muted
            playsInline
            preload="metadata"
          >
            <source
              src={video}
              type="video/mp4"
            />
          </video>
        }
      </div>

      <h3 className="category-card__title">{t(titleKey)}</h3>

      <p className="category-card__amount">
        {amount} {t('product.books')}
      </p>
    </Link>
  );
};
