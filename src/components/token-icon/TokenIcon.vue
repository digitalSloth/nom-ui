<script setup lang="ts">
import type {HTMLAttributes} from "vue"
import {computed} from "vue"
import {cn} from "nom-ui/lib/utils"
import {Avatar, AvatarFallback, AvatarImage} from "../avatar"

const props = defineProps<{
  /** Token ticker — used for the alt text and the letter fallback. */
  symbol: string
  /** Logo URL; falls back to the ticker when absent or it fails to load. */
  src?: string
  class?: HTMLAttributes["class"]
}>()

// Show the whole ticker (capped) rather than 2 initials — tickers are short.
const fallback = computed(() => props.symbol.slice(0, 4).toUpperCase())
</script>

<template>
  <Avatar :class="cn('size-10', props.class)">
    <AvatarImage v-if="src" :src="src" :alt="symbol" class="object-contain p-1" />
    <AvatarFallback class="text-xs font-medium">{{ fallback }}</AvatarFallback>
  </Avatar>
</template>
