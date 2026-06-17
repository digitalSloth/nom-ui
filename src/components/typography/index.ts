import type { VariantProps } from "class-variance-authority"
import { cva } from "class-variance-authority"

export { default as Heading } from "./Heading.vue"
export { default as Text } from "./Text.vue"
export { default as Blockquote } from "./Blockquote.vue"
export { default as InlineCode } from "./InlineCode.vue"
export { default as List } from "./List.vue"

export const headingVariants = cva("scroll-m-20 tracking-tight text-balance", {
  variants: {
    level: {
      1: "text-4xl font-extrabold",
      2: "text-3xl font-semibold",
      3: "text-2xl font-semibold",
      4: "text-xl font-semibold",
      5: "text-lg font-semibold",
      6: "text-base font-semibold",
    },
  },
  defaultVariants: {
    level: 2,
  },
})
export type HeadingVariants = VariantProps<typeof headingVariants>

export const textVariants = cva("", {
  variants: {
    variant: {
      default: "leading-7 [&:not(:first-child)]:mt-6",
      lead: "text-xl text-muted-foreground",
      large: "text-lg font-semibold",
      small: "text-sm font-medium leading-none",
      muted: "text-sm text-muted-foreground",
    },
  },
  defaultVariants: {
    variant: "default",
  },
})
export type TextVariants = VariantProps<typeof textVariants>
