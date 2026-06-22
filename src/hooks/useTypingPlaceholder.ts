import { useEffect, useState } from 'react';

type Options = {
  words: string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  pauseTime?: number;
};

export function useTypingPlaceholder({
  words,
  typingSpeed = 200,
  deletingSpeed = 100,
  pauseTime = 2000,
}: Options) {
  const [text, setText] = useState('');
  const [index, setIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (!words.length) return;

    const currentWord = words[index % words.length];

    if (text === currentWord && !isDeleting) {
      const timeout = setTimeout(() => {
        setIsDeleting(true);
      }, pauseTime);
      return () => clearTimeout(timeout);
    }

    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          const nextText = currentWord.substring(0, text.length + 1);
          setText(nextText);
        } else {
          const nextText = currentWord.substring(0, text.length - 1);
          setText(nextText);

          if (nextText === '') {
            setIsDeleting(false);
            setIndex((prev) => prev + 1);
          }
        }
      },
      isDeleting ? deletingSpeed : typingSpeed,
    );

    return () => clearTimeout(timeout);
  }, [text, isDeleting, index, words, typingSpeed, deletingSpeed, pauseTime]);

  return text;
}
