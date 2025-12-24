# Setup Guide (Nuxt 4 Landing Page)

This guide walks through local setup on Windows, environment configuration, and connecting the contact form to n8n.

## Prerequisites

- Node.js 18+ (or 20+)
- npm (bundled with Node)
- An n8n instance you can access (cloud or self-hosted)

## 1) Clone and Install

```bash
git clone <repo-url>
cd nuxt-landing-page
npm install
```

## 2) Environment Variables

Create a `.env` file in the project root with the n8n webhook URL.

```bash
N8N_WEBHOOK_URL=https://your-n8n-host/webhook/xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
```

Notes:

- Do not expose this URL in client code; it is only used server-side by `server/api/contact.post.ts`.
- All contact submissions are forwarded to this URL with `{ name, email, message }`.

## 3) Run the Dev Server

```bash
npm run dev
```

The app should be accessible at `http://localhost:3000`.

## 4) UI Conventions and Tailwind

- Use `<script setup lang="ts">` and Composition API
- Tailwind CSS v4; do not add PostCSS unless explicitly required
- Merge class names with the shared `cn()` utility in `app/lib/utils.ts`:

```ts
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

- Accept `class?: string` in reusable components and merge via `cn()`
- Prefer Vue shadcn/ui for accessible primitives; Inspira UI for marketing sections

## 5) n8n Webhook Setup

In n8n, create a workflow that starts with a Webhook node:

1. Method: `POST`
2. Path: generate a unique path (e.g., `landing-contact`)
3. Response: JSON; return `{ success: true }` or an error object
4. Add nodes to:
   - Normalize input `{ name, email, message }`
   - Run AI logic (LLM/agent) to craft a friendly acknowledgement
   - Send an automated reply via Email or a messaging integration

Copy the *Production* webhook URL into your `.env` as `N8N_WEBHOOK_URL`.

## 6) Verify the Contact Endpoint

With the dev server running and `.env` configured, test the server endpoint:

```bash
curl -X POST http://localhost:3000/api/contact \
  -H "Content-Type: application/json" \
  -d '{"name":"Setup Test","email":"setup@example.com","message":"Hello from setup"}'
