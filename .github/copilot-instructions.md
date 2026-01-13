**Usage Patterns**

**Window Mode (Default):**
**Fullscreen Mode:**

**With Custom Metadata:**
### Simulated Engine (AI Preview)

- Set `engine="simulated"` to render the built-in textarea + send button experience. This is ideal for demos, local development, or when the n8n webhook URL is not configured yet.
- The simulated mode wires up smooth scrolling via `ScrollArea` and keeps the composer anchored, so avoid adding extra wrappers.
- When using the floating window card in `layouts/default.vue`, keep the title copy as:
  - Heading: “Need a hand?”
  - Subtitle: “Chat with Don Puerto’s AI assistant.”
- Do not reintroduce the retired “Live chat preview” banner—the simulated UI should feel like the real product experience.

### Theming
# Copilot Instructions for Nuxt 4 Landing Page

> Quick Guide for AI Agents (Jan 2026)

**Architecture & Entry Points**
- Nuxt 4 SPA with `ssr: false`; sections live in `app/pages/index.vue`, layout in `app/layouts/default.vue`.
- UI primitives under `app/components/ui/*`; page sections in `app/components/global/*` (e.g., `Hero.vue`, `ContactForm.vue`, `Navbar.vue`, `Footer.vue`).
- Server API proxy in `server/api/contact.post.ts` forwards form submissions to n8n via runtime config.

**Core Conventions (MANDATORY)**
- Shadcn-first: Use components from `app/components/ui/*` (e.g., `Button`, `Input`, `FormItem`) instead of raw Tailwind for interactive UI.
- Single `Logo.vue`: Always use `app/components/global/Logo.vue` with props (`size`, `variant`, `animated`, `logoOnly`).
- Container alignment: Wrap all sections with `app/components/ui/Container.vue`; never hardcode `max-w-*` or nest containers.
- Class merging: Always use `cn()` from `app/lib/utils.ts` for conditional classes; accept `class?: string` and merge.
- Typography: Section headings `text-4xl md:text-5xl`; descriptions `text-sm md:text-base`; include dark mode pairs (`text-gray-900 dark:text-white`).
- Iconography: Import icons from `lucide-vue-next` (official icon library) and prefer Lucide names (e.g., `GalleryHorizontal`).

**Forms & Data Flow**
- Validate with vee-validate + zod; use `FormField`, `FormItem`, `FormLabel`, `FormControl`, `FormMessage`.
- Submit via `$fetch('/api/contact')`; server validates and forwards to `runtimeConfig.n8nWebhookUrl` with optional `x-webhook-secret`.
- Never call external webhooks from the client.

**Integrations & Effects**
- Toasts via `vue-sonner` (`Sonner` component) with theme-aware styling; placed in `app/layouts/default.vue`.
- Confetti modes in `app/composables/useConfetti.ts`; trigger on successful form submission.
- FluidCursor WebGL in `app/components/ui/fluid-cursor/FluidCursor.vue`; rendered in layout.
- n8n Chat widget in `app/components/ui/chat/Chat.vue`; supports window or fullscreen modes, an `engine` prop (`'n8n'` or `'simulated'`), and theme auto-switches with dark mode via CSS vars in `app/assets/css/n8n-chat-theme.css`.
- CSP note: `nuxt.config.ts` sets `worker-src 'self' blob:` for confetti.

**Development & Environment**
- Commands: `npm run dev`, `npm run build`, `npm run preview`; Tailwind v4 via `@tailwindcss/vite`.
- Runtime config: `NUXT_N8N_WEBHOOK_URL`, `NUXT_N8N_WEBHOOK_SECRET` (used by `server/api/contact.post.ts`).
- Dark mode: inline head script in `nuxt.config.ts` prevents white flash; `@nuxtjs/color-mode` configured.

**Examples**
- Use shadcn: `<Button size="lg">Get Started</Button>`; inputs bound with `v-bind="componentField"` and `<FormMessage />`.
- Container: `<section class="py-16"><Container><!-- content --></Container></section>`.
- `cn()` usage: `const cls = computed(() => cn('px-4', isGhost && 'bg-transparent', props.class))`.
- n8n Chat window mode: `<Chat :webhookUrl="chatUrl" mode="window" />`.
- n8n Chat fullscreen: `<Chat :webhookUrl="chatUrl" mode="fullscreen" />` (auto-hides navbar, footer).

**Do / Don't**
- Do: keep single-page structure, use auto-imported components/composables, include dark mode classes.
- Don't: nest containers, concatenate class strings, introduce PostCSS, or bypass the server API for n8n.

**Troubleshooting**
- Contact failures: verify `runtimeConfig` envs and that n8n webhook is reachable; test locally:
  `curl -X POST http://localhost:3000/api/contact -H "Content-Type: application/json" -d '{"name":"Test","email":"t@e.com","message":"Hi"}'`

— The detailed reference below remains authoritative for edge cases and component specifics.

**Tech Stack:** Nuxt 4 + Tailwind CSS v4 + Vue shadcn/ui + n8n Integration

---

## Table of Contents
1. Quick Start
2. Project Architecture
3. Core Rules (MANDATORY)
4. Coding Standards
5. Typography & Styling
6. Component Patterns
7. Advanced Patterns
8. Common Mistakes

---

## Quick Start

**Most Important Rules:**
- ✅ Use ONLY ONE `Logo.vue` component everywhere
- ✅ Use shadcn/ui components instead of custom Tailwind
- ✅ Use `cn()` utility for ALL class merging
- ✅ Use `<Container>` component for ALL section alignment
- ✅ Keep exact font sizes: headings `text-4xl md:text-5xl`, descriptions `text-sm md:text-base`
- ❌ Never hardcode padding or max-width directly in sections
- ❌ Never call n8n webhooks from client side

---

## Project Architecture

### Directory Structure
```
app/
  components/
    global/       # Page sections: Navbar, Footer, Hero, ContactForm, Logo
    ui/           # shadcn/ui primitives + custom wrappers
  pages/index.vue # Single-page marketing site (ONLY PAGE)
  layouts/default.vue # Shared header + footer layout
  composables/    # useForm, useRipple, useScrollSpy, useSmoothScroll
  lib/utils.ts    # cn() utility function
server/api/
  contact.post.ts # n8n webhook proxy (NEVER call n8n directly from client)
```

### Tech Stack
| Tech | Purpose | Location |
|------|---------|----------|
| **Nuxt 4** | SSR single-page, auto-imports | Framework |
| **TypeScript** | Strict mode, Composition API | `<script setup lang="ts">` |
| **Tailwind v4** | Styling via `@tailwindcss/vite` | Utility-first CSS |
| **shadcn/ui** | Headless Vue components (PRIMARY) | `/components/ui/*` |
| **vee-validate + zod** | Type-safe forms | Form validation |
| **vue-sonner** | Toast notifications | User feedback |
| **@nuxtjs/color-mode** | Dark/light theme | Theme toggle |
| **lucide-vue-next** | Icon set for UI + system controls | Import icons where needed |

---

## Core Rules (MANDATORY)

### Rule 1: Shadcn-First Components

**If shadcn/ui has it, use it. Period.**

```vue
❌ WRONG:
<div class="px-4 py-2 bg-blue-600 text-white rounded">Click me</div>

✅ CORRECT:
<Button>Click me</Button>
```

**Quick Component Map:**
| UI Need | Component | Path |
|---------|-----------|------|
| Button | `Button` | `@/components/ui/button` |
| Input | `Input` | `@/components/ui/input` |
| Textarea | `Textarea` | `@/components/ui/textarea` |
| Form | `FormField`, `FormItem`, `FormLabel`, `FormControl`, `FormMessage` | `@/components/ui/form` |
| Card | `Card`, `CardHeader`, `CardTitle`, `CardContent`, `CardFooter` | `@/components/ui/card` |
| Toast | `toast` | `vue-sonner` |

### Rule 2: Single Logo Component (CRITICAL)

**Use `@/components/global/Logo.vue` EVERYWHERE with consistent props.**

