'use client'
import { Card, CardContent } from '@/components/ui/card'
import * as React from 'react'
import { Degree } from '@/shared/models/education'
import DegreeModal from './degreeModal'
import Image from 'next/image'

import mtsucampus from '@public/credentials/mtsucampus.webp'
import mtsucampus2 from '@public/credentials/mtsucampus2.webp'
import lsuscampus from '@public/credentials/lsuscampus.webp'

/**
 * Props for the DegreeCard component.
 * @param degree - The degree data object to display.
 */
const DegreeCard = (degree: Degree) => {
  const { schoolName, title, subtitle } = degree

  const [open, setOpen] = React.useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const schoolPhoto = () => {
    switch (title) {
      case 'Master of Science in Computer Science':
        return mtsucampus
      case 'Bachelor of Science in Computer Science':
        return mtsucampus2
      case 'Master of Business Administration':
        return lsuscampus
      default:
        return mtsucampus
    }
  }

  return (
    <>
      <Card
        className="m-2 flex-1 min-w-[320px] overflow-hidden cursor-pointer hover:opacity-90 transition-opacity shadow-md flex flex-col pt-0 pb-0"
        onClick={handleOpen}
      >
        <div className="h-[180px] w-full relative">
          <Image
            fill
            src={schoolPhoto()}
            alt={schoolName}
            sizes="(max-width: 600px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover"
          />
        </div>
        <CardContent className="flex flex-col mr-auto flex-1 p-4">
          <p>{schoolName}</p>
          <h3 className="my-1 text-lg font-semibold">{title}</h3>
          {subtitle && <p className="font-bold">{subtitle}</p>}
        </CardContent>
      </Card>

      <DegreeModal degree={degree} open={open} handleClose={handleClose} />
    </>
  )
}

export default DegreeCard
