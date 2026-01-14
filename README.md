# Nuxt 4 Marketing Agency Landing Page

Production-ready, single-page landing site built with Nuxt 4 + TypeScript, Tailwind CSS v4, Vue shadcn/ui, and advanced client-side features. Form submissions are handled via a Nuxt server endpoint and forwarded to n8n using an environment-configured webhook.

## Stack

- **Nuxt 4** (SSR disabled, TypeScript, Composition API, Vite plugin)
- **Tailwind CSS v4** (via `@tailwindcss/vite` plugin)
- **UI Components**: Vue shadcn/ui primitives (primary)
- **Forms**: vee-validate + zod for type-safe validation
- **Animations**: canvas-confetti (4 modes), FluidCursor WebGL effect
- **Toast Notifications**: vue-sonner with full dark/light theme support
- **Automation**: n8n workflow via secure webhook proxy

## Key Features

### Core Architecture
- ✅ **Single-page application** with section-based layout (Hero, Services, Testimonials, Contact)
- ✅ **SSR disabled** (`ssr: false`) for client-side rendering - prevents hydration mismatches with complex animations
- ✅ **Dark/light theme** with zero flash on reload - inline script applies theme before hydration
- ✅ **Mobile-first responsive design** with accessible UI and visible focus states

### Advanced Features
- ✅ **Animated Logo Component** - Single reusable Logo with flowing gradient animation (5-color gradient)
- ✅ **FluidCursor WebGL Effect** - Interactive cursor tracking with real-time fluid simulation
- ✅ **Confetti Celebrations** - 4 modes (fireworks, side cannons, random, basic) triggered on form success
- ✅ **Toast Notifications** - vue-sonner with reactive theme switching (dark: #111827, light: #ffffff)
- ✅ **Form Validation** - vee-validate + zod for type-safe contact form with real-time validation
- ✅ **n8n Integration** - Server-side webhook proxy with CSP configuration for security
- ✅ **n8n Automations** - Real-time chat assistant + contact pipeline that fan-outs to Sheets/email/CRM via n8n
- ✅ **Smooth Scroll** - Custom composable for anchor navigation with offset support
- ✅ **CSP Headers** - Proper Content Security Policy with `worker-src blob:` for canvas-confetti

### Design System
- ✅ **Shadcn-first approach** - All UI components use Vue shadcn/ui primitives
- ✅ **Consistent typography** - Headings: `text-4xl md:text-5xl`, Descriptions: `text-sm md:text-base`
- ✅ **Container-based alignment** - All sections use `<Container>` component for consistent max-width
- ✅ **Utility-first styling** - `cn()` utility for Tailwind class merging (required)

## Project Structure

```
app/
  components/
    global/       # Page sections: Navbar, Footer, Hero, ContactForm, Logo
    ui/           # shadcn/ui primitives + custom wrappers
      fluid-cursor/ # FluidCursor WebGL component
      sonner/     # Toast notification wrapper
  pages/
    index.vue     # Single landing page (ONLY PAGE)
  layouts/
    default.vue   # Shared header + footer layout
  composables/
    useForm.ts          # Form handling utilities
    useRipple.ts        # Theme toggle ripple effect
    useScrollSpy.ts     # Active section detection
    useSmoothScroll.ts  # Anchor navigation
    useConfetti.ts      # 4 confetti celebration modes
  lib/
    utils.ts      # cn() utility for class merging (MANDATORY)
  assets/css/
    tailwind.css  # Dark mode flash prevention CSS
server/
  api/
    contact.post.ts  # n8n webhook proxy (validates + forwards)
```

Core files:

- `app/pages/index.vue` - Main landing page with all sections
- `app/layouts/default.vue` - Header/footer wrapper with FluidCursor
- `app/components/global/Logo.vue` - Single animated logo component
- `app/composables/useConfetti.ts` - 4 confetti celebration modes
- `server/api/contact.post.ts` - Form validation + n8n forwarding
- `app/lib/utils.ts` - Tailwind class merging utility (required everywhere)

## Tailwind Utility (MANDATORY)

Use the shared `cn()` utility for merging Tailwind classes and conditional class application.

```ts
// app/lib/utils.ts
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

Rules:

- Always accept `class?: string` props and merge via `cn()`
- Do not concatenate class strings manually

## UI Conventions

- Semantic HTML sections: header, main, section, footer
- Spacing: sections use `py-16` or `py-24`; containers `max-w-7xl mx-auto px-6`
- Accessibility:
  - Labels for all inputs
  - Correct input types
  - Keyboard focus states are visible (do not remove outlines without replacement)

Preferred component sources:

- Vue shadcn/ui: buttons, forms, inputs, dialogs, dropdowns
- Inspira UI: marketing sections, hero layouts, cards

## Environment

Create a `.env` file with the following variable:

```bash
N8N_WEBHOOK_URL=<your-n8n-webhook-url>
```

This URL is used by `server/api/contact.post.ts` to forward `{ name, email, message }` submissions to n8n.

## Development

Install dependencies and run the dev server.

```bash
npm install
npm run dev
```

Build and preview:

```bash
npm run build
npm run preview
```

## Contact Form Integration

- Client form lives in `app/components/global/ContactForm.vue`
- Submits via `$fetch('/api/contact')` with `{ name, email, message }`
- Server validates required fields and forwards to `N8N_WEBHOOK_URL`
- Shows loading state, success confirmation, and error feedback

## n8n Workflow Requirements

Your n8n workflow should:

1. Receive form data from the webhook
2. Normalize and format user info
3. Trigger AI logic (LLM node or agent)
4. Send an automated acknowledgement via email or messaging

Response tone:

- Acknowledge receipt
- Thank the user
- Tell them the team will follow up shortly
- Professional, friendly, human-like tone

## Nuxt Conventions

- Use Composition API with `<script setup lang="ts">`
- Auto-imports where appropriate; explicit imports when unclear
- Single-page routing only (no multipage routes)
- All backend calls go through `server/api/*`; do not call n8n directly from the client
- Use Vite plugin; avoid adding PostCSS unless explicitly required

## Testing Contact Endpoint Locally

With the dev server running and `.env` configured, you can test the endpoint:

```bash
curl -X POST http://localhost:3000/api/contact \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","message":"Hello!"}'
```

Expect a success message if forwarding to n8n succeeds; otherwise, an error with details.

## Troubleshooting

- Ensure `N8N_WEBHOOK_URL` is set and reachable (no firewalls blocking)
- Validate that your n8n workflow is active and accepts POST requests with JSON
- Check Nuxt server logs for validation errors or forwarding issues

## License

Private project. Do not redistribute without permission.
# Marketing Agency Landing Page

A professional, production-ready one-page marketing agency website built with Nuxt 4, TypeScript, and Tailwind CSS v4. Features seamless form automation powered by n8n and AI-driven customer engagement.

## 🚀 Features

### Core Functionality
- **Single-Page Architecture** – Smooth anchor-based navigation with professional section layout
- **Responsive Design** – Mobile-first approach ensuring perfect display on all devices
- **Contact Form Integration** – Real-time form submission with comprehensive validation
- **Automated AI Responses** – Intelligent customer engagement via n8n workflow automation
- **Server-Side API** – Secure backend endpoints for form processing and external integrations

### Technical Stack
- **Framework:** Nuxt 4 (latest features and performance)
- **Language:** TypeScript (strict mode enabled)
- **Styling:** Tailwind CSS v4 (Vite plugin, no PostCSS)
- **UI Approach:** Pure Tailwind utility classes (no component libraries)
- **Automation:** n8n workflow automation with Inspira UI

### Landing Page Sections

#### 1. Hero Section
- Compelling company branding
- Value-driven messaging
- Primary CTA with smooth scroll to contact form

#### 2. Services/Offerings
- Responsive grid layout (3–6 service cards)
- Clear titles and descriptions
- Professional visual hierarchy

#### 3. Contact Form
- Validated input fields (Name, Email, Message)
- Real-time submission feedback
- Loading states and error handling
- Accessible form design with proper labels

### Automation Workflow

Two coordinated n8n workflows power customer interactions:

1. **Chat Assistant (n8n Chat)**
  - The floating chat widget pipes every customer question to an n8n conversation workflow
  - n8n can answer with LLM nodes, knowledge-base lookups, or human handoff
  - Supports session metadata and streaming so visitors get AI-backed replies instantly

2. **Contact Pipeline (n8n Contact Form)**
  - Server endpoint validates form data, forwards it (with timestamp + metadata) to n8n
  - Workflow can fan-out to Google Sheets, email, Slack, CRM, etc., then send an acknowledgement back to the user
  - Recommended steps: store submission → notify team → trigger AI acknowledgement → archive conversation context

Both flows keep the tone professional, thank the user, confirm follow-up, and stay configurable entirely inside n8n.

## 📦 Setup

Install dependencies:

```bash
npm install
```

## 🔧 Environment Configuration

Create a `.env` file in the project root:

```env
N8N_WEBHOOK_URL=https://your-n8n-instance.com/webhook/contact-form
```

## 🛠️ Development

Start the development server on `http://localhost:3000`:

```bash
npm run dev
```

## 🏗️ Production Build

Build the application for production:

```bash
npm run build
```

Preview production build locally:

```bash
npm run preview
```

## 📁 Project Structure

```
nuxt-landing-page/
├── app/
│   ├── pages/
│   │   └── index.vue          # Main landing page
│   ├── layouts/
│   │   └── default.vue        # Shared layout (header/footer)
│   ├── components/            # Reusable Tailwind components
│   ├── composables/           # Vue composables
│   └── assets/
│       └── tailwind.css       # Tailwind v4 configuration
├── server/
│   └── api/
│       └── contact.post.ts    # Form submission endpoint
├── public/                    # Static assets
└── nuxt.config.ts            # Nuxt configuration
```

## 🎨 Design Principles

- **Semantic HTML** – Proper use of `<header>`, `<main>`, `<section>`, `<footer>`
- **Professional Spacing** – Sections use `py-16` or `py-24`, containers use `max-w-7xl mx-auto px-6`
- **Accessibility First** – Every form field has labels, proper input types, visible focus states
- **Clean Architecture** – Composition API with `<script setup lang="ts">`

## 🔒 Security & Best Practices

- Server-side API validation
- Environment variable protection
- Type-safe TypeScript configuration
- Strict linting and formatting rules
- No direct client-to-n8n communication

## 📝 TypeScript Configuration

The project uses Nuxt 4's project references with custom path aliases:

- `~/` or `@/` → `./app/`
- `~~/` or `@@/` → `./` (project root)

## 🌐 Deployment

This project is deployment-ready for:
- Vercel
- Netlify
- Cloudflare Pages
- Any Node.js hosting platform

Refer to the [Nuxt deployment documentation](https://nuxt.com/docs/getting-started/deployment) for platform-specific instructions.

## 📄 License

MIT