```vue
<!-- Navbar -->
<Logo size="sm" variant="square" :name="'Don Puerto'" :animated="true" />

<!-- Footer -->
<Logo size="sm" logoOnly :name="'DP'" :animated="true" />

<!-- Hero (optional) -->
<Logo size="lg" variant="full" :name="'Don Puerto'" :animated="true" />
```

**Logo Props:**
| Prop | Type | Default | Purpose |
|------|------|---------|---------|
| `name` | string | `'DP'` | Full name or initials (auto-parsed) |
| `size` | `'sm' \| 'lg'` | `'sm'` | Small (36px) or Large (64px) |
| `variant` | `'full' \| 'square'` | `'full'` | With or without name text |
| `animated` | boolean | `false` | Flowing gradient animation |
| `logoOnly` | boolean | `false` | Just the square (no text) |
| `borderless` | boolean | `false` | Remove gradient border |
| `class` | string | `''` | Additional Tailwind classes |

**Gradient Details:**
- **Colors**: Purple → Pink → Golden Yellow → Red-Orange → Orange
- **Animation**: 2 seconds, one direction, continuous
- **Hover**: Multi-color glow effect
- **Dark Mode**: Full support

### Rule 3: Container for Alignment

**Use `<Container>` component in EVERY section for alignment.**

```vue
<!-- ✅ CORRECT -->
<section class="py-16 bg-gray-50">
  <Container>
    <!-- Content: max-w-7xl mx-auto px-6 -->
  </Container>
</section>

<!-- ❌ WRONG -->
<section class="max-w-7xl mx-auto px-6 py-16">
  <!-- Breaking layout rules -->
</section>
```

**Container Rules:**
- Location: `@/components/ui/Container.vue`
- Default: `max-w-7xl mx-auto px-6`
- Never nest Container inside Container
- Supports layout toggle: `data-layout="full"` on HTML

### Rule 4: Use cn() for Class Merging

**Always use `cn()` from `~/lib/utils.ts` for conditional/merged classes.**

```typescript
// ✅ CORRECT
import { cn } from '~/lib/utils'

const buttonClass = computed(() =>
  cn(
    'px-4 py-2 rounded-md',
    props.variant === 'ghost' && 'bg-transparent',
    props.class
  )
)

// ❌ WRONG
const buttonClass = `px-4 py-2 ${isActive ? 'bg-blue' : 'bg-gray'}`
```

---

## Coding Standards

### Vue SFC Pattern (Required)

```vue
<script setup lang="ts">
// 1. Imports (shadcn first)
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { cn } from '~/lib/utils'

// 2. Composables
const { data } = await useFetch('/api/endpoint')

// 3. State
const isOpen = ref(false)
const items = computed(() => [...])

// 4. Methods
const handleClick = () => { }
</script>

<template>
  <section class="py-16">
    <Container>
      <Card>
        <CardContent>
          <Button @click="handleClick">Click me</Button>
        </CardContent>
      </Card>
    </Container>
  </section>
</template>
```

### Nuxt Conventions
- ✅ Single page: `app/pages/index.vue` only
- ✅ Auto-imports: components and composables
- ✅ Layout: `layouts/default.vue` for header/footer
- ✅ API: `server/api/` for backend routes
- ❌ No multi-page routing
- ❌ No direct client-side webhook calls

### Component Design
- Small, focused, single responsibility
- Accept `class?: string` for customization
- Forward props to wrapped components
- Use `cn()` for style merging

---

## Typography & Styling

### Main Section Headers (MANDATORY)

**ALL main section headings use exact same sizes:**

```vue
<div class="text-center mb-12">
  <h2 class="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
    Section Title
  </h2>
  <p class="text-sm md:text-base text-gray-600 dark:text-gray-400">
    Section description
  </p>
</div>
```

**Required Typography:**
| Element | Mobile | Desktop | Weight | Light | Dark |
|---------|--------|---------|--------|-------|------|
| **Heading** | `text-4xl` | `text-5xl` | `font-bold` | `text-gray-900` | `dark:text-white` |
| **Description** | `text-sm` | `text-base` | Regular | `text-gray-600` | `dark:text-gray-400` |

**Sections Using This:**
- ✅ Services, Testimonials, Clients, Contact sections
- ✅ Footer "Connect with me" section

### Sub-Section Headers (Forms, Cards)

```vue
<h3 class="text-lg md:text-xl font-semibold text-gray-900 dark:text-white">
  Let's Connect
</h3>
<p class="text-xs md:text-sm text-gray-600 dark:text-gray-400">
  Description
</p>
```

**Sizes:** Heading `text-lg md:text-xl`, Description `text-xs md:text-sm`

### Navbar & Footer Typography

| Element | Size | Weight | Colors |
|---------|------|--------|--------|
| **Navbar Logo** | `text-base md:text-lg` | `font-bold` | `text-gray-900 dark:text-white` |
| **Navbar Links** | Inherit from Button | Regular | Active: `text-blue-600 dark:text-blue-400` |
| **Footer Text** | `text-sm md:text-base` | `font-medium` | `text-gray-700 dark:text-gray-200` |

**Dark Mode Rule (MANDATORY):**
Every text element needs light + dark variant:
```
❌ <span class="text-gray-900">Text</span>
✅ <span class="text-gray-900 dark:text-white">Text</span>
```

### Hero Section Formatting (RECOMMENDED PATTERN)

**The Hero section uses larger, more impactful typography for the main landing section.**

```vue
<Section id="home" class="pt-32 pb-16 md:pt-40 md:pb-24 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm">
  <Container>
    <FadeIn direction="up" class="text-center max-w-4xl mx-auto">
      <!-- Main Heading -->
      <h1 class="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
        Transform Your Business with
        <span class="text-blue-600 dark:text-blue-400"> AI-Powered Automation</span>
      </h1>
      
      <!-- Description -->
      <p class="text-lg md:text-lg text-gray-600 dark:text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed">
        We help businesses streamline operations, reduce costs, and scale faster through intelligent automation solutions.
      </p>
      
      <!-- CTA Buttons -->
      <div class="flex flex-col sm:flex-row gap-4 justify-center">
        <Button @click="scrollTo('contact')" size="lg">Get Started</Button>
        <Button variant="outline" size="lg">Our Services</Button>
      </div>
    </FadeIn>
  </Container>
</Section>
```

**Hero Typography Specifications:**

| Element | Mobile | Tablet | Desktop | Weight | Colors |
|---------|--------|--------|---------|--------|--------|
| **Main Heading** | `text-5xl` (48px) | `text-6xl` (64px) | `text-7xl` (80px) | `font-bold` | Light: `text-gray-900` / Dark: `dark:text-white` |
| **Accent Text** | Same | Same | Same | `font-bold` | `text-blue-600 dark:text-blue-400` |
| **Description** | `text-lg` (18px) | `text-lg` (18px) | `text-lg` (18px) | Regular | Light: `text-gray-600` / Dark: `dark:text-gray-400` |

**Hero Spacing Rules:**
- Heading margin bottom: `mb-6`
- Description margin bottom: `mb-10`
- Button gap: `gap-4`
- Description max-width: `max-w-2xl`
- Heading container max-width: `max-w-4xl`

**Hero CSS Properties:**
- Line height: `leading-tight` (headings), `leading-relaxed` (descriptions)
- Section padding: `pt-32 pb-16` (mobile), `md:pt-40 md:pb-24` (desktop)
- Background: `bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm`
- Text alignment: `text-center`

**Key Differences from Section Headers:**
| Feature | Section Headers | Hero Section |
|---------|-----------------|-------------|
| Heading Size | `text-4xl md:text-5xl` | `text-5xl md:text-6xl lg:text-7xl` (LARGER) |
| Description Size | `text-sm md:text-base` | `text-lg md:text-lg` (LARGER) |
| Max Width | N/A (full) | `max-w-4xl` (constrained) |
| Line Height | Normal | `leading-tight` (headings) / `leading-relaxed` (description) |
| Animation | N/A | FadeIn with `direction="up"` |

**Hero CTA Button Pattern:**
```vue
<div class="flex flex-col sm:flex-row gap-4 justify-center">
  <Button @click="scrollTo('contact')" size="lg">Primary Action</Button>
  <Button variant="outline" size="lg">Secondary Action</Button>
</div>
```

