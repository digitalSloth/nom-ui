<script setup lang="ts">
import type {HTMLAttributes} from "vue"
import {cn} from "../../lib/utils"

const props = withDefaults(defineProps<{
  ordered?: boolean
  class?: HTMLAttributes["class"]
}>(), {
  ordered: false,
})
</script>

<template>
  <component
    :is="ordered ? 'ol' : 'ul'"
    :class="cn('my-6 ml-6 [&>li]:mt-2', ordered ? 'list-decimal' : 'list-disc', props.class)"
  >
    <slot />
  </component>
</template>
