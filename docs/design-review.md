# nom-ui — design & domain review

A design-lead review of the component library through the lens of its actual use:
**blockchain applications — wallets, bridges, explorers.** Findings are tagged by how
they get implemented and ordered into phases we can work through.

Legend:

- 🎨 **token** — edit `src/style.css` (theme variables / base styles)
- 📦 **install** — `npx shadcn-vue@latest add <name>` (exists in the shadcn-vue registry)
- 🔨 **build** — custom component; domain-specific, not in any registry
- Priority: **P1** (unblocks core screens) · **P2** (cohesion / polish) · **P3** (nice to have)

---

## Thesis

A blockchain UI kit has one job a generic kit doesn't: **the data is the hero.**
Balances, amounts, fees, gas, block heights, addresses and hashes are the content users
came for, and they are numeric or alphanumeric. Today `nom-ui` is a faithful, well-built
shadcn-vue port that treats that data as ordinary prose. Closing that gap is both the
functional fix and the identity opportunity. Almost every item below follows from
*"make data a first-class typographic citizen."*

The Zenon palette — green `#00D557` / blue `#0061EB` / pink `#F91690` on near-black
`#151515` — is a genuine, ownable identity (not a generic default). Keep it and lean into
it; the recommendations strengthen it rather than replace it.

---

## Findings

### 1. Typography — biggest gap, functional *and* identity · 🎨 token · **P1**

The library defines **no fonts** (`grep font-family src/` → nothing) and uses
**no tabular figures** (`tabular-nums` → 0 matches).

- No mono face means `0x1a2b…9f3c` renders proportional — a readability/trust problem when
  users verify addresses character-by-character.
- No tabular figures means columns of balances/amounts jitter and misalign. This is the
  detail that most makes a crypto UI feel cheap.

**Do:**

- Register a two-role type system in `style.css`:
  ```css
  @theme inline {
    --font-sans: "Space Grotesk", ui-sans-serif, system-ui, sans-serif;
    --font-mono: "JetBrains Mono", ui-monospace, "SF Mono", monospace;
  }
  ```
- Opinionated pick: **Space Grotesk + JetBrains Mono** — Space Grotesk's engineered
  character suits a feeless, dual-consensus network; JetBrains Mono has strong `0`/`O`
  and `1`/`l` disambiguation for hashes. (Neutral fallback: Inter + JetBrains Mono.)
- Apply `font-variant-numeric: tabular-nums` to numeric contexts (Amount, Table cells,
  amount Inputs).
- **Signature move:** use the mono face as an accent — eyebrows, table column headers and
  numeric callouts in mono / uppercase / letter-spaced — for a quiet "ledger/terminal"
  texture that reads as on-chain. Spend the boldness here; keep everything else calm.

### 2. Missing domain primitives — 🔨 build · **P1**

Every target app hand-rolls these today.

