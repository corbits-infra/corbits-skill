---
name: brand-guidelines
description: >
  Applies ABK Labs brand colors, typography, and voice to any artifact.
  Covers Corbits, Faremeter, Flex, and Interchange product brands.
  Use when brand colors, style guidelines, visual formatting, typography,
  design tokens, or company design standards apply.
license: AGPLv3
allowed-tools:
metadata:
  author: pva
  version: 2.1.0
  category: branding
  tags: [brand, design-tokens, voice, typography, accessibility]
  support: p@marianaventures.xyz
---

# ABK Labs Brand Guidelines

Brand identity and style resources for ABK Labs and its product family. Apply these guidelines when generating UI, presentations, documentation, marketing copy, landing pages, or any artifact that benefits from consistent brand styling.

**Keywords**: branding, colors, typography, design tokens, visual identity, styling, brand voice, Corbits, Faremeter, Flex, Interchange

## 1. Organization Context

- **ABK Labs** — parent company. Use only in corporate, legal, or investor contexts.
  - Tagline: "Just Build Together"
- **Corbits** — hosted services company / developer platform. Default for all customer-facing content.
  - Tagline: "We are building the future of agentic commerce."
- Domains: `abklabs.com`, `corbits.dev`, `faremeter.xyz`

### Product Definitions

| Term | Definition |
|------|-----------|
| Faremeter | Open-source project of libraries and plugins designed to facilitate agent communication and machine payments |
| Flex | Smart contract designed to enable flexible machine payments on Solana and other networks. Part of Faremeter |
| Discovery | Discovery service hosted by Corbits designed to make services and agents easy to discover. Built on Faremeter |
| Interchange | Platform of policy and guardrails designed to enforce and enable agentic teams across industries and use cases. Part of Faremeter |
| Corbits | Hosted services company offering top-of-the-line developer tooling — endpoint proxying (api.corbits.dev), custom agent packages, and a production-grade facilitator |

---

## 2. Brand Voice

### Personality Traits

- **Purposeful & Precise** — Direct, no fluff. Every sentence earns its place.
- **Confident & Grounded** — Calm authority, not hype. State what the product does, not what it might do.
- **Empowering & Action-Oriented** — Focus on what the user can do. Lead with outcomes.
- **Resourceful & Insightful** — Problem-solving orientation. Show understanding of the prospect's situation.

### Writing Rules

- Active voice, concise sentences
- Blend climbing vocabulary (ascent, summit, beta, grit) with engineering terms (optimize, deploy, system, debug) naturally in headers and CTAs
- Avoid corporate jargon, excessive exclamation points, fluffy adjectives
- Buttons/CTAs: action verbs ("Deploy", "Activate") over generic ("Submit", "OK")
- Errors: problem-solving tone ("Route Blocked. Review your input.") over generic
- Success: understated triumph ("Deployment Achieved.") over celebration

### Terminology

- "Faremeter" not "the metering tool" or "the framework" — it's an open-source project, not a single product
- "Flex" not "the smart contract" or "the payment contract" — always capitalize
- "Discovery" not "the discovery service" (unless explaining what Discovery is)
- "Interchange" not "the integration layer" or "the policy engine" (unless explaining what Interchange is)
- "Corbits" not "the platform" or "the facilitator"
- Flex, Discovery, and Interchange are all **part of Faremeter** — reference the parent project when needed

---

## 3. Colors

### Corbits / ABK Labs — Primary Palette

| Name | Light | Base | Dark | Usage |
|------|-------|------|------|-------|
| Breakthrough Orange | `#F2B277` | `#e98428` | `#BF6B20` | CTAs, key indicators. Use sparingly for impact. |
| Canvas Cream | `#FFFFFF` | `#f7ead5` | `#E4D5BC` | Backgrounds, clean content areas. |
| Bedrock Charcoal | `#5C5555` | `#2b2627` | `#1F1A1B` | Primary text, dark mode backgrounds, code blocks. |

### Corbits / ABK Labs — Complementary

| Name | Light | Medium | Dark | Usage |
|------|-------|--------|------|-------|
| Summit Blue | `#C5D2DE` | `#607C9A` | `#2D455C` | Secondary accents, charts, data viz, cool-tone sections. |
| Ridge Green | `#C1D1BE` | `#7B9974` | `#425A3D` | Nature/growth contexts, data viz, organic elements. |

