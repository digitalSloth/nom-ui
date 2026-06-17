<script setup lang="ts">
import type {HTMLAttributes} from "vue"
import {cn} from "../../lib/utils"
import type {TextVariants} from "./index.ts"
import {textVariants} from "./index.ts"

const props = withDefaults(defineProps<{
  as?: string
  variant?: TextVariants["variant"]
  class?: HTMLAttributes["class"]
}>(), {
  as: "p",
})
</script>

<template>
  <component :is="as" :class="cn(textVariants({ variant }), props.class)">
    <slot />
  </component>
</template>
