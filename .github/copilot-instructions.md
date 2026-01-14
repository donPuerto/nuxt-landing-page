# Copilot Instructions for Nuxt 4 Landing Page
> Quick guide for AI agents (Jan 2026)

## 0. Fast Facts
- Nuxt 4 SPA with `ssr: false`; the entire marketing experience lives in `app/pages/index.vue` under `app/layouts/default.vue`.
- UI primitives sit in `app/components/ui/*`, while composed sections (Hero, Services, Contact, Navbar, Footer, Chat, etc.) live in `app/components/global/*`.
- Runtime automation is handled in `server/api/*` (currently `contact.post.ts` proxying to n8n). Never call external webhooks from the client.
- Tailwind v4 via `@tailwindcss/vite`; dark mode is powered by `@nuxtjs/color-mode` plus the inline head script that prevents the initial white flash.
- Dev commands: `npm run dev`, `npm run build`, `npm run preview`.

## 1. Architecture & Entry Points
- Keep the single-page structure; sections live inside `<Section>` + `<Container>` wrappers.
- Layout-level UX (Navbar, Footer, BackToTop, Chat launcher, FluidCursor, Sonner toasts) belongs in `app/layouts/default.vue`.
- Static assets (fonts, chat theme, Tailwind base) are under `app/assets/css/*`.
- Server-side logic: `server/api/contact.post.ts` reads `NUXT_N8N_WEBHOOK_URL` / `NUXT_N8N_WEBHOOK_SECRET`, forwards payloads, and sets `x-webhook-secret` when provided.

## 2. Core Conventions (MANDATORY)
1. **Shadcn-first:** If shadcn/ui provides it (Button, Input, Textarea, Form*, Card, Dropdown, Tooltip, ScrollArea, etc.), use that component instead of raw Tailwind. Wrap shadcn only when necessary and forward `class` via `cn()`.
2. **Single Logo component:** Always use `app/components/global/Logo.vue`. Props: `name`, `size`, `variant`, `animated`, `logoOnly`, `borderless`, `class`. Gradient colors flow left→right (`#A07CFE → #FE8FB5 → #FFD700 → #FF4500 → #FFBE7B`) with a 2s animation and hover glow. Navbar: `size="sm" variant="square" :animated="true"`. Footer: `logoOnly`.
3. **Container alignment:** Every section uses `<Container>` (no nested containers, no manual `max-w-*`). `data-layout="full|fixed"` on `<html>` toggles the width—respect it.
4. **Class merging:** Import `cn()` from `~/utils` (barrel re-export) for every conditional class. Never concatenate strings manually.
5. **Typography:** Section headings: `text-4xl md:text-5xl font-bold text-gray-900 dark:text-white`. Section descriptions: `text-sm md:text-base text-gray-600 dark:text-gray-400`. Hero headings: `text-5xl md:text-6xl lg:text-7xl` with `leading-tight`; hero copy uses `text-lg` + `leading-relaxed`. Every text element must include a dark-mode pair.
6. **Static data:** Hard-coded datasets live in `app/data/`. Services now reads from `app/data/services.ts` (typed module). Do not inline static arrays if they can live beside related data files.
7. **No direct webhooks, PostCSS add-ons, or multi-page routing.**

## 3. Utilities & Shared Helpers (`app/lib/*.ts` + `app/utils/index.ts`)
- Implementation files live under `app/lib/` (e.g., `utils.ts` for `cn()`, plus `formatDateTime.ts`, `scrollToPageTop.ts`, `getCurrentYear.ts`, `formatNumber.ts`, `formatReadableDateTime.ts`). Keep all helper logic here so Nuxt auto-imports don't try to register them.
- `app/utils/index.ts` is the single barrel that imports from `app/lib/*` and re-exports everything (`cn`, date helpers, number helpers, etc.). Components and composables must import from `~/utils` only.
- When adding cross-cutting helpers, create a dedicated file under `app/lib/`, export it through the barrel, and update this section so future contributors know where it lives.

