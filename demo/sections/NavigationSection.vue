<script setup lang="ts">
import { ref } from 'vue'
import {
  CursorPagination,
  MobileNav,
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink,
} from 'nom-ui'
import Section from '../components/Section.vue'
import Example from '../components/Example.vue'

const links = [
  { title: 'Pillars', desc: 'Block-producing nodes' },
  { title: 'Sentinels', desc: 'Network guardians' },
  { title: 'Plasma', desc: 'Feeless throughput' },
]

const page = ref(1)
const pageSize = ref(25)
const mobileItems = [
  { label: 'Forms', to: '#forms' },
  { label: 'Navigation', to: '#navigation' },
  { label: 'Display', to: '#display' },
]
</script>

<template>
  <Section id="navigation" title="Navigation" description="Breadcrumb, navigation menu, cursor pagination and mobile nav.">
    <Example label="Breadcrumb">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem><BreadcrumbLink href="#">Home</BreadcrumbLink></BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem><BreadcrumbLink href="#">Wallet</BreadcrumbLink></BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem><BreadcrumbPage>Transaction</BreadcrumbPage></BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    </Example>

    <Example label="Navigation menu">
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Network</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul class="grid w-[320px] gap-1 p-2">
                <li v-for="l in links" :key="l.title">
                  <NavigationMenuLink href="#">
                    <div class="font-medium">{{ l.title }}</div>
                    <p class="text-muted-foreground text-sm">{{ l.desc }}</p>
                  </NavigationMenuLink>
                </li>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink href="#" class="px-4 py-2 font-medium">Docs</NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </Example>

    <Example label="CursorPagination">
      <div class="flex w-full max-w-md flex-col gap-2">
        <CursorPagination
          v-model:page-size="pageSize"
          :page-sizes="[10, 25, 50, 100]"
          :has-previous="page > 1"
          :has-next="page < 5"
          @previous="page--"
          @next="page++"
        />
        <span class="text-xs text-muted-foreground">Page {{ page }} · {{ pageSize }} per page</span>
      </div>
    </Example>

    <Example label="MobileNav (opens a sheet)">
      <MobileNav
        :items="mobileItems"
        :is-active="(item) => item.to === '#navigation'"
        link-as="a"
        class="sm:inline-flex"
      />
    </Example>
  </Section>
</template>
