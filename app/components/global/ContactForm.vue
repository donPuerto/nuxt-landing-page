<!-- app/components/global/ContactForm.vue -->
<script setup lang="ts">
const { name, email, message, loading, success, error, submit } = useForm();
</script>

<template>
  <div class="max-w-5xl mx-auto">
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-10">
      <!-- Info Column -->
      <div class="space-y-4 bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-800 rounded-xl p-6">
        <div class="space-y-1">
          <h3 class="text-xl font-semibold text-gray-900 dark:text-white">Let's Connect</h3>
          <p class="text-sm text-gray-600 dark:text-gray-400">
            I'm here to help you automate and scale. Share your goals and I'll get back within one business day.
          </p>
        </div>
        <div class="space-y-3">
          <div class="flex items-start gap-3 p-3 rounded-lg bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800">
            <div class="w-10 h-10 rounded-lg bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-300">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <div>
              <p class="text-sm font-semibold text-gray-900 dark:text-white">Email</p>
              <a href="mailto:don.puerto.1003@gmail.com" class="text-sm text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-300">don.puerto.1003@gmail.com</a>
            </div>
          </div>
          <div class="flex items-start gap-3 p-3 rounded-lg bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800">
            <div class="w-10 h-10 rounded-lg bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-300">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            </div>
            <div>
              <p class="text-sm font-semibold text-gray-900 dark:text-white">Phone</p>
              <p class="text-sm text-gray-600 dark:text-gray-300">0976 093 8376</p>
            </div>
          </div>
          <div class="flex items-start gap-3 p-3 rounded-lg bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800">
            <div class="w-10 h-10 rounded-lg bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-300">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <div>
              <p class="text-sm font-semibold text-gray-900 dark:text-white">Location</p>
              <p class="text-sm text-gray-600 dark:text-gray-300">Davao City, Philippines</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Form Column -->
      <form @submit.prevent="submit" class="space-y-6 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-6 shadow-sm">
        <div>
          <label for="name" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Name <span class="text-red-500">*</span>
          </label>
          <Input
            id="name"
            v-model="name"
            type="text"
            placeholder="Your full name"
            required
            :disabled="loading"
          />
        </div>

        <div>
          <label for="email" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Email <span class="text-red-500">*</span>
          </label>
          <Input
            id="email"
            v-model="email"
            type="email"
            placeholder="your.email@example.com"
            required
            :disabled="loading"
          />
        </div>

        <div>
          <label for="message" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Message <span class="text-red-500">*</span>
          </label>
          <Textarea
            id="message"
            v-model="message"
            placeholder="Tell us about your project or inquiry..."
            required
            :disabled="loading"
            :rows="6"
          />
        </div>

        <!-- Success Message -->
      <Transition
        enter-active-class="transition duration-200 ease-out"
        enter-from-class="opacity-0 scale-95"
        enter-to-class="opacity-100 scale-100"
        leave-active-class="transition duration-150 ease-in"
        leave-from-class="opacity-100 scale-100"
        leave-to-class="opacity-0 scale-95"
      >
        <div v-if="success" class="p-4 bg-green-50 border border-green-200 rounded-lg">
          <div class="flex items-start gap-3">
            <svg class="w-5 h-5 text-green-600 mt-0.5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
            </svg>
            <div>
              <p class="text-sm font-medium text-green-800">Message sent successfully!</p>
              <p class="text-sm text-green-700 mt-1">Thank you for reaching out. Our team will follow up with you shortly.</p>
            </div>
          </div>
        </div>
      </Transition>

        <!-- Error Message -->
        <Transition
          enter-active-class="transition duration-200 ease-out"
          enter-from-class="opacity-0 scale-95"
          enter-to-class="opacity-100 scale-100"
          leave-active-class="transition duration-150 ease-in"
          leave-from-class="opacity-100 scale-100"
          leave-to-class="opacity-0 scale-95"
        >
          <div v-if="error" class="p-4 bg-red-50 border border-red-200 rounded-lg">
            <div class="flex items-start gap-3">
              <svg class="w-5 h-5 text-red-600 mt-0.5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
              </svg>
              <p class="text-sm text-red-800">{{ error }}</p>
            </div>
          </div>
        </Transition>

        <Button type="submit" variant="primary" size="lg" :loading="loading" :disabled="loading" class="w-full">
          {{ loading ? 'Sending...' : 'Send Message' }}
        </Button>
      </form>
    </div>
  </div>
</template>
