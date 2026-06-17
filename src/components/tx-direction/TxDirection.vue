<script setup lang="ts">
import type {HTMLAttributes} from "vue"
import {computed} from "vue"
import {ArrowDownLeftIcon, ArrowUpRightIcon} from "@lucide/vue"
import {cn} from "nom-ui/lib/utils"
import type {BadgeVariants} from "../badge"
import {Badge} from "../badge"

type Direction = "in" | "out"

const props = defineProps<{
  direction: Direction
  /** Override the default label ("In" / "Out"). */
  label?: string
  class?: HTMLAttributes["class"]
}>()

const config = {
  // Incoming value reads green; outgoing is neutral movement, not an error.
  in: {variant: "success" as BadgeVariants["variant"], label: "In", extra: ""},
  out: {
    variant: "outline" as BadgeVariants["variant"],
    label: "Out",
    extra: "border-transparent bg-muted text-muted-foreground",
  },
} satisfies Record<Direction, {variant: BadgeVariants["variant"]; label: string; extra: string}>

const current = computed(() => config[props.direction])
</script>

<template>
  <Badge :variant="current.variant" :class="cn(current.extra, props.class)">
    <ArrowDownLeftIcon v-if="direction === 'in'" />
    <ArrowUpRightIcon v-else />
    {{ label ?? current.label }}
  </Badge>
</template>
