<script setup lang="ts">
import { onMounted, ref, computed, watch, nextTick } from 'vue'
import { createChat } from '@n8n/chat'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { ScrollArea } from '@/components/ui/scroll-area'
import { cn } from '~/lib/utils'
import '@n8n/chat/style.css'
import '~/assets/css/n8n-chat-theme.css'

interface ChatProps {
  webhookUrl: string
  mode?: 'window' | 'fullscreen'
  engine?: 'n8n' | 'simulated'
  chatInputKey?: string
  chatSessionKey?: string
  loadPreviousSession?: boolean
  showWelcomeScreen?: boolean
  defaultLanguage?: string
  initialMessages?: string[]
  metadata?: Record<string, any>
  enableStreaming?: boolean
  title?: string
  subtitle?: string
  inputPlaceholder?: string
  class?: string
}

const props = withDefaults(defineProps<ChatProps>(), {
  mode: 'window',
  engine: 'n8n',
  chatInputKey: 'chatInput',
  chatSessionKey: 'sessionId',
  loadPreviousSession: true,
  showWelcomeScreen: false,
  defaultLanguage: 'en',
  enableStreaming: false,
  title: 'Hi there! 👋',
  subtitle: "Start a chat. We're here to help you 24/7.",
  inputPlaceholder: 'Type your question..',
})

interface FallbackMessage {
  id: number
  role: 'user' | 'bot'
  content: string
  timestamp: Date
}

const chatContainer = ref<HTMLDivElement | null>(null)
const isInitialized = ref(false)
const fallbackMessageArea = ref<HTMLDivElement | null>(null)
const messageCounter = ref(0)
const fallbackMessages = ref<FallbackMessage[]>([
  {
    id: ++messageCounter.value,
    role: 'bot',
    content: "Hey there! I'm Don's automation assistant. Ask me anything and I'll keep the conversation flowing.",
    timestamp: new Date(),
  },
])
const userInput = ref('')
const isSending = ref(false)

const fallbackReplies = [
  'Great question! I just noted that down and will follow up with a personalized plan shortly.',
  'Appreciate the details — I am sketching a workflow in the background and will get back to you soon.',
  'Sounds exciting! Let me digest that and share a few automation ideas in a bit.',
  'Got it! I will loop in Don so we can respond with a tailored solution.',
]

const timestampFormatter = computed(
  () =>
    new Intl.DateTimeFormat(undefined, {
      dateStyle: 'long',
      timeStyle: 'short',
    })
)

const formatTimestamp = (date: Date) => timestampFormatter.value.format(date)

// Theme-aware i18n config
const i18nConfig = computed(() => ({
  en: {
    title: props.title,
    subtitle: props.subtitle,
    footer: '',
    getStarted: 'New Conversation',
    inputPlaceholder: props.inputPlaceholder,
  },
}))

// Container class - full height for fullscreen, else window mode
const containerClass = computed(() => {
  if (props.mode === 'fullscreen') {
    return 'w-full h-screen'
  }
  return ''
})

const simulatedPanelClass = computed(() =>
  cn(
    'flex min-h-0 h-full flex-col overflow-hidden border border-border/80 bg-card/95 shadow-xl',
    props.mode === 'fullscreen' ? 'rounded-none' : 'rounded-2xl rounded-t-none'
  )
)

const hasValidWebhook = computed(() => Boolean(props.webhookUrl && props.webhookUrl !== 'https://your-n8n-webhook-url'))
const shouldRenderSimulated = computed(() => props.engine === 'simulated' || !hasValidWebhook.value)

const scrollFallbackToBottom = () => {
  nextTick(() => {
    const container = fallbackMessageArea.value
    const lastChild = container?.lastElementChild
    if (lastChild && 'scrollIntoView' in lastChild) {
      lastChild.scrollIntoView({ behavior: 'smooth', block: 'end' })
    }
  })
}

const addFallbackMessage = (role: FallbackMessage['role'], content: string) => {
  fallbackMessages.value.push({
    id: ++messageCounter.value,
    role,
    content,
    timestamp: new Date(),
  })
  scrollFallbackToBottom()
}

