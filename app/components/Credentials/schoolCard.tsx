'use client'
import { Card, CardActionArea, CardContent, CardMedia } from '@mui/material'
import * as React from 'react'
import { Degree } from '../../shared/models/school'
import DegreeModal from './degreeModal'
import Image from 'next/image'

const SchoolCard = (degree: Degree) => {
  const { schoolName, schoolPhoto, title, subtitle } = degree

  const [open, setOpen] = React.useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  return (
    <>
      <Card elevation={3} style={{ margin: '8px', flex: 1, minWidth: '320px' }}>
        <CardActionArea
          style={{
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
          }}
          onClick={handleOpen}
        >
          <CardMedia
            style={{
              height: '180px',
              width: '100%',
              position: 'relative',
            }}
          >
            <Image
              fill
              src={schoolPhoto}
              alt={schoolName}
              sizes="(max-width: 600px) 100vw, (max-width: 1200px) 50vw, 33vw"
              style={{ objectFit: 'cover' }}
            />
          </CardMedia>
          <CardContent
            style={{
              display: 'flex',
              flexDirection: 'column',
              marginRight: 'auto',
              flex: 1,
            }}
          >
            <p>{schoolName}</p>
            <h3 style={{ margin: '0.25rem 0' }}>{title}</h3>
            {subtitle && <p style={{ fontWeight: 700 }}>{subtitle}</p>}
          </CardContent>
        </CardActionArea>
      </Card>

      <DegreeModal degree={degree} open={open} handleClose={handleClose} />
    </>
  )
}

export default SchoolCard