### Neutral Scale (Warm)

| Step | Hex | Typical Use |
|------|-----|-------------|
| 50 | `#fbf7f2` | Page backgrounds |
| 100 | `#efe8e1` | Card backgrounds |
| 200 | `#d7ccc1` | Borders, dividers |
| 300 | `#c0b0a4` | Disabled text |
| 400 | `#a89689` | Placeholder text |
| 500 | `#8f7c71` | Secondary text |
| 600 | `#76645b` | Body text (light mode) |
| 700 | `#5c4d46` | Headings (light mode) |
| 800 | `#433834` | Card backgrounds (dark mode) |
| 900 | `#2b2422` | Page backgrounds (dark mode) |
| 950 | `#1f1a19` | Deepest dark |

### Semantic Colors

| Role | Value | Mapped From |
|------|-------|-------------|
| Success | `#7B9974` | Ridge Green Medium (same hex — intentionally shared) |
| Warning | `#eec35e` | Faremeter Accent Secondary |
| Error | `#B5463A` | New (warm terracotta, AA-compliant on white and cream) |
| Error Light | `#C45D4A` | New (lighter terracotta, large text / decorative only) |
| Info | `#607C9A` | Summit Blue Medium (same hex — intentionally shared) |

### Faremeter Colors

| Role | Value |
|------|-------|
| Background | `#000000` |
| Foreground | `#eceae5` |
| Accent | `#e96428` |
| Accent Secondary | `#eec35e` |

### Accessible Pairings

| Foreground | Background | Ratio | AA Normal | AA Large |
|------------|------------|-------|-----------|----------|
| Charcoal Base `#2b2627` | Cream Base `#f7ead5` | 12.55:1 | pass | pass |
| Charcoal Base `#2b2627` | White `#FFFFFF` | 14.90:1 | pass | pass |
| Charcoal Dark `#1F1A1B` | Cream Base `#f7ead5` | 14.47:1 | pass | pass |
| Cream Base `#f7ead5` | Charcoal Base `#2b2627` | 12.55:1 | pass | pass |
| Cream Base `#f7ead5` | Charcoal Dark `#1F1A1B` | 14.47:1 | pass | pass |
| Orange Base `#e98428` | Charcoal Dark `#1F1A1B` | 6.38:1 | pass | pass |
| Orange Light `#F2B277` | Charcoal Base `#2b2627` | 8.10:1 | pass | pass |
| Blue Dark `#2D455C` | White `#FFFFFF` | 9.92:1 | pass | pass |
| Blue Light `#C5D2DE` | Charcoal Dark `#1F1A1B` | 11.17:1 | pass | pass |
| Green Dark `#425A3D` | White `#FFFFFF` | 7.60:1 | pass | pass |
| Green Light `#C1D1BE` | Charcoal Dark `#1F1A1B` | 10.75:1 | pass | pass |
| Error `#B5463A` | White `#FFFFFF` | 5.38:1 | pass | pass |
| Error `#B5463A` | Cream Base `#f7ead5` | 4.53:1 | pass | pass |
| FM Foreground `#eceae5` | FM Background `#000000` | 17.47:1 | pass | pass |
| FM Accent `#e96428` | FM Background `#000000` | 6.32:1 | pass | pass |
| FM Accent2 `#eec35e` | FM Background `#000000` | 12.60:1 | pass | pass |

**Cautions:**
- Orange Base/Dark fail AA Normal on light backgrounds. Use for large text or decorative only on cream/white.
- Blue Medium `#607C9A` and Green Medium `#7B9974` fail AA Normal on light backgrounds. Use Dark variants for text on light, Light variants for text on dark.
- Error Light `#C45D4A` fails AA Normal on all backgrounds. Use only for large text or pair with icons.

---

## 4. Typography

| Role | Font | Fallbacks |
|------|------|-----------|
| Brand/Impact | Belwe | (commercial, no free fallback) |
| Display/Headlines | Tratex | Graphik, National Park, Arial Black |
| Body | Red Hat Display | Open Sans, Roboto, Arial, sans-serif |
| Code / Monospace | Space Mono | Fira Code, IBM Plex Mono, Monaco, Consolas, monospace |

**Faremeter Typography:**

