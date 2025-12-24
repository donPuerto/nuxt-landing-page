import { ref } from 'vue';

export type RippleItem = {
  id: number;
  x: number;
  y: number;
  size: number;
  prevTheme: 'light' | 'dark';
  duration?: number;
};

export const rippleStore = ref<RippleItem[]>([]);

export function useRipple() {
  return { rippleStore };
}
