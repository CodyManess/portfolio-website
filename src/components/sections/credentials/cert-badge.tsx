import type { Cert } from '@/types/education'
import { IconType } from '@/types/education'
import React from 'react'
import type { StaticImageData } from 'next/image'
import Image from 'next/image'

import awsBadge from '@public/credentials/aws-developer-badge.png'
import deepLearningLogo from '@public/credentials/deep-learning-logo.png'

const imageMap: Record<string, StaticImageData> = {
  '/credentials/aws-developer-badge.png': awsBadge,
  '/credentials/deep-learning-logo.png': deepLearningLogo,
}

/**
 * Props for the CertBadge component.
 * @param icon - The path or URL to the certificate icon/badge.
 * @param iconType - The type of icon (e.g., Badge or Logo).
 * @param name - The name of the certificate.
 * @param org - The organization that issued the certificate.
 */
const CertBadge = ({ icon, iconType, name, org }: Cert) => {
  const imageSrc = imageMap[icon] ?? icon

  return iconType === IconType.Badge ? (
    <Image
      src={imageSrc}
      alt={`${name} Cert`}
      width={160}
      height={160}
      sizes="160px"
      key={icon}
      className="size-40 object-contain drop-shadow-md"
    />
  ) : (
    <div
      key={icon}
      className="flex size-40 flex-col items-center justify-center overflow-hidden rounded-full border border-white/20 bg-linear-to-br from-(--primary-dark) to-(--primary-color) p-4 text-center text-white shadow-lg"
      aria-label={`${name} Cert from ${org}`}
    >
      <div className="mb-1 flex size-14 shrink-0 items-center justify-center">
        <Image
          src={imageSrc}
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
