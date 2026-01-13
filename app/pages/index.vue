<!-- app/pages/index.vue -->
<script setup lang="ts">
const testimonials = [
  {
    quote:
      'The automation solutions provided have saved us over 30 hours per week. Our team can now focus on strategic initiatives instead of repetitive tasks.',
    name: 'Sarah Mitchell',
    role: 'Operations Director',
    company: 'TechFlow Solutions',
  },
  {
    quote:
      'Working with Don was a game-changer for our business. The AI integration reduced our processing time by 65% and improved accuracy significantly.',
    name: 'Michael Chen',
    role: 'CEO',
    company: 'DataStream Analytics',
  },
  {
    quote:
      'Exceptional work on our n8n workflows. The custom automation seamlessly connects all our tools and has dramatically improved our efficiency.',
    name: 'Jessica Rodriguez',
    role: 'Product Manager',
    company: 'CloudBridge Inc',
  },
  {
    quote:
      'Professional, knowledgeable, and results-driven. The automation platform built for us has become essential to our daily operations.',
    name: 'David Thompson',
    role: 'CTO',
    company: 'InnovateLab',
  },
  {
    quote:
      'The business intelligence dashboards created for us provide real-time insights that have transformed our decision-making process.',
    name: 'Emily Watson',
    role: 'Marketing Director',
    company: 'GrowthMetrics',
  },
  {
    quote:
      'Outstanding integration work. Our disparate systems now work together seamlessly, saving time and eliminating errors.',
    name: 'Robert Martinez',
    role: 'IT Manager',
    company: 'GlobalConnect',
  },
]

const clients = [
  'TechFlow Solutions',
  'DataStream Analytics',
  'CloudBridge Inc',
  'InnovateLab',
  'GrowthMetrics',
  'GlobalConnect',
  'SmartOps',
  'AutoScale Pro',
]

useHead({
  title: 'DP Don Puerto - AI Automation & Marketing Solutions',
  meta: [
    {
      name: 'description',
      content: 'Transform your business with AI-powered automation solutions and cutting-edge marketing strategies.',
    },
  ],
})
</script>

<template>
  <div>
    <!-- Hero Section -->
    <Hero />

    <!-- Services Section -->
    <Services />

    <!-- Testimonials Section -->
    <Section id="testimonials" class="bg-background/60 backdrop-blur-sm">
      <Container>
        <FadeIn direction="up">
          <div class="text-center mb-12">
            <h2 class="text-4xl md:text-5xl font-bold text-foreground mb-4">
              What Our Clients Say
            </h2>
            <p class="text-sm md:text-base text-muted-foreground">
              Real results from businesses we've helped transform
            </p>
          </div>
        </FadeIn>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <FadeIn v-for="(testimonial, index) in testimonials" :key="index" direction="up" :delay="index * 100">
            <Card class="h-full flex flex-col">
              <CardContent class="py-4 px-6 flex-1 flex flex-col">
                <div class="flex mb-4">
                  <svg v-for="star in 5" :key="star" class="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                </div>
                <p class="text-muted-foreground mb-6 italic text-sm flex-1">"{{ testimonial.quote }}"</p>
                <div class="mt-auto border-t border-border pt-4">
                  <p class="font-semibold text-foreground text-sm">{{ testimonial.name }}</p>
                  <p class="text-xs text-muted-foreground">{{ testimonial.role }}, {{ testimonial.company }}</p>
                </div>
              </CardContent>
            </Card>
          </FadeIn>
        </div>
      </Container>
    </Section>

    <!-- Clients Section -->
    <Section id="clients" class="bg-background/60 backdrop-blur-sm">
      <Container>
        <FadeIn direction="up">
          <div class="text-center mb-12">
            <h2 class="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Trusted By
            </h2>
            <p class="text-sm md:text-base text-muted-foreground">
              Leading companies that rely on our automation solutions
            </p>
          </div>
        </FadeIn>

        <FadeIn direction="up" :delay="200">
          <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            <div 
              v-for="(client, index) in clients" 
              :key="index"
              class="flex items-center justify-center p-6 bg-card rounded-lg border border-border transition-colors duration-200 hover:border-primary/60"
            >
              <span class="text-base font-semibold text-foreground">{{ client }}</span>
            </div>
          </div>
        </FadeIn>
      </Container>
    </Section>

    <!-- Contact Section -->
    <Section id="contact" class="bg-background/60 backdrop-blur-sm">
      <Container>
        <FadeIn direction="up">
          <div class="text-center mb-12">
            <h2 class="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Let's Work Together
            </h2>
            <p class="text-sm md:text-base text-muted-foreground">
              Ready to transform your business? Get in touch with us today and let's discuss your project.
            </p>
          </div>
        </FadeIn>

        <FadeIn direction="up" :delay="200">
          <ContactForm />
        </FadeIn>
      </Container>
    </Section>
  </div>
</template>