## 4. Static Data & Content Rules
- Store static datasets under `app/data/*`. JSON works for CMS-like payloads; `.ts` modules (e.g., `services.ts`) are preferred when you need enums or helper logic.
- Import data from `@/data/...` (Nuxt alias) or a relative path right beside the consuming component.
- Document every new dataset (shape, intent) in this file and in the README so future contributors know where to edit copy.

## 5. Layout, Typography & Spacing
- **Hero section:** `<Section id="home" class="pt-32 pb-16 md:pt-40 md:pb-24 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm">` + `<Container>` + `<FadeIn direction="up">`. Buttons use `size="lg"`, stack on mobile, and share `gap-4`.
- **Section headers:** `.text-center.mb-12` wrapper with the heading/description sizes listed above. No `max-w-*` constraints—let Container handle width.
- **Grids:** Start with `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8`. Never wrap a grid with another Container just to align it.
- **Layout modes:** Use `useState('layout-mode')` + `html[data-layout]` to toggle `full` vs `fixed`. Components should not hardcode widths.
- **Dark mode:** Keep `dark:` variants for every text/background/border. The inline head script + `@nuxtjs/color-mode` already applies the initial class—leave them in place.
- **Glow surfaces:** `.glow-card` in `app/assets/css/tailwind.css` drives the heartbeat border + radial glow. Add `glow-card--pointer` to any surface whose glow should follow the cursor (update `--glow-origin-x/y` on `mousemove`, reset on leave), and use `glow-card--cta` on the Hero’s primary button to keep the on-brand pulse without the harsh outline.

## 6. Forms & Data Flow
- Validation: `vee-validate` + `zod` via `toTypedSchema`. Use `useForm({ validationSchema })`, `handleSubmit`, `resetForm`, `isSubmitting`.
- Components: `FormField`, `FormItem`, `FormLabel`, `FormControl`, `FormMessage`, `Input`, `Textarea`, `Button` (all from shadcn/ui).
- Submission: `$fetch('/api/contact')`. The server attaches timestamps and forwards to n8n with `x-webhook-secret` when configured.
- Success UX: `toast.success(...)`, `useConfetti().fireSuccess()`, and `resetForm()`.
- Error UX: `toast.error(...)` with a descriptive message (`err.data?.message` when available).

## 7. Component & Section Patterns
- **Hero CTA:** Primary button scrolls to `contact`; secondary outline scrolls to `services`.
- **Services:** Consume `app/data/services.ts`, map icons via `lucide-vue-next`, and keep the flip-card animation intact.
- **Contact:** Two-column layout (`grid grid-cols-1 lg:grid-cols-2 gap-7`). Left column = contact cards; right column = form.
- **Navbar:** Fixed, translucent background, `useScrollSpy` for active state, `useSmoothScroll` for navigation. Desktop controls include ThemeColorPicker, ThemeToggle, layout toggle, and CTA button. Mobile menu uses `<Transition>`.
- **Footer:** “Connect with me” heading uses the required typography. Social buttons are `Button variant="outline" size="icon-lg" as-child`. Use `getCurrentYear()` for copyright text.
- **Custom wrappers:** Accept `class?: string` and merge with `cn()`.

## 8. Integrations & Effects
- **n8n Chat (`app/components/ui/chat/Chat.vue`):** Supports `mode="window" | "fullscreen"` and `engine="n8n" | "simulated"`.
  - `engine="simulated"` renders the built-in textarea UI (ideal for demos or when the webhook URL is unavailable).
  - Floating window copy must stay: Heading “Need a hand?” / Subtitle “Chat with Don Puerto’s AI assistant.” Do **not** resurrect the retired “Live chat preview” banner.
  - `ScrollArea` already keeps the composer anchored—avoid extra wrappers.
  - Imports `@n8n/chat/style.css` + `~/assets/css/n8n-chat-theme.css`; dark mode is handled via CSS variables.
  - Accepts `metadata`, `initialMessages`, `enableStreaming`, `loadPreviousSession`, etc. Use `/api/contact` for forms—chat traffic still goes to the configured webhook.
