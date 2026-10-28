import { cva, type VariantProps } from "class-variance-authority"

export { default as AreaChart } from "./AreaChart.vue"
export { default as BarChart } from "./BarChart.vue"
export { default as DonutChart } from "./DonutChart.vue"
export { default as Sparkline } from "./Sparkline.vue"
export { default as Meter } from "./Meter.vue"
export { default as SplitBar } from "./SplitBar.vue"

/** Meter fill: chart-1 by default, or a health tone. */
export const meterVariants = cva("absolute inset-y-0 left-0", {
  variants: {
    tone: {
      default: "bg-chart-1",
      success: "bg-success",
      warning: "bg-warning",
      destructive: "bg-destructive",
    },
  },
  defaultVariants: { tone: "default" },
})
export type MeterVariants = VariantProps<typeof meterVariants>

/** One part of a SplitBar. color: any CSS colour; defaults to the ramp colour for the part position. */
export interface SplitBarPart {
  value: number
  color?: string
}

/** One row per index value, for example { day: "2026-10-01", blocks: 5321 }. */
export type ChartRow = Record<string, string | number>

/** A plotted field of each row and its legend and tooltip label. */
export interface ChartSeries {
  key: string
  label: string
  /** Any CSS colour, for example "var(--chart-other)". Defaults to the ramp colour for the series position. */
  color?: string
}
