'use client'
import * as React from 'react'
import { useEffect, useState } from 'react'
import DegreeCard from './school-card'
import CertBadge from './cert-badge'
import { Skeleton } from '@/components/ui/skeleton'
import { EducationData } from '@/types/education'

const CredsSkeleton = () => (
  <div aria-busy="true" aria-label="Loading education data">
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 my-8">
      {[0, 1, 2].map((i) => (
        <Skeleton
          key={i}
          className="h-[310px] w-full rounded-2xl bg-white/15"
        />
      ))}
    </div>
    <div className="flex justify-around mt-8">
      {[0, 1].map((i) => (
        <Skeleton key={i} className="w-40 h-40 rounded-full bg-white/15" />
      ))}
    </div>
  </div>
)

const Creds = () => {
  const [educationData, setEducationData] = useState<EducationData | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

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

  let sectionBody = (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 my-8">
        {educationData?.degrees.map((degree) => (
          <DegreeCard key={degree.title} {...degree} />
        ))}
      </div>
      <div className="flex justify-around mt-8">
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
    sectionBody = <CredsSkeleton />
  }

  if (error) {
    sectionBody = <div>{error}</div>
  }

  return (
    <section
      id="credentials"
      className="py-16 flex justify-center bg-[var(--section-background)] text-white [&_a]:text-white"
    >
      <div className="container mx-auto px-4 lg:px-6">
        <h2 className="mb-6 sm:mb-8">Education</h2>
        {sectionBody}
      </div>
    </section>
  )
}

export default Creds
