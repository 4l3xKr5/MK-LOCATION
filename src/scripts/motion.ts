const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

const revealImmediately = (element: HTMLElement) => {
  element.classList.add('is-revealed');
};

const initializeMotion = () => {
  const elements = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]'));

  if (!elements.length) return;

  if (reducedMotion.matches || !('IntersectionObserver' in window)) {
    elements.forEach(revealImmediately);
    return;
  }

  const fold = window.innerHeight * 0.94;
  elements.forEach((element) => {
    if (element.getBoundingClientRect().top < fold) revealImmediately(element);
  });

  document.documentElement.classList.add('motion-ready');

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        revealImmediately(entry.target as HTMLElement);
        observer.unobserve(entry.target);
      });
    },
    { rootMargin: '0px 0px -12% 0px', threshold: 0.001 },
  );

  elements.filter((element) => !element.classList.contains('is-revealed')).forEach((element) => observer.observe(element));
};

initializeMotion();
