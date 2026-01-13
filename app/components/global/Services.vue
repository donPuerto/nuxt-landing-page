<script setup lang="ts">
import type { Component } from 'vue'
import { Card, CardContent } from '@/components/ui/card'
import { Workflow, Brain, Webhook, BellRing, FileText, Gauge, Share2, Waves, BarChart3 } from 'lucide-vue-next'
import servicesContent from '../../data/services.json'

const serviceIcons = {
  workflow: Workflow,
  brain: Brain,
  webhook: Webhook,
  bellRing: BellRing,
  fileText: FileText,
  gauge: Gauge,
  share2: Share2,
  waves: Waves,
  barChart3: BarChart3,
} as const satisfies Record<string, Component>

type ServiceIconKey = keyof typeof serviceIcons

interface ServiceCard {
  title: string
  description: string
  icon: ServiceIconKey
  meta?: string[]
}

interface ServicesSection {
  header: {
    title: string
    description: string
  }
  cards: ServiceCard[]
}

const servicesSection = servicesContent as ServicesSection
const servicesHeader = servicesSection.header
const services = servicesSection.cards
</script>

<template>
  <Section id="services" class="bg-background/60 backdrop-blur-sm">
    <Container>
      <FadeIn direction="up">
        <div class="text-center mb-12">
          <h2 class="text-4xl md:text-5xl font-bold text-foreground mb-4">
            {{ servicesHeader.title }}
          </h2>
          <p class="text-sm md:text-base text-muted-foreground">
            {{ servicesHeader.description }}
          </p>
        </div>
      </FadeIn>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <FadeIn v-for="(service, index) in services" :key="service.title" direction="up" :delay="index * 100">
          <Card class="service-card">
            <div class="service-card-inner">
              <div class="service-card-face service-card-front">
                <CardContent class="service-card-body">
                  <div class="flex items-start gap-4">
                    <div class="service-icon-bubble">
                      <component :is="serviceIcons[service.icon]" class="w-5 h-5" />
                    </div>
                    <div class="flex-1 space-y-2">
                      <h3 class="text-lg font-semibold text-foreground">{{ service.title }}</h3>
                      <p class="text-sm text-muted-foreground leading-relaxed">
                        {{ service.description }}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </div>

              <div class="service-card-face service-card-back" aria-hidden="true">
                <CardContent class="service-card-back-body">
                  <div v-if="service.meta?.length" class="service-card-back-meta">
                    <span
                      v-for="(tag, tagIndex) in service.meta"
                      :key="tagIndex"
                      class="rounded-full border border-border/60 bg-primary/10 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.3em] text-primary"
                    >
                      {{ tag }}
                    </span>
                  </div>
                </CardContent>
              </div>
            </div>
          </Card>
        </FadeIn>
      </div>
    </Container>
  </Section>
</template>

<style scoped>
.service-card {
  position: relative;
  overflow: visible;
  border-radius: 1.2rem;
  border: 1.5px solid color-mix(in srgb, var(--accent) 55%, rgba(255, 255, 255, 0.1));
  background: rgba(8, 10, 25, 0.85);
  box-shadow: 0 34px 92px -40px color-mix(in srgb, var(--accent) 45%, rgba(0, 0, 0, 0.75));
  transition: border-color 0.35s ease, box-shadow 0.35s ease, transform 0.35s ease;
  will-change: transform, box-shadow;
  perspective: 1400px;
}

.service-card-inner {
  position: relative;
  display: grid;
  transform-style: preserve-3d;
  transition: transform 0.75s cubic-bezier(0.4, 0.2, 0, 1);
  min-height: 160px;
}


.service-card::before {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: inherit;
  padding: 1.6px;
  background: linear-gradient(120deg, color-mix(in srgb, var(--accent) 100%, transparent) 0%, color-mix(in srgb, var(--accent) 40%, transparent) 45%, transparent 80%);
  mask: linear-gradient(#000, #000) content-box, linear-gradient(#000, #000);
  mask-composite: exclude;
  pointer-events: none;
  filter: drop-shadow(0 0 24px color-mix(in srgb, var(--accent) 70%, transparent));
  opacity: 0.9;
  transition: opacity 0.35s ease, filter 0.35s ease;
}

.service-card::after {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: inherit;
  background: radial-gradient(circle at 20% 15%, color-mix(in srgb, var(--accent) 30%, transparent) 0%, transparent 65%);
  opacity: 0.55;
  filter: blur(0.5px);
  pointer-events: none;
  transition: opacity 0.35s ease;
}

.service-card:hover {
  border-color: color-mix(in srgb, var(--accent) 82%, rgba(255, 255, 255, 0.3));
  box-shadow: 0 46px 110px -38px color-mix(in srgb, var(--accent) 70%, rgba(0, 0, 0, 0.85));
  transform: translateY(-5px);
}

.service-card:hover .service-card-inner {
  transform: rotateY(180deg);
}

.service-card:hover::before {
  opacity: 1;
  filter: drop-shadow(0 0 32px color-mix(in srgb, var(--accent) 90%, transparent));
}

.service-card:hover::after {
  opacity: 0.85;
}

.service-card-face {
  grid-area: 1 / 1;
  backface-visibility: hidden;
  transform-style: preserve-3d;
  display: flex;
}

.service-card-front {
  transform: rotateY(0deg);
}

.service-card-back {
  transform: rotateY(180deg);
}

.service-card-body,
.service-card-back-body {
  width: 100%;
  border-radius: inherit;
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  padding: 1.05rem 1.2rem;
  height: 100%;
}

.service-card-back-body {
  align-items: center;
  justify-content: center;
}

.service-card :deep(.card-content) {
  padding: 0;
  min-height: 0;
}

.service-card-back-meta {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.6rem;
}

.service-icon-bubble {
  width: 2.75rem;
  height: 2.75rem;
  border-radius: 0.85rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: color-mix(in srgb, var(--accent) 18%, rgba(255, 255, 255, 0.05));
  color: color-mix(in srgb, var(--accent) 85%, var(--foreground));
  box-shadow: inset 0 0 12px color-mix(in srgb, var(--accent) 45%, transparent);
}
</style>
