<script setup lang="ts">
import { Button, useToast } from 'nom-ui'
import Section from '../components/Section.vue'
import Example from '../components/Example.vue'

const { show } = useToast()
</script>

<template>
  <Section id="feedback" title="Toasts" description="Sonner toasts via the useToast composable. The Toaster is mounted in App.vue.">
    <Example label="Types">
      <Button variant="outline" @click="show('Changes saved', 'success')">Success</Button>
      <Button variant="outline" @click="show('Something went wrong', 'error')">Error</Button>
      <Button variant="outline" @click="show('Heads up', 'info')">Info</Button>
      <Button variant="outline" @click="show('Careful now', 'warning')">Warning</Button>
    </Example>

    <Example label="With description & action">
      <Button
        variant="outline"
        @click="show('Event created', 'success', {
          description: 'Friday, June 19 at 5:00 PM',
          action: { label: 'Undo', onClick: () => show('Undone', 'info') },
        })"
      >
        Rich toast
      </Button>
    </Example>
  </Section>
</template>
