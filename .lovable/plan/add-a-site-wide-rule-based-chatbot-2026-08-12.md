# Add a site-wide rule-based chatbot

## Goal
Add a floating chat widget on every page that answers common visitor questions using fixed, studio-specific responses and escalates to WhatsApp or email when the visitor wants to talk to Nelson directly.

## Why rule-based
The visitor chose a standard chat UI and wants an "AI assistant" feel, but a rule-based bot is faster, has no API cost, and gives predictable answers about services, process, pricing, and contact details. It can still feel conversational through quick-reply buttons and a friendly greeting.

## What will be built

### 1. Chat widget component
- File: `src/components/site/ChatBot.tsx`
- Floating launcher button + expandable chat panel.
- Positioned bottom-left on desktop and mobile so it does not overlap the existing WhatsApp button in the bottom-right.
- Standard chat UI: message bubbles, scrollable transcript, text input, send button.
- Quick-reply chips above the composer for common intents.

### 2. Conversation knowledge
- File: `src/data/chatbot.ts`
- Pre-written answers drawn from existing site data (`site.ts`, `services`, `processSteps`, `testimonials`, `budgets`).
- Intents covered: services, process/pricing, turnaround, portfolio, contact, location, availability.
- Escalation paths: "Chat on WhatsApp" opens `site.whatsapp`, "Email directly" opens `mailto:`.

### 3. Behaviour
- Greeting on open: short welcome + 3-4 quick-reply options.
- User clicks a chip or types a message → bot replies with the matched answer.
- Unknown messages get a fallback that suggests WhatsApp/email.
- Minimal session persistence in `sessionStorage` so the conversation survives a page reload.
- Escape key and close button collapse the panel; focus returns to the launcher.

### 4. Design
- Uses the existing black/orange tokens (`bg-background`, `bg-surface`, `text-foreground`, `bg-primary`, `text-primary-foreground`).
- User bubbles filled with primary; assistant bubbles on the surface background.
- Subtle border and shadow to match the navbar/footer glass style.
- No gradient glows or generic AI sparkles.

### 5. Integration
- Import `<ChatBot />` in `src/routes/__root.tsx` and render it inside `RootComponent` after `<WhatsAppButton />` so it appears on every route.
- No backend or database changes; no API keys exposed.

## Acceptance criteria
- Chat launcher is visible on all routes and does not cover the WhatsApp button.
- Opening the chat shows a greeting and quick-reply chips.
- Clicking a chip returns a relevant, on-brand answer.
- "Talk to Nelson" / "Chat on WhatsApp" chip opens the existing WhatsApp deep link.
- Panel closes with the X button and Escape key.
- Build passes and the widget is keyboard-accessible.
