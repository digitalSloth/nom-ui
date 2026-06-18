<script setup lang="ts">
import type {Component, HTMLAttributes} from "vue"
import {computed} from "vue"
import {cn} from "nom-ui/lib/utils"
import {Avatar, AvatarFallback, AvatarImage} from "../avatar"
import ZnnLogo from "./logos/ZnnLogo.vue"
import QsrLogo from "./logos/QsrLogo.vue"

const props = defineProps<{
  /** Token ticker — used for the alt text and the letter fallback. */
  symbol: string
  /** Logo URL; falls back to a built-in logo or the ticker when absent. */
  src?: string
  class?: HTMLAttributes["class"]
}>()

// Bundled logos for known NoM tokens. An explicit `src` always takes precedence.
const builtInLogos: Record<string, Component> = {
  ZNN: ZnnLogo,
  QSR: QsrLogo,
}
const logo = computed<Component | null>(() =>
  props.src ? null : builtInLogos[props.symbol?.toUpperCase()] ?? null,
)

// Show the whole ticker (capped) rather than 2 initials — tickers are short.
const fallback = computed(() => props.symbol.slice(0, 4).toUpperCase())
</script>

<template>
  <Avatar :class="cn('size-10', props.class)">
    <component :is="logo" v-if="logo" class="size-full p-1.5" />
    <AvatarImage v-else-if="src" :src="src" :alt="symbol" class="object-contain p-1" />
    <AvatarFallback v-else class="text-xs font-medium">{{ fallback }}</AvatarFallback>
  </Avatar>
</template>
