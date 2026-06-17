export { default as Amount } from "./Amount.vue"

export interface FormatNumberOptions {
  decimals?: number
  compact?: boolean
  locale?: string
}

/**
 * Format a number for display. Falls back to `"0"` for non-numeric input, uses
 * compact notation (e.g. `12.4K`, `3.1M`) for large values when `compact` is
 * set, otherwise fixed decimals.
 */
export function formatNumber(
  value: number | string,
  options: FormatNumberOptions = {},
): string {
  const { decimals = 2, compact = false, locale = "en-US" } = options
  const num = typeof value === "string" ? parseFloat(value) : value

  if (Number.isNaN(num)) return "0"

  // Use compact notation for numbers >= 10,000
  if (compact && Math.abs(num) >= 10000) {
    return new Intl.NumberFormat(locale, {
      notation: "compact",
      maximumFractionDigits: 1,
      minimumFractionDigits: 0,
    }).format(num)
  }

  // Regular formatting: fixed decimals with thousands separators
  return new Intl.NumberFormat(locale, {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(num)
}
