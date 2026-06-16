<script setup lang="ts">
defineProps<{ id: string; title: string; description?: string }>()
</script>

<template>
  <section :id="id" class="scroll-mt-20 space-y-5">
    <div class="space-y-1">
      <h2 class="text-2xl font-semibold tracking-tight">{{ title }}</h2>
      <p v-if="description" class="text-sm text-muted-foreground">{{ description }}</p>
    </div>
    <div class="space-y-6">
      <slot />
    </div>
  </section>
</template>
