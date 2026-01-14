<script setup lang="ts">
import type { Component } from 'vue'
import { Card, CardContent } from '@/components/ui/card'
import { Workflow, Brain, Webhook, BellRing, FileText, Gauge, Share2, Waves, BarChart3 } from 'lucide-vue-next'
import { servicesSection } from '@/data/services'
import type { ServiceIconId } from '@/data/services'

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
} as const satisfies Record<ServiceIconId, Component>
const servicesHeader = servicesSection.header
const services = servicesSection.cards
const defaultGlowOrigin = { x: '50%', y: '50%' } as const

const setGlowOrigin = (target: HTMLElement | null, x: string, y: string) => {
  if (!target) return
  target.style.setProperty('--glow-origin-x', x)
  target.style.setProperty('--glow-origin-y', y)
}

const handleGlowMove = (event: MouseEvent) => {
  const target = event.currentTarget instanceof HTMLElement ? event.currentTarget : null
  if (!target) return

  const rect = target.getBoundingClientRect()
  const relativeX = ((event.clientX - rect.left) / rect.width) * 100
  const relativeY = ((event.clientY - rect.top) / rect.height) * 100

  setGlowOrigin(target, `${relativeX}%`, `${relativeY}%`)
}

const resetGlowOrigin = (event: MouseEvent) => {
  const target = event.currentTarget instanceof HTMLElement ? event.currentTarget : null
  setGlowOrigin(target, defaultGlowOrigin.x, defaultGlowOrigin.y)
}
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
          <Card
            class="service-card glow-card glow-card--pointer"
            @mousemove="handleGlowMove"
            @mouseleave="resetGlowOrigin"
          >
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
  display: block;
  padding: 0;
  gap: 0;
  transition: transform 0.35s ease;
  perspective: 1400px;
}

.service-card-inner {
  position: relative;
  display: grid;
  transform-style: preserve-3d;
  transition: transform 0.75s cubic-bezier(0.4, 0.2, 0, 1);
  min-height: 160px;
}

.service-card:hover {
  transform: translateY(-5px);
}

.service-card:hover .service-card-inner {
  transform: rotateY(180deg);
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