- Always use `size="lg"` for hero buttons
- Stack on mobile (`flex-col sm:flex-row`)
- Center alignment with `justify-center`
- Consistent gap: `gap-4`

---

## Component Patterns

### Form Pattern (vee-validate + zod)

```vue
<script setup lang="ts">
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'
import { toast } from 'vue-sonner'

// 1. Define schema
const schema = toTypedSchema(z.object({
  email: z.string().email('Invalid email'),
  message: z.string().min(10),
}))

// 2. Initialize form
const { handleSubmit, resetForm } = useForm({ validationSchema: schema })

// 3. Handle submit
const onSubmit = handleSubmit(async (values) => {
  try {
    await $fetch('/api/contact', { method: 'POST', body: values })
    toast.success('Sent!')
    resetForm()
  } catch (err) {
    toast.error('Failed', { description: err.data?.message })
  }
})
</script>

<template>
  <form @submit="onSubmit">
    <FormField v-slot="{ componentField }" name="email">
      <FormItem>
        <FormLabel>Email</FormLabel>
        <FormControl>
          <Input type="email" v-bind="componentField" />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>
  </form>
</template>
```

### Animation Pattern (FadeIn)

```vue
<!-- Single element -->
<FadeIn direction="up" :delay="100">
  <Card>...</Card>
</FadeIn>

<!-- Staggered list -->
<div v-for="(item, i) in items" :key="i">
  <FadeIn direction="up" :delay="i * 100">
    <Card>{{ item }}</Card>
  </FadeIn>
</div>
```

**Props:** `direction` (up|down|left|right), `delay` (ms), `once` (boolean)

### n8n Integration (API Proxy)

```typescript
// ✅ server/api/contact.post.ts - Proxy pattern
export default defineEventHandler(async (event) => {
  const { name, email, message } = await readBody(event)
  
  const config = useRuntimeConfig()
  const response = await $fetch(config.n8nWebhookUrl, {
    method: 'POST',
    headers: { 'x-webhook-secret': config.n8nWebhookSecret },
    body: { name, email, message, timestamp: new Date().toISOString() }
  })
  
  return { ok: true }
})

// ❌ NEVER call n8n directly from client
await $fetch('https://webhook.site/...', { method: 'POST', body: data })
```

---

## Advanced Patterns

### Custom Component Wrapper

```vue
<script setup lang="ts">
import { Button as ShadcnButton } from '@/components/ui/button'
import { cn } from '~/lib/utils'

interface Props {
  variant?: 'primary' | 'secondary'
  class?: string
}

const props = withDefaults(defineProps<Props>(), { variant: 'primary' })

const buttonClass = computed(() =>
  cn(
    'px-6 py-3 rounded-lg',
    props.variant === 'primary' && 'bg-blue-600 text-white',
    props.variant === 'secondary' && 'bg-gray-100 text-gray-900',
    props.class
  )
)
</script>

<template>
  <ShadcnButton :class="buttonClass">
    <slot />
  </ShadcnButton>
</template>
```

### Responsive Grid

```vue
<Container>
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    <Card v-for="item in items" :key="item.id">
      <CardContent>{{ item.title }}</CardContent>
    </Card>
  </div>
</Container>
```

---

## Common Mistakes

### ❌ Mistake 1: Multiple Logo Components
```vue
<!-- WRONG -->
<Navbar /> <!-- Uses Logo.vue -->
<Footer /> <!-- Uses FooterLogo.vue -->

<!-- CORRECT -->
<Navbar /> <!-- Uses Logo.vue -->
<Footer /> <!-- Uses Logo.vue with logoOnly prop -->
```

### ❌ Mistake 2: Hardcoded Padding/Width
```vue
<!-- WRONG -->
<section class="max-w-7xl mx-auto px-6 py-16">Content</section>

<!-- CORRECT -->
<section class="py-16"><Container>Content</Container></section>
```

### ❌ Mistake 3: Inconsistent Font Sizes
```vue
<!-- WRONG - Different sizes -->
<h2 class="text-3xl md:text-4xl">Services</h2>
<h2 class="text-4xl md:text-5xl">Testimonials</h2>

<!-- CORRECT - Same everywhere -->
<h2 class="text-4xl md:text-5xl">Services</h2>
<h2 class="text-4xl md:text-5xl">Testimonials</h2>
```

### ❌ Mistake 4: String Concatenation
```typescript
// WRONG
:class="'text-' + size + ' py-' + padding"

// CORRECT
:class="cn('text-base py-4', { 'text-lg': size === 'lg' })"
```

### ❌ Mistake 5: Missing Dark Mode
```vue
<!-- WRONG -->
<h2 class="text-gray-900">Heading</h2>

<!-- CORRECT -->
<h2 class="text-gray-900 dark:text-white">Heading</h2>
```

### ❌ Mistake 6: Client-Side Webhook Calls
```typescript
// WRONG - Never do this
const response = await fetch('https://webhook.site/...', {...})

// CORRECT - Use server endpoint
const response = await $fetch('/api/contact', {...})
```

### ❌ Mistake 7: Nested Containers
```vue
<!-- WRONG - Double container -->
<Container><ContactForm /></Container>

<!-- CORRECT -->
<Container>
  <div class="grid grid-cols-1 lg:grid-cols-2 gap-10">
    <!-- Form content directly -->
  </div>
</Container>
```

---

## Reference Files

- Logo.vue - `app/components/global/Logo.vue`
- Navbar.vue - `app/components/global/Navbar.vue`
- Footer.vue - `app/components/global/Footer.vue`
- Container.vue - `app/components/ui/Container.vue`
- ContactForm.vue - `app/components/global/ContactForm.vue`
- index.vue - `app/pages/index.vue`
- contact.post.ts - `server/api/contact.post.ts`

---

## Quick Checklist

- [ ] Using shadcn/ui components (not custom Tailwind)?
- [ ] Using `cn()` for class merging?
- [ ] Using `<Container>` for alignment?
- [ ] Using single `Logo.vue` component?
- [ ] Font sizes correct: `text-4xl md:text-5xl` (headings), `text-sm md:text-base` (descriptions)?
- [ ] Dark mode classes included?
- [ ] Form validation with vee-validate + zod?
- [ ] API calls through `server/api/`?
- [ ] No hardcoded padding/max-width in sections?

---

## VS Code Configuration Notes

**CSS IntelliSense Data:**
- VS Code generates `css-data.json` for Tailwind CSS IntelliSense
- This file is auto-generated and should be ignored in version control
- If you see CSS validation warnings, ensure `.vscode/settings.json` includes Tailwind directives support

**Recommended `.vscode/settings.json`:**
```
{
  "css.validate": false, 
}
```
- [ ] Tested in light and dark modes?

## 1. Project Stack

**Framework:** Nuxt 4 (SSR-enabled single-page architecture)  
**Language:** TypeScript (strict mode, Composition API)  
**Styling:** Tailwind CSS v4 via `@tailwindcss/vite` plugin  
**Forms:** vee-validate + zod  
**UI:** Vue shadcn/ui (primary) + custom components  
**Animations:** IntersectionObserver-based, motion-v  
**Toast:** vue-sonner  

❌ **Do not** add PostCSS unless explicitly required  
❌ **Do not** use React-based shadcn or reimplement shadcn with raw Tailwind

### Component Structure
```
app/
  components/
    global/       # Page-level sections (Hero, ContactForm, Navbar, Footer)
    ui/           # Reusable UI primitives (shadcn + custom wrappers)
  pages/index.vue # Single-page marketing site
  layouts/default.vue # Header + Footer wrapper
  composables/    # useForm, useRipple, useScrollSpy, useSmoothScroll
  lib/utils.ts    # cn() utility - MANDATORY for class merging
server/api/       # Backend endpoints (contact.post.ts → n8n webhook)
```

## 2. Shadcn-First Component Rule (MANDATORY)

**Default Rule:** If a Vue shadcn/ui component exists, it MUST be used.

This applies to:
- Pages, components, forms, dialogs, UI primitives
- All interactive elements (buttons, inputs, dropdowns, modals)

