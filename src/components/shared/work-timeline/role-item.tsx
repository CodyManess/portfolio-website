import Image from 'next/image'
import type Role from '@/types/role'
import RoleCard from './role-card'
import { FaBriefcase } from 'react-icons/fa6'
import { cn } from '@/lib/utils'

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
    <div className="group/item relative flex w-full pb-4 last:pb-0 sm:pb-5 md:col-span-3 md:grid md:grid-cols-subgrid">
      {/* Date Column (Hidden on mobile) */}
      <div className="relative hidden items-start justify-end pt-7.25 pr-4 md:flex">
        <span
          className={cn(
            'z-10 inline-flex items-center rounded-full border px-3.5 py-1.5 font-mono text-xs font-medium whitespace-nowrap shadow-2xs transition-all duration-300 lg:text-sm',
            isExpanded
              ? 'border-(--primary-color)/35 bg-(--primary-color)/10 text-(--primary-color) dark:border-(--primary-light)/40 dark:bg-(--primary-light)/15 dark:text-(--primary-light)'
              : 'border-slate-200/90 bg-slate-100/90 text-slate-600 group-hover/item:border-(--primary-color)/30 group-hover/item:text-(--primary-color) dark:border-slate-800 dark:bg-slate-900/90 dark:text-slate-300 dark:group-hover/item:border-(--primary-light)/35 dark:group-hover/item:text-(--primary-light)'
          )}
        >
          {role.date}
        </span>
        {/* Horizontal connector from Date Pill to Circle */}
        <div
          className={cn(
            'absolute top-11.25 right-0 h-0.5 w-4 transition-colors duration-300',
            isExpanded
              ? 'bg-(--primary-color)/50 dark:bg-(--primary-light)/50'
              : 'bg-slate-200 group-hover/item:bg-(--primary-color)/35 dark:bg-slate-800 dark:group-hover/item:bg-(--primary-light)/35'
          )}
          aria-hidden="true"
        />
      </div>

      {/* Center Line and Dot */}
      <div className="relative flex shrink-0 flex-col items-center pt-6.5 sm:pt-3.5">
        <div
          className={cn(
            'z-10 flex size-10 shrink-0 items-center justify-center rounded-full p-1.5 transition-all duration-300 sm:size-16 sm:p-2.5',
            role.companyLogo ? 'bg-white' : 'bg-slate-50 dark:bg-slate-900',
            isExpanded
              ? 'scale-105 border-2 border-(--primary-color) shadow-[0_0_20px_rgba(0,122,184,0.22)] ring-3 ring-(--primary-color)/20 sm:ring-4 dark:border-(--primary-light) dark:ring-(--primary-light)/25'
              : 'border-2 border-slate-200 shadow-sm ring-3 ring-slate-100 group-hover/item:scale-105 group-hover/item:border-(--primary-color)/60 group-hover/item:ring-(--primary-color)/10 sm:ring-4 dark:border-slate-700 dark:ring-slate-800/60 dark:group-hover/item:border-(--primary-light)/60 dark:group-hover/item:ring-(--primary-light)/15'
          )}
        >
          {role.companyLogo ? (
            <div className="relative flex size-7 items-center justify-center sm:size-11">
              <Image
                className="size-full object-contain"
                src={role.companyLogo}
                alt={`${role.companyName} Logo`}
                sizes="44px"
              />
            </div>
          ) : (
            <FaBriefcase
              className="text-base text-(--primary-color) sm:text-xl dark:text-(--primary-light)"
              aria-hidden="true"
            />
          )}
        </div>
        {/* Vertical Line */}
        {!isLast && (
          <div
            className="absolute top-11.5 -bottom-11.5 left-1/2 z-0 w-0.5 -translate-x-1/2 bg-linear-to-b from-(--primary-color)/45 via-slate-300 to-(--primary-color)/45 dark:from-(--primary-light)/50 dark:via-slate-700 dark:to-(--primary-light)/50"
            aria-hidden="true"
          />
        )}
      </div>

      {/* Content Column */}
      <div className="relative min-w-0 flex-1 pl-3 sm:pl-5 md:pl-6">
        {/* Horizontal connector from Circle to Card */}
        <div
          className={cn(
            'absolute top-11.25 left-0 h-0.5 w-3 transition-colors duration-300 sm:w-5 md:w-6',
            isExpanded
              ? 'bg-(--primary-color)/50 dark:bg-(--primary-light)/50'
              : 'bg-slate-200 group-hover/item:bg-(--primary-color)/35 dark:bg-slate-800 dark:group-hover/item:bg-(--primary-light)/35'
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
