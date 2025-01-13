'use client'
import * as React from 'react'
import { CourseType, Degree } from '../../models/school'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  List,
  ListItem,
  Slide,
  Typography,
} from '@mui/material'
import Link from 'next/link'
import { FaExternalLinkAlt } from 'react-icons/fa'

interface Props {
  degree: Degree
  open: boolean
  handleClose: () => void
}

const DegreeModal = ({ degree, open, handleClose }: Props) => {
  const { title, schoolLink, awards, courses } = degree

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      keepMounted
      TransitionComponent={Slide}
      closeAfterTransition={false}
      sx={{
        '& .MuiDialog-paper': {
          maxWidth: 800,
          margin: '8px',
          padding: '1em',
        },
      }}
      aria-labelledby={`dialog-title-${title.replaceAll(' ', '-')}`}
    >
      <DialogTitle id={`dialog-title-${title.replaceAll(' ', '-')}`}>
        {title} Details
        <hr />
      </DialogTitle>
      <DialogContent style={{ display: 'flex', flexWrap: 'wrap' }}>
        <div
          style={{
            flex: 'auto',
            maxWidth: '200px',
            marginRight: '2em',
          }}
        >
          <Link
            href={schoolLink}
            style={{
              display: 'block',
              color: 'var(--primary-color)',
              marginBottom: '1em',
            }}
          >
            Program Link <FaExternalLinkAlt fontSize="small" />
          </Link>
          {awards.length !== 0 && (
            <>
              <Typography variant="h5" component="h2">
                Awards
              </Typography>
              <List>
                {awards.map((award) => {
                  return (
                    <ListItem key={award}>
                      <Typography>{award}</Typography>
                    </ListItem>
                  )
                })}
              </List>
            </>
          )}
          `
        </div>
        <div style={{ flex: 'auto', maxWidth: '500px' }}>
          <Typography variant="h5" component="h3" gutterBottom>
            Curriculum
          </Typography>
          {Object.values(CourseType).map((val) => {
            const filteredCourses = courses.filter(
              (course) => course.courseType === val
            )
            return (
              <div key={val}>
                {filteredCourses.length !== 0 && (
                  <Typography variant="h6" component="h4">
                    {val}
                  </Typography>
                )}
                <List>
                  {filteredCourses.map((val) => {
                    return (
                      <ListItem key={val.title}>
                        <Typography>
                          {val.courseNum} - {val.title}
                        </Typography>
                      </ListItem>
                    )
                  })}
                </List>
              </div>
            )
          })}
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Close</Button>
      </DialogActions>
    </Dialog>
  )
}

export default DegreeModal
