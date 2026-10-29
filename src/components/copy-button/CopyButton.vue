<script setup lang="ts">
import type {HTMLAttributes} from "vue"
import {useClipboard} from "@vueuse/core"
import {CheckIcon, CopyIcon} from "@lucide/vue"
import {cn} from "nom-ui/lib/utils"
import type {ButtonVariants} from "../button"
import {Button} from "../button"

const props = withDefaults(defineProps<{
  value: string
  variant?: ButtonVariants["variant"]
  size?: ButtonVariants["size"]
  /** Show the button only on row hover or focus (always on touch). Needs a `group/row` ancestor such as `TableRow`. */
  reveal?: boolean
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
    :class="cn(reveal && 'opacity-0 group-hover/row:opacity-100 group-focus-within/row:opacity-100 focus-visible:opacity-100 [@media(hover:none)]:opacity-100', props.class)"
    :aria-label="copied ? 'Copied' : 'Copy'"
    @click="copy(value)"
  >
    <CheckIcon v-if="copied" class="text-success" />
    <CopyIcon v-else />
  </Button>
</template>
