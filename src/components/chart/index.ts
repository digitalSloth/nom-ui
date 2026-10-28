export { default as AreaChart } from "./AreaChart.vue"
export { default as BarChart } from "./BarChart.vue"
export { default as DonutChart } from "./DonutChart.vue"

/** One row per index value, for example { day: "2026-10-01", blocks: 5321 }. */
export type ChartRow = Record<string, string | number>

/** A plotted field of each row and its legend and tooltip label. */
export interface ChartSeries {
  key: string
  label: string
  /** Any CSS colour, for example "var(--chart-other)". Defaults to the ramp colour for the series position. */
  color?: string
}
