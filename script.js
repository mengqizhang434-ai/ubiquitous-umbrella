const filters = document.querySelectorAll('.filter');
const useCaseCards = document.querySelectorAll('.use-case');

filters.forEach((button) => {
  button.addEventListener('click', () => {
    filters.forEach((item) => item.classList.remove('filter--active'));
    button.classList.add('filter--active');
    const target = button.dataset.filter;

    useCaseCards.forEach((card) => {
      const tags = card.dataset.tags.split(' ');
      const shouldShow = target === 'all' || tags.includes(target);
      card.classList.toggle('is-hidden', !shouldShow);
    });
  });
});

const accordions = document.querySelectorAll('.accordion__trigger');

accordions.forEach((trigger) => {
  const panel = trigger.nextElementSibling;
  trigger.addEventListener('click', () => {
    const isOpen = trigger.classList.toggle('is-open');
    if (isOpen) {
      panel.style.maxHeight = `${panel.scrollHeight}px`;
    } else {
      panel.style.maxHeight = null;
    }
  });
});

// 进入视口时触发简单动画，兼容不支持 IntersectionObserver 的环境
const applyIntersectionObserver = () => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.15,
    }
  );

  const animatedElements = document.querySelectorAll('.card, .bar');
  animatedElements.forEach((el) => observer.observe(el));
};

if ('IntersectionObserver' in window) {
  applyIntersectionObserver();
} else {
  document.querySelectorAll('.card, .bar').forEach((el) =>
    el.classList.add('is-visible')
  );
}