| Component | Role | Notes |
|---|---|---|
| **Address / Hash** | `0x1234…abcd` truncation + copy + optional explorer link | The defining blockchain component. `@vueuse/core` `useClipboard` is already a dep. |
| **Amount / TokenAmount** | Format decimals, `tabular-nums`, dim trailing zeros, optional fiat line | Stops every app reinventing number formatting. |
| **CopyButton** | Copy with copied-state feedback | Pairs with Address and tx hashes. |
| **TxStatus** | `pending / confirming / success / failed` chip | Thin wrapper over Badge to standardize status vocabulary. Depends on #4. |
| **TokenIcon** | Token logo with identicon/jazzicon fallback | Asset rows + token selectors. Can layer on Avatar (#3). |

Priority order within this group: **Address → Amount → CopyButton → TxStatus → TokenIcon.**

### 3. Missing generic primitives — 📦 install · **P1–P2**

Standard shadcn-vue components that on-chain UIs lean on, absent here. Install with the CLI:

```bash
npx shadcn-vue@latest add tooltip skeleton avatar progress switch scroll-area
```

| Component | Why | Priority |
|---|---|---|
| **Tooltip** | Full hash on hover, fee/gas explanations | P1 |
| **Skeleton** | Chain data is always async; loading states everywhere | P1 |
| **Spinner** | Inline pending indicator (you already use `Loader2Icon` in Sonner but expose no spinner) | P1 |
| **Avatar** | Token logos / account identicons (base for TokenIcon) | P2 |
| **Progress** | Bridge transfer / sync progress | P2 |
| **Switch** | Settings toggles (auto-lock, testnet) | P2 |
| **ScrollArea** | Long asset / tx lists with styled scrollbars | P3 |

> Note: `table` is already installed (tanstack-backed). After each `add`, re-export the new
> folder from `src/components/index.ts` and confirm it appears in the demo.

### 4. Status semantics are too thin · 🎨 token + 🔨 build · **P1**

On-chain state is more than ok/error — a bridge transfer alone is
*pending → source-confirmed → relayed → destination-confirmed → failed.*

- **Badge** has only `default / secondary / destructive / outline` — no
  `success / warning / pending`. Explorers are wall-to-wall status chips.
- **No `--warning` (amber) token.** `accent` is light green, so "awaiting confirmation"
  has no color to live in.
- **`destructive` is effectively the brand pink** (`hsl(338 98% 53%)` ≈ `#F91690`). When the
  error color and brand accent share a hue, failures stop reading as exceptional.

**Do:** add a `--warning` token; add `success / warning / pending` Badge variants; shift
`destructive` toward a redder magenta/true red and reserve pink as a brand-only accent;
then build **TxStatus** (#2) over the new variants.

### 5. Chart palette isn't on-brand · 🎨 token · **P2**

`--chart-1..5` are stock shadcn oklch values (orange/teal/blue/yellow) — unrelated to the
brand. Wallets show portfolio charts and explorers show network charts constantly.
Re-derive the 5-step ramp from the tri-color (green → blue → pink with two interpolated
stops) for instant cohesion.

### 6. Smaller polish · **P2–P3**

- **Density** (P2): `0.625rem` radius + default paddings are comfortable for forms but loose
  for explorer tables. Add a compact size token or a `density` prop on Table rows.
- **Amount Input** (P2): opt amount fields into `tabular-nums` so typed balances don't shift
  width.
- **`useTheme`** (P3): only light/dark; expose a `system`/auto option (wallets often want
  "follow OS").

---

## Phased plan

**Phase 1 — foundation (do first; touches everything)** ✅ done
- [x] 🎨 Type system: Space Grotesk + JetBrains Mono via `@fontsource-variable/*`,
      registered as `--font-sans` / `--font-mono`, `font-sans` applied to `body`.
      (`tabular-nums` ships as a built-in Tailwind utility — apply per numeric component.) *(#1)*
- [x] 🎨 Status tokens: added `--success` / `--warning` / `--info` (light + dark); shifted
      `--destructive` to crimson `hsl(352 84% 53%)` so it reads distinctly from brand pink. *(#4)*
- [x] 🎨 Badge variants: `success / warning / pending` as soft tints over the new tokens. *(#4)*

**Phase 2 — core domain primitives (unblock wallet + bridge screens)** ✅ done
- [x] 🔨 Address / Hash — truncation, mono, full-value tooltip, inline copy, optional explorer link *(#2)*
- [x] 🔨 Amount — grouping + tabular figures, dims trailing zeros, optional symbol/fiat *(#2)*
- [x] 🔨 CopyButton — `useClipboard` (legacy fallback for extensions), copied-state check *(#2)*
- [x] 📦 Tooltip, Skeleton, Spinner — installed via shadcn-vue CLI, re-exported *(#3)*
- [x] 🔨 TxStatus — `pending / confirming / success / failed` over Badge variants, spinner on in-flight states *(#2)*
- [x] 🔨 TxDirection — `in / out` chips with directional arrows (in = green, out = neutral)

**Phase 3 — explorer + breadth** ✅ done (DataTable deferred)
- [ ] 🔨 DataTable over the installed `table` (sortable columns, mono hash cells, status chips)
      — **deferred** until an explorer screen needs it.
- [x] 📦 Avatar, Progress, Switch *(#3)* → 🔨 TokenIcon over Avatar *(#2)*
- [x] 🎨 Chart palette re-derived from brand tri-color (green → teal → blue → violet → pink;
      mid-stops brightened for dark). *(#5)*

**Phase 4 — polish** ✅ done
- [x] Compact Table density — `density="compact"` on `Table` cascades to cells via a
      `group/table` + `data-density` selector *(#6)*
- [x] `numeric` Input — opt-in `tabular-nums` + `inputmode="decimal"` for amount fields *(#6)*
- [x] `useTheme` system/auto — `mode` of `light/dark/system`, `system` follows the OS live
      via `matchMedia`; `theme` stays the resolved value. New `ThemeMode` type exported. *(#6)*

---

## Working notes

- After any `npx shadcn-vue@latest add …`, add the matching `export * from './<name>'` to
  `src/components/index.ts` and a showcase block in `demo/`.
- New domain components live under `src/components/<name>/` mirroring existing structure
  (`<Name>.vue` + `index.ts`), exported from the barrel.
- Keep the demo (`npm run dev`) as the verification surface for every change.
