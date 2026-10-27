<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { computed } from "vue"
import { VisDonut, VisSingleContainer, VisTooltip } from "@unovis/vue"
import { Donut } from "@unovis/ts"
import { cn } from "nom-ui/lib/utils"
import { EmptyState } from "../empty-state"
import ChartLegend from "./ChartLegend.vue"
import { chartColor, formatValue, tooltipHtml } from "./utils"

type Item = { label: string; value: number }

const props = withDefaults(
  defineProps<{
    data: Item[]
    valueFormatter?: (value: number) => string
    class?: HTMLAttributes["class"]
  }>(),
  {
    valueFormatter: formatValue,
  },
)

const hasData = computed(() => props.data.some((d) => d.value > 0))
const value = (d: Item) => d.value
const color = (_: unknown, i: number) => chartColor(i)
const legend = computed(() =>
  props.data.map((d, i) => ({ label: d.label, color: chartColor(i) })),
)
const triggers = computed(() => ({
  [Donut.selectors.segment]: (arc: { data: Item; index: number }) =>
    tooltipHtml("", [
      {
        label: arc.data.label,
        value: props.valueFormatter(arc.data.value),
        color: chartColor(arc.index),
      },
    ]),
}))
</script>

<template>
  <div data-slot="chart" :class="cn('flex h-48 w-full flex-col gap-2', props.class)">
    <EmptyState v-if="!hasData" class="flex-1" title="No data yet" />
    <template v-else>
      <VisSingleContainer :data="data" :duration="0" class="min-h-0 flex-1">
        <VisDonut :value="value" :color="color" :arc-width="24" :corner-radius="0" />
        <VisTooltip :triggers="triggers" />
      </VisSingleContainer>
      <ChartLegend :items="legend" />
    </template>
  </div>
</template>
