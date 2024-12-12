import { Container, Stack, Typography } from '@mui/material'
import * as React from 'react'
import SchoolCard from './schoolCard'
import { schools } from '../../data/schools'
import { certs } from '@/app/data/certifications'
import Image from 'next/image'

const Creds = () => {
  return (
    <section id="education" className="section">
      <Container>
        <Typography variant="h2">Credentials</Typography>
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
