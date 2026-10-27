<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { computed } from "vue"
import {
  VisAxis,
  VisCrosshair,
  VisGroupedBar,
  VisStackedBar,
  VisTooltip,
  VisXYContainer,
} from "@unovis/vue"
import { cn } from "nom-ui/lib/utils"
import { EmptyState } from "../empty-state"
import ChartLegend from "./ChartLegend.vue"
import type { ChartRow, ChartSeries } from "./index"
import { chartColor, formatTick, formatValue, tooltipHtml } from "./utils"

const props = withDefaults(
  defineProps<{
    data: ChartRow[]
    index: string
    series: ChartSeries[]
    stacked?: boolean
    indexFormatter?: (value: string) => string
    valueFormatter?: (value: number) => string
    class?: HTMLAttributes["class"]
  }>(),
  {
    stacked: false,
    indexFormatter: (value: string) => value,
    valueFormatter: formatValue,
  },
)

const x = (_: ChartRow, i: number) => i
const values = computed(() =>
  props.series.map((s) => (d: ChartRow) => Number(d[s.key])),
)
const color = (_: unknown, i: number) => chartColor(i)
const legend = computed(() =>
  props.series.map((s, i) => ({ label: s.label, color: chartColor(i) })),
)

const crosshairY = computed(() =>
  props.stacked ? { yStacked: values.value } : { y: values.value },
)

const xTick = (i: number) =>
  Number.isInteger(i) && props.data[i]
    ? props.indexFormatter(String(props.data[i][props.index]))
    : ""
const template = (d: ChartRow) =>
  tooltipHtml(
    props.indexFormatter(String(d[props.index])),
    props.series.map((s, i) => ({
      label: s.label,
      value: props.valueFormatter(Number(d[s.key])),
      color: chartColor(i),
    })),
  )
</script>

<template>
  <div
    data-slot="chart"
    :class="cn('flex h-64 w-full flex-col gap-2 [--vis-crosshair-line-stroke-width:0px]', props.class)"
  >
    <ChartLegend v-if="series.length > 1" :items="legend" />
    <EmptyState v-if="data.length === 0" class="flex-1" title="No data yet" />
    <VisXYContainer v-else :data="data" :duration="0" class="min-h-0 flex-1">
      <VisStackedBar
        v-if="stacked"
        :x="x"
        :y="values"
        :color="color"
        :rounded-corners="0"
        :duration="0"
      />
      <VisGroupedBar
        v-else
        :x="x"
        :y="values"
        :color="color"
        :rounded-corners="0"
        :duration="0"
      />
      <VisAxis
        type="x"
        :grid-line="false"
        :num-ticks="Math.min(data.length, 6)"
        :tick-format="xTick"
      />
      <VisAxis type="y" :num-ticks="4" :tick-format="formatTick" />
      <VisCrosshair
        :x="x"
        :color="color"
        v-bind="crosshairY"
        :template="template"
      />
      <VisTooltip />
    </VisXYContainer>
  </div>
</template>
