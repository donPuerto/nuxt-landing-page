import { ref } from 'vue'
import confetti from 'canvas-confetti'
import type { Options as ConfettiOptions } from 'canvas-confetti'

interface ConfettiState {
  isActive: boolean
}

export const useConfetti = () => {
  const state = ref<ConfettiState>({
    isActive: false
  })

  /**
   * Mode 1: Fireworks - Epic celebration from both sides
   * Perfect for form submission success (5 seconds)
   */
  const fireFireworks = () => {
    state.value.isActive = true

    const duration = 5 * 1000 // 5 seconds
    const animationEnd = Date.now() + duration
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 9999 }

    function randomInRange(min: number, max: number) {
      return Math.random() * (max - min) + min
    }

    const interval = window.setInterval(() => {
      const timeLeft = animationEnd - Date.now()

      if (timeLeft <= 0) {
        clearInterval(interval)
        state.value.isActive = false
        return
      }

      const particleCount = 50 * (timeLeft / duration)

      // Confetti from left side
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
      })

      // Confetti from right side
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
      })
    }, 250)
  }

  /**
   * Mode 2: Side Cannons - Continuous side blasts
   * Great for big celebrations (3 seconds)
   */
  const fireSideCannons = () => {
    state.value.isActive = true

    const end = Date.now() + 3 * 1000 // 3 seconds
    const colors = ['#a786ff', '#fd8bbc', '#eca184', '#f8deb1']

    function frame() {
      if (Date.now() > end) {
        state.value.isActive = false
        return
      }

      // Left side confetti cannon
      confetti({
        particleCount: 2,
        angle: 60,
        spread: 55,
        startVelocity: 60,
        origin: { x: 0, y: 0.5 },
        colors: colors,
        zIndex: 9999
      })

      // Right side confetti cannon
      confetti({
        particleCount: 2,
        angle: 120,
        spread: 55,
        startVelocity: 60,
        origin: { x: 1, y: 0.5 },
        colors: colors,
        zIndex: 9999
      })

      requestAnimationFrame(frame)
    }

    frame()
  }

  /**
   * Mode 3: Random Direction - Unpredictable fun
   * Quick burst with random angle
   */
  const fireRandom = () => {
    state.value.isActive = true

    confetti({
      particleCount: 100,
      spread: 70,
      origin: { x: 0.5, y: 0.5 },
      angle: Math.random() * 360,
      zIndex: 9999
    })

    setTimeout(() => {
      state.value.isActive = false
    }, 2000)
  }

  /**
   * Mode 4: Basic - Simple center burst
   * Classic confetti celebration
   */
  const fireBasic = (options?: Partial<ConfettiOptions>) => {
    state.value.isActive = true

    const defaults: ConfettiOptions = {
      particleCount: 100,
      spread: 70,
      origin: { x: 0.5, y: 0.5 },
      zIndex: 9999,
      ...options
    }

    confetti(defaults)

    setTimeout(() => {
      state.value.isActive = false
    }, 2000)
  }

  /**
   * Alias for form submission success - uses Fireworks mode
   */
  const fireSuccess = () => {
    fireFireworks()
  }

  return {
    state,
    fireFireworks,
    fireSideCannons,
    fireRandom,
    fireBasic,
    fireSuccess
  }
}
