<script setup lang="ts">
defineProps<{
  items: { label: string; color: string }[]
}>()
</script>

<template>
  <ul class="flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
    <li v-for="item in items" :key="item.label" class="flex items-center gap-1.5">
      <span class="size-2 shrink-0" :style="{ background: item.color }" />
      {{ item.label }}
    </li>
  </ul>
</template>
