<script setup lang="ts">
import type {HTMLAttributes} from "vue"
import {computed, ref} from "vue"
import {cn} from "nom-ui/lib/utils"
import {CopyButton} from "../copy-button"
import {Button} from "../button"

const props = withDefaults(defineProps<{
  /** Hex digits, with or without a 0x prefix. */
  value: string
  /** Characters shown while collapsed. Set 0 to always show everything. */
  previewLength?: number
  label?: string
  class?: HTMLAttributes["class"]
}>(), {
  previewLength: 128,
})

const expanded = ref(false)

const digits = computed(() => props.value.replace(/^0x/i, ""))
const byteLength = computed(() => Math.floor(digits.value.length / 2))
const collapsible = computed(() => props.previewLength > 0 && digits.value.length > props.previewLength)
const shown = computed(() =>
  collapsible.value && !expanded.value ? `${digits.value.slice(0, props.previewLength)}…` : digits.value,
)
</script>

<template>
  <div data-slot="hex-view" :class="cn('rounded-md border bg-muted/50', props.class)">
    <div class="flex items-center justify-between gap-2 border-b px-3 py-1.5">
      <span class="text-ledger text-muted-foreground">{{ label ?? "Hex" }}</span>
      <div class="flex items-center gap-2">
        <span class="font-mono text-xs tabular-nums text-muted-foreground">{{ byteLength }} bytes</span>
        <CopyButton :value="digits" />
      </div>
    </div>
    <p class="max-h-64 overflow-auto break-all px-3 py-2 font-mono text-xs leading-relaxed">{{ shown || "empty" }}</p>
    <div v-if="collapsible" class="border-t px-2 py-1">
      <Button type="button" variant="ghost" size="xs" :aria-expanded="expanded" @click="expanded = !expanded">
        {{ expanded ? "Show less" : "Show all" }}
      </Button>
    </div>
  </div>
</template>
