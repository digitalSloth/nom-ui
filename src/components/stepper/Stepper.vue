<script setup lang="ts">
import type {HTMLAttributes} from "vue"
import {cn} from "nom-ui/lib/utils"
import {CheckIcon, CircleIcon, XIcon} from "@lucide/vue"
import {Spinner} from "../spinner"

export type StepState = "waiting" | "active" | "done" | "failed"

export interface StepItem {
  /** Unique within the list. */
  id: string
  title: string
  description?: string
  state: StepState
}

const props = defineProps<{
  steps: StepItem[]
  class?: HTMLAttributes["class"]
}>()

const stateLabel: Record<StepState, string> = {
  waiting: "Waiting",
  active: "In progress",
  done: "Done",
  failed: "Failed",
}

const markerClass: Record<StepState, string> = {
  waiting: "border-border text-muted-foreground",
  active: "border-info bg-info/10 text-info",
  done: "border-transparent bg-success/10 text-success",
  failed: "border-transparent bg-destructive/10 text-destructive",
}
</script>

<template>
  <ol data-slot="stepper" :class="cn('flex flex-col', props.class)">
    <li
      v-for="(step, index) in steps"
      :key="step.id"
      class="relative flex gap-3 pb-6 last:pb-0"
      :aria-current="step.state === 'active' ? 'step' : undefined"
    >
      <span
        v-if="index < steps.length - 1"
        class="absolute left-3.5 top-7 h-[calc(100%-1.75rem)] w-px bg-border"
        aria-hidden="true"
      />
      <span
        :class="cn('relative z-10 flex size-7 shrink-0 items-center justify-center rounded-full border bg-background', markerClass[step.state])"
      >
        <Spinner v-if="step.state === 'active'" class="size-3.5" />
        <CheckIcon v-else-if="step.state === 'done'" class="size-3.5" />
        <XIcon v-else-if="step.state === 'failed'" class="size-3.5" />
        <CircleIcon v-else class="size-3" />
      </span>
      <div class="min-w-0 flex-1 space-y-1 pt-0.5">
        <div class="flex flex-wrap items-baseline gap-x-2">
          <span :class="cn('text-sm font-medium', step.state === 'waiting' && 'text-muted-foreground')">{{ step.title }}</span>
          <span class="text-ledger text-muted-foreground">{{ stateLabel[step.state] }}</span>
        </div>
        <p v-if="step.description" class="text-sm text-muted-foreground">{{ step.description }}</p>
        <slot :step="step" />
      </div>
    </li>
  </ol>
</template>
