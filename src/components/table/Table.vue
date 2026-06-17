<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { cn } from 'nom-ui/lib/utils'

const props = withDefaults(defineProps<{
  class?: HTMLAttributes["class"]
  /** "compact" tightens row height for data-dense (explorer) tables. */
  density?: "default" | "compact"
}>(), {
  density: "default",
})
</script>

<template>
  <div data-slot="table-container" class="relative w-full overflow-auto">
    <table
      data-slot="table"
      :data-density="props.density"
      :class="cn('group/table w-full caption-bottom text-sm', props.class)"
    >
      <slot />
    </table>
  </div>
</template>
