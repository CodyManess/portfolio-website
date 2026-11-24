import Image from 'next/image'
import type { Role } from '@/types/role'
import RoleCard from './role-card'
import { FaBriefcase } from 'react-icons/fa6'
import { cn } from '@/lib/utils'

interface RoleItemProps {
  role: Role
  isExpanded: boolean
  onToggle: () => void
  isLast: boolean
  isHighlighted?: boolean
}

const getConnectorLineClass = (isExpanded: boolean) =>
  cn(
    'h-0.5 transition-colors duration-300',
    isExpanded ? 'bg-brand/50' : 'bg-border group-hover/item:bg-brand/35'
  )

export default function RoleItem({
  role,
  isExpanded,
  onToggle,
  isLast,
  isHighlighted = false,
}: RoleItemProps) {
  return (
    <div
      id={role.id ? `role-${role.id}` : undefined}
      className="group/item relative flex w-full scroll-mt-28 pb-4 last:pb-0 sm:pb-5 md:col-span-3 md:grid md:grid-cols-subgrid"
    >
      {/* Date Column (Hidden on mobile) */}
      <div className="relative hidden items-start justify-end pt-7.25 pr-4 md:flex">
        <span
          className={cn(
            'z-10 inline-flex items-center rounded-full border px-3.5 py-1.5 font-mono text-xs font-medium whitespace-nowrap shadow-2xs transition-all duration-300 lg:text-sm',
            isExpanded
              ? 'border-brand/35 bg-brand/10 text-brand-strong'
              : 'border-border/90 bg-muted/90 text-muted-foreground group-hover/item:border-brand/30 group-hover/item:text-brand-strong'
          )}
        >
          {role.date}
        </span>
        {/* Horizontal connector from Date Pill to Circle */}
        <div
          className={cn(
            'absolute top-11.25 right-0 w-4',
            getConnectorLineClass(isExpanded)
          )}
          aria-hidden="true"
        />
      </div>

      {/* Center Line and Dot */}
      <div className="relative flex shrink-0 flex-col items-center pt-6.5 sm:pt-3.5">
        <div
          className={cn(
            'z-10 flex size-10 shrink-0 items-center justify-center rounded-full p-1.5 transition-all duration-300 sm:size-16 sm:p-2.5',
            role.companyLogo ? 'bg-white' : 'bg-muted',
            isExpanded
              ? 'scale-105 border-2 border-brand shadow-brand-glow ring-3 ring-brand/20 motion-reduce:scale-100 sm:ring-4'
              : 'border-2 border-border shadow-sm ring-3 ring-muted group-hover/item:scale-105 group-hover/item:border-brand/60 group-hover/item:ring-brand/15 motion-reduce:group-hover/item:scale-100 sm:ring-4'
          )}
        >
          {role.companyLogo ? (
            <div className="relative flex size-7 items-center justify-center sm:size-11">
              <Image
                className="size-full object-contain"
                src={role.companyLogo}
                alt=""
                sizes="44px"
              />
            </div>
          ) : (
            <FaBriefcase
              className="text-base text-brand sm:text-xl"
              aria-hidden="true"
            />
          )}
        </div>
        {/* Vertical Line */}
        {!isLast && (
          <div
            className="absolute top-11.5 -bottom-11.5 left-1/2 z-0 w-0.5 -translate-x-1/2 bg-linear-to-b from-brand/45 via-border to-brand/45"
            aria-hidden="true"
          />
        )}
      </div>

      {/* Content Column */}
      <div className="relative min-w-0 flex-1 pl-3 sm:pl-5 md:pl-6">
        {/* Horizontal connector from Circle to Card */}
        <div
          className={cn(
            'absolute top-11.25 left-0 w-3 sm:w-5 md:w-6',
            getConnectorLineClass(isExpanded)
          )}
          aria-hidden="true"
        />
        <RoleCard
          role={role}
          isExpanded={isExpanded}
          onToggle={onToggle}
          isHighlighted={isHighlighted}
        />
      </div>
    </div>
  )
}
