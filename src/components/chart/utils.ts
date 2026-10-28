import { formatNumber } from "../amount"
import type { ChartRow, ChartSeries } from "./index"

const OTHER_KEY = "__other"

/** Ramp colour for position i: --chart-1 to --chart-5, then --chart-other. */
export function chartColor(i: number): string {
  return i < 5 ? `var(--chart-${i + 1})` : "var(--chart-other)"
}

/** Stacked charts: keeps the first five series and sums the rest per row into one "Other" series in var(--chart-other). Returns the inputs unchanged for five or fewer series. */
export function foldSeries(
  data: ChartRow[],
  series: ChartSeries[],
): { data: ChartRow[]; series: ChartSeries[] } {
  if (series.length <= 5) return { data, series }
  const rest = series.slice(5)
  return {
    data: data.map((d) => ({
      ...d,
      [OTHER_KEY]: rest.reduce((sum, s) => sum + Number(d[s.key]), 0),
    })),
    series: [
      ...series.slice(0, 5),
      { key: OTHER_KEY, label: "Other", color: "var(--chart-other)" },
    ],
  }
}

/** Replaces & < > " ' with entities, for the HTML strings Unovis tooltips render. */
export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;")
}

/**
 * Tooltip body: the title line (skipped when empty), then one line per row
 * with an 8 px square swatch, the label and the value in mono. Escapes
 * title, label, value and colour.
 */
export function tooltipHtml(
  title: string,
  rows: { label: string; value: string; color: string }[],
): string {
  const head = title ? `<div class="text-xs">${escapeHtml(title)}</div>` : ""
  const lines = rows
    .map(
      (row) =>
        `<div class="flex items-center gap-2 text-xs">` +
        `<span style="display:inline-block;width:8px;height:8px;background:${escapeHtml(row.color)}"></span>` +
        `<span class="text-muted-foreground">${escapeHtml(row.label)}</span>` +
        `<span class="ml-auto font-mono tabular-nums">${escapeHtml(row.value)}</span>` +
        `</div>`,
    )
    .join("")
  return head + lines
}

/** Exact figure: whole numbers without decimals, others with 2. */
export function formatValue(value: number): string {
  return formatNumber(value, { decimals: Number.isInteger(value) ? 0 : 2 })
}

/** Axis tick: compact from 10,000. */
export function formatTick(value: number): string {
  return formatNumber(value, {
    compact: true,
    decimals: Number.isInteger(value) ? 0 : 2,
  })
}
