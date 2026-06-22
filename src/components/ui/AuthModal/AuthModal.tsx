import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useAuthContext } from '../../../context/AuthContext';
import { Icon } from '../Icon';
import './AuthModal.scss';
import { useTranslation } from 'react-i18next';
import { getImageUrl } from '../../../services/getImageUrl.ts';

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

type FormData = {
  email: string;
  password: string;
  fullName?: string;
};

export function AuthModal({ isOpen, onClose }: Props) {
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState<string>('');
  const { signIn, signUp, signInWithGoogle, isSigningIn, isSigningUp } =
    useAuthContext();
  const { t } = useTranslation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    setError('');

    try {
      if (isLogin) {
        await signIn(data.email, data.password);
        onClose();
        return;
      }

      await signUp(data.email, data.password, data.fullName);
      alert(t('auth.registrationSuccess'));
      onClose();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : t('auth.error'));
    }
  };

  const handleGoogleSignIn = async () => {
    setError('');
    try {
      await signInWithGoogle();
      onClose();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : t('auth.error'));
    }
  };

  const handleSwitchMode = () => {
    setIsLogin(!isLogin);
    setError('');
  };

  if (!isOpen) return null;

  return (
    <div
      className="auth-modal"
      onClick={onClose}
    >
      <div
        className="auth-modal__content"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="auth-modal__close"
          onClick={onClose}
        >
          <Icon name="close" />
        </button>

        <h2 className="auth-modal__title">
          {isLogin ? t('auth.signIn') : t('auth.signUp')}
        </h2>
        <p className="auth-modal__promo">{t('auth.promoText')}</p>

        {error && <div className="auth-modal__error">{error}</div>}

        <form
          key={isLogin ? 'login' : 'signup'}
          className="auth-modal__form"
          onSubmit={handleSubmit(onSubmit)}
        >
          {!isLogin && (
            <div className="auth-modal__field">
              <input
                type="text"
                placeholder={t('auth.fullName')}
                className="auth-modal__input"
                {...register('fullName')}
              />
            </div>
          )}

          <div className="auth-modal__field">
            <input
              type="email"
              placeholder={t('auth.email')}
              className="auth-modal__input"
              onDoubleClick={(e) => (e.target as HTMLInputElement).select()}
              {...register('email', {
                required: t('auth.emailRequired'),
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: t('auth.invalidEmail'),
                },
              })}
            />
            {errors.email && (
              <span className="auth-modal__error-text">
                {errors.email.message}
              </span>
            )}
          </div>

          <div className="auth-modal__field">
            <input
              type="password"
              placeholder={t('auth.password')}
              className="auth-modal__input"
              onDoubleClick={(e) => (e.target as HTMLInputElement).select()}
              {...register('password', {
                required: t('auth.passwordRequired'),
                minLength: {
                  value: 6,
                  message: t('auth.passwordMin'),
                },
              })}
            />
            {errors.password && (
              <span className="auth-modal__error-text">
                {errors.password.message}
              </span>
            )}
          </div>

          {isLogin && (
            <button
              type="submit"
              className="auth-modal__submit auth-modal__submit--secondary"
              disabled={isSigningIn || isSigningUp}
            >
              {isSigningIn || isSigningUp ?
                t('auth.loading')
              : t('auth.signIn')}
            </button>
          )}

          {!isLogin && (
            <button
              type="submit"
              className="auth-modal__submit"
              disabled={isSigningIn || isSigningUp}
            >
              {isSigningIn || isSigningUp ?
                t('auth.loading')
              : t('auth.signUp')}
            </button>
          )}
        </form>

        <div className="auth-modal__divider">
          <span>{t('auth.or')}</span>
        </div>

        <button
          type="button"
          className="auth-modal__google"
          onClick={handleGoogleSignIn}
        >
          <img
            src={getImageUrl('icons/Google_logo.svg')}
            alt="Google"
            className="auth-modal__google-icon"
          />
          {t('auth.continueWithGoogle')}
        </button>

        <div className="auth-modal__switch">
          {isLogin ? t('auth.noAccount') : t('auth.haveAccount')}
          <button
            type="button"
            className="auth-modal__switch-btn"
            onClick={handleSwitchMode}
          >
            {isLogin ? t('auth.signUp') : t('auth.signIn')}
          </button>
        </div>
      </div>
    </div>
  );
}
