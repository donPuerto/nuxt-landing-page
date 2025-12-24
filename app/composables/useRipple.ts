import { ref } from 'vue';

export const rippleStore = ref<Array<{ id: number; x: number; y: number; size: number; theme: 'light' | 'dark' }>>([]);

export function useRipple() {
  return { rippleStore };
}
