'use client'
import * as React from 'react'
import { CourseType, Degree } from '@/shared/models/education'
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
      className="[&_.MuiDialog-paper]:max-w-[800px] [&_.MuiDialog-paper]:m-2 [&_.MuiDialog-paper]:p-4"
      aria-labelledby={`dialog-title-${title.replaceAll(' ', '-')}`}
    >
      <DialogTitle id={`dialog-title-${title.replaceAll(' ', '-')}`}>
        {title} Details
        <hr />
      </DialogTitle>
      <DialogContent className="flex flex-wrap">
        <div className="flex-auto max-w-[200px] mr-8">
          <Link
            href={schoolLink}
            className="block text-[var(--primary-color)] mb-4"
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
        <div className="flex-auto max-w-[500px]">
          <h3 className="mb-4">Curriculum</h3>
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
