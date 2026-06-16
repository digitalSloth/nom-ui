<script setup lang="ts">
import { Button } from 'nom-ui'
import { PlusIcon, Trash2Icon } from '@lucide/vue'
import Section from '../components/Section.vue'
import Example from '../components/Example.vue'

const variants = ['default', 'secondary', 'outline', 'ghost', 'link', 'destructive', 'invisible'] as const
const sizes = ['xs', 'sm', 'default', 'lg'] as const
</script>

<template>
  <Section id="buttons" title="Button" description="All variants and sizes from buttonVariants.">
    <Example label="Variants">
      <Button v-for="v in variants" :key="v" :variant="v">{{ v }}</Button>
    </Example>

    <Example label="Sizes">
      <Button v-for="s in sizes" :key="s" :size="s">{{ s }}</Button>
    </Example>

    <Example label="Icon sizes">
      <Button size="icon-sm" aria-label="Add"><PlusIcon /></Button>
      <Button size="icon" aria-label="Add"><PlusIcon /></Button>
      <Button size="icon-lg" aria-label="Add"><PlusIcon /></Button>
    </Example>

    <Example label="With icons & states">
      <Button><PlusIcon /> New item</Button>
      <Button variant="destructive"><Trash2Icon /> Delete</Button>
      <Button disabled>Disabled</Button>
    </Example>
  </Section>
</template>
