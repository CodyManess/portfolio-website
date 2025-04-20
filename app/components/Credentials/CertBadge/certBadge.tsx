import { Cert, IconType } from '@/shared/models/education'
import React from 'react'
import Image from 'next/image'
import styles from './certBadge.module.css'

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
          className={styles.certLogo}
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
          <p className={styles.certName}>{name}</p>
          <p className={styles.certOrg}>{org}</p>
        </div>
      )}
    </>
  )
}

export default CertBadge