**Replacement Rule:** When building or modifying a page:
- ❌ Do not create custom Tailwind markup for buttons, inputs, forms, or cards
- ✅ Replace with appropriate Vue shadcn/ui component from `@/components/ui/*`

**Component Mapping:**
| UI Need | Required Component | Import Path |
|---------|-------------------|-------------|
| Button | `Button` | `@/components/ui/button` |
| Input field | `Input` | `@/components/ui/input` |
| Textarea | `Textarea` | `@/components/ui/textarea` |
| Form layout | `FormField`, `FormItem`, `FormLabel`, `FormControl`, `FormMessage` | `@/components/ui/form` |
| Card | `Card`, `CardHeader`, `CardTitle`, `CardContent`, `CardFooter` | `@/components/ui/card` |
| Toast | `toast` from `vue-sonner` | `vue-sonner` |

## 3. Coding Standards

**Vue SFC Pattern:**
```vue
<script setup lang="ts">
// Imports
import { Button } from '@/components/ui/button'
import { cn } from '~/lib/utils'

// Composables
const { data } = await useFetch('/api/endpoint')

// Refs/State
const isOpen = ref(false)
</script>

<template>
  <!-- Use semantic HTML -->
  <section class="py-16">
    <Button @click="isOpen = !isOpen">Toggle</Button>
  </section>
</template>
```

**Follow Nuxt conventions:**
- `app/pages/` - File-based routing (currently single-page only)
- `layouts/default.vue` - Shared layout wrapper
- `components/` - Auto-imported components (no manual imports needed)
- `composables/` - Auto-imported composables
- `server/api/` - Backend API routes

**Keep components:**
- Small and focused
- Reusable with clear prop interfaces
- Avoid duplicating shadcn logic

### Logo Component Pattern (MANDATORY - SINGLE INSTANCE ONLY)

**⚠️ CRITICAL: Use ONLY ONE Logo.vue component throughout the entire page. All sections (Navbar, Footer, Hero, etc.) must reference the same `@/components/global/Logo.vue` component with consistent props.**

**The Logo component automatically parses names into initials and generates animated flowing gradient borders.**

**Logo Props:**
```typescript
interface LogoProps {
  name?: string;        // Full name to parse (e.g., "Don Puerto" → "DP", "DP" → "DP")
  size?: 'sm' | 'lg';   // Logo size (default: 'sm')
  variant?: 'full' | 'square'; // 'full' shows initials + name, 'square' shows initials only
  borderless?: boolean; // Remove gradient border (default: false)
  logoOnly?: boolean;   // Show only the square logo without name text (default: false)
  animated?: boolean;   // Animate gradient border with flowing effect (default: false)
  class?: string;       // Additional Tailwind classes for customization
}
```

**Usage Examples (All Using Same Component):**

```vue
<!-- Navbar: Animated square logo with flowing gradient -->
<Logo 
  size="sm" 
  variant="square" 
  :name="'Don Puerto'" 
  :animated="true" 
  class="text-blue-600 dark:text-blue-400" 
/>

<!-- Footer: Logo only (just square) with animated flowing gradient -->
<Logo 
  size="sm" 
  logoOnly 
  :name="'DP'" 
  :animated="true" 
/>

<!-- Full variant with animated gradient (initials + name) -->
<Logo 
  name="Don Puerto" 
  variant="full" 
  size="sm"
  :animated="true" 
/>

<!-- Static gradient (no animation) -->
<Logo name="Don Puerto" variant="square" size="sm" />

<!-- Default: Hardcoded "DP" with static gradient -->
<Logo />
```

**Key Features (APPLY CONSISTENTLY):**
- ✅ **Intelligent name parsing**: "Don Puerto" → "DP", "DP" → "DP" (no spaces = already initials)
- ✅ **Animated flowing gradient**: Colors flow in ONE DIRECTION continuously around border
- ✅ **Vibrant gradient colors**: #A07CFE (purple) → #FE8FB5 (pink) → #FFD700 (golden yellow) → #FF4500 (red-orange) → #FFBE7B (orange)
- ✅ **2-second animation cycle**: Smooth, continuous flow creates eye-catching effect
- ✅ **Hover glow effect**: Drop shadow glow appears on hover (4px purple + 8px pink + 6px yellow)
- ✅ **Full dark/light mode support**: Works seamlessly with theme toggle
- ✅ **Responsive sizing**: `size="sm"` (36px) for navbar/footer, `size="lg"` (64px) for hero
- ✅ **Border-only styling**: Only the logo square has gradient border, text does NOT

**Animated Gradient Border Implementation:**
```vue
<script setup>
// Gradient flows in one direction (linear position animation)
const gradientStyle = computed(() => {
  return {
    background: 'linear-gradient(90deg, #A07CFE, #FE8FB5, #FFD700, #FF4500, #FFBE7B, #A07CFE)',
    backgroundSize: '200% 200%',
  };
});

const borderClasses = computed(() => {
  return props.animated ? 'animate-gradient-flow' : '';
});
</script>

<style scoped>
@keyframes gradientFlow {
  0% {
    background-position: 0% 0%;
  }
  100% {
    background-position: 200% 200%;  /* Flows in one continuous direction */
  }
}

.animate-gradient-flow {
  animation: gradientFlow 2s ease infinite !important;
  transition: filter 0.3s ease;
}

/* Hover glow: subtle multi-color effect */
.animate-gradient-flow:hover {
  filter: drop-shadow(0 0 4px rgba(160, 124, 254, 0.8)) 
          drop-shadow(0 0 8px rgba(254, 143, 181, 0.6)) 
          drop-shadow(0 0 6px rgba(255, 215, 0, 0.4));
}
</style>

<!-- Wrapper structure (consistent across all usages) -->
<div 
  :class="borderClasses"
  :style="props.animated ? gradientStyle : { background: staticGradient }"
  class="w-full h-full rounded-lg p-0.5"
>
  <div class="w-full h-full rounded-md bg-white dark:bg-gray-900 flex items-center justify-center font-bold text-blue-600 dark:text-blue-400">
    {{ initials }}
  </div>
</div>
```

**Placement Rules (Apply Across Entire Page):**
| Location | Props | Notes |
|----------|-------|-------|
| Navbar (top-left) | `size="sm"` `variant="square"` `animated={true}` | Clickable to scroll home |
| Footer (bottom-left) | `logoOnly` `size="sm"` `animated={true}` | Just the square, no text |
| Hero Section | Optional: `size="lg"` `animated={true}` | For featured logo |
| Any Button/Link | `logoOnly` `size="sm"` `animated={false}` | Static for consistency |

**❌ DO NOT:**
- Create multiple Logo components or variants
- Use different gradient colors or animation speeds
- Hardcode initials instead of using name prop
- Animate non-animated variants
- Forget `animated={true}` on navbar and footer

**✅ DO:**
- Always use the single `@/components/global/Logo.vue` component
- Use `animated={true}` for navbar and footer
- Use `animated={false}` for secondary/less prominent logos
- Leverage intelligent name parsing ("Don Puerto" → "DP")
- Test hover effects in both light and dark modes


## 4. Tailwind Utility Requirement (MANDATORY)

**All Tailwind class merging must use the shared `cn()` utility.**

**Utility Location:** `lib/utils.ts`
```typescript
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

**Usage Rules - Always use `cn()` when:**
1. Extending or overriding shadcn component styles
2. Conditionally applying Tailwind classes
3. Accepting a `class?: string` prop
4. Merging default + custom styles

**Example Pattern:**
```vue
<script setup lang="ts">
import { cn } from '~/lib/utils'

const props = defineProps<{
  variant?: 'default' | 'ghost'
  class?: string
}>()

const buttonClass = computed(() => 
  cn(
    'px-4 py-2 rounded-md',
    props.variant === 'ghost' && 'bg-transparent',
    props.class
  )
)
</script>

<template>
  <button :class="buttonClass">
    <slot />
  </button>
</template>
```

❌ **Never** manually concatenate class strings  
❌ **Never** use template literals for class merging

## 5. Form Validation Pattern (vee-validate + zod)

**Contact forms and all user input MUST follow this pattern:**

```vue
<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod'
import { useForm } from 'vee-validate'
import * as z from 'zod'
import { toast } from 'vue-sonner'

