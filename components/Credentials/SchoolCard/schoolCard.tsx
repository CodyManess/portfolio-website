'use client'
import { Card, CardActionArea, CardContent, CardMedia } from '@mui/material'
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
    switch (schoolName) {
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
        elevation={3}
        className="m-2 flex-1 min-w-[320px]"
      >
        <CardActionArea
          className="h-full flex flex-col"
          onClick={handleOpen}
        >
          <CardMedia className="h-[180px] w-full relative">
            <Image
              fill
              src={schoolPhoto()}
              alt={schoolName}
              sizes="(max-width: 600px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover"
            />
          </CardMedia>
          <CardContent className="flex flex-col mr-auto flex-1">
            <p>{schoolName}</p>
            <h3 className="my-1 mx-0">{title}</h3>
            {subtitle && <p className="font-bold">{subtitle}</p>}
          </CardContent>
        </CardActionArea>
      </Card>

      <DegreeModal degree={degree} open={open} handleClose={handleClose} />
    </>
  )
}

export default DegreeCard
