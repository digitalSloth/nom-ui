<script setup lang="ts">
import type {HTMLAttributes} from "vue"
import {computed} from "vue"
import {useMediaQuery} from "@vueuse/core"
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
  /**
   * Truncate only below the given Tailwind breakpoint, showing the full value
   * at or above it. Overrides `truncate`. Client-only (resolves after hydration).
   */
  truncateBelow?: "sm" | "md" | "lg"
  /** Wrap the full value across lines instead of truncating. Overrides truncation. */
  wrap?: boolean
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
  wrap: false,
  copy: true,
  tooltip: true,
})

const breakpoints = {sm: 640, md: 768, lg: 1024}
const query = computed(() =>
  props.truncateBelow
    ? `(max-width: ${breakpoints[props.truncateBelow] - 1}px)`
    : "(max-width: 0px)",
)
const isNarrow = useMediaQuery(query)

const display = computed(() => {
  const v = props.address
  if (props.wrap) return v
  const doTruncate = props.truncateBelow ? isNarrow.value : props.truncate
  if (!doTruncate || v.length <= props.start + props.end + 1) return v
  return `${v.slice(0, props.start)}…${v.slice(-props.end)}`
})

const valueTag = computed(() => (props.href ? "a" : "span"))
const valueClass = computed(() =>
  cn(
    props.href && "underline-offset-4 hover:text-info hover:underline",
    props.wrap && "break-all",
  ),
)
const valueAttrs = computed(() =>
  props.href
    ? {href: props.href, target: "_blank", rel: "noreferrer"}
    : {},
)
</script>

<template>
  <span :class="cn('inline-flex items-center gap-1 font-mono text-sm', wrap && 'items-start', props.class)">
    <TooltipProvider v-if="tooltip && !wrap">
      <Tooltip>
        <TooltipTrigger as-child>
          <component :is="valueTag" v-bind="valueAttrs" :class="valueClass">{{ display }}</component>
        </TooltipTrigger>
        <TooltipContent class="font-mono">{{ address }}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
    <component :is="valueTag" v-else v-bind="valueAttrs" :class="valueClass">{{ display }}</component>

    <CopyButton v-if="copy" :value="address" size="icon-sm" class="size-7" />
  </span>
</template>
