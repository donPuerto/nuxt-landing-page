<!-- app/components/global/Hero.vue -->
<script setup lang="ts">
import { Button } from '@/components/ui/button'

const { scrollTo } = useSmoothScroll();
</script>

<template>
  <Section id="home" class="pt-32 pb-16 md:pt-40 md:pb-24 bg-background/60 backdrop-blur-sm">
    <Container>
      <FadeIn direction="up" class="text-center max-w-4xl mx-auto">
        <h1 class="text-5xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6 leading-tight">
          Transform Your Business with
          <span class="text-primary"> AI-Powered Automation</span>
        </h1>
        <p class="text-lg md:text-lg text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
          We help businesses streamline operations, reduce costs, and scale faster through intelligent automation solutions and cutting-edge AI integration.
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <Button @click="scrollTo('contact')" size="lg">
            Get Started
          </Button>
          <Button @click="scrollTo('services')" variant="outline" size="lg">
            Services
          </Button>
        </div>
      </FadeIn>
    </Container>
  </Section>
</template>
