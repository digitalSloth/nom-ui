<script setup lang="ts">
import type {SelectLabelProps} from "reka-ui"
import {SelectLabel} from "reka-ui"
import type {HTMLAttributes} from "vue"
import {cn} from "../../lib/utils"

const props = defineProps<SelectLabelProps & { class?: HTMLAttributes["class"] }>()
</script>

<template>
  <SelectLabel :class="cn('px-2 pt-2 pb-1 text-ledger text-muted-foreground', props.class)">
    <slot />
  </SelectLabel>
</template>
