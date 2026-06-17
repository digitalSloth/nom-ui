<script setup lang="ts">
import {
  Badge,
  Alert,
  AlertTitle,
  AlertDescription,
  Separator,
} from 'nom-ui'
import { InfoIcon, CircleAlertIcon, TerminalIcon } from '@lucide/vue'
import Section from '../components/Section.vue'
import Example from '../components/Example.vue'
</script>

<template>
  <Section id="badges" title="Badge & Alert" description="Status chips and callouts.">
    <Example label="Badge variants">
      <Badge>default</Badge>
      <Badge variant="secondary">secondary</Badge>
      <Badge variant="outline">outline</Badge>
      <Badge variant="destructive">destructive</Badge>
    </Example>

    <Example label="Status chips (on-chain state)">
      <Badge variant="success">Confirmed</Badge>
      <Badge variant="pending">Pending</Badge>
      <Badge variant="warning">Awaiting confirmations</Badge>
      <Badge variant="destructive">Failed</Badge>
      <Badge variant="highlight">New</Badge>
    </Example>

    <Example label="Data typography (mono + tabular figures)">
      <div class="w-full max-w-md space-y-2 rounded-lg border p-4">
        <div class="flex items-center justify-between">
          <span class="text-sm text-muted-foreground">Address</span>
          <span class="font-mono text-sm">0x71C7…976F</span>
        </div>
        <div class="flex items-center justify-between">
          <span class="text-sm text-muted-foreground">Balance</span>
          <span class="font-mono text-sm tabular-nums">12,408.50319 ZNN</span>
        </div>
        <div class="flex items-center justify-between">
          <span class="text-sm text-muted-foreground">Network fee</span>
          <span class="font-mono text-sm tabular-nums">0.00021 ZNN</span>
        </div>
        <div class="flex items-center justify-between">
          <span class="text-sm text-muted-foreground">Block</span>
          <span class="font-mono text-sm tabular-nums">#3,914,205</span>
        </div>
      </div>
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

    <Example label="Separator (horizontal + vertical)">
      <div class="w-full max-w-md space-y-2">
        <p class="text-sm text-muted-foreground">Above the separator.</p>
        <Separator />
        <p class="text-sm text-muted-foreground">Below the separator.</p>
        <div class="flex h-5 items-center gap-3 pt-2 text-sm text-muted-foreground">
          <span>Docs</span>
          <Separator orientation="vertical" />
          <span>API</span>
          <Separator orientation="vertical" />
          <span>Demo</span>
        </div>
      </div>
    </Example>
  </Section>
</template>
