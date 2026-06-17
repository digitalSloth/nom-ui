<script setup lang="ts">
import { ref } from 'vue'
import {
  Button,
  ButtonGroup,
  RadioGroup,
  RadioGroupItem,
  Label,
  Toggle,
  ToggleGroup,
  ToggleGroupItem,
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
  ScrollArea,
} from 'nom-ui'
import {
  BoldIcon,
  ItalicIcon,
  UnderlineIcon,
  AlignLeftIcon,
  AlignCenterIcon,
  AlignRightIcon,
  ChevronsUpDownIcon,
} from '@lucide/vue'
import Section from '../components/Section.vue'
import Example from '../components/Example.vue'

const speed = ref('standard')
const open = ref(false)
</script>

<template>
  <Section
    id="controls"
    title="Controls"
    description="Button group, radio group, toggles, collapsible and scroll area."
  >
    <Example label="Button group">
      <ButtonGroup>
        <Button variant="outline">Day</Button>
        <Button variant="outline">Week</Button>
        <Button variant="outline">Month</Button>
      </ButtonGroup>
    </Example>

    <Example label="Toggle">
      <Toggle aria-label="Bold"><BoldIcon /></Toggle>
      <Toggle aria-label="Italic" variant="outline"><ItalicIcon /></Toggle>
      <Toggle aria-label="Underline" variant="outline"><UnderlineIcon /></Toggle>
    </Example>

    <Example label="Toggle group">
      <ToggleGroup type="single" default-value="left" variant="outline">
        <ToggleGroupItem value="left" aria-label="Align left"><AlignLeftIcon /></ToggleGroupItem>
        <ToggleGroupItem value="center" aria-label="Align center"><AlignCenterIcon /></ToggleGroupItem>
        <ToggleGroupItem value="right" aria-label="Align right"><AlignRightIcon /></ToggleGroupItem>
      </ToggleGroup>
    </Example>

    <Example label="Radio group">
      <RadioGroup v-model="speed">
        <div class="flex items-center gap-2">
          <RadioGroupItem id="r-standard" value="standard" />
          <Label for="r-standard">Standard</Label>
        </div>
        <div class="flex items-center gap-2">
          <RadioGroupItem id="r-fast" value="fast" />
          <Label for="r-fast">Fast</Label>
        </div>
        <div class="flex items-center gap-2">
          <RadioGroupItem id="r-instant" value="instant" />
          <Label for="r-instant">Instant</Label>
        </div>
      </RadioGroup>
      <span class="text-xs text-muted-foreground">selected: {{ speed }}</span>
    </Example>

    <Example label="Collapsible">
      <Collapsible v-model:open="open" class="w-full max-w-sm space-y-2">
        <div class="flex items-center justify-between gap-2">
          <span class="text-sm font-medium">Advanced settings</span>
          <CollapsibleTrigger as-child>
            <Button variant="ghost" size="icon-sm" aria-label="Toggle"><ChevronsUpDownIcon /></Button>
          </CollapsibleTrigger>
        </div>
        <CollapsibleContent class="space-y-2">
          <div class="rounded-md border px-3 py-2 text-sm text-muted-foreground">Gas limit</div>
          <div class="rounded-md border px-3 py-2 text-sm text-muted-foreground">Nonce override</div>
        </CollapsibleContent>
      </Collapsible>
    </Example>

    <Example label="Scroll area — edges fade to signal more content">
      <ScrollArea class="h-40 w-full max-w-xs rounded-md border p-3">
        <div class="space-y-1.5">
          <p v-for="i in 24" :key="i" class="font-mono text-sm tabular-nums">
            Block #{{ (3914205 - i).toLocaleString() }}
          </p>
        </div>
      </ScrollArea>
    </Example>

    <Example label="Scroll area — fade disabled (fade=false)">
      <ScrollArea :fade="false" class="h-40 w-full max-w-xs rounded-md border p-3">
        <div class="space-y-1.5">
          <p v-for="i in 24" :key="i" class="font-mono text-sm tabular-nums">
            Block #{{ (3914205 - i).toLocaleString() }}
          </p>
        </div>
      </ScrollArea>
    </Example>
  </Section>
</template>
