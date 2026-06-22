import { useRef, useState } from 'react';
import gsap from 'gsap';
import SplitType from 'split-type';
import styles from './IntroAnimation.module.scss';
import { ShaderBackground } from '../../components/shared/ShaderBackground/ShaderBackground';
import LogoIntro from '../../assets/logo/Logo-intro.png';
import { useTranslation } from 'react-i18next';

type IntroAnimationProps = {
  children: React.ReactNode;
};

export const IntroAnimation = ({ children }: IntroAnimationProps) => {
  const isHomePage =
    window.location.hash === '' || window.location.hash === '#/';

  const [isOpened, setIsOpened] = useState(!isHomePage);
  const { t } = useTranslation();

  const enterButtonRef = useRef<HTMLButtonElement>(null);
  const leftDoorRef = useRef<HTMLDivElement>(null);
  const rightDoorRef = useRef<HTMLDivElement>(null);
  const centerLineRef = useRef<HTMLDivElement>(null);
  const loadingTextRef = useRef<HTMLParagraphElement>(null);
  const loadingRef = useRef<HTMLDivElement>(null);

  const handleOpen = () => {
    if (!loadingTextRef.current) return;

    const split = new SplitType(loadingTextRef.current, {
      types: 'words,chars',
    });

    let dotsTween: gsap.core.Tween;

    gsap
      .timeline({
        onComplete: () => {
          split.revert();
          setIsOpened(true);
        },
      })
      .set(loadingRef.current, { autoAlpha: 1 })
      .set(split.chars, { y: 50, autoAlpha: 0 })
      .set(`.${styles.loadingDots} span`, {
        autoAlpha: 0,
        y: 0,
      })
      .to(enterButtonRef.current, {
        scale: 3.5,
        autoAlpha: 0,
        duration: 0.8,
        ease: 'power3.in',
      })
      .to(
        leftDoorRef.current,
        {
          xPercent: -100,
          duration: 1,
          ease: 'power3.inOut',
        },
        '-=0.25',
      )
      .to(
        rightDoorRef.current,
        {
          xPercent: 100,
          duration: 1,
          ease: 'power3.inOut',
        },
        '<',
      )
      .to(
        centerLineRef.current,
        {
          autoAlpha: 0,
          duration: 0.4,
        },
        '<',
      )
      .to(
        split.chars,
        {
          y: 0,
          autoAlpha: 1,
          stagger: 0.025,
          duration: 0.45,
          ease: 'power2.out',
        },
        '-=0.15',
      )
      .to(
        `.${styles.loadingDots} span`,
        {
          autoAlpha: 1,
          duration: 0.2,
          stagger: 0.08,
        },
        '<',
      )
      .call(() => {
        dotsTween = gsap.to(`.${styles.loadingDots} span`, {
          y: -6,
          duration: 0.4,
          stagger: 0.1,
          repeat: -1,
          yoyo: true,
          ease: 'power1.inOut',
        });
      })
      .to(split.chars, {
        y: -90,
        autoAlpha: 0,
        stagger: 0.018,
        duration: 0.5,
        ease: 'power3.in',
        delay: 1.1,
      })
      .call(() => {
        dotsTween?.kill();
      })
      .to(
        `.${styles.loadingDots} span`,
        {
          autoAlpha: 0,
          y: 0,
          duration: 0.25,
          stagger: 0.04,
          ease: 'power2.in',
        },
        '<',
      )
      .to(loadingRef.current, {
        autoAlpha: 0,
        duration: 0.7,
      });
  };

  return (
    <div className={`${styles.wrapper} ${isOpened ? styles.opened : ''}`}>
      <div className={styles.site}>{children}</div>

      {!isOpened && (
        <>
          <div
            ref={loadingRef}
            className={styles.loading}
            role="status"
          >
            <ShaderBackground />

            <div className={styles.loadingOverlay} />

            <div className={styles.loaderContent}>
              <p
                ref={loadingTextRef}
                className={styles.loadingText}
              >
                {t('intro.loadingText')}
              </p>

              <div className={styles.loadingDots}>
                <span />
                <span />
                <span />
              </div>
            </div>
          </div>

          <div className={styles.intro}>
            <div
              ref={leftDoorRef}
              className={styles.leftDoor}
            />
            <div
              ref={rightDoorRef}
              className={styles.rightDoor}
            />
            <div
              ref={centerLineRef}
              className={styles.centerLine}
            />

            <button
              ref={enterButtonRef}
              type="button"
              className={styles.enterButton}
              onClick={handleOpen}
            >
              <span className={styles.logoWrapper}>
                <img
                  src={LogoIntro}
                  className={styles.logo}
                  alt="Nice Books"
                />
              </span>
              <span className={styles.hint}>{t('intro.enterHint')}</span>
            </button>
          </div>
        </>
      )}
    </div>
  );
};
