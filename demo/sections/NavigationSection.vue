<script setup lang="ts">
import {
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
</script>

<template>
  <Section id="navigation" title="Navigation" description="Breadcrumb and navigation menu.">
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
  </Section>
</template>
