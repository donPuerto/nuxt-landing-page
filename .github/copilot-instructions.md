Copilot Instructions (Nuxt 4 + Tailwind CSS v4)
1) Project stack

Framework: Nuxt 4

Language: TypeScript

Styling: Tailwind CSS v4 (Vite plugin; do not add PostCSS unless required)

UI: Pure Tailwind CSS (no shadcn, no component libraries)

Automation / AI: Inspira UI (used only in automation workflows, not frontend UI)

Automation platform: n8n

2) Coding defaults

Vue SFCs must use: <script setup lang="ts">

Prefer Composition API patterns.

Follow Nuxt conventions: app/pages/, layouts/, components/, composables/, server/.

Use Nuxt auto-imports where appropriate; use explicit imports if unclear.

Keep components clean and reusable; extract repeated Tailwind blocks into components.

3) UI & Tailwind conventions

Build all UI using Tailwind utility classes only.

No external UI component libraries.

Use semantic HTML (header, main, section, footer).

Maintain professional spacing and typography:

Sections: py-16 or py-24

Containers: max-w-7xl mx-auto px-6

Accessibility is required:

Every form field must have a <label>

Proper input types (email, text)

Visible focus states

4) Nuxt patterns

This project is a single-page landing page:

Use app/pages/index.vue only

Section-based layout with anchor scrolling (no multi-page routing)

Use layouts/default.vue for shared structure (header/footer).

Backend calls must go through server/api/ (never call n8n directly from the client).

Use $fetch / useFetch with proper error handling and UI feedback.

5) Architecture overview

Client: app/

Server: server/

Components: components/ (Tailwind-only)

Shared logic (optional): shared/

Types (optional): types/index.ts

6) Product requirement: One-Page Marketing Agency Landing Page + n8n Automation
Step 1: One-page Landing Page (production-ready)

Create a single-page professional landing page suitable for a real marketing agency.

Required sections

Hero

Company name

Short value-driven description

Primary CTA button (scrolls to Contact section)

Services / Offerings

3–6 service cards

Title + short description

Responsive grid layout

Contact Us

Form fields:

Name

Email

Message

Clear submit button and feedback messages

Quality requirements

Mobile-first, responsive

Clean, professional, agency-style design

Clear visual hierarchy and spacing

No placeholder/demo styling

Step 2: Form Integration (Nuxt → n8n)

On submit, send { name, email, message } to n8n.

Implement a Nuxt server endpoint:

server/api/contact.post.ts

Server endpoint must:

Validate required fields

Forward data to n8n via $fetch

Use environment variable:

N8N_WEBHOOK_URL

UI requirements:

Loading state while submitting

Success confirmation on completion

Error message on failure

Basic client-side validation

Step 3: n8n Automation Workflow

The n8n workflow must:

Receive form submission data

Normalize and format user information

Trigger an AI agent (via Inspira UI automation) to generate a response

Send an automated reply via email or messaging platform

Step 4: Automated AI Response Requirements

The AI-generated response must:

Acknowledge receipt of the inquiry

Thank the user for reaching out

Inform the user that the team will follow up shortly

Maintain a professional, friendly, human-like tone

7) Development workflow

Dev: npm run dev

Build: npm run build

Preview: npm run preview

Follow existing ESLint and TypeScript rules

8) Output expectations (Copilot behavior)

Generate complete, working code (no partial snippets).

Always specify file paths and show the full updated block.

Prefer minimal, correct changes over broad refactors.

Tailwind only for UI.

Single-page architecture only.