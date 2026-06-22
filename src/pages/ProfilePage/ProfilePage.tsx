import { useRef, useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useAuthContext } from '../../context/AuthContext';
import { useProfile } from '../../hooks/useProfile';
import './ProfilePage.scss';
import { useTranslation } from 'react-i18next';

type FormData = {
  full_name: string;
  phone: string;
};

export function ProfilePage() {
  const { user } = useAuthContext();
  const { profile, updateProfile, uploadAvatar } = useProfile(user?.id);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const { t } = useTranslation();

  const { register, getValues, reset } = useForm<FormData>({
    defaultValues: {
      full_name: profile?.full_name || '',
      phone: profile?.phone || '',
    },
  });

  useEffect(() => {
    if (profile) {
      reset({
        full_name: profile.full_name || '',
        phone: profile.phone || '',
      });
    }
  }, [profile, reset]);

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        await uploadAvatar(file);
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
      } catch (error) {
        console.error('Failed to upload avatar:', error);
        alert(t('profile.uploadError'));
      }
    }
  };

  const handleSaveChanges = async () => {
    const formData = {
      full_name: getValues('full_name'),
      phone: getValues('phone'),
    };

    try {
      setIsSaving(true);
      await updateProfile(formData);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 2000);
    } catch (error) {
      console.error('Failed to update profile:', error);
    } finally {
      setIsSaving(false);
    }
  };

  if (!user) {
    return (
      <div className="profile-page profile-page-error">
        {t('profile.pleaseSignIn')}
      </div>
    );
  }

  const avatarUrl = profile?.avatar_url || '';

  return (
    <div className="profile-page">
      <div className="profile-page__container">
        <h1 className="profile-page__title">{t('profile.title')}</h1>

        <div className="profile-page__avatar-section">
          <div
            className="profile-page__avatar"
            onClick={handleAvatarClick}
            style={{
              backgroundImage: avatarUrl ? `url(${avatarUrl})` : 'none',
            }}
          >
            {!avatarUrl && (
              <span className="profile-page__avatar-placeholder">?</span>
            )}
          </div>
          <button
            type="button"
            className="profile-page__avatar-btn"
            onClick={handleAvatarClick}
          >
            {t('profile.changePhoto')}
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            style={{ display: 'none' }}
            onChange={handleAvatarChange}
          />
        </div>

        <form className="profile-page__form">
          <div className="profile-page__field">
            <label className="profile-page__label">{t('profile.email')}</label>
            <input
              type="email"
              value={user.email}
              disabled
              className="profile-page__input profile-page__input--disabled"
            />
          </div>

          <div className="profile-page__field">
            <label className="profile-page__label">
              {t('profile.fullName')}
            </label>
            <input
              type="text"
              className="profile-page__input"
              {...register('full_name')}
            />
          </div>

          <div className="profile-page__field">
            <label className="profile-page__label">{t('profile.phone')}</label>
            <input
              type="tel"
              className="profile-page__input"
              {...register('phone')}
            />
          </div>

          <button
            type="button"
            className="profile-page__submit"
            disabled={isSaving}
            onClick={handleSaveChanges}
          >
            {isSaving ? t('profile.saving') : t('profile.save')}
          </button>

          {showSuccess && (
            <div className="profile-page__success">{t('profile.success')}</div>
          )}
        </form>
      </div>
    </div>
  );
}
