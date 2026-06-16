<script setup lang="ts">
import { ref } from 'vue'
import {
  Input,
  Textarea,
  Label,
  Checkbox,
  Field,
  FieldLabel,
  FieldDescription,
  FieldError,
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
  InputGroup,
  InputGroupInput,
  InputGroupAddon,
  InputGroupText,
  InputGroupButton,
} from 'nom-ui'
import { SearchIcon, MailIcon, CopyIcon } from '@lucide/vue'
import Section from '../components/Section.vue'
import Example from '../components/Example.vue'

const name = ref('')
const bio = ref('')
const terms = ref(false)
const fruit = ref('')
</script>

<template>
  <Section id="forms" title="Form controls" description="Inputs, selects, checkboxes and the Field / InputGroup layouts.">
    <Example label="Input & Textarea">
      <div class="w-full max-w-sm space-y-3">
        <div class="space-y-1.5">
          <Label for="name">Name</Label>
          <Input id="name" v-model="name" placeholder="Ada Lovelace" />
        </div>
        <div class="space-y-1.5">
          <Label for="bio">Bio</Label>
          <Textarea id="bio" v-model="bio" placeholder="Tell us about yourself…" />
        </div>
        <p class="text-xs text-muted-foreground">Bound value: {{ name || '—' }}</p>
      </div>
    </Example>

    <Example label="Checkbox">
      <label class="flex items-center gap-2 text-sm">
        <Checkbox v-model="terms" /> Accept terms and conditions
      </label>
      <span class="text-xs text-muted-foreground">checked: {{ terms }}</span>
    </Example>

    <Example label="Select">
      <Select v-model="fruit">
        <SelectTrigger class="w-[200px]">
          <SelectValue placeholder="Pick a fruit" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Fruits</SelectLabel>
            <SelectItem value="apple">Apple</SelectItem>
            <SelectItem value="banana">Banana</SelectItem>
            <SelectItem value="orange">Orange</SelectItem>
            <SelectItem value="grape">Grape</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
      <span class="text-xs text-muted-foreground">selected: {{ fruit || '—' }}</span>
    </Example>

    <Example label="Field (with description & error)">
      <Field class="w-full max-w-sm">
        <FieldLabel for="email">Email</FieldLabel>
        <Input id="email" type="email" placeholder="you@example.com" aria-invalid="true" />
        <FieldDescription>We'll never share your email.</FieldDescription>
        <FieldError :errors="[{ message: 'Enter a valid email address.' }]" />
      </Field>
    </Example>

    <Example label="Input group">
      <div class="w-full max-w-sm space-y-3">
        <InputGroup>
          <InputGroupAddon>
            <SearchIcon />
          </InputGroupAddon>
          <InputGroupInput placeholder="Search…" />
        </InputGroup>

        <InputGroup>
          <InputGroupAddon>
            <InputGroupText>https://</InputGroupText>
          </InputGroupAddon>
          <InputGroupInput placeholder="yoursite.com" />
          <InputGroupAddon align="inline-end">
            <InputGroupButton aria-label="Copy"><CopyIcon /></InputGroupButton>
          </InputGroupAddon>
        </InputGroup>

        <InputGroup>
          <InputGroupAddon>
            <MailIcon />
          </InputGroupAddon>
          <InputGroupInput type="email" placeholder="name@email.com" />
        </InputGroup>
      </div>
    </Example>
  </Section>
</template>
