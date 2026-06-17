<script setup lang="ts">
import type {HTMLAttributes} from "vue"
import {computed} from "vue"
import {cn} from "../../lib/utils"
import {headingVariants} from "./index.ts"

type Level = 1 | 2 | 3 | 4 | 5 | 6

const props = withDefaults(defineProps<{
  as?: `h${Level}`
  /** Visual size — defaults to the numeric part of `as`, so you can render an
      h2 element that looks like an h1 when you need to. */
  level?: Level
  class?: HTMLAttributes["class"]
}>(), {
  as: "h2",
})

const level = computed<Level>(() => props.level ?? (Number(props.as.slice(1)) as Level))
</script>

<template>
  <component :is="as" :class="cn(headingVariants({ level }), props.class)">
    <slot />
  </component>
</template>
