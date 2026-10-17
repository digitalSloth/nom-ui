<script setup lang="ts">
import type {HTMLAttributes} from "vue"
import {cn} from "nom-ui/lib/utils"

const props = defineProps<{
  label: string
  class?: HTMLAttributes["class"]
}>()
</script>

<template>
  <div data-slot="description-item" :class="cn('min-w-0 space-y-1', props.class)">
    <div class="text-ledger text-muted-foreground">{{ label }}</div>
    <div class="min-w-0 break-words text-sm"><slot /></div>
  </div>
</template>
