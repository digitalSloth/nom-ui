<script setup lang="ts">
import type {HTMLAttributes} from "vue"
import {computed} from "vue"
import {CheckIcon, XIcon} from "@lucide/vue"
import {cn} from "nom-ui/lib/utils"
import type {BadgeVariants} from "../badge"
import {Badge} from "../badge"
import {Spinner} from "../spinner"

type Status = "pending" | "confirming" | "success" | "failed"

const props = defineProps<{
  status: Status
  /** Override the default label. */
  label?: string
  class?: HTMLAttributes["class"]
}>()

const config = {
  pending: {variant: "pending", label: "Pending", spin: true, extra: ""},
  confirming: {variant: "warning", label: "Confirming", spin: true, extra: ""},
  success: {variant: "success", label: "Confirmed", spin: false, extra: ""},
  // Soft-tint the destructive variant so all four read as one status family.
  failed: {
    variant: "destructive",
    label: "Failed",
    spin: false,
    extra: "border-transparent bg-destructive/10 text-destructive dark:bg-destructive/15",
  },
} satisfies Record<Status, {variant: BadgeVariants["variant"]; label: string; spin: boolean; extra: string}>

const current = computed(() => config[props.status])
</script>

<template>
  <Badge :variant="current.variant" :class="cn(current.extra, props.class)">
    <Spinner v-if="current.spin" class="size-3" />
    <CheckIcon v-else-if="status === 'success'" />
    <XIcon v-else-if="status === 'failed'" />
    {{ label ?? current.label }}
  </Badge>
</template>
