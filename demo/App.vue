<script setup lang="ts">
import { onMounted } from 'vue'
import { Button, Toaster, useTheme } from 'nom-ui'
import { MoonIcon, SunIcon, GitBranchIcon } from '@lucide/vue'

import ButtonsSection from './sections/ButtonsSection.vue'
import BadgesSection from './sections/BadgesSection.vue'
import FormsSection from './sections/FormsSection.vue'
import OverlaysSection from './sections/OverlaysSection.vue'
import DisplaySection from './sections/DisplaySection.vue'
import FeedbackSection from './sections/FeedbackSection.vue'

const { theme, toggleTheme, initTheme } = useTheme()

const nav = [
  { id: 'buttons', label: 'Button' },
  { id: 'badges', label: 'Badge / Alert / Type' },
  { id: 'forms', label: 'Form controls' },
  { id: 'overlays', label: 'Overlays' },
  { id: 'display', label: 'Data display' },
  { id: 'feedback', label: 'Toasts' },
]

onMounted(initTheme)
</script>

<template>
  <div class="min-h-screen bg-background text-foreground">
    <Toaster position="bottom-right" rich-colors />

    <header class="sticky top-0 z-40 border-b bg-background/80 backdrop-blur">
      <div class="mx-auto flex h-14 max-w-6xl items-center justify-between px-6">
        <div class="flex items-baseline gap-2">
          <span class="text-base font-semibold">nom-ui</span>
          <span class="text-sm text-muted-foreground">playground</span>
        </div>
        <div class="flex items-center gap-2">
          <Button
            as="a"
            href="https://github.com/digitalSloth/nom-ui"
            target="_blank"
            variant="ghost"
            size="icon"
            aria-label="GitHub"
          >
            <GitBranchIcon />
          </Button>
          <Button variant="outline" size="icon" aria-label="Toggle theme" @click="toggleTheme">
            <MoonIcon v-if="theme === 'light'" />
            <SunIcon v-else />
          </Button>
        </div>
      </div>
    </header>

    <div class="mx-auto flex max-w-6xl gap-10 px-6 py-10">
      <aside class="hidden w-44 shrink-0 lg:block">
        <nav class="sticky top-20 space-y-1">
          <a
            v-for="item in nav"
            :key="item.id"
            :href="`#${item.id}`"
            class="block rounded-md px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
          >
            {{ item.label }}
          </a>
        </nav>
      </aside>

      <main class="min-w-0 flex-1 space-y-16 pb-24">
        <ButtonsSection />
        <BadgesSection />
        <FormsSection />
        <OverlaysSection />
        <DisplaySection />
        <FeedbackSection />
      </main>
    </div>
  </div>
</template>