```

You should see a success response if forwarding to n8n worked. If not, check:

- The webhook URL is reachable (VPN/firewall issues?)
- The n8n workflow is active and listening on the path
- Nuxt server logs for validation or forwarding errors

## 7) Build and Preview

```bash
npm run build
npm run preview
```

## 8) Architecture Expectations

- Single-page landing page only (`app/pages/index.vue`)
- Shared layout in `app/layouts/default.vue`
- All backend calls go through `server/api/*`; never call n8n directly from the client
- Use the Vite plugin; do not add PostCSS unless necessary
- Accessibility: labels for inputs, correct types, visible focus outlines

## 9) Customization Tips

- Update service cards and content in `app/pages/index.vue` and related section components
- Extract repeated Tailwind patterns into small, reusable components
- Use Nuxt auto-imports where appropriate; explicit imports when unclear

## Troubleshooting

- Missing `N8N_WEBHOOK_URL` → set it in `.env`
- 500 from `/api/contact` → check server logs and n8n workflow
- Styling collisions → ensure `cn()` is used for class merging and avoid manual concatenation
# One-Page Marketing Agency Site - Setup Complete

## ✅ What Was Created

### App Shell
- **app.vue** - Minimal shell using NuxtLayout
- **layouts/default.vue** - Main layout with Navbar, Footer, and BackToTop

### Pages
- **pages/index.vue** - Single-page site with all sections:
  - Hero (with CTA buttons)
  - Services (6 service cards)
  - Testimonials (6 client testimonials)
  - Clients (8 company badges)
  - Contact (form + contact details)

### Global Components
- **Navbar.vue** - Sticky navbar with scroll spy, smooth scroll, mobile menu
- **Logo.vue** - "DP Don Puerto" branding (text-based)
- **Hero.vue** - Hero section with gradient background
- **ContactForm.vue** - Full form with validation, success/error states
- **BackToTop.vue** - Floating scroll-to-top button (appears after scrolling)
- **Footer.vue** - Contains logo, quick links, contact info, social links

### UI Primitives (Custom Components)
- **Button.vue** - Variants: primary, secondary, ghost | Sizes: sm, md, lg
- **Card.vue** - Reusable card container with hover effects
- **Input.vue** - Form input with focus states
- **Textarea.vue** - Multi-line text input
- **Section.vue** - Standard section wrapper (py-16 md:py-24)
- **Container.vue** - Max-width container (max-w-7xl mx-auto px-6)
- **FadeIn.vue** - Scroll reveal animation (directions: up, down, left, right)

### Utilities & Composables
- **lib/utils.ts** - Required `cn()` function for class merging
- **composables/useScrollSpy.ts** - Active section detection for navbar
- **composables/useSmoothScroll.ts** - Smooth anchor scrolling
- **composables/useForm.ts** - Contact form state, validation, submission

### Plugins
- **plugins/scroll-reveal.client.ts** - Global IntersectionObserver for scroll animations

### Server API
- **server/api/contact.post.ts** - Form endpoint that validates and forwards to n8n

### Environment
- **.env.example** - Template for N8N_WEBHOOK_URL

---

## 🚀 Quick Start

### 1. Install Dependencies (if not already done)
```bash
npm install
```

### 2. Set Up Environment Variables
Create a `.env` file in the root:
```env
N8N_WEBHOOK_URL=https://your-n8n-instance.com/webhook/contact-form
```

### 3. Run Development Server
```bash
npm run dev
```

Visit: `http://localhost:3000`

---

## 📋 Features Implemented

### Navigation
- ✅ Sticky navbar with blur effect
- ✅ Active link highlighting (scroll spy)
- ✅ Smooth scroll to sections
- ✅ Responsive mobile menu with transitions
- ✅ "Let's Talk" CTA button

### Sections
- ✅ Hero with gradient background and dual CTAs
- ✅ Services grid (6 cards with icons)
- ✅ Testimonials (6 cards with 5-star ratings)
- ✅ Clients "Trusted By" section (8 company badges)
- ✅ Contact form + contact details grid

### Form & n8n Integration
- ✅ Client-side validation (required fields, email format)
- ✅ Loading state (disables inputs/button)
- ✅ Success message (auto-hide after 5s)
- ✅ Error handling with user feedback
- ✅ Server endpoint validates and forwards to n8n webhook

### Animations & Transitions
- ✅ Scroll reveal animations (FadeIn component)
- ✅ Staggered animations for grids (delay prop)
- ✅ Mobile menu transition
- ✅ BackToTop button transition
- ✅ Success/error alert transitions

### Footer
- ✅ Logo and description
- ✅ Quick links (same as navbar)
- ✅ Contact information (your details)
- ✅ Social links (GitHub + LinkedIn)
- ✅ Copyright notice

---

## 🎨 Design System

### Colors
- **Primary**: Blue 600/700 (CTAs, links, accents)
- **Background**: White, Gray 50, Blue 50
- **Text**: Gray 900 (headings), Gray 600/700 (body)

### Typography
- **Headings**: Font-bold, 3xl to 7xl responsive
- **Body**: Text-base to xl

### Spacing
- **Sections**: py-16 md:py-24
- **Containers**: max-w-7xl mx-auto px-6
- **Cards**: p-6 with rounded-xl borders

---

## 🛠 Technical Stack

- **Framework**: Nuxt 4
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4 (Vite plugin)
- **UI**: Custom components (no external UI kits)
- **Animations**: IntersectionObserver (native)
- **Form Handling**: Nuxt server API → n8n webhook

---

## 📝 Important Notes

### cn() Utility
Always use `cn()` from `lib/utils.ts` for merging classes:
```vue
<div :class="cn('base-classes', props.class)" />
```

### Scroll Spy
The navbar automatically highlights the active section based on scroll position.

### Mobile-First
All components are responsive with mobile-first breakpoints (md:, lg:).

### Accessibility
- Proper semantic HTML
- ARIA labels on interactive elements
- Focus states on all buttons/links
- Form labels with required indicators

---

## 🔧 Customization

### Change Brand Colors
Update primary color in components from `blue-600` to your brand color.

### Add More Services
Edit the `services` array in [pages/index.vue](pages/index.vue) (line ~180).

### Modify Testimonials
Edit the `testimonials` array in [pages/index.vue](pages/index.vue) (line ~195).

### Update Contact Info
Edit [components/global/Footer.vue](components/global/Footer.vue) contact section.

---

## 📦 Production Build

```bash
npm run build
npm run preview
```

---

## ✨ All Requirements Met

✅ One-page website (single route)  
✅ Navbar (sticky, scroll spy, mobile menu)  
✅ Footer (logo, links, contact info, social)  
✅ Hero, Services, Testimonials, Clients, Contact sections  
✅ Contact form with n8n integration  
✅ Custom UI primitives (no external UI kits)  
✅ Scroll animations and transitions  
✅ cn() utility used throughout  
✅ TypeScript strict mode  
✅ Production-ready code (no TODOs)  
✅ Compiles immediately  

**Ready to deploy!** 🚀
