'use client'
import * as React from 'react'
import { useEffect, useState } from 'react'
import DegreeCard from './degree-card'
import CertBadge from './cert-badge'
import { Skeleton } from '@/components/ui/skeleton'
import { Button } from '@/components/ui/button'
import type { EducationData } from '@/types/education'

const CredentialsSkeleton = () => (
  <div aria-busy="true" aria-label="Loading education data">
    <div className="my-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {[0, 1, 2].map((i) => (
        <Skeleton key={i} className="h-77.5 w-full rounded-2xl bg-white/15" />
      ))}
    </div>
    <div className="mt-8 flex justify-around">
      {[0, 1].map((i) => (
        <Skeleton key={i} className="size-40 rounded-full bg-white/15" />
      ))}
    </div>
  </div>
)

const isValidEducationData = (data: unknown): data is EducationData => {
  if (!data || typeof data !== 'object') return false
  const record = data as Record<string, unknown>
  return Array.isArray(record.degrees) && Array.isArray(record.certs)
}

const Credentials = () => {
  const [educationData, setEducationData] = useState<EducationData | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const [retryCount, setRetryCount] = useState<number>(0)

  useEffect(() => {
    const controller = new AbortController()

    const fetchData = async () => {
      try {
        const response = await fetch('/api/education', {
          signal: controller.signal,
        })
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        const data: unknown = await response.json()
        if (!isValidEducationData(data)) {
          throw new Error('Invalid education data format')
        }
        setEducationData(data)
        setError(null)
      } catch (err) {
        if (err instanceof Error && err.name === 'AbortError') return
        setError('Failed to load education data.')
        console.error('Error fetching education data:', err)
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false)
        }
      }
    }

    void fetchData()
    return () => {
      controller.abort()
    }
  }, [retryCount])

  const handleRetry = () => {
    setIsLoading(true)
    setError(null)
    setRetryCount((count) => count + 1)
  }

  let sectionBody = (
    <>
      <div className="my-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {educationData?.degrees.map((degree) => (
          <DegreeCard key={degree.title} {...degree} />
        ))}
      </div>
      <div className="mt-8 flex justify-around">
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
    sectionBody = <CredentialsSkeleton />
  }

  if (error) {
    sectionBody = (
      <div
        role="alert"
        className="my-8 flex flex-col items-center gap-3 rounded-2xl border border-white/20 bg-slate-950/30 p-6 text-center text-white"
      >
        <p className="text-sm font-medium sm:text-base">{error}</p>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={handleRetry}
          className="border-white/30 bg-white/10 text-white hover:bg-white/20 hover:text-white"
        >
          Retry
        </Button>
      </div>
    )
  }

  return (
    <section
      id="credentials"
      className="flex justify-center bg-(--section-background) py-16 text-white [&_a]:text-white"
    >
      <div className="container mx-auto px-4 lg:px-6">
        <h2 className="mb-6 sm:mb-8">Education</h2>
        {sectionBody}
      </div>
    </section>
  )
}

export default Credentials
