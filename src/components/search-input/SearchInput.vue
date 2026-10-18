<script setup lang="ts">
import type {HTMLAttributes} from "vue"
import {SearchIcon} from "@lucide/vue"
import {cn} from "nom-ui/lib/utils"
import {InputGroup, InputGroupAddon, InputGroupInput} from "../input-group"
import {Spinner} from "../spinner"

const props = defineProps<{
  modelValue: string
  placeholder?: string
  loading?: boolean
  error?: string | null
  class?: HTMLAttributes["class"]
}>()

const emit = defineEmits<{
  "update:modelValue": [value: string]
  submit: [value: string]
}>()

function onSubmit() {
  const value = props.modelValue.trim()
  if (!value || props.loading) return
  emit("submit", value)
}
</script>

<template>
  <form role="search" data-slot="search-input" :class="cn('relative', props.class)" @submit.prevent="onSubmit">
    <InputGroup>
      <InputGroupAddon>
        <SearchIcon />
      </InputGroupAddon>
      <InputGroupInput
        :model-value="modelValue"
        :placeholder="placeholder"
        :aria-label="placeholder ?? 'Search'"
        :aria-invalid="error ? true : undefined"
        @update:model-value="(v: string | number) => emit('update:modelValue', String(v))"
      />
      <InputGroupAddon align="inline-end">
        <Spinner v-if="loading" />
      </InputGroupAddon>
    </InputGroup>
    <p v-if="error" class="absolute inset-x-0 top-full mt-1 text-xs text-destructive">{{ error }}</p>
  </form>
</template>
