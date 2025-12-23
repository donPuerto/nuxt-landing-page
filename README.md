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

The integrated n8n workflow provides:
1. **Form Data Reception** – Captures and validates user submissions
2. **Data Normalization** – Formats information for downstream processing
3. **AI Agent Trigger** – Generates intelligent, contextual responses
4. **Automated Communication** – Sends professional follow-up via email/messaging

**AI Response Features:**
- Acknowledges inquiry receipt
- Thanks users for reaching out
- Confirms team follow-up
- Maintains friendly, professional tone

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
