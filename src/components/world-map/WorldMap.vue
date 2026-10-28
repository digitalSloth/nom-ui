<script setup lang="ts">
import { computed, type HTMLAttributes } from "vue"
import { VisSingleContainer, VisTooltip, VisTopoJSONMap } from "@unovis/vue"
import { TopoJSONMap } from "@unovis/ts"
import { WorldMapTopoJSON } from "@unovis/ts/maps"
import { cn } from "nom-ui/lib/utils"
import { chartColor, tooltipHtml } from "../chart/utils"
import type { WorldMapPoint } from "./index"

const props = defineProps<{
  points: WorldMapPoint[]
  class?: HTMLAttributes["class"]
}>()

const isCount = (v: number | undefined): v is number =>
  typeof v === "number" && Number.isFinite(v)

// Steps are equal fifths of the largest count, on --chart-seq-1..5.
const pointColor = computed(() => {
  const counts = props.points.map((p) => p.count).filter(isCount)
  const max = Math.max(0, ...counts)
  return (d: WorldMapPoint) => {
    if (!isCount(d.count)) return chartColor(0)
    const step = max > 0 ? Math.ceil((d.count / max) * 5) : 1
    return `var(--chart-seq-${Math.min(5, Math.max(1, step))})`
  }
})

const triggers = {
  [TopoJSONMap.selectors.point]: (d: { properties: WorldMapPoint }) =>
    tooltipHtml(d.properties.label, []),
}
</script>

<template>
  <div
    data-slot="world-map"
    :class="
      cn(
        'aspect-[2/1] w-full [&_path[class*=point-shape]]:[stroke:var(--vis-map-point-default-stroke-color)]! [&_path[class*=point-shape]]:[stroke-opacity:1]!',
        props.class,
      )
    "
  >
    <VisSingleContainer :data="{ points }" :duration="0" class="size-full">
      <VisTopoJSONMap
        :topojson="WorldMapTopoJSON"
        :disable-zoom="true"
        :latitude="(d: WorldMapPoint) => d.latitude"
        :longitude="(d: WorldMapPoint) => d.longitude"
        :point-color="pointColor"
        :point-radius="4"
        :point-stroke-width="2"
      />
      <VisTooltip :triggers="triggers" />
    </VisSingleContainer>
  </div>
</template>
