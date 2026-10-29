<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { cn } from 'nom-ui/lib/utils'

const props = defineProps<{
  class?: HTMLAttributes["class"]
}>()
</script>

<template>
  <tr
    data-slot="table-row"
    :class="cn('group/row hover:bg-muted/50 focus-within:bg-muted/50 data-[state=selected]:bg-muted border-b transition-colors', props.class)"
  >
    <slot />
  </tr>
</template>