// 1. Define Zod schema
const formSchema = toTypedSchema(z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(50),
  email: z.string().email('Invalid email address'),
  message: z.string().min(10, 'Message must be at least 10 characters').max(500),
}))

// 2. Initialize form with vee-validate
const { handleSubmit, resetForm, isSubmitting } = useForm({
  validationSchema: formSchema,
})

// 3. Handle submission
const onSubmit = handleSubmit(async (values) => {
  try {
    const response = await $fetch('/api/contact', {
      method: 'POST',
      body: values,
    })
    toast.success('Message sent successfully!')
    resetForm()
  } catch (err: any) {
    toast.error('Submission failed', {
      description: err.data?.message || 'Please try again.',
    })
  }
})
</script>

<template>
  <form @submit="onSubmit">
    <FormField v-slot="{ componentField }" name="email">
      <FormItem>
        <FormLabel>Email</FormLabel>
        <FormControl>
          <Input type="email" v-bind="componentField" />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>
  </form>
</template>
```

**Key Requirements:**
- Use `FormField`, `FormItem`, `FormLabel`, `FormControl`, `FormMessage` from `@/components/ui/form`
- Bind inputs with `v-bind="componentField"`
- Show validation errors via `<FormMessage />`
- Use `toast` from `vue-sonner` for success/error feedback

**Reference:** See `app/components/global/ContactForm.vue`

## 6. Animation & Scroll Patterns

**FadeIn Component (IntersectionObserver-based):**
```vue
<FadeIn direction="up" :delay="100">
  <Card>...</Card>
</FadeIn>
```

**Props:**
- `direction`: `'up' | 'down' | 'left' | 'right'` (default: `'up'`)
- `delay`: milliseconds before animation starts (default: `0`)
- `once`: animate only once (default: `true`)

**Pattern for staggered animations:**
```vue
<div v-for="(item, index) in items" :key="index">
  <FadeIn direction="up" :delay="index * 100">
    <Card>{{ item }}</Card>
  </FadeIn>
</div>
```

**Theme Toggle Ripple Effect:**
The project uses a custom ripple effect on theme toggle (see `useRipple` composable). The ripple reveals the new theme using CSS mask animations triggered from the click position.

## 7. Layout Width & Alignment (MANDATORY)

**Horizontal alignment must be consistent across ALL page sections.**

### Container Pattern

**All sections (Navbar, Hero, Content sections, Footer) MUST use the `Container` component:**

```vue
<!-- CORRECT: Consistent alignment -->
<template>
  <nav class="...">
    <Container class="py-4">
      <!-- Navbar content -->
    </Container>
  </nav>

  <section class="py-16">
    <Container>
      <!-- Section content -->
    </Container>
  </section>

  <footer class="...">
    <Container class="py-8">
      <!-- Footer content -->
    </Container>
  </footer>
</template>
```

**Container Component:**
- Location: `@/components/ui/Container.vue`
- Default: `max-w-7xl mx-auto px-6`
- Always use this for horizontal padding/width consistency

### Layout Toggle Support (Full vs Fixed)

**The project supports toggling between Full-width and Fixed-width layouts via `<head>`:**

```vue
<script setup lang="ts">
// In app.vue or layout
const layoutMode = ref<'full' | 'fixed'>('fixed') // Default: fixed

useHead({
  htmlAttrs: {
    'data-layout': layoutMode.value
  }
})
</script>
```

**CSS Pattern for Layout Toggle:**
```css
/* Fixed layout (default) */
.container {
  @apply max-w-7xl mx-auto px-6;
}

/* Full-width layout */
[data-layout="full"] .container {
  @apply max-w-none px-6;
}
```

### Alignment Rules

✅ **DO:**
- Use `<Container>` for all sections (Navbar, Hero, Services, Testimonials, Footer)
- Maintain consistent `px-6` horizontal padding
- Use `max-w-7xl` for fixed layout
- Support layout toggle via `data-layout` attribute

❌ **DON'T:**
- Use inconsistent padding (e.g., `px-4` on Navbar, `px-6` on Hero)
- Hardcode max-width values directly in sections
- Skip Container component in any section
- Create custom container classes that break alignment
- Add `max-w-*` or `mx-auto` inside components that are already wrapped by `<Container>`

**Example Section Pattern:**
```vue
<template>
  <!-- Background can be full-width -->
  <section class="py-16 bg-gray-50 dark:bg-gray-900">
    <!-- Content must use Container for alignment -->
    <Container>
      <h2>Services</h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <!-- Cards, content, etc. -->
      </div>
    </Container>
  </section>
</template>
```

**Common Misalignment Issue - ContactForm Example:**
```vue
<!-- ❌ WRONG: Double container creates misalignment -->
<Container>
  <ContactForm /> <!-- Component has max-w-5xl mx-auto inside -->
</Container>

<!-- ✅ CORRECT: Component content flows with Container width -->
<Container>
  <div class="grid grid-cols-1 lg:grid-cols-2 gap-10">
    <!-- Form content directly, no nested max-w -->
  </div>
</Container>
```

**Reference Implementation:**
- See `app/components/ui/Container.vue`
- See `app/components/global/Navbar.vue`
- See `app/components/global/Hero.vue`
- See `app/components/global/Footer.vue`

## 7.5. Section Header Typography (MANDATORY)

**All section headers MUST follow consistent sizing and theming rules - NO EXCEPTIONS.**

### Exact Font Sizes (Required)

**These EXACT Tailwind classes MUST be used for ALL main section headers:**

```vue
<div class="text-center mb-12">
  <!-- PRIMARY HEADING - REQUIRED: text-4xl md:text-5xl -->
  <h2 class="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
    Section Title
  </h2>
  
  <!-- SECONDARY DESCRIPTION - REQUIRED: text-sm md:text-base -->
  <p class="text-sm md:text-base text-gray-600 dark:text-gray-400">
    Section description text
  </p>
