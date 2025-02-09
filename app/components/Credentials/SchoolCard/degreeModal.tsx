'use client'
import * as React from 'react'
import { CourseType, Degree } from '../../../shared/models/school'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  List,
  ListItem,
  Slide,
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
              <h3>Awards</h3>
              <List>
                {awards.map((award) => {
                  return (
                    <ListItem key={award}>
                      <p>{award}</p>
                    </ListItem>
                  )
                })}
              </List>
            </>
          )}
        </div>
        <div style={{ flex: 'auto', maxWidth: '500px' }}>
          <h3 style={{ marginBottom: '1rem' }}>Curriculum</h3>
          {Object.values(CourseType).map((val) => {
            const filteredCourses = courses.filter(
              (course) => course.courseType === val
            )
            return (
              <div key={val}>
                {filteredCourses.length !== 0 && <h4>{val}</h4>}
                <List>
                  {filteredCourses.map((val) => {
                    return (
                      <ListItem key={val.title}>
                        <p>
                          {val.courseNum} - {val.title}
                        </p>
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
