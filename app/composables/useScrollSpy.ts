// app/composables/useScrollSpy.ts
export function useScrollSpy() {
  const activeSection = ref<string>('home');

  onMounted(() => {
    const sections = document.querySelectorAll('section[id]');
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            activeSection.value = entry.target.id;
          }
        });
      },
      {
        threshold: 0.3,
        rootMargin: '-100px 0px -66%'
      }
    );

    sections.forEach((section) => {
      observer.observe(section);
    });

    onUnmounted(() => {
      sections.forEach((section) => {
        observer.unobserve(section);
      });
    });
  });

  return {
    activeSection: readonly(activeSection)
  };
}
