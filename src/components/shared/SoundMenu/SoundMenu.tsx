import { useRef, useState, useCallback } from 'react';
import styles from './SoundMenu.module.scss';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { getImageUrl } from '../../../services/getImageUrl.ts';
import { useTranslation } from 'react-i18next';

const SOUNDS = [
  {
    id: 'forest',
    key: 'forest',
    icon: getImageUrl('icons/forest.png'),
  },
  {
    id: 'bonfire',
    key: 'bonfire',
    icon: getImageUrl('icons/bonfire.png'),
  },
  {
    id: 'rain',
    key: 'rain',
    icon: getImageUrl('icons/rain.png'),
  },
  {
    id: 'mindfulness',
    key: 'mindfulness',
    icon: getImageUrl('icons/mindfulness.png'),
  },
] as const;

type SoundId = (typeof SOUNDS)[number]['id'];

const START_ANGLE = -90;
const END_ANGLE = -180;
const VOLUME_LEVELS = [0.1, 0.25, 0.5, 0.75];

const getArcPositions = () => {
  const isMobile = window.innerWidth < 640;
  const arcRadius = isMobile ? 88 : 110;

  return SOUNDS.map((_, i) => {
    const step = (END_ANGLE - START_ANGLE) / (SOUNDS.length - 1);
    const deg = START_ANGLE + step * i;
    const rad = (deg * Math.PI) / 180;

    return {
      x: Math.cos(rad) * arcRadius,
      y: Math.sin(rad) * arcRadius,
    };
  });
};

const getVolumePositions = () => {
  const isMobile = window.innerWidth < 640;
  const arcRadius = isMobile ? 58 : 70;

  return VOLUME_LEVELS.map((_, i) => {
    const step = (END_ANGLE - START_ANGLE) / (VOLUME_LEVELS.length - 1);
    const deg = START_ANGLE + step * i;
    const rad = (deg * Math.PI) / 180;

    return {
      x: Math.cos(rad) * arcRadius,
      y: Math.sin(rad) * arcRadius,
    };
  });
};

export const SoundMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [active, setActive] = useState<Set<SoundId>>(new Set());
  const [volume, setVolume] = useState(0.1);
  const { t } = useTranslation();

  const itemRefs = useRef<HTMLButtonElement[]>([]);
  const volumeRefs = useRef<HTMLButtonElement[]>([]);
  const audioRefs = useRef<Partial<Record<SoundId, HTMLAudioElement>>>({});

  useGSAP(() => {
    gsap.set(itemRefs.current, { x: 0, y: 0, scale: 0, opacity: 0 });
    gsap.set(volumeRefs.current, { x: 0, y: 0, scale: 0, opacity: 0 });
  });

  const openMenu = useCallback(() => {
    setIsOpen(true);

    const arcPositions = getArcPositions();
    const volumePositions = getVolumePositions();

    gsap.to(itemRefs.current, {
      x: (i) => arcPositions[i]?.x ?? 0,
      y: (i) => arcPositions[i]?.y ?? 0,
      scale: 1,
      opacity: 1,
      duration: 0.5,
      ease: 'back.out(2)',
      stagger: 0.07,
    });

    gsap.to(volumeRefs.current, {
      x: (i) => volumePositions[i]?.x ?? 0,
      y: (i) => volumePositions[i]?.y ?? 0,
      scale: 1,
      opacity: 1,
      duration: 0.45,
      ease: 'back.out(2)',
      stagger: 0.05,
      delay: 0.08,
    });
  }, []);

  const closeMenu = useCallback(() => {
    setIsOpen(false);

    gsap.to(volumeRefs.current, {
      x: 0,
      y: 0,
      scale: 0,
      opacity: 0,
      duration: 0.25,
      ease: 'back.in(1.5)',
      stagger: { each: 0.03, from: 'end' },
    });

    gsap.to(itemRefs.current, {
      x: 0,
      y: 0,
      scale: 0,
      opacity: 0,
      duration: 0.3,
      ease: 'back.in(1.5)',
      stagger: { each: 0.05, from: 'end' },
      delay: 0.02,
    });
  }, []);

  const setAudioVolume = (nextVolume: number) => {
    setVolume(nextVolume);

    Object.values(audioRefs.current).forEach((audio) => {
      if (audio) {
        audio.volume = nextVolume;
      }
    });
  };

  const toggleSound = useCallback(
    (id: SoundId) => {
      if (!audioRefs.current[id]) {
        const audio = new Audio(`${import.meta.env.BASE_URL}sounds/${id}.mp3`);

        audio.loop = true;
        audio.volume = volume;
        audioRefs.current[id] = audio;
      }

      const audio = audioRefs.current[id]!;
      const index = SOUNDS.findIndex((s) => s.id === id);

      setActive((prev) => {
        const next = new Set(prev);

        if (next.has(id)) {
          next.delete(id);
          audio.pause();
        } else {
          next.add(id);
          audio.play().catch(console.error);
        }

        return next;
      });

      gsap.fromTo(
        itemRefs.current[index],
        { scale: 0.72 },
        { scale: 1, duration: 0.4, ease: 'back.out(2)' },
      );
    },
    [volume],
  );

  const handleTrigger = () => (isOpen ? closeMenu() : openMenu());

  return (
    <div className={styles.widget}>
      {SOUNDS.map((sound, i) => (
        <button
          key={sound.id}
          ref={(el) => {
            if (el) itemRefs.current[i] = el;
          }}
          type="button"
          aria-label={t(`sound.${sound.key}`)}
          aria-pressed={active.has(sound.id)}
          className={`${styles.item} ${active.has(sound.id) ? styles.itemActive : ''}`}
          onClick={() => toggleSound(sound.id)}
        >
          <img
            src={sound.icon}
            alt={t(`sound.${sound.key}`)}
            className={styles.icon}
            aria-hidden="true"
          />
        </button>
      ))}

      {VOLUME_LEVELS.map((level, i) => (
        <button
          key={level}
          ref={(el) => {
            if (el) volumeRefs.current[i] = el;
          }}
          type="button"
          className={`${styles.volumeButton} ${
            volume === level ? styles.volumeButtonActive : ''
          }`}
          onClick={() => setAudioVolume(level)}
          aria-label={`Volume ${Math.round(level * 100)}%`}
        >
          {Math.round(level * 100)}
        </button>
      ))}

      <button
        type="button"
        aria-label="Sound background"
        aria-expanded={isOpen}
        className={`${styles.trigger} ${
          active.size > 0 ? styles.triggerActive : ''
        }`}
        onClick={handleTrigger}
      >
        <img
          src={getImageUrl('icons/wave-sound.png')}
          className={styles.trigger__icon}
          alt="Sound waves"
          aria-hidden="true"
        />
      </button>
    </div>
  );
};
