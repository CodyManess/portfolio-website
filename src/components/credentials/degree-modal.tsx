'use client'
import * as React from 'react'
import { CourseType, Degree } from '@/types/education'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
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
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="!text-2xl font-light text-[var(--foreground)]">
            {title} Details
          </DialogTitle>
          <hr className="border-[var(--grey)] dark:border-white/20 mt-2" />
        </DialogHeader>

        <div className="flex flex-wrap py-4 gap-8">
          <div className="flex-1 min-w-[200px] max-w-sm">
            <Link
              href={schoolLink}
              target="_blank"
              className="inline-flex items-center text-[var(--primary-color)] hover:underline mb-6 font-medium focus-visible:outline-none"
            >
              Program Link <FaExternalLinkAlt className="ml-2 text-sm" />
            </Link>

            {awards.length !== 0 && (
              <>
                <h3 className="text-xl font-medium mb-3">Awards</h3>
                <ul className="list-disc pl-5 space-y-2 mb-6">
                  {awards.map((award) => (
                    <li key={award}>{award}</li>
                  ))}
                </ul>
              </>
            )}
          </div>

          <div className="flex-1 min-w-[250px] max-w-[500px]">
            <h3 className="text-xl font-medium mb-4">Curriculum</h3>
            {Object.values(CourseType).map((val) => {
              const filteredCourses = courses.filter(
                (course) => course.courseType === val
              )
              return (
                <div key={val} className="mb-6">
                  {filteredCourses.length !== 0 && (
                    <h4 className="text-lg font-medium border-b pb-1 mb-3">
                      {val}
                    </h4>
                  )}
                  <ul className="space-y-2 pl-2 border-l border-border">
                    {filteredCourses.map((course) => (
                      <li key={course.title} className="pl-3 text-sm">
                        <span className="font-semibold">
                          {course.courseNum}
                        </span>{' '}
                        - {course.title}
                      </li>
                    ))}
                  </ul>
                </div>
              )
            })}
          </div>
        </div>

        <div className="flex justify-end mt-2">
          <Button
            variant="ghost"
            onClick={handleClose}
            className="uppercase text-[var(--primary-color)] hover:text-[var(--primary-dark)] hover:bg-transparent font-semibold tracking-wider"
          >
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default DegreeModal
