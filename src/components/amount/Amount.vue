<script setup lang="ts">
import type {HTMLAttributes} from "vue"
import {computed} from "vue"
import {cn} from "nom-ui/lib/utils"
import {formatNumber} from "./index.ts"

const props = withDefaults(defineProps<{
  /** Amount to display. Pass a string for values beyond JS number precision. */
  value: string | number
  /** Fixed fraction digits to render. */
  decimals?: number
  /** Token ticker shown after the number (e.g. "ZNN"). */
  symbol?: string
  /** Render insignificant trailing zeros muted so decimals stay aligned. */
  dimTrailingZeros?: boolean
  /** Use compact notation (e.g. 12.4K, 3.1M) for values ≥ 10,000. */
  compact?: boolean
  /** Locale for number formatting. */
  locale?: string
  /** Optional secondary line, already formatted (e.g. "≈ $1,240.85"). */
  fiat?: string
  class?: HTMLAttributes["class"]
}>(), {
  decimals: 8,
  dimTrailingZeros: true,
  compact: false,
  locale: "en-US",
})

const parts = computed(() => {
  const n = typeof props.value === "string" ? Number(props.value) : props.value
  if (!Number.isFinite(n)) return {significant: String(props.value), zeros: ""}

  // Compact notation has its own short form — nothing to dim.
  if (props.compact && Math.abs(n) >= 10000) {
    return {significant: formatNumber(n, {compact: true, locale: props.locale}), zeros: ""}
  }

  const formatted = new Intl.NumberFormat(props.locale, {
    minimumFractionDigits: props.decimals,
    maximumFractionDigits: props.decimals,
  }).format(n)

  if (!props.dimTrailingZeros || !formatted.includes(".")) {
    return {significant: formatted, zeros: ""}
  }

  // Peel the trailing-zero run off the fraction so it can be dimmed.
  const match = formatted.match(/^(.*?)(0+)$/)
  if (!match) {
    // No trailing zeros — dim nothing.
    return {significant: formatted, zeros: ""}
  }
  if (match[1].endsWith(".")) {
    // Whole fraction is zeros (e.g. 12.00000000) — dim the dot too.
    const dot = formatted.indexOf(".")
    return {significant: formatted.slice(0, dot), zeros: formatted.slice(dot)}
  }
  return {significant: match[1], zeros: match[2]}
})
</script>

<template>
  <span :class="cn('inline-flex flex-col', props.class)">
    <span class="font-mono tabular-nums"><span>{{ parts.significant }}</span><span
      v-if="parts.zeros"
      class="text-muted-foreground/60"
    >{{ parts.zeros }}</span><span
      v-if="symbol"
      class="ml-1 text-muted-foreground"
    >{{ symbol }}</span></span>
    <span v-if="fiat" class="font-mono text-xs tabular-nums text-muted-foreground">{{ fiat }}</span>
  </span>
</template>
