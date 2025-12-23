// app/plugins/scroll-reveal.client.ts
export default defineNuxtPlugin(() => {
  if (import.meta.client) {
    // Add global scroll reveal styles
    const style = document.createElement('style');
    style.textContent = `
      .scroll-reveal {
        opacity: 0;
        transform: translateY(20px);
        transition: opacity 0.6s ease-out, transform 0.6s ease-out;
      }
      .scroll-reveal.revealed {
        opacity: 1;
        transform: translateY(0);
      }
    `;
    document.head.appendChild(style);

    // Initialize IntersectionObserver for scroll reveal elements
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      }
    );

    // Observe elements with scroll-reveal class
    const observeElements = () => {
      const elements = document.querySelectorAll('.scroll-reveal');
      elements.forEach((el) => observer.observe(el));
    };

    // Initial observation
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', observeElements);
    } else {
      observeElements();
    }

    // Re-observe on route changes
    window.addEventListener('nuxt:page:finish', observeElements);
  }
});
