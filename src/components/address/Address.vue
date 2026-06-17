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
  /** Reveal the full value in a tooltip on hover. */
  tooltip?: boolean
  /** Explorer URL — renders the value as a link when set. */
  href?: string
  class?: HTMLAttributes["class"]
}>(), {
  start: 6,
  end: 4,
  truncate: true,
  copy: true,
  tooltip: true,
})

const display = computed(() => {
  const v = props.address
  if (!props.truncate || v.length <= props.start + props.end + 1) return v
  return `${v.slice(0, props.start)}…${v.slice(-props.end)}`
})

const valueTag = computed(() => (props.href ? "a" : "span"))
const valueAttrs = computed(() =>
  props.href
    ? {
        href: props.href,
        target: "_blank",
        rel: "noreferrer",
        class: "underline-offset-4 hover:text-info hover:underline",
      }
    : {},
)
</script>

<template>
  <span :class="cn('inline-flex items-center gap-1 font-mono text-sm', props.class)">
    <TooltipProvider v-if="tooltip">
      <Tooltip>
        <TooltipTrigger as-child>
          <component :is="valueTag" v-bind="valueAttrs">{{ display }}</component>
        </TooltipTrigger>
        <TooltipContent class="font-mono">{{ address }}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
    <component :is="valueTag" v-else v-bind="valueAttrs">{{ display }}</component>

    <CopyButton v-if="copy" :value="address" size="icon-sm" class="size-7" />
  </span>
</template>
