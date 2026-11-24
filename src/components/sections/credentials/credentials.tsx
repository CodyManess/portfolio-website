'use client'
import { useEffect, useRef, useState } from 'react'
import DegreeCard from './degree-card'
import CertBadge from './cert-badge'
import { Skeleton } from '@/components/ui/skeleton'
import { PageSection, SectionHeading } from '@/components/shared/page-section'
import SectionErrorAlert from '@/components/shared/section-error-alert'
import type { EducationData } from '@/types/education'

interface CredentialsProps {
  initialData?: EducationData
}

const CredentialsSkeleton = () => (
  <div aria-busy="true" aria-label="Loading education data">
    <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {[0, 1, 2].map((i) => (
        <Skeleton key={i} className="h-77.5 w-full rounded-2xl bg-white/15" />
      ))}
    </div>
    <div className="mt-8 flex flex-wrap justify-around gap-6">
      {[0, 1].map((i) => (
        <Skeleton key={i} className="size-40 rounded-full bg-white/15" />
      ))}
    </div>
  </div>
)

const isValidEducationData = (data: unknown): data is EducationData => {
  if (!data || typeof data !== 'object') return false
  return (
    'degrees' in data &&
    Array.isArray(data.degrees) &&
    'certs' in data &&
    Array.isArray(data.certs)
  )
}

const fetchEducationData = async (
  signal: AbortSignal
): Promise<EducationData> => {
  const response = await fetch('/api/education', { signal })
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`)
  }
  const data: unknown = await response.json()
  if (!isValidEducationData(data)) {
    throw new Error('Invalid education data format')
  }
  return data
}

const Credentials = ({ initialData }: CredentialsProps) => {
  const [educationData, setEducationData] = useState<EducationData | null>(
    initialData ?? null
  )
  const [isLoading, setIsLoading] = useState<boolean>(initialData === undefined)
  const [error, setError] = useState<string | null>(null)
  const abortControllerRef = useRef<AbortController | null>(null)

  useEffect(() => {
    if (initialData !== undefined) return
    const controller = new AbortController()
    abortControllerRef.current = controller

    fetchEducationData(controller.signal)
      .then((data) => {
        setEducationData(data)
        setError(null)
      })
      .catch((err: unknown) => {
        if (err instanceof Error && err.name === 'AbortError') return
        setError('Failed to load education data.')
        console.error('Error fetching education data:', err)
      })
      .finally(() => {
        if (!controller.signal.aborted) {
          setIsLoading(false)
        }
      })

    return () => {
      abortControllerRef.current?.abort()
    }
  }, [initialData])

  const handleRetry = () => {
    abortControllerRef.current?.abort()
    const controller = new AbortController()
    abortControllerRef.current = controller
    setIsLoading(true)
    setError(null)

    fetchEducationData(controller.signal)
      .then((data) => {
        setEducationData(data)
        setError(null)
      })
      .catch((err: unknown) => {
        if (err instanceof Error && err.name === 'AbortError') return
        setError('Failed to load education data.')
        console.error('Error fetching education data:', err)
      })
      .finally(() => {
        if (!controller.signal.aborted) {
          setIsLoading(false)
        }
      })
  }

  let sectionBody = (
    <>
      <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {educationData?.degrees.map((degree) => (
          <DegreeCard key={degree.title} {...degree} />
        ))}
      </div>
      <div className="mt-8 flex flex-wrap justify-around gap-6">
        {educationData?.certs.map((cert) => (
          <CertBadge key={cert.name} {...cert} />
        ))}
      </div>
    </>
  )

  if (isLoading) {
    sectionBody = <CredentialsSkeleton />
  }

  if (error) {
    sectionBody = (
      <SectionErrorAlert
        message={error}
        onRetry={handleRetry}
        tone="inverted"
      />
    )
  }

  return (
    <PageSection id="credentials" tone="brand">
      <SectionHeading className="mb-6 sm:mb-8">Education</SectionHeading>
      {sectionBody}
    </PageSection>
  )
}

export default Credentials
