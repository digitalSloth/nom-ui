import { type ClassValue, clsx } from 'clsx'
import { extendTailwindMerge } from 'tailwind-merge'

// text-ledger is a type style, not a colour, so it survives a text
// colour class such as text-muted-foreground in the same list.
const twMerge = extendTailwindMerge({
  extend: { classGroups: { 'font-size': ['text-ledger'] } },
})

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
