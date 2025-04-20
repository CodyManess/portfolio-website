'use client'
import { Container, Stack, CircularProgress } from '@mui/material'
import * as React from 'react'
import DegreeCard from './SchoolCard/schoolCard'
import CertBadge from './CertBadge/certBadge'
import { useEffect } from 'react'
import { EducationData } from '@/shared/models/education'

const Creds = () => {
  const [educationData, setEducationData] =
    React.useState<EducationData | null>(null)
  const [isLoading, setIsLoading] = React.useState<boolean>(true)
  const [error, setError] = React.useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/education')
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        const data: EducationData = await response.json()
        setEducationData(data)
      } catch (err) {
        setError('Failed to load education data.')
        console.error('Error fetching education data:', err)
      } finally {
        setIsLoading(false)
      }
    }
    fetchData()
  }, [])

  console.log(educationData)

  let sectionBody = (
    <>
      <Stack direction="row" sx={{ margin: '1em 0', flexWrap: 'wrap' }}>
        {educationData?.degrees.map((role, index) => (
          <DegreeCard key={index} {...role} />
        ))}
      </Stack>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-around',
          marginTop: '2em',
        }}
      >
        {educationData?.certs.map((cert) => (
          <CertBadge
            key={cert.name}
            icon={cert.icon}
            iconType={cert.iconType}
            name={cert.name}
            org={cert.org}
          />
        ))}
      </div>
    </>
  )

  if (isLoading) {
    sectionBody = <CircularProgress />
  }

  if (error) {
    sectionBody = <div>{error}</div>
  }

  return (
    <section id="credentials" className="section">
      <Container>
        <h2>Education</h2>
        {sectionBody}
      </Container>
    </section>
  )
}

export default Creds
