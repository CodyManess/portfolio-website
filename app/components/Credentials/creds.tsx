import { Container, Stack } from '@mui/material'
import * as React from 'react'
import SchoolCard from './SchoolCard/schoolCard'
import { schools } from '../../shared/data/schools'
import { certs } from '../../shared/data/certifications'
import CertBadge from './CertBadge/certBadge'

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
            justifyContent: 'space-around',
            marginTop: '2em',
          }}
        >
          {certs.map((cert) => (
            <CertBadge
              key={cert.name}
              icon={cert.icon}
              iconType={cert.iconType}
              name={cert.name}
              org={cert.org}
            />
          ))}
        </div>
      </Container>
    </section>
  )
}

export default Creds
