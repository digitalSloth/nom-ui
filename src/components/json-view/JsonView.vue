<script setup lang="ts">
import type {HTMLAttributes} from "vue"
import {computed} from "vue"
import {cn} from "nom-ui/lib/utils"
import {CopyButton} from "../copy-button"

const props = withDefaults(defineProps<{
  value: unknown
  label?: string
  class?: HTMLAttributes["class"]
}>(), {
  label: "JSON",
})

function replacer(this: Record<string, unknown>, key: string, value: unknown): unknown {
  const raw = this[key]
  if (raw instanceof Uint8Array) return `0x${Array.from(raw, (b) => b.toString(16).padStart(2, "0")).join("")}`
  if (typeof value === "bigint") return value.toString()
  return value
}

const text = computed(() => JSON.stringify(props.value, replacer, 2) ?? String(props.value))
</script>

<template>
  <div data-slot="json-view" :class="cn('rounded-md border bg-muted/50', props.class)">
    <div class="flex items-center justify-between gap-2 border-b px-3 py-1.5">
      <span class="text-ledger text-muted-foreground">{{ label }}</span>
      <div class="flex items-center gap-2">
        <slot name="actions" />
        <CopyButton :value="text" />
      </div>
    </div>
    <pre class="max-h-96 overflow-auto px-3 py-2 font-mono text-xs leading-relaxed">{{ text }}</pre>
  </div>
</template>
