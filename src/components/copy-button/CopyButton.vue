<script setup lang="ts">
import type {HTMLAttributes} from "vue"
import {useClipboard} from "@vueuse/core"
import {CheckIcon, CopyIcon} from "@lucide/vue"
import type {ButtonVariants} from "../button"
import {Button} from "../button"

const props = withDefaults(defineProps<{
  value: string
  variant?: ButtonVariants["variant"]
  size?: ButtonVariants["size"]
  class?: HTMLAttributes["class"]
}>(), {
  variant: "ghost",
  size: "icon-sm",
})

// legacy: true keeps copy working outside secure contexts (e.g. extensions).
const {copy, copied} = useClipboard({legacy: true})
</script>

<template>
  <Button
    type="button"
    :variant="variant"
    :size="size"
    :class="props.class"
    :aria-label="copied ? 'Copied' : 'Copy'"
    @click="copy(value)"
  >
    <CheckIcon v-if="copied" class="text-success" />
    <CopyIcon v-else />
  </Button>
</template>
