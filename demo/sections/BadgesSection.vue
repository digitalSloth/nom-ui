<script setup lang="ts">
import {
  Badge,
  Alert,
  AlertTitle,
  AlertDescription,
  Heading,
  Separator,
} from 'nom-ui'
import { InfoIcon, CircleAlertIcon, TerminalIcon } from '@lucide/vue'
import Section from '../components/Section.vue'
import Example from '../components/Example.vue'
</script>

<template>
  <Section id="badges" title="Badge, Alert & Typography" description="Status chips, callouts and headings.">
    <Example label="Badge variants">
      <Badge>default</Badge>
      <Badge variant="secondary">secondary</Badge>
      <Badge variant="outline">outline</Badge>
      <Badge variant="destructive">destructive</Badge>
    </Example>

    <Example label="Alerts">
      <div class="w-full max-w-xl space-y-3">
        <Alert>
          <TerminalIcon class="size-4" />
          <AlertTitle>Heads up!</AlertTitle>
          <AlertDescription>You can add components to your app using the CLI.</AlertDescription>
        </Alert>
        <Alert variant="info">
          <InfoIcon class="size-4" />
          <AlertTitle>Did you know?</AlertTitle>
          <AlertDescription>This alert uses the custom info variant.</AlertDescription>
        </Alert>
        <Alert variant="destructive">
          <CircleAlertIcon class="size-4" />
          <AlertTitle>Something went wrong</AlertTitle>
          <AlertDescription>Your session has expired. Please log in again.</AlertDescription>
        </Alert>
      </div>
    </Example>

    <Example label="Headings">
      <div class="w-full space-y-2">
        <Heading as="h1" class="text-3xl">Heading h1</Heading>
        <Heading as="h2" class="text-2xl">Heading h2</Heading>
        <Heading as="h3">Heading h3 (default)</Heading>
        <Separator class="my-2" />
        <p class="text-sm text-muted-foreground">Separator above.</p>
      </div>
    </Example>
  </Section>
</template>
