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

    <Example label="Tabs">
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
