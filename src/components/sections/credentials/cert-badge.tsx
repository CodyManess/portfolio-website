import type { Cert } from '@/types/education'
import { IconType } from '@/types/education'
import React from 'react'
import Image from 'next/image'

/**
 * Props for the CertBadge component.
 * @param icon - The static image or URL for the certificate icon/badge.
 * @param iconType - The type of icon (e.g., Badge or Logo).
 * @param name - The name of the certificate.
 * @param org - The organization that issued the certificate.
 */
const CertBadge = ({ icon, iconType, name, org }: Cert) => {
  return iconType === IconType.Badge ? (
    <Image
      src={icon}
      alt={`${name} Cert`}
      width={160}
      height={160}
      sizes="160px"
      className="size-40 object-contain drop-shadow-md"
    />
  ) : (
    <div
      className="flex size-40 flex-col items-center justify-center overflow-hidden rounded-full border border-white/20 bg-linear-to-br from-(--primary-dark) to-(--primary-color) p-4 text-center text-white shadow-lg"
      aria-label={`${name} Cert from ${org}`}
    >
      <div className="mb-1 flex size-14 shrink-0 items-center justify-center">
        <Image
          src={icon}
          alt={name}
          width={56}
          height={56}
          sizes="56px"
          className="size-full object-contain"
        />
      </div>
      <p className="mb-1 line-clamp-2 text-xs/tight font-semibold text-balance">
        {name}
      </p>
      <p className="line-clamp-1 text-[11px] font-bold text-white/80">{org}</p>
    </div>
  )
}

export default CertBadge