| Role | Font | Fallbacks |
|------|------|-----------|
| Primary | Fira Code | JetBrains Mono, Monaco, Consolas, Ubuntu Mono, monospace |

Font size: `1rem`, line height: `1.54em`.

---

## 5. Design Tokens

### Corbits / ABK Labs

```css
:root {
  /* Brand colors */
  --corbits-orange: #e98428;
  --corbits-orange-light: #F2B277;
  --corbits-orange-dark: #BF6B20;
  --canvas-cream: #f7ead5;
  --bedrock-charcoal: #2b2627;
  --summit-blue: #607C9A;
  --ridge-green: #7B9974;

  /* Neutrals */
  --corbits-neutral-50: #fbf7f2;
  --corbits-neutral-100: #efe8e1;
  --corbits-neutral-200: #d7ccc1;
  --corbits-neutral-300: #c0b0a4;
  --corbits-neutral-400: #a89689;
  --corbits-neutral-500: #8f7c71;
  --corbits-neutral-600: #76645b;
  --corbits-neutral-700: #5c4d46;
  --corbits-neutral-800: #433834;
  --corbits-neutral-900: #2b2422;
  --corbits-neutral-950: #1f1a19;

  /* Semantic */
  --corbits-success: #7B9974;
  --corbits-warning: #eec35e;
  --corbits-error: #B5463A;
  --corbits-error-light: #C45D4A;
  --corbits-info: #607C9A;
}
```

### Faremeter

```css
:root {
  --fm-bg: #000000;
  --fm-fg: #eceae5;
  --fm-accent: #e96428;
  --fm-accent-secondary: #eec35e;
  font-family: 'Fira Code', 'JetBrains Mono', Monaco, Consolas, monospace;
  font-size: 1rem;
  line-height: 1.54em;
}
```

### Semantic Tokens (Light / Dark Mode)

```css
:root {
  /* Use these for layout — they flip in dark mode */
  --corbits-bg: var(--canvas-cream);
  --corbits-bg-secondary: var(--corbits-neutral-100);
  --corbits-text: var(--bedrock-charcoal);
  --corbits-text-secondary: var(--corbits-neutral-600);
}

[data-theme="dark"], .dark {
  --corbits-bg: var(--corbits-neutral-900);
  --corbits-bg-secondary: var(--corbits-neutral-800);
  --corbits-text: #f7ead5;
  --corbits-text-secondary: var(--corbits-neutral-400);
}
```

---

## 6. Application Guide

### Web / UI
1. Use CSS tokens from Section 5
2. Apply font stacks from Section 4
3. Follow visual patterns (Faremeter: dark terminal blocks; Corbits: warm cream + charcoal)

### Documentation / Copy
1. Follow voice guidelines from Section 2
2. Enforce terminology (use product names, not generic descriptions)
3. Use climbing + engineering vocabulary blend in headers/CTAs

### Marketing / Landing Pages
1. Breakthrough Orange for CTAs and key accents
2. Headlines in Tratex, body in Red Hat Display
3. Canvas Cream backgrounds with Bedrock Charcoal text

### Presentations / Slides
1. Identify the target product brand
2. Canvas Cream backgrounds
3. Breakthrough Orange for emphasis and key data
4. Tratex for titles, Red Hat Display for content

### When Unsure Which Brand

- Customer-facing -> **Corbits**
- Open-source libraries/plugins -> **Faremeter**
- Machine payments / smart contracts -> **Flex** (part of Faremeter)
- Service/agent discovery -> **Discovery** (hosted by Corbits, built on Faremeter)
- Policy, guardrails, agentic teams -> **Interchange** (part of Faremeter)
- Corporate/legal/investor -> **ABK Labs**

---

## 7. Logo and Assets

### Logo Variations

| Variation | Use When |
|-----------|----------|
| Primary wordmark | Default, ample space |
| Icon / logomark | Small spaces, favicons, social avatars |
| Monochrome light | Dark backgrounds |
| Monochrome dark | Light backgrounds |

### Usage Rules

- **Clear space**: Minimum equal to the height of the logomark on all sides
- **Minimum size**: 24px height for digital
- **Do not**: stretch, rotate, recolor, add effects, crop, or place on busy backgrounds

### Asset Locations

- [To be filled in — point to shared drive, repo, or URL where logo files live]
