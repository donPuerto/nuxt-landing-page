Copilot Instructions

Nuxt 4 + Tailwind CSS v4 + Vue shadcn/ui (Primary) + Inspira UI (Secondary)

1. Project Stack

Framework: Nuxt 4

Language: TypeScript

Styling: Tailwind CSS v4 (Vite plugin)

❌ Do not add PostCSS unless explicitly required

UI Libraries (Priority Order)

Vue shadcn/ui (PRIMARY UI SYSTEM)

Must be used for all interactive and form-based components

Acts as the default component system for the app

Inspira UI (SECONDARY / LAYOUT)

Used only for marketing layouts, page sections, and non-interactive composition

Custom Tailwind components

Allowed only when no shadcn or Inspira component exists

❌ React-based shadcn is forbidden
❌ Do not reimplement shadcn components with raw Tailwind

2. Shadcn-First Component Rule (MANDATORY)
Default Rule

If a Vue shadcn/ui component exists, it MUST be used.

This applies to:

Pages

Components

Forms

Dialogs

UI primitives

Replacement Rule

When building or modifying a page:

❌ Do not create custom Tailwind markup for buttons, inputs, forms, or cards

✅ Replace existing or generated markup with the appropriate Vue shadcn/ui component

Examples
UI Need	Required Component
Button	Button
Input field	Input
Textarea	Textarea
Form layout	Form, FormField
Card	Card
Modal	Dialog
Dropdown	DropdownMenu
Alert / feedback	Alert
3. Coding Defaults

Vue SFCs must use:

<script setup lang="ts">


Prefer Composition API

Follow Nuxt conventions:

app/pages/

layouts/

components/

composables/

server/

Keep components small and reusable

Do not duplicate logic already handled by shadcn

4. Tailwind Utility Requirement (MANDATORY)

All Tailwind class merging must use the shared utility.

Utility Location

lib/utils.ts

import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

Usage Rules

Always use cn() when:

Extending or overriding shadcn component styles

Conditionally applying Tailwind classes

Accepting a class prop

❌ No manual string concatenation

5. UI Composition Rules
Pages (app/pages/index.vue)

Pages must be composed using shadcn components first

Layout structure may wrap shadcn components with Inspira sections if needed

Do not write raw HTML inputs, buttons, or forms in pages

Components (components/)

Shadcn components may be:

Used directly

Wrapped for customization

Wrappers must:

Forward props

Accept class?: string

Merge styles via cn()

6. Inspira UI Usage Rules

Inspira UI is allowed only for:

Hero sections

Marketing layout blocks

Section composition

Non-interactive visual structure

❌ Do not use Inspira UI for:

Forms

Inputs

Buttons

Modals

Interactive UI elements

7. Nuxt Patterns

Single-page architecture

Use app/pages/index.vue only

Section-based layout with anchor scrolling

❌ No multi-page routing

Layout

Use layouts/default.vue for header + footer

Server Communication

Backend calls must go through server/api/

❌ Never call n8n directly from the client

Use $fetch / useFetch with:

Loading states

Error handling

User feedback

8. Product Requirement
One-Page Marketing Agency Landing Page + n8n Automation
Step 1. Landing Page UI Rules

All forms must use shadcn components

CTA buttons must be shadcn Button

Contact form fields must be:

Input

Textarea

Form / FormField

Feedback states must use:

Alert

Toast (if available)

9. Output Expectations (Copilot Behavior)

Copilot must:

Prefer Vue shadcn/ui components by default

Replace raw Tailwind markup with shadcn equivalents

Generate complete, production-ready code

Always specify file paths

Show full updated code blocks

Make minimal, correct changes

Always use cn() when styling shadcn components

Respect single-page architecture