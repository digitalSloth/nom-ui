<script setup lang="ts">
import type {HTMLAttributes} from "vue"
import {computed, ref} from "vue"
import {cn} from "nom-ui/lib/utils"
import {FileIcon, UploadIcon, XIcon} from "@lucide/vue"
import {Button} from "../button"

const props = withDefaults(defineProps<{
  /** The selected file. Use with v-model. */
  modelValue?: File | null
  /** Accepted file types, as an `accept` attribute value (".wasm,.json"). */
  accept?: string
  /** Largest accepted size in bytes. */
  maxSize?: number
  disabled?: boolean
  /** Text under the prompt, for example the accepted types. */
  hint?: string
  /** An error from the parent, shown in place of the internal one. */
  error?: string
  class?: HTMLAttributes["class"]
}>(), {
  modelValue: null,
})

const emit = defineEmits<{
  "update:modelValue": [file: File | null]
  "reject": [reason: string]
}>()

const input = ref<HTMLInputElement | null>(null)
const dragging = ref(false)
const localError = ref<string | null>(null)

const shownError = computed(() => props.error ?? localError.value)

function formatSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KiB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MiB`
}

function accepts(file: File): boolean {
  if (!props.accept) return true
  const rules = props.accept.split(",").map((rule) => rule.trim().toLowerCase()).filter(Boolean)
  const name = file.name.toLowerCase()
  const type = file.type.toLowerCase()
  return rules.some((rule) =>
    rule.startsWith(".") ? name.endsWith(rule)
      : rule.endsWith("/*") ? type.startsWith(rule.slice(0, -1))
        : type === rule,
  )
}

function select(file: File | undefined) {
  if (!file) return
  if (!accepts(file)) {
    localError.value = `${file.name} is not an accepted file type`
    emit("reject", localError.value)
    return
  }
  if (props.maxSize !== undefined && file.size > props.maxSize) {
    localError.value = `${file.name} is ${formatSize(file.size)}, above the ${formatSize(props.maxSize)} limit`
    emit("reject", localError.value)
    return
  }
  localError.value = null
  emit("update:modelValue", file)
}

function clear() {
  localError.value = null
  if (input.value) input.value.value = ""
  emit("update:modelValue", null)
}

function onDrop(event: DragEvent) {
  dragging.value = false
  if (props.disabled) return
  select(event.dataTransfer?.files?.[0])
}
</script>

<template>
  <div data-slot="file-dropzone" :class="cn('space-y-2', props.class)">
    <div
      v-if="!modelValue"
      role="button"
      :tabindex="disabled ? -1 : 0"
      :aria-disabled="disabled"
      :class="cn(
        'flex cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border border-dashed px-6 py-8 text-center text-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring',
        dragging ? 'border-primary bg-primary/5' : 'border-input hover:border-primary',
        shownError && 'border-destructive',
        disabled && 'pointer-events-none opacity-50',
      )"
      @click="input?.click()"
      @keydown.enter.prevent="input?.click()"
      @keydown.space.prevent="input?.click()"
      @dragover.prevent="dragging = true"
      @dragleave.prevent="dragging = false"
      @drop.prevent="onDrop"
    >
      <UploadIcon class="size-6 text-muted-foreground" />
      <p class="font-medium"><slot>Drop a file here, or click to choose</slot></p>
      <p v-if="hint" class="text-ledger text-muted-foreground">{{ hint }}</p>
    </div>

    <div v-else class="flex items-center gap-3 rounded-lg border bg-muted/50 px-4 py-3">
      <FileIcon class="size-5 shrink-0 text-muted-foreground" />
      <div class="min-w-0 flex-1">
        <p class="truncate text-sm font-medium">{{ modelValue.name }}</p>
        <p class="font-mono text-xs tabular-nums text-muted-foreground">{{ formatSize(modelValue.size) }}</p>
      </div>
      <Button type="button" variant="ghost" size="icon-sm" aria-label="Remove file" :disabled="disabled" @click="clear">
        <XIcon />
      </Button>
    </div>

    <input
      ref="input"
      type="file"
      class="sr-only"
      tabindex="-1"
      :accept="accept"
      :disabled="disabled"
      @change="select(($event.target as HTMLInputElement).files?.[0])"
    />
    <p v-if="shownError" role="alert" class="text-sm text-destructive">{{ shownError }}</p>
  </div>
</template>
