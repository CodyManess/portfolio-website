import { Cert, IconType } from '@/types/education'
import React from 'react'
import Image, { StaticImageData } from 'next/image'

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

  return (
    <>
      {iconType === IconType.Badge ? (
        <Image
          src={imageSrc}
          alt={`${name} Cert`}
          width={160}
          height={160}
          key={icon}
          className="drop-shadow-md"
        />
      ) : (
        <div
          key={icon}
          className="bg-gradient-to-br from-[var(--primary-dark)] to-[var(--primary-color)] flex flex-col justify-center items-center w-40 h-40 p-4 text-center rounded-full border border-white/20 shadow-lg text-white overflow-hidden"
          aria-label={`${name} Cert from ${org}`}
        >
          <div className="flex-shrink-0 mb-1">
            <Image
              src={imageSrc}
              alt={name}
              width={56}
              height={56}
              className="object-contain"
            />
          </div>
          <p className="text-xs font-semibold leading-tight mb-1 line-clamp-2 text-balance">
            {name}
          </p>
          <p className="text-[11px] font-bold text-white/80 line-clamp-1">
            {org}
          </p>
        </div>
      )}
    </>
  )
}

export default CertBadge
