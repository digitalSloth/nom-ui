<script setup lang="ts">
import type {Component, HTMLAttributes} from "vue"
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
  /** Show the copy button only on row hover or focus (always on touch). */
  copyReveal?: boolean
  /** Reveal the full value in a tooltip on hover. */
  tooltip?: boolean
  /** Explorer URL — renders the value as a link when set. */
  href?: string
  /**
   * In-app route. Renders the value with `linkAs` (e.g. vue-router's
   * `RouterLink`) instead of a plain anchor, so navigation stays client-side.
   * Takes precedence over `href` when `linkAs` is also set.
   */
  to?: string | Record<string, unknown>
  /** Component used to render the link when `to` is set. */
  linkAs?: Component | string
  /** Link target (e.g. "_blank"). Omit to open in the current tab. */
  target?: "_self" | "_blank" | "_parent" | "_top"
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

const isRouted = computed(() => props.to !== undefined && props.linkAs !== undefined)
const isLink = computed(() => isRouted.value || !!props.href)
const valueTag = computed(() => (isRouted.value ? props.linkAs! : props.href ? "a" : "span"))
const valueClass = computed(() =>
  cn(
    isLink.value && "text-link underline-offset-4 hover:underline",
    props.wrap && "break-all",
  ),
)
const valueAttrs = computed(() =>
  isRouted.value
    ? {to: props.to, target: props.target}
    : props.href
    ? {
        href: props.href,
        target: props.target,
        rel: props.target === "_blank" ? "noopener noreferrer" : undefined,
      }
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

    <CopyButton v-if="copy" :value="address" size="icon-sm" :reveal="copyReveal" class="size-7" />
  </span>
</template>
