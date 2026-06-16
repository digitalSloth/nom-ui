<script setup lang="ts">
defineProps<{ label?: string }>()
</script>

<template>
  <div class="space-y-3">
    <p v-if="label" class="text-xs font-medium uppercase tracking-wide text-muted-foreground">
      {{ label }}
    </p>
    <div class="flex flex-wrap items-center gap-3">
      <slot />
    </div>
  </div>
</template>
