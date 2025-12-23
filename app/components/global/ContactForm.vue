<!-- app/components/global/ContactForm.vue -->
<script setup lang="ts">
const { name, email, message, loading, success, error, submit } = useForm();
</script>

<template>
  <div class="max-w-2xl mx-auto">
    <form @submit.prevent="submit" class="space-y-6">
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
</template>
