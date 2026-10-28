<script setup lang="ts">
import { computed, type HTMLAttributes } from "vue"
import { cn } from "nom-ui/lib/utils"
import { meterVariants, type MeterVariants } from "./index"

const props = withDefaults(
  defineProps<{
    value: number
    max?: number
    tone?: MeterVariants["tone"]
    class?: HTMLAttributes["class"]
  }>(),
  { max: 100 },
)

const percent = computed(() =>
  props.max > 0 ? Math.min(100, Math.max(0, (props.value / props.max) * 100)) : 0,
)
</script>

<template>
  <div
    data-slot="meter"
    aria-hidden="true"
    :class="cn('relative h-1 w-full overflow-hidden rounded-[1px] bg-muted', props.class)"
  >
    <span :class="meterVariants({ tone })" :style="{ width: `${percent}%` }" />
  </div>
</template>