const sendFallbackMessage = async () => {
  if (!userInput.value.trim() || isSending.value) return

  const message = userInput.value.trim()
  userInput.value = ''
  addFallbackMessage('user', message)
  isSending.value = true

  try {
    await new Promise((resolve) => setTimeout(resolve, 900))
    const reply = fallbackReplies[Math.floor(Math.random() * fallbackReplies.length)] ?? 'Thanks for your message!'
    addFallbackMessage('bot', reply)
  } finally {
    isSending.value = false
  }
}

const handleKeydown = (event: KeyboardEvent) => {
  if (event.key === 'Enter' && !event.shiftKey) {
    event.preventDefault()
    sendFallbackMessage()
  }
}

const initializeChat = () => {
  if (shouldRenderSimulated.value) {
    return
  }

  if (!chatContainer.value) {
    console.warn('[Chat] container ref not found')
    return
  }

  if (isInitialized.value) {
    return
  }

  try {
    createChat({
      webhookUrl: props.webhookUrl,
      target: chatContainer.value,
      mode: props.mode,
      chatInputKey: props.chatInputKey,
      chatSessionKey: props.chatSessionKey,
      loadPreviousSession: props.loadPreviousSession,
      metadata: props.metadata,
      showWelcomeScreen: props.showWelcomeScreen,
      defaultLanguage: props.defaultLanguage as 'en',
      initialMessages: props.initialMessages,
      //i18n: i18nConfig.value,
      enableStreaming: props.enableStreaming,
      webhookConfig: {
        method: 'POST',
        headers: {},
      },
    })
    isInitialized.value = true
  } catch (error) {
    console.error('[Chat] Failed to initialize:', error)
  }
}

// Initialize n8n chat when component mounts and webhook URL is available
onMounted(() => {
  if (shouldRenderSimulated.value) {
    return
  }
  initializeChat()
})

watch(shouldRenderSimulated, (value) => {
  if (!value) {
    isInitialized.value = false
    nextTick(() => {
      if (chatContainer.value) {
        chatContainer.value.innerHTML = ''
      }
      initializeChat()
    })
  }
})

watch(
  () => props.webhookUrl,
  () => {
    if (!shouldRenderSimulated.value) {
      isInitialized.value = false
      if (chatContainer.value) {
        chatContainer.value.innerHTML = ''
      }
      nextTick(() => initializeChat())
    }
  }
)

watch(
  () => fallbackMessages.value.length,
  () => {
    scrollFallbackToBottom()
  }
)
</script>

<template>
  <div :class="cn('h-full', containerClass, props.class)">
    <template v-if="!shouldRenderSimulated">
      <!-- Chat container - n8n chat library renders into this -->
      <div ref="chatContainer" id="n8n-chat" class="w-full h-full" />
    </template>

    <div :class="simulatedPanelClass" v-else>
      <div class="flex-1 min-h-0 px-4 pt-5 pb-3">
        <ScrollArea
          type="scroll"
          class="chat-scroll h-full rounded-none"
        >
          <div ref="fallbackMessageArea" class="space-y-4 pr-4">
            <div
              v-for="message in fallbackMessages"
              :key="message.id"
              :class="[
                'max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed shadow-sm',
                message.role === 'user'
                  ? 'ml-auto bg-primary text-primary-foreground'
                  : 'mr-auto bg-muted text-muted-foreground',
              ]"
            >
              <p>{{ message.content }}</p>
              <span class="mt-2 block text-[11px] uppercase tracking-wide opacity-70">
                {{ formatTimestamp(message.timestamp) }}
              </span>
            </div>
          </div>
        </ScrollArea>
      </div>
      <div class="border-t border-border/80 bg-background/85 p-4">
        <div class="rounded-2xl border border-border/80 bg-card/80 p-3">
          <Textarea
            v-model="userInput"
            class="min-h-[64px] resize-none border-0 bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus-visible:ring-0 focus-visible:ring-offset-0"
            placeholder="Type your message and press Enter"
            @keydown="handleKeydown"
          />
          <div class="mt-3 flex justify-end">
            <Button
              :disabled="!userInput.trim().length || isSending"
              class="min-w-[110px]"
              size="sm"
              @click="sendFallbackMessage"
            >
              <span v-if="!isSending">Send</span>
              <span v-else>Sending…</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Ensure container takes full size in parent */
#n8n-chat {
  display: contents;
}

:deep(.chat-scroll [data-slot='scroll-area']),
:deep(.chat-scroll [data-slot='scroll-area-viewport']) {
  border-radius: 0 !important;
}
</style>
