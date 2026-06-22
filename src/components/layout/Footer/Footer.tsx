import './Footer.scss';
import { Link } from 'react-router-dom';
import { ArrowUp } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export function Footer() {
  const handleBackToTop = (): void => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const { t } = useTranslation();

  return (
    <footer className="footer">
      <div className="footer__content">
        <div className="footer__left">
          <h2 className="footer__slogan">
            {t('footer.slogan1')}
            <br />
            {t('footer.slogan2')}
          </h2>
        </div>

        <div className="footer__right">
          <nav className="footer__links">
            <div className="footer__column">
              <h3 className="footer__column-title">{t('footer.explore')}</h3>
              <ul className="footer__column-list">
                <li>
                  <Link
                    to="/catalog?type=paperback"
                    className="footer__link"
                  >
                    {t('header.paper')}
                  </Link>
                </li>
                <li>
                  <Link
                    to="/catalog?type=kindle"
                    className="footer__link"
                  >
                    {t('header.kindle')}
                  </Link>
                </li>
                <li>
                  <Link
                    to="/catalog?type=audiobook"
                    className="footer__link"
                  >
                    {t('header.audio')}
                  </Link>
                </li>
              </ul>
            </div>

            <div className="footer__column">
              <h3 className="footer__column-title">{t('footer.company')}</h3>
              <ul className="footer__column-list">
                <li>
                  <Link
                    to="https://github.com/Arthur-s-children/nice-book-project"
                    target="_blank"
                    rel="noreferrer noopener"
                    className="footer__link"
                  >
                    {t('footer.github')}
                  </Link>
                </li>
                <li>
                  <Link
                    to="contacts"
                    className="footer__link"
                  >
                    {t('footer.contacts')}
                  </Link>
                </li>
                <li>
                  <Link
                    to="team"
                    className="footer__link"
                  >
                    {t('footer.team')}
                  </Link>
                </li>
              </ul>
            </div>

            <div className="footer__column">
              <h3 className="footer__column-title">{t('footer.info')}</h3>
              <ul className="footer__column-list">
                <li>
                  <Link
                    to="rights"
                    className="footer__link"
                  >
                    {t('footer.rights')}
                  </Link>
                </li>
              </ul>
            </div>
          </nav>
        </div>
      </div>

      <div className="footer__bottom">
        <div className="footer__giant-text">nice books</div>
        <button
          type="button"
          className="footer__back-to-top"
          onClick={handleBackToTop}
        >
          {t('footer.backToTop')}
          <ArrowUp size={20} />
        </button>
      </div>
    </footer>
  );
}

export default Footer;
