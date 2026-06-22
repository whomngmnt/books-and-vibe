import { useState, useRef, useEffect } from 'react';
import { SlidersHorizontal, Globe, Moon, Sun } from 'lucide-react';
import './SettingsMenu.scss';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../../layout/Header/useTheme';

type Language = 'en' | 'uk';
type Theme = 'light' | 'dark';

interface Props {
  language: Language;
  theme: Theme;
  onLanguageChange: (lang: Language) => void;
  onThemeChange: (theme: Theme) => void;
  onSignUpClick?: () => void;
}

export function SettingsMenu({
  language,
  theme,
  onLanguageChange,
  onThemeChange,
  onSignUpClick,
}: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const { t } = useTranslation();
  const { isDark } = useTheme();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div
      className="settings-menu"
      ref={menuRef}
    >
      <button
        className="settings-menu__button"
        onClick={() => setIsOpen(true)}
        aria-label="Settings"
        style={{ color: isDark ? '#1F636C' : '#E55C3B' }}
      >
        <SlidersHorizontal
          size={18}
          className="settings-menu__icon"
        />
      </button>

      {isOpen && (
        <div
          className="settings-menu__backdrop"
          onClick={() => setIsOpen(false)}
        >
          <div
            className="settings-menu__modal"
            onClick={(event) => event.stopPropagation()}
          >
            <h3 className="settings-menu__title">
              {t('settingsMenu.preferences')}
            </h3>

            <button
              className="settings-menu__option settings-menu__option--with-icon"
              onClick={() => {
                onLanguageChange(language === 'en' ? 'uk' : 'en');
                setIsOpen(false);
              }}
            >
              <Globe size={16} />
              <span>
                {language === 'en' ?
                  t('settingsMenu.ukrainian')
                : t('settingsMenu.english')}
              </span>
            </button>

            <button
              className="settings-menu__option settings-menu__option--with-icon"
              onClick={() => {
                onThemeChange(theme === 'light' ? 'dark' : 'light');
                setIsOpen(false);
              }}
            >
              {theme === 'light' ?
                <Moon size={16} />
              : <Sun size={16} />}
              <span>
                {theme === 'light' ?
                  t('settingsMenu.darkTheme')
                : t('settingsMenu.lightTheme')}
              </span>
            </button>

            {onSignUpClick && (
              <button
                className="settings-menu__option settings-menu__option--primary"
                onClick={() => {
                  onSignUpClick();
                  setIsOpen(false);
                }}
              >
                {t('auth.signUp')}
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
