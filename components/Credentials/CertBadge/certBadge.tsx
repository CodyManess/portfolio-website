import { Cert, IconType } from '@/shared/models/education'
import React from 'react'
import Image from 'next/image'

/**
 * Props for the CertBadge component.
 * @param icon - The path or URL to the certificate icon/badge.
 * @param iconType - The type of icon (e.g., Badge or Logo).
 * @param name - The name of the certificate.
 * @param org - The organization that issued the certificate.
 */
const CertBadge = ({ icon, iconType, name, org }: Cert) => {
  return (
    <>
      {iconType === IconType.Badge ? (
        <Image
          src={icon}
          alt={`${name} Cert`}
          width={150}
          height={150}
          key={icon}
        />
      ) : (
        <div
          key={icon}
          className="bg-gradient-to-b from-[var(--primary-dark)] via-[var(--primary-dark)] to-[var(--primary-light)] flex flex-col items-center w-[148px] h-[148px] text-center rounded-full bg-[var(--primary-dark)] border-2 border-[var(--primary-color)]"
          aria-label={`${name} Cert from ${org}`}
        >
          <Image
            src={icon}
            alt={name}
            width={75}
            height={75}
            style={{
              marginTop: '0.25em',
            }}
          />
          <p className="text-sm">{name}</p>
          <p className="text-xs font-semibold">{org}</p>
        </div>
      )}
    </>
  )
}

export default CertBadge
