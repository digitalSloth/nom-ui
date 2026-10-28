<script setup lang="ts">
import { AreaChart, BarChart, DonutChart, WorldMap } from 'nom-ui'
import Section from '../components/Section.vue'
import Example from '../components/Example.vue'

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

function days(count: number) {
  return Array.from({ length: count }, (_, i) => {
    const date = new Date(Date.UTC(2026, 9, 1 + i))
    return date.toISOString().slice(0, 10)
  })
}

function wave(i: number, base: number, amplitude: number, phase: number) {
  return Math.round(base + amplitude * Math.sin((i + phase) / 3))
}

const shortDay = (value: string) => {
  const [, month, day] = value.split('-')
  return `${Number(day)} ${months[Number(month) - 1]}`
}

const blocks = days(30).map((day, i) => ({ day, blocks: wave(i, 8000, 1500, 0) }))
const supply = days(30).map((day, i) => ({
  day,
  pillars: wave(i, 5000, 800, 0),
  stakers: wave(i, 3000, 600, 2),
  sentinels: wave(i, 1500, 300, 4),
}))
const emissions = days(30).map((day, i) => ({
  day,
  scheduled: wave(i, 1000, 100, 0),
  credited: wave(i, 900, 150, 3),
}))
const flowDays = days(14).map((day, i) => ({
  day: i === 0 ? 'R&D <Lab>' : day,
  inbound: wave(i, 400, 150, 0),
  outbound: wave(i, 300, 120, 2),
}))
const flowSeries = [
  { key: 'inbound', label: 'Inbound' },
  { key: 'outbound', label: 'R&D <Lab>' },
]
const poolDays = days(14).map((day, i) => ({
  day,
  pillars: wave(i, 500, 100, 0),
  kept: wave(i, 300, 60, 1),
  stakers: wave(i, 400, 80, 2),
  sentinels: wave(i, 250, 50, 3),
  liquidity: wave(i, 200, 40, 4),
  bridge: wave(i, 150, 30, 5),
  treasury: wave(i, 100, 20, 6),
}))
const poolSeries = [
  { key: 'pillars', label: 'Pillars' },
  { key: 'kept', label: 'Kept', color: 'var(--chart-other)' },
  { key: 'stakers', label: 'Stakers' },
  { key: 'sentinels', label: 'Sentinels' },
  { key: 'liquidity', label: 'Liquidity' },
  { key: 'bridge', label: 'Bridge' },
  { key: 'treasury', label: 'Treasury' },
]
const netDays = days(14).map((day, i) => ({ day, net: wave(i, 0, 300, 0) }))
const signedFormat = (v: number) => `${v < 0 ? '−' : '+'}${Math.abs(v).toLocaleString('en-US')}`
const flowIndex = (value: string) => (value.startsWith('R&D') ? value : shortDay(value))

const points = [
  { latitude: 51.5, longitude: -0.12, label: 'London' },
  { latitude: 40.7, longitude: -74, label: 'New York' },
  { latitude: 35.7, longitude: 139.7, label: 'Tokyo' },
  { latitude: -33.9, longitude: 151.2, label: 'Sydney' },
  { latitude: -23.5, longitude: -46.6, label: 'Sao Paulo' },
  { latitude: -1.3, longitude: 36.8, label: 'R&D <Lab>' },
]
</script>

<template>
  <Section
    id="charts"
    title="Charts and map"
    description="Unovis charts coloured from the chart ramp, plus a world map. Every colour is a token, so a theme switch recolours them."
  >
    <Example label="AreaChart">
      <AreaChart
        fill
        :data="blocks"
        index="day"
        :series="[{ key: 'blocks', label: 'Blocks' }]"
        :index-formatter="shortDay"
      />
    </Example>

    <Example label="AreaChart stacked">
      <AreaChart
        stacked
        fill
        :data="supply"
        index="day"
        :series="[
          { key: 'pillars', label: 'Pillars' },
          { key: 'stakers', label: 'Stakers' },
          { key: 'sentinels', label: 'Sentinels' },
        ]"
        :index-formatter="shortDay"
      />
    </Example>

    <Example label="AreaChart, lines only">
      <AreaChart
        :data="emissions"
        index="day"
        :series="[
          { key: 'scheduled', label: 'Scheduled' },
          { key: 'credited', label: 'Credited' },
        ]"
        :index-formatter="shortDay"
      />
    </Example>

    <Example label="BarChart">
      <BarChart :data="flowDays" index="day" :series="flowSeries" :index-formatter="flowIndex" />
    </Example>

    <Example label="BarChart stacked">
      <BarChart
        stacked
        :data="flowDays"
        index="day"
        :series="flowSeries"
        :index-formatter="flowIndex"
      />
    </Example>

    <Example label="BarChart stacked, more than five series">
      <BarChart
        stacked
        :data="poolDays"
        index="day"
        :series="poolSeries"
        :index-formatter="shortDay"
      />
    </Example>

    <Example label="BarChart signed">
      <BarChart
        signed
        :data="netDays"
        index="day"
        :series="[{ key: 'net', label: 'Net flow' }]"
        :index-formatter="shortDay"
        :value-formatter="signedFormat"
      />
    </Example>

    <Example label="DonutChart">
      <DonutChart
        total="4,520"
        unit="ZNN / day"
        :data="[
          { label: 'Pillars', value: 1728 },
          { label: 'Sentinels', value: 864 },
          { label: 'Stakers', value: 1036 },
          { label: 'Liquidity', value: 432 },
          { label: 'R&D <Lab>', value: 260 },
          { label: 'Bridge', value: 120 },
          { label: 'Treasury', value: 80 },
        ]"
      />
    </Example>

    <Example label="WorldMap">
      <WorldMap :points="points" />
    </Example>

    <Example label="Empty states">
      <div class="grid gap-4 sm:grid-cols-3">
        <AreaChart
          :data="[{ day: '2026-10-01', blocks: 5 }]"
          index="day"
          :series="[{ key: 'blocks', label: 'Blocks' }]"
        />
        <BarChart :data="[]" index="day" :series="[{ key: 'blocks', label: 'Blocks' }]" />
        <DonutChart
          :data="[
            { label: 'Paid', value: 0 },
            { label: 'Remaining', value: 0 },
          ]"
        />
      </div>
    </Example>
  </Section>
</template>
