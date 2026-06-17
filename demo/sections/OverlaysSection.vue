<script setup lang="ts">
import { ref } from 'vue'
import {
  Button,
  Input,
  Label,
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
  Popover,
  PopoverTrigger,
  PopoverContent,
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuShortcut,
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
  SheetClose,
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerFooter,
  DrawerClose,
} from 'nom-ui'
import { SettingsIcon, UserIcon, LogOutIcon, CreditCardIcon } from '@lucide/vue'
import Section from '../components/Section.vue'
import Example from '../components/Example.vue'

const showPanel = ref(true)
</script>

<template>
  <Section id="overlays" title="Overlays" description="Dialog, Popover and Dropdown menu.">
    <Example label="Dialog">
      <Dialog>
        <DialogTrigger as-child>
          <Button variant="outline">Open dialog</Button>
        </DialogTrigger>
        <DialogContent class="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Edit profile</DialogTitle>
            <DialogDescription>Make changes to your profile here. Click save when you're done.</DialogDescription>
          </DialogHeader>
          <div class="space-y-3 py-2">
            <div class="space-y-1.5">
              <Label for="dlg-name">Name</Label>
              <Input id="dlg-name" default-value="Ada Lovelace" />
            </div>
          </div>
          <DialogFooter>
            <DialogClose as-child>
              <Button variant="ghost">Cancel</Button>
            </DialogClose>
            <DialogClose as-child>
              <Button>Save changes</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Example>

    <Example label="Popover">
      <Popover>
        <PopoverTrigger as-child>
          <Button variant="outline"><SettingsIcon /> Settings</Button>
        </PopoverTrigger>
        <PopoverContent class="w-72">
          <div class="space-y-2">
            <p class="text-sm font-medium">Dimensions</p>
            <p class="text-sm text-muted-foreground">Set the dimensions for the layer.</p>
            <div class="space-y-1.5 pt-1">
              <Label for="width">Width</Label>
              <Input id="width" default-value="100%" />
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </Example>

    <Example label="Dropdown menu">
      <DropdownMenu>
        <DropdownMenuTrigger as-child>
          <Button variant="outline">Account</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent class="w-56">
          <DropdownMenuLabel>My account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <UserIcon /> Profile
            <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <CreditCardIcon /> Billing
          </DropdownMenuItem>
          <DropdownMenuCheckboxItem v-model="showPanel">Show side panel</DropdownMenuCheckboxItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <LogOutIcon /> Log out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </Example>

    <Example label="Sheet (side panel)">
      <Sheet>
        <SheetTrigger as-child>
          <Button variant="outline">Open sheet</Button>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Wallet settings</SheetTitle>
            <SheetDescription>Manage preferences for this account.</SheetDescription>
          </SheetHeader>
          <div class="space-y-3 px-4">
            <div class="space-y-1.5">
              <Label for="sheet-name">Display name</Label>
              <Input id="sheet-name" default-value="Pillar One" />
            </div>
          </div>
          <SheetFooter>
            <SheetClose as-child>
              <Button>Save</Button>
            </SheetClose>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </Example>

    <Example label="Drawer (bottom)">
      <Drawer>
        <DrawerTrigger as-child>
          <Button variant="outline">Open drawer</Button>
        </DrawerTrigger>
        <DrawerContent>
          <div class="mx-auto w-full max-w-sm">
            <DrawerHeader>
              <DrawerTitle>Confirm send</DrawerTitle>
              <DrawerDescription>Review the transaction before broadcasting.</DrawerDescription>
            </DrawerHeader>
            <DrawerFooter>
              <Button>Confirm</Button>
              <DrawerClose as-child>
                <Button variant="ghost">Cancel</Button>
              </DrawerClose>
            </DrawerFooter>
          </div>
        </DrawerContent>
      </Drawer>
    </Example>
  </Section>
</template>
