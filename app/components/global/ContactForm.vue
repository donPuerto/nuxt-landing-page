<!-- app/components/global/ContactForm.vue -->
<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod'
import { useForm } from 'vee-validate'
import * as z from 'zod'
import { toast } from 'vue-sonner'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form'
import { cn } from '~/lib/utils'

const { fireSuccess } = useConfetti()

const formSchema = toTypedSchema(z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(50),
  email: z.string().email('Invalid email address'),
  message: z.string().min(10, 'Message must be at least 10 characters').max(500),
}))

const { handleSubmit, resetForm, isSubmitting } = useForm({
  validationSchema: formSchema,
})

const onSubmit = handleSubmit(async (values) => {
  try {
    const response = await $fetch<{ ok?: boolean; message?: string }>('/api/contact', {
      method: 'POST',
      body: values,
    })

    // Only show success if response is ok
    if (response?.ok !== false) {
      toast.success(response?.message || 'Message sent successfully!', {
        description: 'Thank you for reaching out. Our team will follow up with you shortly.',
      })
      
      // Trigger confetti on successful submission
      fireSuccess()
      
      resetForm()
    } else {
      toast.error('Submission failed', {
        description: response?.message || 'Failed to send message. Please try again.',
      })
    }
  } catch (err: any) {
    toast.error('Submission failed', {
      description: err.data?.message || 'Failed to send message. Please try again.',
    })
  }
})
</script>

<template>
  <div class="grid grid-cols-1 lg:grid-cols-2 gap-7">
    <!-- Info Column -->
    <div class="space-y-4 bg-card/80 border border-border rounded-xl py-6 px-6">
        <div class="space-y-1">
          <h3 class="text-lg md:text-xl font-semibold text-foreground">Let's Connect</h3>
          <p class="text-xs md:text-sm text-muted-foreground">
            I'm here to help you automate and scale. Share your goals and I'll get back within one business day.
          </p>
        </div>
        <div class="space-y-3">
          <div class="flex items-start gap-3 p-3 rounded-lg bg-card border border-border">
            <div class="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <div>
              <p class="text-sm font-semibold text-foreground">Email</p>
              <a href="mailto:don.puerto.1003@gmail.com" class="text-sm text-muted-foreground transition-colors hover:text-primary">don.puerto.1003@gmail.com</a>
            </div>
          </div>
          <div class="flex items-start gap-3 p-3 rounded-lg bg-card border border-border">
            <div class="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            </div>
            <div>
              <p class="text-sm font-semibold text-foreground">Phone</p>
              <p class="text-sm text-muted-foreground">0976 093 8376</p>
            </div>
          </div>
          <div class="flex items-start gap-3 p-3 rounded-lg bg-card border border-border">
            <div class="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <div>
              <p class="text-sm font-semibold text-foreground">Location</p>
              <p class="text-sm text-muted-foreground">Davao City, Philippines</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Form Column -->
      <form @submit="onSubmit" class="space-y-6 bg-card border border-border rounded-xl py-6 px-6 shadow-sm">
        <!-- Name Field -->
        <FormField v-slot="{ componentField }" name="name">
          <FormItem>
            <FormLabel>Name <span class="text-red-500">*</span></FormLabel>
            <FormControl>
              <Input
                type="text"
                placeholder="Your full name"
                :disabled="isSubmitting"
                v-bind="componentField"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>

        <!-- Email Field -->
        <FormField v-slot="{ componentField }" name="email">
          <FormItem>
            <FormLabel>Email <span class="text-red-500">*</span></FormLabel>
            <FormControl>
              <Input
                type="email"
                placeholder="your.email@example.com"
                :disabled="isSubmitting"
                v-bind="componentField"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>

        <!-- Message Field -->
        <FormField v-slot="{ componentField }" name="message">
          <FormItem>
            <FormLabel>Message <span class="text-red-500">*</span></FormLabel>
            <FormControl>
              <Textarea
                placeholder="Tell us about your project or inquiry..."
                :disabled="isSubmitting"
                :rows="6"
                v-bind="componentField"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>

        <!-- Submit Button -->
        <Button type="submit" :disabled="isSubmitting" class="w-full">
          <span v-if="!isSubmitting">Send Message</span>
          <span v-else class="flex items-center justify-center gap-2">
            <svg class="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
            Sending...
          </span>
        </Button>
      </form>
    </div>
</template>
