<script setup lang="ts">
import { computed, type HTMLAttributes } from "vue"
import { cn } from "nom-ui/lib/utils"
import type { SplitBarPart } from "./index"
import { chartColor } from "./utils"

const props = defineProps<{
  parts: SplitBarPart[]
  class?: HTMLAttributes["class"]
}>()

// The index is the caller's position, so colour follows the part, not its rank after filtering.
const shown = computed(() =>
  props.parts
    .map((p, i) => ({ index: i, value: p.value, color: p.color ?? chartColor(i) }))
    .filter((p) => p.value > 0),
)
</script>

<template>
  <div
    data-slot="split-bar"
    aria-hidden="true"
    :class="cn('flex h-2.5 w-full gap-0.5', props.class)"
  >
    <span
      v-for="part in shown"
      :key="part.index"
      class="rounded-[1px]"
      :style="{ flex: `${part.value} 1 0%`, background: part.color }"
    />
  </div>
</template>
