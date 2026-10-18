<script setup lang="ts" generic="T extends MobileNavItem">
import type {Component, HTMLAttributes} from "vue"
import {ref} from "vue"
import {MenuIcon} from "@lucide/vue"
import {cn} from "nom-ui/lib/utils"
import {Button} from "../button"
import {Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger} from "../sheet"
import type {MobileNavItem} from "./index"

defineOptions({inheritAttrs: false})

const props = withDefaults(defineProps<{
  items: T[]
  isActive: (item: T) => boolean
  /** Link component, e.g. vue-router's RouterLink. "a" renders plain anchors with href. */
  linkAs: Component | string
  title?: string
  /** Classes for the trigger button, merged over its sm:hidden default. */
  class?: HTMLAttributes["class"]
}>(), {
  title: "Menu",
})

const open = ref(false)
</script>

<template>
  <Sheet v-model:open="open">
    <SheetTrigger as-child>
      <Button
        data-slot="mobile-nav"
        variant="ghost"
        size="icon"
        :class="cn('sm:hidden', props.class)"
        aria-label="Open menu"
        v-bind="$attrs"
      >
        <MenuIcon class="h-5 w-5" />
      </Button>
    </SheetTrigger>
    <SheetContent side="left" class="w-64">
      <SheetHeader>
        <SheetTitle>{{ title }}</SheetTitle>
        <SheetDescription class="sr-only">Site navigation</SheetDescription>
      </SheetHeader>
      <nav class="flex flex-col gap-1 px-4">
        <component
          :is="linkAs"
          v-for="item in items"
          :key="item.to"
          v-bind="linkAs === 'a' ? {href: item.to} : {to: item.to}"
          class="rounded-md px-3 py-2 text-sm text-muted-foreground hover:bg-accent hover:text-foreground"
          :class="isActive(item) && 'bg-accent font-medium text-foreground'"
          :aria-current="isActive(item) ? 'page' : undefined"
          @click="open = false"
        >
          {{ item.label }}
        </component>
      </nav>
    </SheetContent>
  </Sheet>
</template>
