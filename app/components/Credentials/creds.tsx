import { Container, Stack } from '@mui/material'
import * as React from 'react'
import SchoolCard from './schoolCard'
import { schools } from '../../shared/data/schools'
import { certs } from '../../shared/data/certifications'
import Image from 'next/image'

const Creds = () => {
  return (
    <section id="credentials" className="section">
      <Container>
        <h2>Credentials</h2>
        <Stack direction="row" sx={{ margin: '1em 0', flexWrap: 'wrap' }}>
          {schools.map((role, index) => (
            <SchoolCard key={index} {...role} />
          ))}
        </Stack>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            marginTop: '2em',
          }}
        >
          {certs.map((cert) => (
            <Image
              src={cert.icon}
              alt={cert.alt}
              width={150}
              height={150}
              key={cert.icon}
            />
          ))}
        </div>
      </Container>
    </section>
  )
}

export default Creds
