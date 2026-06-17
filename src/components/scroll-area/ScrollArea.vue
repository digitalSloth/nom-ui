<script setup lang="ts">
import type { ScrollAreaRootProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { ref } from "vue"
import { reactiveOmit } from "@vueuse/core"
import {
  ScrollAreaCorner,
  ScrollAreaRoot,
  ScrollAreaViewport,
} from "reka-ui"
import { cn } from 'nom-ui/lib/utils'
import { useScrollFade } from '../../composables/useScrollFade'
import ScrollBar from "./ScrollBar.vue"

const props = withDefaults(defineProps<ScrollAreaRootProps & {
  class?: HTMLAttributes["class"]
  /** Fade the scrollable edges to signal more content. */
  fade?: boolean
  /** Axis to fade. Defaults to the vertical scroll. */
  axis?: "x" | "y"
}>(), {
  fade: true,
  axis: "y",
})

const delegatedProps = reactiveOmit(props, "class", "fade", "axis")

// reka's ScrollAreaViewport exposes `viewportElement` — the actual overflow
// scroll container (it does NOT forward $el, since inheritAttrs is false).
const viewport = ref<{ viewportElement?: HTMLElement } | null>(null)
const { maskStyle } = useScrollFade(
  () => (props.fade ? viewport.value?.viewportElement ?? null : null),
  { axis: props.axis },
)
</script>

<template>
  <ScrollAreaRoot
    data-slot="scroll-area"
    v-bind="delegatedProps"
    :class="cn('relative', props.class)"
  >
    <ScrollAreaViewport
      ref="viewport"
      data-slot="scroll-area-viewport"
      :style="maskStyle"
      class="focus-visible:ring-ring/50 size-full rounded-[inherit] transition-[color,box-shadow] outline-none focus-visible:ring-3 focus-visible:outline-1"
    >
      <slot />
    </ScrollAreaViewport>
    <ScrollBar :orientation="axis === 'x' ? 'horizontal' : 'vertical'" />
    <ScrollAreaCorner />
  </ScrollAreaRoot>
</template>
