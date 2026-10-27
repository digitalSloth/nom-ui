<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { computed } from "vue"
import {
  VisArea,
  VisAxis,
  VisCrosshair,
  VisLine,
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
    fill?: boolean
    indexFormatter?: (value: string) => string
    valueFormatter?: (value: number) => string
    class?: HTMLAttributes["class"]
  }>(),
  {
    stacked: false,
    fill: true,
    indexFormatter: (value: string) => value,
    valueFormatter: formatValue,
  },
)

const x = (_: ChartRow, i: number) => i
const value = (s: ChartSeries) => (d: ChartRow) => Number(d[s.key])
const upTo = (i: number) => (d: ChartRow) =>
  props.series.slice(0, i + 1).reduce((sum, s) => sum + Number(d[s.key]), 0)

const values = computed(() => props.series.map(value))
const tops = computed(() => props.series.map((_, i) => upTo(i)))
const color = (_: unknown, i: number) => chartColor(i)
const legend = computed(() =>
  props.series.map((s, i) => ({ label: s.label, color: chartColor(i) })),
)
const stackedFill = computed(() => props.fill && props.stacked)
const overlapFill = computed(() => props.fill && !props.stacked)

const crosshairY = computed(() =>
  stackedFill.value ? { yStacked: values.value } : { y: values.value },
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
  <div data-slot="chart" :class="cn('flex h-64 w-full flex-col gap-2', props.class)">
    <ChartLegend v-if="series.length > 1" :items="legend" />
    <EmptyState v-if="data.length < 2" class="flex-1" title="Not enough data yet" />
    <VisXYContainer v-else :data="data" :duration="0" class="min-h-0 flex-1">
      <template v-if="overlapFill">
        <template v-for="(s, i) in series" :key="s.key">
          <VisArea :x="x" :y="values[i]" :color="chartColor(i)" :opacity="0.3" :duration="0" />
          <VisLine :x="x" :y="values[i]" :color="chartColor(i)" :duration="0" />
        </template>
      </template>
      <template v-else-if="stackedFill">
        <VisArea :x="x" :y="values" :color="color" :opacity="0.3" :duration="0" />
        <VisLine :x="x" :y="tops" :color="color" :duration="0" />
      </template>
      <VisLine v-else :x="x" :y="values" :color="color" :duration="0" />
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
        :duration="0"
        :template="template"
      />
      <VisTooltip />
    </VisXYContainer>
  </div>
</template>
