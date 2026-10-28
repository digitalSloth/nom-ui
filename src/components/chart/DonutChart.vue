<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { computed, ref } from "vue"
import { VisDonut, VisSingleContainer } from "@unovis/vue"
import { Donut } from "@unovis/ts"
import { cn } from "nom-ui/lib/utils"
import { formatNumber } from "../amount"
import { EmptyState } from "../empty-state"
import { chartColor, formatValue } from "./utils"

type Item = { label: string; value: number; color?: string }

const props = withDefaults(
  defineProps<{
    data: Item[]
    total?: string
    unit?: string
    valueFormatter?: (value: number) => string
    class?: HTMLAttributes["class"]
  }>(),
  {
    valueFormatter: formatValue,
  },
)

const items = computed<Item[]>(() =>
  props.data.length <= 5
    ? props.data
    : [
        ...props.data.slice(0, 5),
        {
          label: "Other",
          value: props.data.slice(5).reduce((sum, d) => sum + d.value, 0),
          color: "var(--chart-other)",
        },
      ],
)
const hasData = computed(() => items.value.some((d) => d.value > 0))
const sum = computed(() => items.value.reduce((s, d) => s + d.value, 0))
const colors = computed(() =>
  items.value.map((d, i) => d.color ?? chartColor(i)),
)
const value = (d: Item) => d.value
const color = computed(() => {
  const list = colors.value
  return (_: unknown, i: number) => list[i]
})
const percent = (v: number) =>
  formatNumber((v / sum.value) * 100, { decimals: 1 }) + "%"

const hovered = ref<number | null>(null)
const events = {
  [Donut.selectors.segment]: {
    mouseenter: (d: { index: number }) => (hovered.value = d.index),
    mouseleave: () => (hovered.value = null),
  },
}
const centreValue = computed(() =>
  hovered.value === null
    ? (props.total ?? "")
    : props.valueFormatter(items.value[hovered.value].value),
)
const centreLabel = computed(() =>
  hovered.value === null ? (props.unit ?? "") : items.value[hovered.value].label,
)
</script>

<template>
  <div data-slot="chart" :class="cn('flex flex-wrap items-center gap-6', props.class)">
    <EmptyState v-if="!hasData" class="h-42 flex-1" title="No data yet" />
    <template v-else>
      <div class="relative size-42 shrink-0">
        <VisSingleContainer :data="items" :duration="0" class="size-full">
          <VisDonut
            :value="value"
            :color="color"
            :arc-width="24"
            :corner-radius="0"
            :events="events"
          />
        </VisSingleContainer>
        <div
          class="pointer-events-none absolute inset-0 flex flex-col items-center justify-center"
        >
          <span v-if="centreValue" class="font-mono text-lg font-semibold tabular-nums">
            {{ centreValue }}
          </span>
          <span v-if="centreLabel" class="text-ledger text-muted-foreground">
            {{ centreLabel }}
          </span>
        </div>
      </div>
      <ul class="flex min-w-45 flex-1 flex-col gap-2 text-[13px]">
        <li
          v-for="(item, i) in items"
          :key="i"
          class="flex items-center gap-2"
          @mouseenter="hovered = i"
          @mouseleave="hovered = null"
        >
          <span class="size-2 shrink-0" :style="{ background: colors[i] }" />
          <span class="text-muted-foreground">{{ item.label }}</span>
          <span class="ml-auto font-mono tabular-nums">{{ percent(item.value) }}</span>
        </li>
      </ul>
    </template>
  </div>
</template>