- **Toasts:** `vue-sonner` `Toaster` lives in layout/app, wrapped with `ClientOnly` and bound to `colorMode.preference`. Light background `#ffffff`, dark `#111827`.
- **Confetti:** `useConfetti` exposes `fireSuccess`, `fireFireworks`, `fireSideCannons`, `fireRandom`, `fireBasic`. CSP already includes `worker-src 'self' blob:'`—do not remove.
- **FluidCursor:** `app/components/ui/fluid-cursor/FluidCursor.vue` renders once at layout-level. Keep z-index below modals but above the background.
- **Theme tooling:** ThemeColorPicker + ThemeToggle + layout toggle live in Navbar and its mobile drawer, driven by `useThemeColor` + `useState('layout-mode')`.

## 9. Common Mistakes to Avoid
1. Introducing another Logo component or custom SVG logo.
2. Hardcoding `max-w-*`/`px-*` on sections instead of using `<Container>`.
3. Mixing random heading sizes or forgetting dark-mode colors.
4. Concatenating class strings manually (use `cn()`).
5. Calling external webhooks from the client or bypassing `/api/contact`.
6. Nesting Containers or wrapping them with additional width utilities.
7. Leaving duplicated static data inside components instead of `app/data/*`.

## 10. Quick Checklist
- [ ] Shadcn components only for interactive UI
- [ ] Single `Logo.vue` with the animated gradient
- [ ] `<Container>` wraps every section exactly once
- [ ] Heading/description sizes follow the spec
- [ ] Dark + light colors applied everywhere
- [ ] Classes merged with `cn()`
- [ ] Forms use vee-validate + zod + `/api/contact`
- [ ] Static data imported from `app/data/*`
- [ ] Chat/Confetti/FlutterCursor/Toasts still wired through layout

## 11. Reference Files
- Layout: `app/layouts/default.vue`
- Page entry: `app/pages/index.vue`
- UI primitives: `app/components/ui/*` (Button, Input, Textarea, Card, Container, FadeIn, ScrollArea, Tooltip, DropdownMenu, etc.)
- Sections: `app/components/global/*` (Hero, Services, ContactForm, Navbar, Footer, BackToTop, ThemeColorPicker, ThemeToggle)
- Utilities: `app/lib/*` + `app/utils/index.ts`
- Data: `app/data/services.ts`
- Composables: `app/composables/useSmoothScroll.ts`, `useScrollSpy.ts`, `useConfetti.ts`, `useRipple.ts`, `useThemeColor.ts`
- Server: `server/api/contact.post.ts`
- Assets: `app/assets/css/{tailwind.css, themes.css, font.css, n8n-chat-theme.css}`

## 12. Troubleshooting
- **Contact API issues:** Verify env vars. Local test: `curl -X POST http://localhost:3000/api/contact -H "Content-Type: application/json" -d '{"name":"Test","email":"test@site.com","message":"Hi"}'`.
- **Chat widget blank:** Ensure `webhookUrl` is defined, or switch to `engine="simulated"` until it is.
- **Layout misalignment:** Remove nested Containers and custom paddings; rely on `<Container>`.
- **Dark-mode flash:** Keep the inline script + `@nuxtjs/color-mode` configuration.
- **Confetti errors:** Ensure CSP retains `worker-src 'self' blob:` and only fire confetti on the client.

## 13. Error Handling & Fallbacks
- `app/error.vue` is the global failure view—keep it in sync with the brand system (Section + Container + FadeIn, shadcn Buttons, lucide icons).
- Always surface the status code, reason, current path, and a timestamp so support can triage issues quickly. Derive titles from the code (404 → "We can't find that page", `>=500` → server issue, otherwise generic failure).
- Provide at least two actions: primary `Back to homepage` (`clearError({ redirect: '/' })`) and secondary `Try again` (`reloadNuxtApp({ persistState: true })`).
- Show the diagnostic message (`error.data?.message || error.message`) inside a muted card so engineers can copy it. Keep messaging readable in both themes.
