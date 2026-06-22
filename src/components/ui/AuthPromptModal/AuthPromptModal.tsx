import { useEffect, useState } from 'react';
import { useAuthContext } from '../../../context/AuthContext';
import './AuthPromptModal.scss';
import { useTranslation } from 'react-i18next';

export function AuthPromptModal() {
  const { isAuthenticated } = useAuthContext();
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    const hasShownThisSession = sessionStorage.getItem('authPromptShown');

    if (!isAuthenticated && !hasShownThisSession) {
      const timer = setTimeout(() => {
        setIsOpen(true);
        sessionStorage.setItem('authPromptShown', 'true');
      }, 45000);

      return () => clearTimeout(timer);
    }
  }, [isAuthenticated]);

  if (!isOpen || isAuthenticated) {
    return null;
  }

  return (
    <div className="auth-prompt-modal">
      <div
        className="auth-prompt-modal__overlay"
        onClick={() => setIsOpen(false)}
      />
      <div className="auth-prompt-modal__content">
        <h2 className="auth-prompt-modal__title">{t('authPrompt.title')}</h2>
        <p className="auth-prompt-modal__text">
          Sign up and get 10% off your first order
        </p>
        <button
          className="auth-prompt-modal__button"
          onClick={() => {
            setIsOpen(false);
            window.dispatchEvent(new CustomEvent('openAuthModal'));
          }}
        >
          {t('authPrompt.title')}
        </button>
        <button
          className="auth-prompt-modal__close"
          onClick={() => setIsOpen(false)}
        >
          {t('authPrompt.maybeLater')}
        </button>
      </div>
    </div>
  );
}
