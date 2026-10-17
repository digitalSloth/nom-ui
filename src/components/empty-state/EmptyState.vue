<script setup lang="ts">
import type {HTMLAttributes} from "vue"
import {cn} from "nom-ui/lib/utils"

const props = defineProps<{
  title?: string
  class?: HTMLAttributes["class"]
}>()
</script>

<template>
  <div
    data-slot="empty-state"
    :class="cn('flex flex-col items-center justify-center gap-2 py-8 text-center text-sm text-muted-foreground [&_svg]:size-6 [&_svg]:shrink-0', props.class)"
  >
    <slot name="icon" />
    <p v-if="title" class="font-medium text-foreground">{{ title }}</p>
    <p v-if="$slots.default" class="max-w-prose text-balance"><slot /></p>
    <div v-if="$slots.action" class="mt-2"><slot name="action" /></div>
  </div>
</template>
