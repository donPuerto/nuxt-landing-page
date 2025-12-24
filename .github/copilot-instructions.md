1. Project Stack

Framework: Nuxt 4

Language: TypeScript

Styling: Tailwind CSS v4

Use the Vite plugin

❌ Do not add PostCSS unless explicitly required

UI

Tailwind CSS for layout, spacing, and custom styling

Vue shadcn/ui for accessible, headless, composable UI primitives

Inspira UI for higher-level, prebuilt marketing and layout components

Vue-only UI libraries (❌ no React-based packages)

Automation & AI

Automation platform: n8n

AI / Automation logic: Handled via n8n workflows (AI nodes, email, messaging)

2. Coding Defaults

Vue SFCs must use:

<script setup lang="ts">


Prefer Composition API

Follow Nuxt conventions:

app/pages/

layouts/

components/

composables/

server/

Use Nuxt auto-imports where appropriate

Use explicit imports if anything is unclear

Keep components clean, small, and reusable

Extract repeated Tailwind patterns into reusable components

3. Tailwind Utility Requirement (MANDATORY)

This project must use the shared Tailwind utility for class merging.

Utility Location

lib/utils.ts (or equivalent shared utility folder)

import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export type ObjectValues<T> = T[keyof T];

Usage Rules

Always use cn() when:

Conditionally applying Tailwind classes

Merging class strings

Accepting a class prop in components

❌ Do not concatenate class strings manually
✅ Components should accept class?: string and merge it via cn()

4. UI & Tailwind Conventions

UI may be assured using:

Vue shadcn/ui components

Inspira UI components

Custom Tailwind-based components

Component Selection Guidelines

Use Vue shadcn/ui for:

Buttons

Forms

Inputs

Dialogs

Dropdowns

Accessible interactive primitives

Use Inspira UI for:

Marketing sections

Hero layouts

Cards

Page-level composition

Layout & Semantics

Use semantic HTML (header, main, section, footer) unless replaced by a UI component

Maintain professional spacing and typography:

Sections: py-16 or py-24

Containers: max-w-7xl mx-auto px-6

Accessibility (Required)

Labels for all form inputs

Correct input types

Keyboard navigation support

Visible focus states (do not remove outlines without replacement)

5. Nuxt Patterns

Single-page landing page architecture

Use app/pages/index.vue only

Section-based layout with anchor scrolling

❌ No multi-page routing

Layout

Use layouts/default.vue for shared structure (header + footer)

Server Communication

All backend calls must go through server/api/

❌ Never call n8n directly from the client

Use $fetch / useFetch with:

Proper error handling

Loading states

User feedback

6. Architecture Overview
app/
  pages/
    index.vue
layouts/
  default.vue
components/
  (custom Tailwind, shadcn/ui wrappers, Inspira UI usage)
composables/
server/
  api/
lib/
  utils.ts
shared/        (optional)
types/
  index.ts     (optional)

7. Product Requirement
One-Page Marketing Agency Landing Page + n8n Automation
Step 1. One-Page Landing Page (Production-Ready)

Create a professional, real-world marketing agency landing page.

Required Sections
Hero

Company name

Short, value-driven description

Primary CTA button (scrolls to Contact section)

Services / Offerings

3–6 service cards

Title + short description

Responsive grid layout

May use:

Inspira UI cards

Vue shadcn/ui card primitives

Custom Tailwind components

Contact Us

Form fields:

Name

Email

Message

Submit button

Success and error feedback

Quality Requirements

Mobile-first and fully responsive

Clean, professional, agency-style design

Clear visual hierarchy

❌ No placeholder or demo-only styling

Step 2. Form Integration (Nuxt → n8n)

On submit, send { name, email, message } to n8n.

Server Endpoint

server/api/contact.post.ts

The endpoint must:

Validate required fields

Forward data to n8n using $fetch

Use environment variable:

N8N_WEBHOOK_URL

UI Requirements

Loading state while submitting

Success confirmation message

Error message on failure

Basic client-side validation

Step 3. n8n Automation Workflow

The n8n workflow must:

Receive form submission data

Normalize and format user information

Trigger AI logic (LLM node or AI agent)

Send an automated reply via email or messaging platform

Step 4. Automated AI Response Requirements

The AI-generated response must:

Acknowledge receipt of the inquiry

Thank the user for reaching out

Inform the user that the team will follow up shortly

Maintain a professional, friendly, human-like tone

8. Development Workflow

Development: npm run dev

Build: npm run build

Preview: npm run preview

Follow existing ESLint and TypeScript rules

9. Output Expectations (Copilot Behavior)

Generate complete, working code

Always specify file paths

Show full updated blocks

Prefer minimal, correct changes

Vue shadcn/ui + Inspira UI + Tailwind only

Single-page architecture only

Always use cn() for class merging