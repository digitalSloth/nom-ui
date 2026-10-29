<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { cn } from 'nom-ui/lib/utils'

const props = defineProps<{
  /**
   * Sticks the header cells to the nearest scroll container. `Table`
   * wraps itself in an `overflow-auto` container, so the header sticks
   * to an outer scroll area only when that container is set to
   * `overflow-visible`, for example through `[data-slot=table-container]`.
   */
  sticky?: boolean
  class?: HTMLAttributes["class"]
}>()
</script>

<template>
  <thead
    data-slot="table-header"
    :class="cn('[&_tr]:border-b', sticky && '[&_th]:sticky [&_th]:top-0 [&_th]:z-10 [&_th]:bg-card', props.class)"
  >
    <slot />
  </thead>
</template>
