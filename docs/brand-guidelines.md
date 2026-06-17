# Brand & usage guidelines

For teams building **wallets, bridges, explorers and dApps** on top of `nom-ui`. It covers
the brand styling your app should follow and how to get the most out of the components so
every NoM surface feels like one product.

> **The one principle:** *the data is the hero.* Balances, amounts, fees, addresses and
> hashes are what users came for. Treat them as first-class — mono type, tabular figures,
> the dedicated primitives — never as ordinary text. Everything below follows from this.

---

## 1. Color

The palette is a green-led tri-color on near-black. Use the **semantic tokens** (Tailwind
classes like `bg-primary`, `text-success`) — never raw hex — so light/dark and future
retunes flow through automatically.

### Brand colors

| Token | Value | Use |
|---|---|---|
| `zenon-green` | `#00D557` | Primary brand color, derives `--primary` |
| `zenon-blue` | `#0061EB` | Secondary accent, info/pending state |
| `zenon-pink` | `#F91690` | Accent / highlight only — **not** errors |
| `zenon-black` | `#151515` | Dark background base |

### Semantic tokens

| Token | Meaning | Typical class |
|---|---|---|
| `primary` | Main actions, active state, brand | `bg-primary text-primary-foreground` |
| `secondary` | Lower-emphasis actions | `bg-secondary` |
| `muted` / `muted-foreground` | Backgrounds, secondary text | `text-muted-foreground` |
| `accent` | Hover/selected surfaces | `bg-accent` |
| `destructive` | Errors, irreversible actions, failed tx | `bg-destructive` |
| `success` | Confirmed / positive / received | `text-success` |
| `warning` | Caution, awaiting confirmations | `text-warning` |
| `info` | In-progress / neutral notice / pending | `text-info` |
| `border` / `input` / `ring` | Lines, fields, focus rings | `border-border` |

### Tri-color roles

The brand is three colors, not one. Use them by role so screens read as Zenon, not "green":

