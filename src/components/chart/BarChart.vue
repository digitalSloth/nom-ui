<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { computed, ref, toRaw } from "vue"
import {
  VisAxis,
  VisCrosshair,
  VisGroupedBar,
  VisPlotline,
  VisStackedBar,
  VisTooltip,
  VisXYContainer,
} from "@unovis/vue"
import { cn } from "nom-ui/lib/utils"
import { EmptyState } from "../empty-state"
import ChartLegend from "./ChartLegend.vue"
import type { ChartRow, ChartSeries } from "./index"
import { chartColor, foldSeries, formatTick, formatValue, tooltipHtml } from "./utils"

const props = withDefaults(
  defineProps<{
    data: ChartRow[]
    index: string
    series: ChartSeries[]
    stacked?: boolean
    signed?: boolean
    indexFormatter?: (value: string) => string
    valueFormatter?: (value: number) => string
    class?: HTMLAttributes["class"]
  }>(),
  {
    stacked: false,
    signed: false,
    indexFormatter: (value: string) => value,
    valueFormatter: formatValue,
  },
)

const view = computed(() =>
  props.stacked && !props.signed
    ? foldSeries(props.data, props.series)
    : { data: props.data, series: props.series },
)
const signColor = (v: number) =>
  v >= 0 ? "var(--chart-positive)" : "var(--chart-negative)"
const colors = computed(() =>
  view.value.series.map((s, i) => s.color ?? chartColor(i)),
)

const x = (_: ChartRow, i: number) => i
const values = computed(() =>
  view.value.series.map((s) => (d: ChartRow) => Number(d[s.key])),
)
const color = computed(() =>
  props.signed
    ? (d: ChartRow, i: number) =>
        signColor(Number(d[view.value.series[i].key]))
    : (_: unknown, i: number) => colors.value[i],
)
const legend = computed(() =>
  view.value.series.map((s, i) => ({ label: s.label, color: colors.value[i] })),
)

const crosshairY = computed(() =>
  props.stacked && !props.signed
    ? { yStacked: values.value }
    : { y: values.value },
)

const hovered = ref<number | null>(null)
const onMove = (x?: number | Date, _d?: ChartRow, i?: number) => {
  hovered.value = x === undefined ? null : (i ?? null)
}
const noCircles = () => []
const barStyle = computed(() => {
  const row =
    hovered.value === null ? undefined : toRaw(view.value.data[hovered.value])
  return (d: ChartRow) =>
    row === undefined || toRaw(d) === row ? {} : { opacity: 0.55 }
})

const xTick = (i: number) =>
  Number.isInteger(i) && props.data[i]
    ? props.indexFormatter(String(props.data[i][props.index]))
    : ""
const template = (d: ChartRow) =>
  tooltipHtml(
    props.indexFormatter(String(d[props.index])),
    view.value.series.map((s, i) => ({
      label: s.label,
      value: props.valueFormatter(Number(d[s.key])),
      color: props.signed ? signColor(Number(d[s.key])) : colors.value[i],
    })),
  )
</script>

<template>
  <div
    data-slot="chart"
    :class="cn('flex h-64 w-full flex-col gap-2 [--vis-crosshair-line-stroke-width:0px]', props.class)"
  >
    <ChartLegend v-if="view.series.length > 1" :items="legend" />
    <EmptyState v-if="data.length === 0" class="flex-1" title="No data yet" />
    <VisXYContainer v-else :data="view.data" :duration="0" class="min-h-0 flex-1">
      <VisStackedBar
        v-if="stacked && !signed"
        :x="x"
        :y="values"
        :color="color"
        :rounded-corners="1"
        :bar-padding="0.28"
        :bar-style="barStyle"
        :duration="0"
      />
      <VisGroupedBar
        v-else
        :x="x"
        :y="values"
        :color="color"
        :rounded-corners="1"
        :group-padding="0.28"
        :bar-style="barStyle"
        :duration="0"
      />
      <VisPlotline
        v-if="signed"
        axis="y"
        :value="0"
        :line-width="1"
        color="var(--muted-foreground)"
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
        v-bind="crosshairY"
        :getCircles="noCircles"
        :onCrosshairMove="onMove"
        :duration="0"
        :template="template"
      />
      <VisTooltip />
    </VisXYContainer>
  </div>
</template>
