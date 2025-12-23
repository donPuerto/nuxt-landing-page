Copilot Instructions (Nuxt 4 + Tailwind CSS v4 + Inspira UI)
1) Project stack

Framework: Nuxt 4

Language: TypeScript

Styling: Tailwind CSS v4 (Vite plugin; do not add PostCSS unless required)

UI:

Tailwind CSS for layout and styling

Inspira UI for component-based UI where appropriate

❌ Do NOT use shadcn UI

Automation platform: n8n

AI / Automation logic: Handled via n8n workflows (AI nodes, email, messaging)

2) Coding defaults

Vue SFCs must use: <script setup lang="ts">

Prefer Composition API patterns.

Follow Nuxt conventions:

app/pages/

layouts/

components/

composables/

server/

Use Nuxt auto-imports where appropriate; use explicit imports if unclear.

Keep components clean and reusable.

Extract repeated Tailwind blocks into reusable components.

3) Tailwind utility requirement (MANDATORY)

This project must use the shared Tailwind utility for class merging.

Utility location

lib/utils.ts (or equivalent shared utility folder)

import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export type ObjectValues<T> = T[keyof T];

Usage rules

Always use cn() when:

Conditionally applying Tailwind classes

Merging class strings

Accepting a class prop in components

Do not concatenate class strings manually.

Components should accept class?: string when appropriate and merge it via cn().

4) UI & Tailwind conventions

UI may be built using:

Custom Tailwind-based components

Inspira UI components

Do not use shadcn UI components.

Use semantic HTML (header, main, section, footer) unless an Inspira component replaces it.

Maintain professional spacing and typography:

Sections: py-16 or py-24

Containers: max-w-7xl mx-auto px-6

Accessibility is required:

Labels for form inputs

Correct input types

Visible focus states

5) Nuxt patterns

This project is a single-page landing page:

Use app/pages/index.vue only

Section-based layout with anchor scrolling

No multi-page routing

Use layouts/default.vue for shared structure (header + footer).

Backend calls must go through server/api/

❌ Never call n8n directly from the client

Use $fetch / useFetch with proper error handling and UI feedback.

6) Architecture overview

Client: app/

Server: server/

Components:

components/ (custom Tailwind components)

Inspira UI components (imported where appropriate)

Shared logic (optional): shared/

Types (optional): types/index.ts

Utilities: lib/utils.ts

7) Product requirement: One-Page Marketing Agency Landing Page + n8n Automation
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

May use Inspira UI card components or custom Tailwind components

Contact Us

Form fields:

Name

Email

Message

Clear submit button

Success and error feedback

Quality requirements

Mobile-first, responsive

Clean, professional, agency-style design

Clear visual hierarchy

No placeholder or demo-only styling

Step 2: Form Integration (Nuxt → n8n)

On submit, send { name, email, message } to n8n.

Implement a Nuxt server endpoint:

server/api/contact.post.ts

Server endpoint must

Validate required fields

Forward data to n8n via $fetch

Use environment variable:

N8N_WEBHOOK_URL

UI requirements

Loading state while submitting

Success confirmation

Error message on failure

Basic client-side validation

Step 3: n8n Automation Workflow

The n8n workflow must:

Receive form submission data

Normalize and format user information

Trigger AI logic (LLM node or AI agent)

Send an automated reply via email or messaging platform

Step 4: Automated AI Response Requirements

The AI-generated response must:

Acknowledge receipt of the inquiry

Thank the user for reaching out

Inform the user that the team will follow up shortly

Maintain a professional, friendly, human-like tone

8) Development workflow

Dev: npm run dev

Build: npm run build

Preview: npm run preview

Follow existing ESLint and TypeScript rules

9) Output expectations (Copilot behavior)

Generate complete, working code.

Always specify file paths and show full updated blocks.

Prefer minimal, correct changes.

Tailwind + Inspira UI only.

Single-page architecture only.

Always use cn() for class merging.