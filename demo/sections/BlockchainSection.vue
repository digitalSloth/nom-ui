<script setup lang="ts">
import { ref } from 'vue'
import {
  Address,
  Amount,
  CopyButton,
  TxStatus,
  TxDirection,
  TokenIcon,
  Avatar,
  AvatarImage,
  AvatarFallback,
  Progress,
  Switch,
  Label,
  Skeleton,
  Spinner,
  Tooltip,
  TooltipProvider,
  TooltipTrigger,
  TooltipContent,
  Button,
} from 'nom-ui'
import Section from '../components/Section.vue'
import Example from '../components/Example.vue'

const addr = '0x71C7656EC7ab88b098defB751B7401B5f6d8976F'
const autoLock = ref(true)
const charts = ['chart-1', 'chart-2', 'chart-3', 'chart-4', 'chart-5']
</script>

<template>
  <Section
    id="blockchain"
    title="Blockchain primitives"
    description="Domain components for wallets, bridges and explorers — built on the type + status foundation."
  >
    <Example label="Address / hash">
      <div class="flex flex-col gap-3">
        <Address :address="addr" />
        <Address :address="addr" :href="`https://explorer.example/address/${addr}`" />
        <Address :address="addr" :start="10" :end="8" :copy="false" />
        <Address :address="addr" :tooltip="false" />
        <Address address="z1qqjnwjjpnue8xmmpanz6csze6tcmtzzdtfsww7" />
      </div>
    </Example>

    <Example label="Amount">
      <div class="flex flex-col gap-3">
        <Amount :value="12408.50319" symbol="ZNN" />
        <Amount :value="0.00021" symbol="ZNN" :decimals="8" />
        <Amount :value="6223.85548333" symbol="ZNN" />
        <Amount :value="1500" symbol="QSR" :decimals="8" />
        <Amount :value="12408.50319" symbol="ZNN" fiat="≈ $9,420.18" />
      </div>
    </Example>

    <Example label="Amount — compact notation (≥ 10,000)">
      <div class="flex flex-col gap-3">
        <Amount :value="42500" symbol="ZNN" compact />
        <Amount :value="6223855.48" symbol="ZNN" compact />
        <Amount :value="1240000000" symbol="QSR" compact />
      </div>
    </Example>

    <Example label="Copy button">
      <span class="text-sm text-muted-foreground">Copy raw value</span>
      <CopyButton :value="addr" />
    </Example>

    <Example label="Transaction status">
      <TxStatus status="pending" />
      <TxStatus status="confirming" />
      <TxStatus status="success" />
      <TxStatus status="failed" />
    </Example>

    <Example label="Transaction direction">
      <TxDirection direction="in" />
      <TxDirection direction="out" />
      <TxDirection direction="in" label="Received" />
      <TxDirection direction="out" label="Sent" />
    </Example>

    <Example label="Token icon">
      <TokenIcon symbol="ZNN" src="https://zenon.network/img/logo.svg" />
      <TokenIcon symbol="QSR" />
      <TokenIcon symbol="ETH" class="size-12" />
    </Example>

    <Example label="Avatar (image + fallback + sizes)">
      <Avatar>
        <AvatarImage src="https://github.com/digitalSloth.png" alt="digitalSloth" />
        <AvatarFallback>DS</AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarFallback>z1</AvatarFallback>
      </Avatar>
      <Avatar class="size-12">
        <AvatarImage src="https://github.com/digitalSloth.png" alt="digitalSloth" />
        <AvatarFallback>DS</AvatarFallback>
      </Avatar>
    </Example>

    <Example label="Progress (bridge transfer)">
      <div class="w-full max-w-sm space-y-1.5">
        <Progress :model-value="62" />
        <p class="text-xs text-muted-foreground tabular-nums">2 of 3 confirmations</p>
      </div>
    </Example>

    <Example label="Switch">
      <div class="flex items-center gap-2">
        <Switch id="auto-lock" v-model="autoLock" />
        <Label for="auto-lock">Auto-lock wallet</Label>
        <span class="text-xs text-muted-foreground">{{ autoLock ? 'on' : 'off' }}</span>
      </div>
    </Example>

    <Example label="Chart palette (brand tri-color ramp)">
      <div class="flex gap-2">
        <div
          v-for="c in charts"
          :key="c"
          class="size-12 rounded-md"
          :style="{ backgroundColor: `var(--${c})` }"
        />
      </div>
    </Example>

    <Example label="Tooltip">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger as-child>
            <Button variant="outline">Hover for fee detail</Button>
          </TooltipTrigger>
          <TooltipContent>Network fee: 0.00021 ZNN</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </Example>

    <Example label="Loading states">
      <div class="flex items-center gap-2 text-sm text-muted-foreground">
        <Spinner /> Fetching chain data…
      </div>
      <div class="w-full max-w-sm space-y-2">
        <Skeleton class="h-4 w-3/4" />
        <Skeleton class="h-4 w-1/2" />
        <Skeleton class="h-9 w-full" />
      </div>
    </Example>
  </Section>
</template>
