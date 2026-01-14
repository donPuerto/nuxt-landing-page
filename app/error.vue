<!-- app/error.vue -->
<script setup lang="ts">
import type { NuxtError } from '#app'
import { computed } from 'vue'
import { Button } from '@/components/ui/button'
import { AlertOctagon, Home, RotateCcw } from 'lucide-vue-next'
import { formatDateTime } from '~/utils'

const props = defineProps<{ error: NuxtError }>()
const route = useRoute()

const statusCode = computed(() => props.error.statusCode ?? 500)
const statusMessage = computed(() => props.error.statusMessage ?? 'Unexpected error')

const title = computed(() => {
	if (statusCode.value === 404) {
		return 'We can\'t find that page'
	}

	if (statusCode.value >= 500) {
		return 'Something broke on our side'
	}

	return 'Something went wrong'
})

const detailMessage = computed(() => {
	if (typeof props.error.data === 'object' && props.error.data?.message) {
		return String(props.error.data.message)
	}

	if (typeof props.error.message === 'string' && props.error.message.length) {
		return props.error.message
	}

	return 'Please try again or contact us if the problem continues.'
})

const currentPath = computed(() => props.error.url ?? route.fullPath)
const timestamp = computed(() => formatDateTime(new Date()))

const handleGoHome = () => {
	clearError({ redirect: '/' })
}

const handleRetry = () => {
	reloadNuxtApp({ persistState: true })
}
</script>

<template>
	<div class="min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-gray-950 dark:to-gray-900">
		<Section class="py-24">
			<Container>
				<FadeIn direction="up" class="max-w-3xl mx-auto text-center">
					<div class="mx-auto mb-8 flex h-16 w-16 items-center justify-center rounded-2xl bg-red-50 text-red-500 dark:bg-red-500/10">
						<AlertOctagon class="h-8 w-8" aria-hidden="true" />
					</div>

					<p class="text-xs uppercase tracking-[0.3em] text-red-500 dark:text-red-400">Error {{ statusCode }}</p>
					<h1 class="mt-4 text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">{{ title }}</h1>
					<p class="mt-4 text-sm md:text-base text-gray-600 dark:text-gray-400">{{ detailMessage }}</p>

					<div class="mt-10 grid gap-6 rounded-2xl border border-border/70 bg-white/80 p-6 text-left shadow-xl shadow-black/5 dark:border-border/40 dark:bg-gray-900/80">
						<div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
							<div>
								<p class="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">Status code</p>
								<p class="mt-1 text-lg font-semibold text-gray-900 dark:text-white">{{ statusCode }}</p>
							</div>
							<div>
								<p class="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">Reason</p>
								<p class="mt-1 text-lg font-semibold text-gray-900 dark:text-white">{{ statusMessage }}</p>
							</div>
							<div>
								<p class="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">Path</p>
								<p class="mt-1 text-sm text-gray-700 dark:text-gray-300">{{ currentPath }}</p>
							</div>
							<div>
								<p class="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">Timestamp</p>
								<p class="mt-1 text-sm text-gray-700 dark:text-gray-300">{{ timestamp }}</p>
							</div>
						</div>

						<div class="rounded-xl bg-gray-50/80 p-4 dark:bg-gray-800/60">
							<p class="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">Diagnostic message</p>
							<p class="mt-2 text-sm text-gray-700 dark:text-gray-300">
								{{ detailMessage }}
							</p>
						</div>
					</div>

					<div class="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
						<Button size="lg" class="gap-2" @click="handleGoHome">
							<Home class="h-5 w-5" aria-hidden="true" />
							Back to homepage
						</Button>
						<Button size="lg" variant="outline" class="gap-2" @click="handleRetry">
							<RotateCcw class="h-5 w-5" aria-hidden="true" />
							Try again
						</Button>
					</div>
				</FadeIn>
			</Container>
		</Section>
	</div>
</template>