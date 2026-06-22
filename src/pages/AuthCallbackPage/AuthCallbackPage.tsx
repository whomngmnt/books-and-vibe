import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../api/supabase';
import './AuthCallbackPage.scss';
import { useTranslation } from 'react-i18next';

export function AuthCallbackPage() {
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>(
    'loading',
  );
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const { t } = useTranslation();

  useEffect(() => {
    const handleEmailConfirmation = async () => {
      try {
        const hash = window.location.hash;
        const params = new URLSearchParams(hash.substring(1));
        const accessToken = params.get('access_token');
        const refreshToken = params.get('refresh_token');

        if (accessToken && refreshToken) {
          const { error } = await supabase.auth.setSession({
            access_token: accessToken,
            refresh_token: refreshToken,
          });

          if (error) throw error;

          setStatus('success');
          setMessage(t('authCallback.emailConfirm'));

          setTimeout(() => {
            navigate('/');
          }, 2000);
        } else {
          const { data, error } = await supabase.auth.getSession();
          if (error) throw error;

          if (data.session) {
            setStatus('success');
            setMessage(t('authCallback.alreadySignIn'));
            setTimeout(() => {
              navigate('/');
            }, 2000);
          } else {
            setStatus('error');
            setMessage(t('authCallback.invalidLink'));
          }
        }
      } catch (error: unknown) {
        console.error('Email confirmation error:', error);
        setStatus('error');
        setMessage(
          error instanceof Error ?
            error.message
          : t('authCallback.confirmError'),
        );
      }
    };

    handleEmailConfirmation();
  }, [navigate, t]);

  return (
    <div className="auth-callback-page">
      <div className="auth-callback-page__container">
        {status === 'loading' && (
          <div className="auth-callback-page__loading">
            <h1>{t('authCallback.confirmTitle')}</h1>
            <p>{t('authCallback.confirmText')}</p>
          </div>
        )}

        {status === 'success' && (
          <div className="auth-callback-page__success">
            <h1>{t('authCallback.successTitle')}</h1>
            <p>{message}</p>
            <p>{t('authCallback.redirect')}</p>
          </div>
        )}

        {status === 'error' && (
          <div className="auth-callback-page__error">
            <h1>{t('authCallback.errorTitle')}</h1>
            <p>{message}</p>
            <button onClick={() => navigate('/')}>
              {t('authCallback.goHome')}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
