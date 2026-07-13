import Image from 'next/image'
import Role from '../../../models/role'
import RoleCard from '../RoleCard/roleCard'
import { Roboto_Mono } from 'next/font/google'

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
  return (
    <div className="flex w-full mb-3 relative">
      {/* Date Column (Hidden on mobile) */}
      <div className="hidden md:flex flex-col flex-none w-48 lg:w-60 text-right pr-6 pt-[41px]">
        <p
          className={`${robotoMono.className} text-sm lg:text-[1.1rem] font-medium whitespace-nowrap`}
        >
          {role.date}
        </p>
      </div>

      {/* Center Line and Dot */}
      <div className="flex flex-col items-center relative shrink-0 pt-[18px]">
        <div className="w-16 h-16 rounded-full bg-white border border-border flex items-center justify-center z-10 p-2 shadow-sm shrink-0">
          {role.companyLogo && (
            <Image
              className="max-w-full h-auto object-contain"
              src={role.companyLogo}
              alt={`${role.companyName} Logo`}
            />
          )}
        </div>
        {/* Vertical Line */}
        {!isLast && (
          <div className="w-[2px] bg-white/30 absolute top-[82px] bottom-[-30px] left-1/2 -translate-x-1/2"></div>
        )}
      </div>

      {/* Content Column */}
      <div className="flex-1 pl-4 md:pl-6 pt-1 pb-1">
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