</div>
```

### Typography Rules (STRICT REQUIREMENTS)

**ALL Main Section Headings MUST use:**
- Mobile: `text-4xl` (36px)
- Desktop: `text-5xl` (48px)
- Weight: `font-bold`
- Color Light Mode: `text-gray-900`
- Color Dark Mode: `dark:text-white`
- Margin Bottom: `mb-4`

**ALL Main Section Descriptions MUST use:**
- Mobile: `text-sm` (14px)
- Desktop: `text-base` (16px)
- Weight: Regular (default)
- Color Light Mode: `text-gray-600`
- Color Dark Mode: `dark:text-gray-400`
- NO width constraints (no `max-w-*`)

### Dark/Light Mode Theming (REQUIRED)

**Primary Text (Headings):**
- Light mode: `text-gray-900` (near black)
- Dark mode: `dark:text-white`

**Secondary Text (Descriptions):**
- Light mode: `text-gray-600` (medium gray)
- Dark mode: `dark:text-gray-400` (lighter gray)

✅ **DO - REQUIRED:**
- Use `text-4xl md:text-5xl` for ALL main section headings
- Use `text-sm md:text-base` for ALL section descriptions
- Always pair light colors with `dark:` variants
- Use `text-center` wrapper with `mb-12` spacing
- Never use `max-w-*` constraints on description text
- Always include both light and dark mode classes

❌ **DON'T - FORBIDDEN:**
- Mix different heading sizes across sections
- Use `text-3xl md:text-4xl` for main headings (too small)
- Use `text-base md:text-lg` for descriptions (too large)
- Hardcode color values instead of using Tailwind semantic colors
- Forget dark mode classes on text elements
- Add width constraints that limit description text

**Sections Using This EXACT Pattern:**
- ✅ Our Services - `text-4xl md:text-5xl` + `text-sm md:text-base`
- ✅ What Our Clients Say - `text-4xl md:text-5xl` + `text-sm md:text-base`
- ✅ Trusted By - `text-4xl md:text-5xl` + `text-sm md:text-base`
- ✅ Let's Work Together - `text-4xl md:text-5xl` + `text-sm md:text-base`

### Sub-section Headers (Contact Form)

**For sub-section headers within form components, use responsive sizing:**
```vue
<h3 class="text-lg md:text-xl font-semibold text-gray-900 dark:text-white">Let's Connect</h3>
<p class="text-xs md:text-sm text-gray-600 dark:text-gray-400">Description text</p>
```

**Sub-section Header MUST use:**
- Mobile: `text-lg` (18px)
- Desktop: `text-xl` (20px)

**Sub-section Description MUST use:**
- Mobile: `text-xs` (12px)
- Desktop: `text-sm` (14px)

### Navbar & Footer Typography (MANDATORY)

**All navigation and footer text MUST be consistent with section content.**

**Navbar Logo Text:**
- Mobile: `text-base` (16px)
- Desktop: `text-lg` (18px)
- Weight: `font-bold`
- Color: `text-gray-900 dark:text-white`

**Navbar Navigation Links:**
- Use shadcn `Button` component with `variant="ghost"`
- Default size inherits button typography (`text-sm md:text-base`)
- Active state: `text-blue-600 dark:text-blue-400`

**Footer "Connect with me" Section:**
- Heading: `text-4xl md:text-5xl` (same as main section headers)
- Description: `text-sm md:text-base` (same as section descriptions)

**Footer Copyright & Contact Details:**
- Text size: `text-sm md:text-base` (same as navbar buttons)
- Color: `text-gray-700 dark:text-gray-200`
- Font weight: `font-medium`

**Footer Contact Details Right Column:**
- Same text size as copyright: `text-sm md:text-base`
- Icon size: `w-5 h-5`
- Hover effect: `hover:text-blue-500 dark:hover:text-blue-300`

✅ **DO:**
- Use `text-base md:text-lg` for navbar logo text
- Use `text-sm md:text-base` for all footer text content
- Use `text-4xl md:text-5xl` for footer "Connect with me" heading
- Maintain consistent icon sizing (`w-5 h-5` for footer, `w-6 h-6` for nav buttons)
- Always include dark mode color pairs

❌ **DON'T:**
- Mix different sizes between navbar logo and footer text
- Use `text-xs` for footer contact details
- Create custom font sizes for navbar/footer
- Forget dark mode classes on footer text
- Use different text sizes for copyright vs contact details

**Reference Implementation:**
- See `app/components/global/Navbar.vue`
- See `app/components/global/Footer.vue`




**Horizontal alignment must be consistent across ALL page sections.**

### Container Pattern

**All sections (Navbar, Hero, Content sections, Footer) MUST use the `Container` component:**

```vue
<!-- CORRECT: Consistent alignment -->
<template>
  <nav class="...">
    <Container class="py-4">
      <!-- Navbar content -->
    </Container>
  </nav>

  <section class="py-16">
    <Container>
      <!-- Section content -->
    </Container>
  </section>

  <footer class="...">
    <Container class="py-8">
      <!-- Footer content -->
    </Container>
  </footer>
</template>
```

**Container Component:**
- Location: `@/components/ui/Container.vue`
- Default: `max-w-7xl mx-auto px-6`
- Always use this for horizontal padding/width consistency

### Layout Toggle Support (Full vs Fixed)

**The project supports toggling between Full-width and Fixed-width layouts via `<head>`:**

```vue
<script setup lang="ts">
// In app.vue or layout
const layoutMode = ref<'full' | 'fixed'>('fixed') // Default: fixed

useHead({
  htmlAttrs: {
    'data-layout': layoutMode.value
  }
})
</script>
```

**CSS Pattern for Layout Toggle:**
```css
/* Fixed layout (default) */
.container {
  @apply max-w-7xl mx-auto px-6;
}

/* Full-width layout */
[data-layout="full"] .container {
  @apply max-w-none px-6;
}
```

### Alignment Rules

✅ **DO:**
- Use `<Container>` for all sections (Navbar, Hero, Services, Testimonials, Footer)
- Maintain consistent `px-6` horizontal padding
- Use `max-w-7xl` for fixed layout
- Support layout toggle via `data-layout` attribute

❌ **DON'T:**
- Use inconsistent padding (e.g., `px-4` on Navbar, `px-6` on Hero)
- Hardcode max-width values directly in sections
- Skip Container component in any section
- Create custom container classes that break alignment
- Add `max-w-*` or `mx-auto` inside components that are already wrapped by `<Container>`

**Example Section Pattern:**
```vue
<template>
  <!-- Background can be full-width -->
  <section class="py-16 bg-gray-50 dark:bg-gray-900">
    <!-- Content must use Container for alignment -->
    <Container>
      <h2>Services</h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <!-- Cards, content, etc. -->
      </div>
    </Container>
  </section>
</template>
```

**Common Misalignment Issue - ContactForm Example:**
```vue
<!-- ❌ WRONG: Double container creates misalignment -->
<Container>
  <ContactForm /> <!-- Component has max-w-5xl mx-auto inside -->
</Container>

<!-- ✅ CORRECT: Component content flows with Container width -->
<Container>
  <div class="grid grid-cols-1 lg:grid-cols-2 gap-10">
    <!-- Form content directly, no nested max-w -->
  </div>
</Container>
```

**Reference Implementation:**
- See `app/components/ui/Container.vue`
- See `app/components/global/Navbar.vue`
- See `app/components/global/Hero.vue`
- See `app/components/global/Footer.vue`

## 8. Server API Pattern (n8n Integration)

**Backend Structure:**
- All API routes in `server/api/`
- ❌ **Never** call external webhooks directly from client
- ✅ **Always** proxy through Nuxt server endpoints

**Environment Configuration:**
```typescript
// nuxt.config.ts
runtimeConfig: {
  n8nWebhookUrl: process.env.NUXT_N8N_WEBHOOK_URL || '',
  n8nWebhookSecret: process.env.NUXT_N8N_WEBHOOK_SECRET || '',
}
```

**API Handler Pattern:**
```typescript
// server/api/contact.post.ts
export default defineEventHandler(async (event) => {
  // 1. Parse & validate request body
  const body = await readBody(event);
  const { name, email, message } = body;
  
  // 2. Validate required fields
  if (!name?.trim()) {
    return { ok: false, message: 'Name is required' };
  }
  
  // 3. Get runtime config
  const config = useRuntimeConfig();
  const webhookUrl = config.n8nWebhookUrl;
  
  // 4. Forward to n8n
  const response = await $fetch(webhookUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-webhook-secret': config.n8nWebhookSecret
    },
    body: { name, email, message, timestamp: new Date().toISOString() }
  });
  
  return { ok: true, message: 'Success' };
});
```

**Reference:** See `server/api/contact.post.ts`

## 9. UI Composition Rules


**Pages (app/pages/index.vue)**
- Pages must be composed using shadcn components first
- Layout structure may wrap shadcn components with Inspira sections if needed
- Do not write raw HTML inputs, buttons, or forms in pages

**Components (components/)**
Shadcn components may be:
- Used directly
- Wrapped for customization

Wrappers must:
- Forward props
- Accept `class?: string`
- Merge styles via `cn()`

## 10. Inspira UI Usage Rules

Inspira UI is allowed only for:
- Hero sections
- Marketing layout blocks
- Section composition
- Non-interactive visual structure

❌ Do not use Inspira UI for:
- Forms
- Inputs
- Buttons
- Modals
- Interactive UI elements

## 11. Nuxt Patterns

**Single-page architecture**
- Use `app/pages/index.vue` only
- Section-based layout with anchor scrolling
- ❌ No multi-page routing

**Layout**
- Use `layouts/default.vue` for header + footer

**Server Communication**
- Backend calls must go through `server/api/`
- ❌ Never call n8n directly from the client
- Use `$fetch` / `useFetch` with:
  - Loading states
  - Error handling
  - User feedback

## 12. Product Requirement

**One-Page Marketing Agency Landing Page + n8n Automation**

**Landing Page UI Rules:**
- All forms must use shadcn components
- CTA buttons must be shadcn `Button`
- Contact form fields must be:
  - `Input`
  - `Textarea`
  - `Form` / `FormField`
- Feedback states must use:
  - `Alert`
  - `Toast` (if available)

## 13. Production Setup & SSR Configuration

### SSR Disabled by Design

**This project uses `ssr: false` in `nuxt.config.ts`** for the following reasons:
- Client-side marketing site with complex animations and dynamic effects
- AnimatedLogo component with multiple conditional branches creates hydration mismatches
- FluidCursor WebGL effect is client-only
- Confetti animations are client-side events
- No SEO benefit for single-page applications

**Configuration:**
```typescript
// nuxt.config.ts
export default defineNuxtConfig({
  ssr: false, // Disabled for client-side marketing site
  // ... rest of config
})
```

### Dark Mode Flash Prevention

**Inline Script (Head):**
```typescript
app: {
  head: {
    script: [
      {
        innerHTML: `if(localStorage.getItem('nuxt-color-mode')==='dark'||!localStorage.getItem('nuxt-color-mode'))document.documentElement.classList.add('dark')`,
        async: false,
        defer: false,
      }
    ]
  }
}
```

**Purpose:** Runs before Vue hydrates to immediately apply dark mode class, preventing white flash on reload when user prefers dark theme.

**CSS Fallback:**
```css
/* In app/assets/css/tailwind.css */
@supports (color-scheme: dark) {
  html {
    color-scheme: dark;
    background-color: rgb(17, 24, 39);
    color: rgb(255, 255, 255);
  }
}

