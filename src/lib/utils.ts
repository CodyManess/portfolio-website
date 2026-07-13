import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const CARD_CLASSNAME =
  'group h-full flex flex-col justify-between cursor-pointer border border-slate-200/80 dark:border-slate-800/40 bg-gradient-to-br from-white to-slate-50/50 dark:from-slate-900/60 dark:to-slate-950/80 rounded-2xl shadow-sm transition-all duration-300 ease-out hover:-translate-y-1.5 hover:shadow-[0_12px_30px_rgba(0,122,184,0.12)] hover:border-[var(--primary-color)]/30 dark:hover:border-[var(--primary-light)]/40'
