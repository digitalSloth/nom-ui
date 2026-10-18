<script setup lang="ts">
import type {HTMLAttributes} from "vue"
import {cn} from "nom-ui/lib/utils"
import {Card, CardContent} from "../card"

const props = defineProps<{
  label: string
  value?: string | number
  hint?: string
  class?: HTMLAttributes["class"]
}>()
</script>

<template>
  <Card data-slot="stat-tile" :class="cn(props.class)">
    <CardContent class="p-4">
      <div class="text-ledger text-muted-foreground">{{ label }}</div>
      <div class="mt-1 font-mono text-2xl font-semibold tabular-nums">
        <slot>{{ value ?? "—" }}</slot>
      </div>
      <p v-if="hint" class="mt-1 text-xs text-muted-foreground">{{ hint }}</p>
    </CardContent>
  </Card>
</template>