html.light {
  color-scheme: light;
  background-color: #ffffff;
  color: #111827;
}
```

### Content Security Policy for Web Workers

**Required for canvas-confetti library:**
```typescript
routeRules: {
  '/**': {
    headers: {
      'Content-Security-Policy': process.env.NODE_ENV === 'development' 
        ? "script-src 'self' 'unsafe-inline' 'unsafe-eval'; worker-src 'self' blob:; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com data:;"
        : "script-src 'self' 'unsafe-inline' https:; worker-src 'self' blob:; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com data:;"
    }
  }
}
```

**Critical:** `worker-src 'self' blob:` must be included to allow canvas-confetti to create web workers for the fireworks effect.

### Toast Theming Setup

**Sonner Toast Component with Dynamic Theme in app.vue:**
```vue
<script setup lang="ts">
import { Toaster } from 'vue-sonner'

const colorMode = useColorMode()
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>

  <ClientOnly>
    <Toaster 
      class="pointer-events-auto"
      :theme="(colorMode.preference as any) || 'system'"
      position="top-right"
    />
  </ClientOnly>
</template>

<style>
/* Light mode toast styling */
:where(.sonner-toast) {
  background-color: #ffffff !important;
  border: 2px solid #e5e7eb !important;
  color: #111827 !important;
}

/* Dark mode toast styling */
:root.dark :where(.sonner-toast) {
  background-color: #111827 !important;
  border: 2px solid #1f2937 !important;
  color: #ffffff !important;
}
</style>
```

**Key Features:**
- **ClientOnly wrapper** - Prevents SSR issues with toast component
- **Theme binding** - `:theme` prop bound to `colorMode.preference` for automatic theme detection
- **CSS-based theming** - Uses `:root.dark` selector with `!important` to override vue-sonner defaults
- **Dark colors**: Background `#111827` (gray-900), Border `#1f2937` (gray-800), Text `#ffffff`
- **Light colors**: Background `#ffffff`, Border `#e5e7eb` (gray-200), Text `#111827`
- **Success/Error/Warning borders** - Colored borders for different toast types
- **Position**: Top-right corner for better visibility

### Confetti Integration for Form Success

**Location:** `app/composables/useConfetti.ts`

**4 Confetti Modes:**
1. `fireFireworks()` - 5-second dual-side celebration (default for form submission)
2. `fireSideCannons()` - 3-second continuous side cannons
3. `fireRandom()` - Random angle burst
4. `fireBasic(options?)` - Customizable center burst

**Usage in Forms:**
```typescript
const { fireSuccess } = useConfetti()

const onSubmit = handleSubmit(async (values) => {
  try {
    const response = await $fetch('/api/contact', { method: 'POST', body: values })
    
    if (response?.ok !== false) {
      toast.success('Message sent successfully!')
      fireSuccess() // Triggers fireworks
      resetForm()
    }
  } catch (err: any) {
    toast.error('Submission failed')
  }
})
```

### FluidCursor WebGL Integration

**Location:** `app/components/ui/fluid-cursor/FluidCursor.vue`

**Features:**
- WebGL fluid simulation
- Mouse/touch tracking
- Cursor-following particles
- Real-time rendering

**Usage in Layout:**
```vue
<template>
  <NuxtLayout>
    <!-- ... -->
    <FluidCursor class="fixed inset-0 z-50" />
    <!-- ... -->
  </NuxtLayout>
</template>
```

**Z-Index Layering (Important):**
- FluidCursor: `z-50` (above content)
- Main content: `z-10`
- Confetti: `z-9999` (above everything except ripple)
- Ripple overlay: `z-100` (theme toggle effect)

### Production Checklist

✅ **Before Deployment:**
- [ ] SSR is set to `false`
- [ ] Dark mode script is in `app.head.script`
- [ ] CSP includes `worker-src 'self' blob:` for confetti
- [ ] Toast theming uses `colorMode.value` computed property
- [ ] Logo component works without ClientOnly wrappers
- [ ] FluidCursor is positioned correctly with proper z-index
- [ ] Contact form calls `/api/contact` (server endpoint)
- [ ] n8n webhook URL is set in environment variables
- [ ] No hydration warnings in console
- [ ] Dark mode applies immediately on reload without white flash
- [ ] Confetti triggers on successful form submission
- [ ] Toast displays with correct theme colors

### Known Limitations & Design Decisions

**No SSR:**
- Performance: Faster initial client-side rendering for single-page app
- Flexibility: No hydration mismatches with complex animated components
- Limitation: No server-side rendering for improved time-to-interactive

**ClientOnly No Longer Used:**
- Removed all ClientOnly wrappers from components
- Instead, entire app is client-rendered with `ssr: false`
- Simpler component code without fallback templates

**Dark Mode Handling:**
- Inline script prevents white flash
- CSS fallback applies dark colors immediately
- Computed properties ensure toast theming updates reactively

---

## Quick Reference: What Was Implemented

This project includes enterprise-grade features:

1. **Animated Logo Component** - Single reusable Logo with flowing gradient animation
2. **FluidCursor Effect** - WebGL-based interactive cursor tracking
3. **Confetti Celebrations** - 4 modes of canvas-confetti animations for form success
4. **Toast Notifications** - vue-sonner with proper light/dark theme support
5. **Form Validation** - vee-validate + zod for type-safe forms
6. **n8n Webhook Integration** - Server-side proxy to n8n automation + Chat widget
7. **n8n Chat Widget** - Window/fullscreen chat modes with auto-theming (dark/light)
8. **Dark/Light Theme** - Full theme support with zero white flash
9. **Responsive Design** - Mobile-first approach with Tailwind CSS v4
10. **Smooth Scroll** - Custom composable for anchor navigation
11. **CSP Configuration** - Proper security headers with blob: worker support

---

## n8n Chat Integration

**Component Location:** `app/components/ui/chat/Chat.vue`

The project includes a production-ready n8n Chat widget component that wraps the `@n8n/chat` library with shadcn styling and Nuxt integration.

### Installation & Setup

Package is already installed via `npm install @n8n/chat`.

**CSS Imports (Component-Scoped - RECOMMENDED):**
The Chat component automatically imports both `@n8n/chat/style.css` and `~/assets/css/n8n-chat-theme.css` at the top of [app/components/ui/chat/Chat.vue](app/components/ui/chat/Chat.vue):
```ts
import '@n8n/chat/style.css'
import '~/assets/css/n8n-chat-theme.css'
```

This approach loads CSS only when the Chat component is used (lazy-loaded with the component).

**Alternative: Global CSS** (if you need Chat available everywhere):
Add to `app/assets/css/tailwind.css` after existing imports:
```css
@import '@n8n/chat/style.css';
@import './n8n-chat-theme.css';
```

