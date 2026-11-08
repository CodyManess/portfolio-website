import Image from 'next/image'
import Role from '@/types/role'
import RoleCard from './role-card'
import { Roboto_Mono } from 'next/font/google'
import { FaBriefcase } from 'react-icons/fa6'
import { cn } from '@/lib/utils'

const robotoMono = Roboto_Mono({
  style: ['normal'],
  subsets: ['latin'],
  display: 'swap',
})

interface RoleItemProps {
  role: Role
  setExpanded: (index: number | false) => void
  expanded: number | false
  index: number
  isLast: boolean
}

export default function RoleItem({
  role,
  setExpanded,
  expanded,
  index,
  isLast,
}: RoleItemProps) {
  const isExpanded = expanded === index

  return (
    <div className="group/item flex md:grid md:grid-cols-subgrid md:col-span-3 w-full pb-4 sm:pb-5 last:pb-0 relative">
      {/* Date Column (Hidden on mobile) */}
      <div className="hidden md:flex items-start justify-end pr-4 pt-[29px] relative">
        <span
          className={cn(
            robotoMono.className,
            'inline-flex items-center px-3.5 py-1.5 rounded-full text-xs lg:text-sm font-medium whitespace-nowrap border transition-all duration-300 shadow-2xs z-10',
            isExpanded
              ? 'bg-[var(--primary-color)]/10 dark:bg-[var(--primary-light)]/15 text-[var(--primary-color)] dark:text-[var(--primary-light)] border-[var(--primary-color)]/35 dark:border-[var(--primary-light)]/40'
              : 'bg-slate-100/90 dark:bg-slate-900/90 text-slate-600 dark:text-slate-300 border-slate-200/90 dark:border-slate-800 group-hover/item:border-[var(--primary-color)]/30 dark:group-hover/item:border-[var(--primary-light)]/35 group-hover/item:text-[var(--primary-color)] dark:group-hover/item:text-[var(--primary-light)]'
          )}
        >
          {role.date}
        </span>
        {/* Horizontal connector from Date Pill to Circle */}
        <div
          className={cn(
            'h-[2px] w-4 absolute right-0 top-[45px] transition-colors duration-300',
            isExpanded
              ? 'bg-[var(--primary-color)]/50 dark:bg-[var(--primary-light)]/50'
              : 'bg-slate-200 dark:bg-slate-800 group-hover/item:bg-[var(--primary-color)]/35 dark:group-hover/item:bg-[var(--primary-light)]/35'
          )}
          aria-hidden="true"
        />
      </div>

      {/* Center Line and Dot */}
      <div className="flex flex-col items-center relative shrink-0 pt-[26px] sm:pt-[14px]">
        <div
          className={cn(
            'w-10 h-10 sm:w-16 sm:h-16 rounded-full flex items-center justify-center z-10 p-1.5 sm:p-2.5 shrink-0 transition-all duration-300',
            role.companyLogo ? 'bg-white' : 'bg-slate-50 dark:bg-slate-900',
            isExpanded
              ? 'border-2 border-[var(--primary-color)] dark:border-[var(--primary-light)] ring-3 sm:ring-4 ring-[var(--primary-color)]/20 dark:ring-[var(--primary-light)]/25 shadow-[0_0_20px_rgba(0,122,184,0.22)] scale-105'
              : 'border-2 border-slate-200 dark:border-slate-700 ring-3 sm:ring-4 ring-slate-100 dark:ring-slate-800/60 shadow-sm group-hover/item:border-[var(--primary-color)]/60 dark:group-hover/item:border-[var(--primary-light)]/60 group-hover/item:ring-[var(--primary-color)]/10 dark:group-hover/item:ring-[var(--primary-light)]/15 group-hover/item:scale-105'
          )}
        >
          {role.companyLogo ? (
            <Image
              className="max-w-full max-h-full w-auto h-auto object-contain"
              src={role.companyLogo}
              alt={`${role.companyName} Logo`}
            />
          ) : (
            <FaBriefcase
              className="text-base sm:text-xl text-[var(--primary-color)] dark:text-[var(--primary-light)]"
              aria-hidden="true"
            />
          )}
        </div>
        {/* Vertical Line */}
        {!isLast && (
          <div
            className="w-[2px] bg-gradient-to-b from-[var(--primary-color)]/45 via-slate-300 to-[var(--primary-color)]/45 dark:from-[var(--primary-light)]/50 dark:via-slate-700 dark:to-[var(--primary-light)]/50 absolute top-[46px] -bottom-[46px] left-1/2 -translate-x-1/2 z-0"
            aria-hidden="true"
          />
        )}
      </div>

      {/* Content Column */}
      <div className="flex-1 min-w-0 pl-3 sm:pl-5 md:pl-6 relative">
        {/* Horizontal connector from Circle to Card */}
        <div
          className={cn(
            'h-[2px] w-3 sm:w-5 md:w-6 absolute left-0 top-[45px] transition-colors duration-300',
            isExpanded
              ? 'bg-[var(--primary-color)]/50 dark:bg-[var(--primary-light)]/50'
              : 'bg-slate-200 dark:bg-slate-800 group-hover/item:bg-[var(--primary-color)]/35 dark:group-hover/item:bg-[var(--primary-light)]/35'
          )}
          aria-hidden="true"
        />
        <RoleCard
          role={role}
          setExpanded={setExpanded}
          expanded={expanded}
          index={index}
        />
      </div>
    </div>
  )
}
