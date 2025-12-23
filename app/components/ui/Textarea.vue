<!-- app/components/ui/Textarea.vue -->
<script setup lang="ts">
import { cn } from '~/lib/utils';

interface TextareaProps {
  modelValue: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  rows?: number;
  class?: string;
}

const props = withDefaults(defineProps<TextareaProps>(), {
  placeholder: '',
  required: false,
  disabled: false,
  rows: 4,
  class: ''
});

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>();

const textareaClass = computed(() =>
  cn(
    'w-full px-4 py-2.5 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed resize-y',
    props.class
  )
);

const handleInput = (event: Event) => {
  const target = event.target as HTMLTextAreaElement;
  emit('update:modelValue', target.value);
};
</script>

<template>
  <textarea
    :value="modelValue"
    :placeholder="placeholder"
    :required="required"
    :disabled="disabled"
    :rows="rows"
    :class="textareaClass"
    @input="handleInput"
  ></textarea>
</template>
