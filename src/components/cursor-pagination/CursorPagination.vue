<script setup lang="ts">
import type {HTMLAttributes} from "vue"
import {ChevronLeftIcon, ChevronRightIcon} from "@lucide/vue"
import {cn} from "nom-ui/lib/utils"
import {Button} from "../button"
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "../select"

const props = withDefaults(defineProps<{
  hasPrevious: boolean
  hasNext: boolean
  pageSize?: number
  /** Options for the page-size select. The select renders only when set. */
  pageSizes?: number[]
  loading?: boolean
  previousLabel?: string
  nextLabel?: string
  class?: HTMLAttributes["class"]
}>(), {
  previousLabel: "Previous",
  nextLabel: "Next",
})

const emit = defineEmits<{
  previous: []
  next: []
  "update:pageSize": [size: number]
}>()
</script>

<template>
  <div data-slot="cursor-pagination" :class="cn('flex items-center gap-2', props.class)">
    <Select
      v-if="pageSizes"
      :model-value="pageSize"
      :disabled="loading"
      @update:model-value="(v) => emit('update:pageSize', Number(v))"
    >
      <SelectTrigger class="h-8 w-20" aria-label="Page size">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectItem v-for="size in pageSizes" :key="size" :value="size">{{ size }}</SelectItem>
      </SelectContent>
    </Select>
    <div class="ml-auto flex gap-2">
      <Button type="button" variant="outline" size="sm" :disabled="!hasPrevious || loading" @click="emit('previous')">
        <ChevronLeftIcon />
        {{ previousLabel }}
      </Button>
      <Button type="button" variant="outline" size="sm" :disabled="!hasNext || loading" @click="emit('next')">
        {{ nextLabel }}
        <ChevronRightIcon />
      </Button>
    </div>
  </div>
</template>