Or in `nuxt.config.ts` css array:
```ts
css: [
  '~/assets/css/tailwind.css',
  '@n8n/chat/style.css',
  '~/assets/css/n8n-chat-theme.css',
],
```

**To use the Chat component:**

1. Set up environment variable:
```bash
NUXT_PUBLIC_N8N_CHAT_WEBHOOK_URL=https://your-n8n-instance.com/webhook/your-workflow
```

2. Import and use the Chat component in your page or layout:
```vue
<script setup lang="ts">
const chatUrl = useRuntimeConfig().public.n8nChatWebhookUrl
</script>

<template>
  <!-- Window mode (bottom-right floating chat) -->
  <Chat :webhookUrl="chatUrl" mode="window" />

  <!-- Fullscreen mode (full-page chat interface) -->
  <Chat :webhookUrl="chatUrl" mode="fullscreen" />
</template>
```

### Chat Component Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `webhookUrl` | `string` | (required) | n8n webhook URL for chat backend |
| `mode` | `'window' \| 'fullscreen'` | `'window'` | Window (floating) or fullscreen mode |
| `engine` | `'n8n' \| 'simulated'` | `'n8n'` | `'n8n'` renders the real widget, `'simulated'` shows the local text-area experience |
| `chatInputKey` | `string` | `'chatInput'` | Key for user input messages |
| `chatSessionKey` | `string` | `'sessionId'` | Key for session persistence |
| `loadPreviousSession` | `boolean` | `true` | Load chat history from localStorage |
| `showWelcomeScreen` | `boolean` | `false` | Show welcome screen on first load |
| `defaultLanguage` | `string` | `'en'` | Language for UI text |
| `initialMessages` | `string[]` | `['Hi there! 👋', '...']` | Bot greeting messages |
| `metadata` | `object` | `{}` | Custom metadata to send with requests |
| `enableStreaming` | `boolean` | `false` | Enable streaming responses |
| `title` | `string` | `'Hi there! 👋'` | Header/welcome title |
| `subtitle` | `string` | `'Start a chat...'` | Header/welcome subtitle |
| `inputPlaceholder` | `string` | `'Type your question..'` | Input field placeholder |
| `class` | `string` | `''` | Additional Tailwind classes |

### Usage Patterns

**Window Mode (Default):**
```vue
<template>
  <!-- Floating chat in bottom-right corner -->
  <Chat 
    :webhookUrl="chatUrl" 
    mode="window"
    title="Ask us anything"
    subtitle="We typically respond within 2 hours"
    :initialMessages="['Welcome!', 'How can we help?']"
  />
</template>
```

**Fullscreen Mode:**
```vue
<template>
  <!-- Full-page chat (typically replaces navbar/footer) -->
  <Chat 
    :webhookUrl="chatUrl" 
    mode="fullscreen"
    :loadPreviousSession="true"
  />
</template>
```

**With Custom Metadata:**
```vue
<template>
  <Chat 
    :webhookUrl="chatUrl" 
    mode="window"
    :metadata="{ userId: userProfile.id, source: 'landing-page' }"
  />
</template>
```

### Theming

The Chat widget automatically respects the project's dark/light mode via CSS variables defined in `app/assets/css/n8n-chat-theme.css`.

**Color Scheme:**
- **Primary**: Blue-600 (#2563eb) — matches project brand
- **Secondary**: Teal-500 (#14b8a6) — accent color
- **Light Mode**: Slate-100 background, Slate-800 text
- **Dark Mode**: Gray-900 background, Gray-100 text

**Customizing Colors:**

Override CSS variables in your component or global styles:
```css
:root {
  --chat--color--primary: #your-color;
  --chat--color--secondary: #your-accent;
}

:root.dark {
  --chat--color-light: #your-dark-bg;
  --chat--color-dark: #your-light-text;
}
```

**Window Size (Window Mode Only):**
```css
:root {
  --chat--window--width: 420px;  /* Default */
  --chat--window--height: 600px; /* Default */
}
```

### Dark Mode Support

The Chat component automatically switches colors when `class="dark"` is applied to the root HTML element. The theming uses CSS variables that are pre-configured in `app/assets/css/n8n-chat-theme.css` to match your design system.

**No manual theme prop needed** — the component detects the parent's dark mode class.

### Placement in Layout

**Current Layout Setup (Default):**
In `app/layouts/default.vue`, the BackToTop and chat toggle live inside a single floating action row in the bottom-right corner:
- Both buttons share the same `48px` footprint and sit side-by-side for quick access.
- The row itself has `pointer-events: none` so inner buttons can manage focus/hover states cleanly.
- The floating chat card uses `engine="simulated"` for the marketing preview, while the fullscreen overlay reuses the same component.

```vue
<div class="fixed bottom-8 right-8 z-50 pointer-events-none flex items-center gap-4">
  <div class="pointer-events-auto">
    <BackToTop />
  </div>

  <div class="pointer-events-auto">
    <Button
      class="w-12 h-12 rounded-full shadow-lg bg-blue-600 text-white"
      size="icon"
      variant="ghost"
      @click="toggleChat"
    >
      <MessageCircle class="w-5 h-5" />
    </Button>
  </div>
</div>

<!-- Chat window + fullscreen (both pass engine="simulated") -->
<ClientOnly>
  <Transition>
    <Chat v-if="shouldShowWindow" :webhookUrl="chatUrl" mode="window" engine="simulated" />
  </Transition>
</ClientOnly>

<ClientOnly>
  <Transition>
    <Chat v-if="shouldShowFullscreen" :webhookUrl="chatUrl" mode="fullscreen" engine="simulated" />
  </Transition>
</ClientOnly>
```

**Option 1: In `app/layouts/default.vue` (Global Chat)**
```vue
<template>
  <div>
    <Navbar />
    <main>
      <slot />
    </main>
    <Footer />
    
    <!-- Global chat available on all pages -->
    <ClientOnly>
      <Chat :webhookUrl="chatUrl" mode="window" />
    </ClientOnly>
  </div>
</template>
```

**Option 2: In Page Section (Dedicated Chat Page)**
```vue
<template>
  <Section id="chat" class="py-16">
    <Container>
      <Chat :webhookUrl="chatUrl" mode="fullscreen" />
    </Container>
  </Section>
</template>
```

**Option 3: As Floating Chat Triggered by Button**
```vue
<script setup lang="ts">
const showChat = ref(false)
</script>

<template>
  <Button @click="showChat = !showChat">Open Chat</Button>
  
  <Transition>
    <Chat v-if="showChat" :webhookUrl="chatUrl" mode="window" />
  </Transition>
</template>
```

### n8n Webhook Configuration

Your n8n workflow should:

1. **Receive chat messages** via the webhook's `chatInput` key (configurable)
2. **Extract user message** and format for LLM
3. **Call AI model** (GPT, Claude, etc.) with context
4. **Return response** with `{ reply: "Your AI-generated message" }` structure
5. **Optionally persist** session data using `sessionId` key

**Minimal n8n Workflow Structure:**
```
Webhook (receive chatInput) 
  → Extract Message 
  → Call OpenAI/LLM 
  → Format Response 
  → Return { reply: "..." }
```

### Common Issues

**Q: Chat doesn't appear?**
- Verify `webhookUrl` is set and valid
- Check browser console for errors
- Ensure n8n workflow is active and listening

**Q: Messages not persisting?**
- Set `loadPreviousSession={true}` (default)
- Check that `chatSessionKey` matches n8n workflow session handling
- Verify localStorage is enabled

**Q: Styling doesn't match?**
- The component imports `app/assets/css/n8n-chat-theme.css` automatically
- If custom colors needed, override CSS variables in your component
- Dark mode switches automatically via `:root.dark` selector

### Integration with ContactForm

Combine the Chat widget with the existing `ContactForm` for a complete customer engagement solution:

```vue
<!-- Offer chat for quick answers, contact form for detailed inquiries -->
<Section id="support">
  <Container>
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-10">
      <div>
        <h3>Quick Support</h3>
        <Chat :webhookUrl="chatUrl" mode="window" />
      </div>
      <div>
        <h3>Send us a Message</h3>
        <ContactForm />
      </div>
    </div>
  </Container>
</Section>
```

---