- **Green** — primary actions, success/confirmed, active/selected. Primary surfaces render
  the **plasma** gradient (see [Signature](#7-signature-plasma--ledger)).
- **Blue** (`info`) — informational/in-progress (`pending`), and **external / explorer
  links** (e.g. `Address` with `href` hovers blue). Blue = "go look it up."
- **Pink** (`zenon-pink`) — one reserved highlight only. `Badge variant="highlight"` for
  "new" / featured. Use sparingly; if it's everywhere it stops meaning anything.

### Color rules

- **Green = primary brand and success.** Don't introduce a second green.
- **Destructive is crimson, not pink.** Pink (`zenon-pink`) is a brand accent; errors use
  `destructive`. Never style an error in pink or a brand highlight in `destructive`.
- **Money isn't colored by default.** Show amounts in the normal foreground; reserve
  green/red for *direction/status chips* (`TxDirection`, `TxStatus`), not the number itself,
  unless your product specifically codes +/− by color.
- Don't hardcode hex. If you need a brand tint, use `bg-primary/10`, `text-info`, etc.

---

## 2. Typography

Two roles, already wired into the theme:

| Role | Font | Token | Use for |
|---|---|---|---|
| UI / sans | **Space Grotesk** | `font-sans` (default) | Headings, labels, body, buttons |
| Data / mono | **JetBrains Mono** | `font-mono` | Addresses, hashes, amounts, block heights, code |

Rules:

- **Every identifier and number is mono.** Addresses, tx hashes, block/height, nonces,
  token amounts → `font-mono`. The primitives below already do this.
- **Numbers get `tabular-nums`** so columns align and values don't shift as they update.
  Use the `Amount` component, or add the `tabular-nums` class (and `numeric` on `Input`).
- Use the mono face as a **deliberate accent** for table headers, eyebrows and stat labels
  via the **`text-ledger`** utility (mono, uppercase, tracked) — the signature texture. It's
  applied to table headers automatically; reach for it on your own section/stat labels too.
  Don't set long prose in mono.
- Use the typography components rather than ad-hoc classes, so the scale stays consistent:
  - `Heading` — `as="h1"…"h6"` encodes the size per level automatically; pass `level` to
    style a tag at a different size (e.g. an `h2` that looks like an `h4`).
  - `Text` — `variant="default | lead | large | small | muted"` for body copy and captions.
  - `Blockquote`, `List` (`ordered`), and `InlineCode` (mono) for prose.

---

## 3. Theme & dark mode

Tokens are defined for both themes; build with tokens and dark mode is automatic.

```ts
import { useTheme } from 'nom-ui'

const { theme, mode, setTheme, toggleTheme, initTheme } = useTheme()

onMounted(initTheme)        // restores saved preference, attaches OS listener
setTheme('system')          // 'light' | 'dark' | 'system' (system follows the OS live)
// `theme` is the resolved 'light' | 'dark'; `mode` is the user's choice
```

- Offer a **Light / Dark / System** control, not just a toggle. `system` is the right
  default for wallets.
- Test every screen in both themes. Tinted chips (`bg-success/10`) and the chart ramp are
  tuned for each — don't override them with fixed colors.

---

## 4. Status & direction vocabulary

Keep transaction language consistent across apps — use the components, don't invent chips.

| Component | Values | Notes |
|---|---|---|
| `TxStatus` | `pending` · `confirming` · `success` · `failed` | Spinner on in-flight states; one soft-chip family |
| `TxDirection` | `in` · `out` | `in` = green/received, `out` = neutral (sending isn't an error) |
| `Badge` | `default` `secondary` `outline` `destructive` `success` `warning` `pending` | Generic chips; status variants are soft tints |

```vue
<TxStatus status="confirming" />
<TxDirection direction="out" label="Sent" />
<Badge variant="warning">Low balance</Badge>
```

Use the same labels app-wide: a transaction that's "Confirmed" in the list is "Confirmed"
in its detail view.

---

## 5. Component playbook — make the most of what's here

**Match the data to its component. If you're hand-formatting on-chain data, stop —
there's a primitive.**

| You're showing… | Use | Why |
|---|---|---|
| An address or hash | `Address` | Truncation, mono, full value on hover, copy, optional explorer link |
| A token amount / balance / fee | `Amount` | Grouping, `tabular-nums`, dims trailing zeros, optional symbol + fiat |
| A copyable raw value | `CopyButton` | Clipboard with copied-state feedback (works in extensions) |
| Transaction state | `TxStatus` | Standard states + spinner |
| Send vs receive | `TxDirection` | Consistent in/out chips |
| A token logo | `TokenIcon` | Logo with ticker fallback; contains non-square marks |
| An amount input field | `Input` `numeric` | `tabular-nums` + decimal keypad |
| Async / loading data | `Skeleton`, `Spinner` | Chain data is always in-flight |
| Tabular data (txns, blocks) | `Table` (`density="compact"` for explorers) | Mono hash cells, dense rows |
| Fee/hash explanations | `Tooltip` | Detail on hover without clutter |
| Confirmations / sync progress | `Progress` | Bridge transfers, node sync |
| Feedback after an action | `useToast` + `Toaster` | Mount `<Toaster />` once at root |

Key props (full set in source):

- `Address` — `address`, `start=6`, `end=4`, `truncate=true`, `copy=true`, `tooltip=true`, `href`
- `Amount` — `value` (string for big numbers), `decimals=8`, `symbol`, `fiat`, `dimTrailingZeros=true`
- `TokenIcon` — `symbol`, `src`; size via `class` (default `size-10`)
- `Table` — `density="default" | "compact"`
- `Tabs` — `variant="default" | "underline"` (set on `TabsList` **and** each `TabsTrigger`)

---

## 6. Screen recipes

**Wallet balance row** — `TokenIcon` + name, `Amount` (with `fiat`) right-aligned, `font-mono`.

**Send form** — `Input numeric` for the amount (Max button via `InputGroup`), `Address`
for the resolved recipient, `Button` primary to submit, `TxStatus` after broadcast.

**Transaction list** — `Table density="compact"`: `Address` (hash, `:copy="false"`),
`TxDirection`, right-aligned `Amount`, `TxStatus`. `Skeleton` rows while loading.

**Bridge** — chain `Select`s, `Input numeric` amount, `Progress` for the relay, a
`TxStatus` per leg (source → destination).

---

## 7. Signature: plasma & ledger

Two things make a NoM surface instantly recognisable. Lean on them; don't dilute them.

- **Plasma** — the brand gradient (pulled from the logo) on **primary/active/positive**
  surfaces only: the default `Button`, `Progress` fill, and the `Switch` "on" state use
  `bg-plasma`. Don't flatten primary buttons back to a solid fill, and don't spray the
  gradient onto secondary chrome — its power is being reserved for "the main thing."
- **Ledger labels** — the `text-ledger` mono/uppercase/tracked treatment on table headers,
  eyebrows and stat captions. It's the quiet texture that signals "on-chain." Use it for
  labels; never for values or prose.

Everything else stays calm. The identity lives in these two moves plus the type pairing —
spend your boldness there and keep the rest disciplined.

## 8. Surfaces, radius & elevation

- **Radius:** tight, derived from one token (`--radius`, ~6px) to echo the angular Z. Use
  `rounded-md`/`rounded-lg`; don't mix arbitrary radii or round things back up.
- **Elevation:** use the `shadow-*` scale — it's theme-aware. On dark it adds a lit top edge
  so surfaces separate against near-black (plain drop shadows vanish there). Overlays
  (`popover` surfaces) sit one step above cards. Don't hand-roll shadows.
- **Density:** forms stay comfortable; explorer tables use `density="compact"`.
- **Charts:** use the brand ramp `--chart-1…5` (green → teal → blue → violet → pink) — tuned
  for both themes. Don't pick ad-hoc chart colors.
- **Motion:** subtle and purposeful (tab indicator, toast, spinner, the plasma hover glow).
  Respect `prefers-reduced-motion`; avoid decorative animation on financial data.

---

## 9. Accessibility floor

- Every interactive element is keyboard reachable with a visible focus ring (`ring`) — don't
  remove outlines.
- Provide `aria-label`s on icon-only buttons (the primitives do).
- Don't rely on color alone: status uses an icon + label, direction uses an arrow + label.
- Maintain contrast in both themes; verify tinted chips on your backgrounds.

---

## Quick checklist

- [ ] Addresses/hashes via `Address`, amounts via `Amount` — never raw strings
- [ ] All numbers `tabular-nums`; identifiers `font-mono`
- [ ] Semantic tokens only — no hardcoded hex
- [ ] Errors use `destructive`; pink stays a brand accent
- [ ] Transaction state via `TxStatus` / `TxDirection` with consistent labels
- [ ] `<Toaster />` mounted once; Light/Dark/System theme control offered
- [ ] Loading states use `Skeleton` / `Spinner`
- [ ] Looks right in both light and dark
