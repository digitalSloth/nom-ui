<script setup lang="ts">
import type {HTMLAttributes} from "vue"
import {computed} from "vue"
import {cn} from "nom-ui/lib/utils"
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "../tooltip"
import {CopyButton} from "../copy-button"

const props = withDefaults(defineProps<{
  /** Full address or hash. */
  address: string
  /** Leading characters to keep (includes any prefix like 0x / z1). */
  start?: number
  /** Trailing characters to keep. */
  end?: number
  truncate?: boolean
  /** Show the inline copy button. */
  copy?: boolean
  /** Explorer URL — renders the value as a link when set. */
  href?: string
  class?: HTMLAttributes["class"]
}>(), {
  start: 6,
  end: 4,
  truncate: true,
  copy: true,
})

const display = computed(() => {
  const v = props.address
  if (!props.truncate || v.length <= props.start + props.end + 1) return v
  return `${v.slice(0, props.start)}…${v.slice(-props.end)}`
})
</script>

<template>
  <span :class="cn('inline-flex items-center gap-1 font-mono text-sm', props.class)">
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger as-child>
          <a
            v-if="href"
            :href="href"
            target="_blank"
            rel="noreferrer"
            class="underline-offset-4 hover:text-info hover:underline"
          >{{ display }}</a>
          <span v-else>{{ display }}</span>
        </TooltipTrigger>
        <TooltipContent class="font-mono">{{ address }}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
    <CopyButton v-if="copy" :value="address" size="icon-sm" class="size-7" />
  </span>
</template>
