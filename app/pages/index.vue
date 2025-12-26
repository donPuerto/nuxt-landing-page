<!-- app/pages/index.vue -->
<script setup lang="ts">
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'

useHead({
  title: 'DP Don Puerto - AI Automation & Marketing Solutions',
  meta: [
    { name: 'description', content: 'Transform your business with AI-powered automation solutions and cutting-edge marketing strategies.' }
  ]
});
</script>

<template>
  <div>
    <!-- Hero Section -->
    <Hero />

    <!-- Services Section -->
    <Section id="services" class="bg-white/50 dark:bg-gray-950/50 backdrop-blur-sm">
      <Container>
        <FadeIn direction="up">
          <div class="text-center mb-12">
            <h2 class="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Our Services
            </h2>
            <p class="text-sm md:text-base text-gray-600 dark:text-gray-400">
              Comprehensive AI and automation solutions tailored to your business needs
            </p>
          </div>
        </FadeIn>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <FadeIn v-for="(service, index) in services" :key="index" direction="up" :delay="index * 100">
            <Card class="h-full hover:border-blue-300 dark:hover:border-blue-500 transition-colors duration-200">
              <CardContent class="py-4 px-6">
                <div class="flex items-start gap-4">
                  <div class="shrink-0 w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                    <svg class="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="service.icon" />
                    </svg>
                  </div>
                  <div class="flex-1">
                    <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">{{ service.title }}</h3>
                    <p class="text-sm text-gray-600 dark:text-gray-400">{{ service.description }}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </FadeIn>
        </div>
      </Container>
    </Section>

    <!-- Testimonials Section -->
    <Section id="testimonials" class="bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm">
      <Container>
        <FadeIn direction="up">
          <div class="text-center mb-12">
            <h2 class="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              What Our Clients Say
            </h2>
            <p class="text-sm md:text-base text-gray-600 dark:text-gray-400">
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
                <p class="text-gray-700 dark:text-gray-300 mb-6 italic text-sm flex-1">"{{ testimonial.quote }}"</p>
                <div class="mt-auto border-t border-gray-200 dark:border-gray-700 pt-4">
                  <p class="font-semibold text-gray-900 dark:text-white text-sm">{{ testimonial.name }}</p>
                  <p class="text-xs text-gray-600 dark:text-gray-400">{{ testimonial.role }}, {{ testimonial.company }}</p>
                </div>
              </CardContent>
            </Card>
          </FadeIn>
        </div>
      </Container>
    </Section>

    <!-- Clients Section -->
    <Section id="clients" class="bg-white/50 dark:bg-gray-950/50 backdrop-blur-sm">
      <Container>
        <FadeIn direction="up">
          <div class="text-center mb-12">
            <h2 class="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Trusted By
            </h2>
            <p class="text-sm md:text-base text-gray-600 dark:text-gray-400">
              Leading companies that rely on our automation solutions
            </p>
          </div>
        </FadeIn>

        <FadeIn direction="up" :delay="200">
          <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            <div 
              v-for="(client, index) in clients" 
              :key="index"
              class="flex items-center justify-center p-6 bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 hover:border-blue-300 dark:hover:border-blue-500 transition-colors duration-200"
            >
              <span class="text-base font-semibold text-gray-700 dark:text-gray-300">{{ client }}</span>
            </div>
          </div>
        </FadeIn>
      </Container>
    </Section>

    <!-- Contact Section -->
    <Section id="contact" class="bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm">
      <Container>
        <FadeIn direction="up">
          <div class="text-center mb-12">
            <h2 class="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Let's Work Together
            </h2>
            <p class="text-sm md:text-base text-gray-600 dark:text-gray-400">
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

<script lang="ts">
// Services data
const services = [
  {
    title: 'AI Automation',
    description: 'Streamline your workflows with intelligent automation powered by cutting-edge AI technology.',
    icon: 'M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z'
  },
  {
    title: 'n8n Workflow Design',
    description: 'Custom workflow automation that connects your tools and eliminates repetitive tasks.',
    icon: 'M4 5a1 1 0 011-1h4a1 1 0 011 1v7a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM14 5a1 1 0 011-1h4a1 1 0 011 1v7a1 1 0 01-1 1h-4a1 1 0 01-1-1V5zM4 17a1 1 0 011-1h4a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1v-2zM14 17a1 1 0 011-1h4a1 1 0 011 1v2a1 1 0 01-1 1h-4a1 1 0 01-1-1v-2z'
  },
  {
    title: 'Business Intelligence',
    description: 'Transform data into actionable insights with AI-powered analytics and reporting.',
    icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z'
  },
  {
    title: 'Integration Solutions',
    description: 'Seamlessly connect your existing tools and platforms for unified operations.',
    icon: 'M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z'
  },
  {
    title: 'Process Optimization',
    description: 'Analyze and optimize your business processes for maximum efficiency and ROI.',
    icon: 'M13 10V3L4 14h7v7l9-11h-7z'
  },
  {
    title: 'Consulting & Strategy',
    description: 'Expert guidance on implementing AI and automation to achieve your business goals.',
    icon: 'M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z'
  }
];

// Testimonials data
const testimonials = [
  {
    quote: 'The automation solutions provided have saved us over 30 hours per week. Our team can now focus on strategic initiatives instead of repetitive tasks.',
    name: 'Sarah Mitchell',
    role: 'Operations Director',
    company: 'TechFlow Solutions'
  },
  {
    quote: 'Working with Don was a game-changer for our business. The AI integration reduced our processing time by 65% and improved accuracy significantly.',
    name: 'Michael Chen',
    role: 'CEO',
    company: 'DataStream Analytics'
  },
  {
    quote: 'Exceptional work on our n8n workflows. The custom automation seamlessly connects all our tools and has dramatically improved our efficiency.',
    name: 'Jessica Rodriguez',
    role: 'Product Manager',
    company: 'CloudBridge Inc'
  },
  {
    quote: 'Professional, knowledgeable, and results-driven. The automation platform built for us has become essential to our daily operations.',
    name: 'David Thompson',
    role: 'CTO',
    company: 'InnovateLab'
  },
  {
    quote: 'The business intelligence dashboards created for us provide real-time insights that have transformed our decision-making process.',
    name: 'Emily Watson',
    role: 'Marketing Director',
    company: 'GrowthMetrics'
  },
  {
    quote: 'Outstanding integration work. Our disparate systems now work together seamlessly, saving time and eliminating errors.',
    name: 'Robert Martinez',
    role: 'IT Manager',
    company: 'GlobalConnect'
  }
];

// Clients data
const clients = [
  'TechFlow Solutions',
  'DataStream Analytics',
  'CloudBridge Inc',
  'InnovateLab',
  'GrowthMetrics',
  'GlobalConnect',
  'SmartOps',
  'AutoScale Pro'
];
</script>