<script setup lang="ts">
import { Heading, Text, Blockquote, InlineCode, List } from 'nom-ui'
import Section from '../components/Section.vue'
import Example from '../components/Example.vue'
</script>

<template>
  <Section
    id="typography"
    title="Typography"
    description="Headings, body text, and prose elements. Heading encodes the type scale per level — no need to pass sizes."
  >
    <Example label="Headings">
      <div class="w-full space-y-4">
        <Heading as="h1">The quick brown fox (h1)</Heading>
        <Heading as="h2">The quick brown fox (h2)</Heading>
        <Heading as="h3">The quick brown fox (h3)</Heading>
        <Heading as="h4">The quick brown fox (h4)</Heading>
      </div>
    </Example>

    <Example label="Decouple tag from size">
      <div class="w-full">
        <Heading as="h2" :level="4">An h2 element styled as h4 (semantics ≠ size)</Heading>
      </div>
    </Example>

    <Example label="Body text variants">
      <div class="w-full max-w-xl space-y-4">
        <Text variant="lead">
          A lead paragraph introduces a section with a little more presence than body copy.
        </Text>
        <Text>
          This is the default paragraph. The network processes transactions without fees,
          using a dual-ledger architecture for momentum and plasma.
        </Text>
        <Text variant="large">Large text</Text>
        <Text variant="small">Small text</Text>
        <Text variant="muted">Muted text — for captions and secondary detail.</Text>
      </div>
    </Example>

    <Example label="Inline code (mono)">
      <Text class="max-w-xl">
        Send funds with the <InlineCode>znn-cli send</InlineCode> command, or query a balance
        via <InlineCode>getAccountInfoByAddress</InlineCode>.
      </Text>
    </Example>

    <Example label="Blockquote">
      <Blockquote class="max-w-xl">
        "Feeless transactions and infinite scalability via the meta-DAG."
      </Blockquote>
    </Example>

    <Example label="Lists">
      <div class="flex w-full max-w-xl flex-wrap gap-12">
        <List>
          <li>Momentum (the block lattice)</li>
          <li>Plasma (feeless throughput)</li>
          <li>Pillars &amp; Sentinels</li>
        </List>
        <List ordered>
          <li>Generate a key pair</li>
          <li>Fuse plasma</li>
          <li>Broadcast the transaction</li>
        </List>
      </div>
    </Example>
  </Section>
</template>
