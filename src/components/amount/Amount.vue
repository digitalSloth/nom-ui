<script setup lang="ts">
import type {HTMLAttributes} from "vue"
import {computed} from "vue"
import {cn} from "nom-ui/lib/utils"

const props = withDefaults(defineProps<{
  /** Amount to display. Pass a string for values beyond JS number precision. */
  value: string | number
  /** Fixed fraction digits to render. */
  decimals?: number
  /** Token ticker shown after the number (e.g. "ZNN"). */
  symbol?: string
  /** Render insignificant trailing zeros muted so decimals stay aligned. */
  dimTrailingZeros?: boolean
  /** Optional secondary line, already formatted (e.g. "≈ $1,240.85"). */
  fiat?: string
  class?: HTMLAttributes["class"]
}>(), {
  decimals: 8,
  dimTrailingZeros: true,
})

const parts = computed(() => {
  const n = typeof props.value === "string" ? Number(props.value) : props.value
  if (!Number.isFinite(n)) return {significant: String(props.value), zeros: ""}

  const formatted = new Intl.NumberFormat("en-US", {
    minimumFractionDigits: props.decimals,
    maximumFractionDigits: props.decimals,
  }).format(n)

  if (!props.dimTrailingZeros || !formatted.includes(".")) {
    return {significant: formatted, zeros: ""}
  }

  // Peel the trailing-zero run off the fraction so it can be dimmed.
  const match = formatted.match(/^(.*?)(0+)$/)
  if (!match || match[1].endsWith(".")) {
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
