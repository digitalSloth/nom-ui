<script setup lang="ts">
import { ref } from 'vue'
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  Button,
  Item,
  ItemMedia,
  ItemContent,
  ItemTitle,
  ItemDescription,
  ItemActions,
  ItemGroup,
  ItemSeparator,
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
  Address,
  Amount,
  TxStatus,
  TxDirection,
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationEllipsis,
  PaginationFirst,
  PaginationPrevious,
  PaginationNext,
  PaginationLast,
} from 'nom-ui'
import { FileTextIcon, ChevronRightIcon } from '@lucide/vue'
import Section from '../components/Section.vue'
import Example from '../components/Example.vue'

const page = ref(2)

const density = ref<'default' | 'compact'>('default')
const txns = [
  { hash: '0x71C7656EC7ab88b098defB751B7401B5f6d8976F', dir: 'in', amount: '420.5', status: 'success' },
  { hash: '0x3a1f9d8c2b7e4a6f0d5c8b1a2e3f4d5c6b7a8e9f', dir: 'out', amount: '12.00021', status: 'confirming' },
  { hash: '0xf0e1d2c3b4a5968778695a4b3c2d1e0f9a8b7c6d', dir: 'out', amount: '1000', status: 'failed' },
] as const
</script>

<template>
  <Section id="display" title="Data display" description="Card, Item, Tabs, Accordion and Pagination.">
    <Example label="Card">
      <Card class="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Create project</CardTitle>
          <CardDescription>Deploy your new project in one click.</CardDescription>
        </CardHeader>
        <CardContent>
          <p class="text-sm text-muted-foreground">
            This card pulls together header, content and footer subcomponents.
          </p>
        </CardContent>
        <CardFooter class="flex justify-end gap-2">
          <Button variant="ghost">Cancel</Button>
          <Button>Deploy</Button>
        </CardFooter>
      </Card>
    </Example>

    <Example label="Item group">
      <ItemGroup class="w-full max-w-md rounded-lg border">
        <Item>
          <ItemMedia variant="icon"><FileTextIcon /></ItemMedia>
          <ItemContent>
            <ItemTitle>Project brief.pdf</ItemTitle>
            <ItemDescription>2.4 MB · Updated 3 days ago</ItemDescription>
          </ItemContent>
          <ItemActions>
            <Button size="icon-sm" variant="ghost"><ChevronRightIcon /></Button>
          </ItemActions>
        </Item>
        <ItemSeparator />
        <Item>
          <ItemMedia variant="icon"><FileTextIcon /></ItemMedia>
          <ItemContent>
            <ItemTitle>Roadmap.md</ItemTitle>
            <ItemDescription>12 KB · Updated yesterday</ItemDescription>
          </ItemContent>
          <ItemActions>
            <Button size="icon-sm" variant="ghost"><ChevronRightIcon /></Button>
          </ItemActions>
        </Item>
      </ItemGroup>
    </Example>

    <Example label="Table (transactions) — toggle density">
      <div class="w-full max-w-2xl space-y-3">
        <div class="flex gap-2">
          <Button
            size="sm"
            :variant="density === 'default' ? 'default' : 'outline'"
            @click="density = 'default'"
          >Default</Button>
          <Button
            size="sm"
            :variant="density === 'compact' ? 'default' : 'outline'"
            @click="density = 'compact'"
          >Compact</Button>
        </div>
        <div class="rounded-lg border">
          <Table :density="density">
            <TableHeader>
              <TableRow>
                <TableHead>Transaction</TableHead>
                <TableHead></TableHead>
                <TableHead class="text-right">Amount</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow v-for="tx in txns" :key="tx.hash">
                <TableCell><Address :address="tx.hash" :copy="false" /></TableCell>
                <TableCell><TxDirection :direction="tx.dir" /></TableCell>
                <TableCell class="text-right">
                  <Amount :value="tx.amount" symbol="ZNN" class="items-end" />
                </TableCell>
                <TableCell><TxStatus :status="tx.status" /></TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </div>
    </Example>

    <Example label="Tabs — default (sliding indicator)">
      <Tabs default-value="account" class="w-full max-w-md">
        <TabsList>
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="password">Password</TabsTrigger>
        </TabsList>
        <TabsContent value="account" class="pt-3 text-sm text-muted-foreground">
          Make changes to your account here.
        </TabsContent>
        <TabsContent value="password" class="pt-3 text-sm text-muted-foreground">
          Change your password here.
        </TabsContent>
      </Tabs>
    </Example>

    <Example label="Tabs — underline">
      <Tabs default-value="tokens" class="w-full max-w-md">
        <TabsList variant="underline">
          <TabsTrigger variant="underline" value="tokens">Tokens</TabsTrigger>
          <TabsTrigger variant="underline" value="activity">Activity</TabsTrigger>
          <TabsTrigger variant="underline" value="nfts">NFTs</TabsTrigger>
        </TabsList>
        <TabsContent value="tokens" class="pt-3 text-sm text-muted-foreground">
          Your token balances.
        </TabsContent>
        <TabsContent value="activity" class="pt-3 text-sm text-muted-foreground">
          Recent transactions.
        </TabsContent>
        <TabsContent value="nfts" class="pt-3 text-sm text-muted-foreground">
          Collectibles in this account.
        </TabsContent>
      </Tabs>
    </Example>

    <Example label="Accordion">
      <Accordion type="single" collapsible class="w-full max-w-md">
        <AccordionItem value="item-1">
          <AccordionTrigger>Is it accessible?</AccordionTrigger>
          <AccordionContent>Yes. It adheres to the WAI-ARIA design pattern.</AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>Is it styled?</AccordionTrigger>
          <AccordionContent>Yes. It comes with default styles that match the theme.</AccordionContent>
        </AccordionItem>
      </Accordion>
    </Example>

    <Example label="Pagination">
      <Pagination v-slot="{ page: current }" v-model:page="page" :total="100" :items-per-page="10" :sibling-count="1" show-edges>
        <PaginationContent v-slot="{ items }">
          <PaginationFirst />
          <PaginationPrevious />
          <template v-for="(item, index) in items" :key="index">
            <PaginationItem
              v-if="item.type === 'page'"
              :value="item.value"
              :is-active="item.value === current"
            >
              {{ item.value }}
            </PaginationItem>
            <PaginationEllipsis v-else :index="index" />
          </template>
          <PaginationNext />
          <PaginationLast />
        </PaginationContent>
      </Pagination>
    </Example>
  </Section>
</template>
