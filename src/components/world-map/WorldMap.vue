<script setup lang="ts">
import type { HTMLAttributes } from "vue"
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

const triggers = {
  [TopoJSONMap.selectors.point]: (d: { properties: WorldMapPoint }) =>
    tooltipHtml(d.properties.label, []),
}
</script>

<template>
  <div data-slot="world-map" :class="cn('aspect-[2/1] w-full', props.class)">
    <VisSingleContainer :data="{ points }" :duration="0" class="size-full">
      <VisTopoJSONMap
        :topojson="WorldMapTopoJSON"
        :disable-zoom="true"
        :latitude="(d: WorldMapPoint) => d.latitude"
        :longitude="(d: WorldMapPoint) => d.longitude"
        :point-color="chartColor(0)"
        :point-radius="4"
      />
      <VisTooltip :triggers="triggers" />
    </VisSingleContainer>
  </div>
</template>
