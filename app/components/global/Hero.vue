<!-- app/components/global/Hero.vue -->
<script setup lang="ts">
const { scrollTo } = useSmoothScroll();
</script>

<template>
  <Section id="home" class="pt-32 pb-16 md:pt-40 md:pb-24 bg-linear-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-950">
    <Container>
      <FadeIn direction="up" class="text-center max-w-4xl mx-auto">
        <h1 class="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
          Transform Your Business with
          <span class="text-blue-600 dark:text-blue-400"> AI-Powered Automation</span>
        </h1>
        <p class="text-lg md:text-lg text-gray-600 dark:text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed font-inter">
          We help businesses streamline operations, reduce costs, and scale faster through intelligent automation solutions and cutting-edge AI integration.
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <Button @click="scrollTo('contact')" variant="primary" size="lg">
            Get Started
          </Button>
          <Button @click="scrollTo('services')" variant="secondary" size="lg">
            Our Services
          </Button>
        </div>
      </FadeIn>
    </Container>
  </Section>
</template>
