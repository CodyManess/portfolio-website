'use client'
import { useState } from 'react'
import Image from 'next/image'
import type { Cert } from '@/types/education'
import { IconType } from '@/types/education'
import CertModal from './cert-modal'

/**
 * Interactive certification badge that opens a detail modal when clicked.
 * @param cert - The certification data object to display.
 */
const CertBadge = (cert: Cert) => {
  const { icon, iconType, name, org } = cert

  const [open, setOpen] = useState(false)
  const [hasOpened, setHasOpened] = useState(false)

  const handleOpen = () => {
    setHasOpened(true)
    setOpen(true)
  }
  const handleClose = () => setOpen(false)

  return (
    <>
      <button
        type="button"
        onClick={handleOpen}
        aria-label={`View details for ${name} from ${org}`}
        className="group flex size-40 cursor-pointer items-center justify-center rounded-full transition-all duration-300 ease-out hover:-translate-y-1.5 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-(--section-background) focus-visible:outline-none"
      >
        {iconType === IconType.Badge ? (
          <Image
            src={icon}
            alt=""
            width={160}
            height={160}
            sizes="160px"
            className="size-40 object-contain drop-shadow-md transition-all duration-300 group-hover:scale-105 group-hover:drop-shadow-xl"
          />
        ) : (
          <span className="flex size-40 flex-col items-center justify-center overflow-hidden rounded-full border border-white/20 bg-linear-to-br from-(--primary-dark) to-(--primary-color) p-4 text-center text-white shadow-lg transition-all duration-300 group-hover:scale-105 group-hover:border-white/40 group-hover:shadow-xl">
            <span className="mb-1 flex size-14 shrink-0 items-center justify-center">
              <Image
                src={icon}
                alt=""
                width={56}
                height={56}
                sizes="56px"
                className="size-full object-contain"
              />
            </span>
            <span className="mb-1 line-clamp-2 block text-xs/tight font-semibold text-balance">
              {name}
            </span>
            <span className="line-clamp-1 block text-[11px] font-bold text-white/80">
              {org}
            </span>
          </span>
        )}
      </button>

      {hasOpened ? (
        <CertModal cert={cert} open={open} handleClose={handleClose} />
      ) : null}
    </>
  )
}

export default CertBadge
