<script setup lang="ts">
import type {DropdownMenuSubTriggerProps} from "reka-ui"
import {DropdownMenuSubTrigger, useForwardProps,} from "reka-ui"
import type {HTMLAttributes} from "vue"
import {reactiveOmit} from "@vueuse/core"
import {ChevronRightIcon} from '@lucide/vue'
import {cn} from '../../lib/utils'

const props = defineProps<DropdownMenuSubTriggerProps & { class?: HTMLAttributes["class"] }>()

const delegatedProps = reactiveOmit(props, "class")

const forwardedProps = useForwardProps(delegatedProps)
</script>

<template>
  <DropdownMenuSubTrigger
    v-bind="forwardedProps"
    :class="cn(
      'flex cursor-default select-none items-center px-2 py-1.5 text-sm outline-none focus:bg-accent data-[state=open]:bg-accent data-[highlighted]:bg-accent data-[highlighted]:text-accent-foreground data-[highlighted]:shadow-[inset_2px_0_0_var(--primary)]',
      props.class,
    )"
  >
    <slot />
    <ChevronRightIcon class="ml-auto h-4 w-4" />
  </DropdownMenuSubTrigger>
</template>
