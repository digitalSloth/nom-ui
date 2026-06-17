<script setup lang="ts">
import { onMounted } from 'vue'
import type { ThemeMode } from 'nom-ui'
import {
  Button,
  Toaster,
  useTheme,
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from 'nom-ui'
import { MoonIcon, SunIcon, MonitorIcon, GitBranchIcon, CheckIcon } from '@lucide/vue'

import BlockchainSection from './sections/BlockchainSection.vue'
import TypographySection from './sections/TypographySection.vue'
import ButtonsSection from './sections/ButtonsSection.vue'
import BadgesSection from './sections/BadgesSection.vue'
import FormsSection from './sections/FormsSection.vue'
import OverlaysSection from './sections/OverlaysSection.vue'
import NavigationSection from './sections/NavigationSection.vue'
import ControlsSection from './sections/ControlsSection.vue'
import DisplaySection from './sections/DisplaySection.vue'
import FeedbackSection from './sections/FeedbackSection.vue'

const { theme, mode, setTheme, initTheme } = useTheme()

const themeOptions: { value: ThemeMode; label: string }[] = [
  { value: 'light', label: 'Light' },
  { value: 'dark', label: 'Dark' },
  { value: 'system', label: 'System' },
]

const nav = [
  { id: 'blockchain', label: 'Blockchain' },
  { id: 'typography', label: 'Typography' },
  { id: 'buttons', label: 'Button' },
  { id: 'badges', label: 'Badge / Alert' },
  { id: 'forms', label: 'Form controls' },
  { id: 'controls', label: 'Controls' },
  { id: 'overlays', label: 'Overlays' },
  { id: 'navigation', label: 'Navigation' },
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
          <DropdownMenu>
            <DropdownMenuTrigger as-child>
              <Button variant="outline" size="icon" aria-label="Theme">
                <MonitorIcon v-if="mode === 'system'" />
                <SunIcon v-else-if="theme === 'light'" />
                <MoonIcon v-else />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" class="w-36">
              <DropdownMenuItem
                v-for="opt in themeOptions"
                :key="opt.value"
                @click="setTheme(opt.value)"
              >
                <SunIcon v-if="opt.value === 'light'" />
                <MoonIcon v-else-if="opt.value === 'dark'" />
                <MonitorIcon v-else />
                {{ opt.label }}
                <CheckIcon v-if="mode === opt.value" class="ml-auto" />
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
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
        <BlockchainSection />
        <TypographySection />
        <ButtonsSection />
        <BadgesSection />
        <FormsSection />
        <ControlsSection />
        <OverlaysSection />
        <NavigationSection />
        <DisplaySection />
        <FeedbackSection />
      </main>
    </div>
  </div>
</template>
