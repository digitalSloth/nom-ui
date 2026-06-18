# nom-ui

Demo: https://digitalsloth.github.io/nom-ui/

---

Shared [shadcn-vue](https://www.shadcn-vue.com/) component library for NoM apps — Vue 3 (Composition API) + Tailwind CSS 4.

This package is **distributed as source** (`.vue` / `.ts`). Your app's bundler compiles it, so a Vue-aware build setup (Vite + `@vitejs/plugin-vue`) and Tailwind CSS 4 are required. There is no pre-built `dist`.

## Install

```bash
npm install nom-ui
```

`vue` (`^3.4.0`) is a peer dependency — your app provides it. The component runtime deps (`reka-ui`, `@lucide/vue`, `vue-sonner`, `@vueuse/core`, `@tanstack/vue-table`, `class-variance-authority`, `clsx`, `tailwind-merge`) and the bundled fonts (`@fontsource-variable/space-grotesk`, `@fontsource-variable/jetbrains-mono`) are pulled in automatically.

> Design direction (palette, typography, when to reach for which component) lives in
> [`docs/brand-guidelines.md`](docs/brand-guidelines.md). Read it before building screens.

## Setup

Two lines in your app's main Tailwind CSS entry:

```css
/* src/style.css */
@import "tailwindcss";

/* 1. Theme variables + base styles (colors, radius, sonner styles) */
@import "nom-ui/style.css";

/* 2. Let Tailwind scan the library source so the utility classes
      the components use are generated into your build. */
@source "../node_modules/nom-ui/src";
```

> The `@source` path is relative to the CSS file. Adjust the `../` depth if your
> entry CSS lives somewhere other than `src/`.

That's all the build config needed — Tailwind 4's Vite plugin handles the rest. No `tailwind.config.js` is required.

The theme registers the brand fonts (Space Grotesk for UI, JetBrains Mono for data) as
`--font-sans` / `--font-mono` and self-hosts them via `@fontsource` — no external requests,
so it's safe for wallet extensions with a strict CSP.

## Usage

Import components and composables from the package root:

```vue
<script setup lang="ts">
import { Button, Card, CardHeader, CardTitle, CardContent, Input } from 'nom-ui'
import { useTheme, useToast } from 'nom-ui'

const { toggleTheme } = useTheme()
const { toast } = useToast()
</script>

<template>
  <Card>
    <CardHeader>
      <CardTitle>Hello</CardTitle>
    </CardHeader>
    <CardContent>
      <Input placeholder="Type…" />
      <Button @click="toast('Saved')">Save</Button>
    </CardContent>
  </Card>
</template>
```

### Toasts

The sonner toaster is exported as `Toaster`. Mount it **once** near your app root, then trigger toasts from anywhere with `useToast`:

```vue
<script setup lang="ts">
import { Toaster, useToast } from 'nom-ui'

const { show } = useToast()
</script>

<template>
  <Toaster position="bottom-right" />
  <!-- … -->
  <button @click="show('Saved', 'success')">Save</button>
</template>
```

### Blockchain primitives

Domain components for wallets, bridges and explorers — don't hand-roll these:

```vue
<script setup lang="ts">
import { Address, Amount, TxStatus, TxDirection, TokenIcon } from 'nom-ui'
</script>

<template>
  <!-- 0x71C7…976F, with full value on hover + a copy button -->
  <Address address="0x71C7656EC7ab88b098defB751B7401B5f6d8976F" />

  <!-- tabular figures, dimmed trailing zeros, optional fiat line -->
  <Amount :value="12408.50319" symbol="ZNN" fiat="≈ $9,420.18" />

  <TxStatus status="pending" />     <!-- pending | confirming | success | failed -->
  <TxDirection direction="in" />    <!-- in | out -->
  <TokenIcon symbol="ZNN" :src="logoUrl" />
</template>
```

See [`docs/brand-guidelines.md`](docs/brand-guidelines.md) for the full prop reference and
when to use each.

### Exports

| Subpath | Contents |
| --- | --- |
| `nom-ui` | All components + composables + `cn` (the barrel; use this for normal imports) |
| `nom-ui/components` | Components only |
| `nom-ui/composables` | `useTheme`, `useToast`, `useScrollFade` |
| `nom-ui/lib/utils` | `cn` class-merge helper |
| `nom-ui/style.css` | Theme variables + base styles (import once, see Setup) |

**Components:** accordion, address, alert, amount, avatar, badge, breadcrumb, button,
button-group, card, checkbox, collapsible, copy-button, dialog, drawer, dropdown-menu,
field, input, input-group, item, label, navigation-menu, pagination, popover, progress,
radio-group, scroll-area, select, separator, sheet, skeleton, sonner, spinner, switch,
table, tabs, textarea, toggle, toggle-group, token-icon, tooltip, tx-direction, tx-status,
typography.

> The sonner toaster component is exported as `Toaster` (see [Toasts](#toasts)).

## Development

A live playground lives in `demo/`. It imports the library exactly as a downstream app does (`from 'nom-ui'`), so you can edit any component in `src/` and see it hot-reload — no need to link the package into a consuming app.

```bash
npm install
npm run dev
```

This starts a Vite dev server with a page showcasing every component. `npm run build` produces the distributable library output.

### Adding components

Use the **shadcn-vue** CLI — not `shadcn` (that's the React CLI and will reject this config):

```bash
npx shadcn-vue@latest add <name>
```

Components land in `src/components/<name>/` (resolved via the `nom-ui/*` → `./src/*` alias in `tsconfig.json`). After adding one, export it from the barrel so it's importable from `nom-ui`:

```ts
// src/components/index.ts
export * from './<name>'
```

## License

MIT © digitalSloth
