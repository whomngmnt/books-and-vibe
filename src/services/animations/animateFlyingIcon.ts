import gsap from 'gsap';

type Options = {
  source: Element;
  targetSelector: string;
  content: string;
};

export function animateFlyingIcon({
  source,
  targetSelector,
  content,
}: Options) {
  const target = document.querySelector<HTMLElement>(targetSelector);

  if (!target) return;

  const sourceRect = source.getBoundingClientRect();
  const targetRect = target.getBoundingClientRect();

  const flyingIcon = document.createElement('div');
  flyingIcon.textContent = content;
  document.body.appendChild(flyingIcon);

  gsap.set(flyingIcon, {
    position: 'fixed',
    left: sourceRect.left + sourceRect.width / 2,
    top: sourceRect.top + sourceRect.height / 2,
    xPercent: -50,
    yPercent: -50,
    zIndex: 9999,
    fontSize: 28,
    pointerEvents: 'none',
  });

  gsap.to(flyingIcon, {
    left: targetRect.left + targetRect.width / 2,
    top: targetRect.top + targetRect.height / 2,
    scale: 0.4,
    opacity: 0,
    duration: 0.8,
    ease: 'power2.inOut',
    onComplete: () => flyingIcon.remove(),
  });
}
