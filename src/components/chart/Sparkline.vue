<script setup lang="ts">
import { computed, type HTMLAttributes } from "vue"
import { cn } from "nom-ui/lib/utils"
import { chartColor } from "./utils"

const props = withDefaults(
  defineProps<{
    values: number[]
    color?: string
    class?: HTMLAttributes["class"]
  }>(),
  { color: () => chartColor(0) },
)

const line = computed(() => {
  const n = props.values.length
  if (n < 2) return ""
  const min = Math.min(...props.values)
  const span = Math.max(...props.values) - min || 1
  return props.values
    .map((v, i) => {
      const x = ((i / (n - 1)) * 96).toFixed(1)
      const y = (28 - 2 - ((v - min) / span) * 24).toFixed(1)
      return `${i === 0 ? "M" : "L"}${x} ${y}`
    })
    .join("")
})
</script>

<template>
  <svg
    data-slot="sparkline"
    aria-hidden="true"
    viewBox="0 0 96 28"
    preserveAspectRatio="none"
    :class="cn('block h-7 w-24', props.class)"
  >
    <path v-if="line" :d="`${line}L96 28L0 28Z`" :fill="color" fill-opacity="0.16" />
    <path
      v-if="line"
      :d="line"
      fill="none"
      :stroke="color"
      stroke-width="1.5"
      stroke-linejoin="round"
      vector-effect="non-scaling-stroke"
    />
  </svg>
</template>
