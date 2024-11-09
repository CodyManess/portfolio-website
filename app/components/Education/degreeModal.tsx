"use client"
import * as React from 'react';
import { CourseType, Degree } from './school';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, List, ListItem, Typography } from '@mui/material';

interface Props {
    degree : Degree, open: boolean, handleClose: () => void
}

const DegreeModal = ({degree, open, handleClose}: Props) => {
    const { schoolName, schoolPhoto, title, subtitle, awards, courses } = degree

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            keepMounted
            sx={{
                '& .MuiDialog-paper': {
                    maxWidth: 800,
                }
            }}
        >
            <DialogTitle id="scroll-dialog-title">{title} Details</DialogTitle>
            <DialogContent style={{
                display: 'flex',
                flexWrap: 'wrap',
                
            }}>
                <div style={{ flex: 1, maxWidth: "200px" }}>
                    {
                        awards.length !== 0 && <>
                            <Typography 
                                variant="h5" component="h2"
                            >
                                Awards
                            </Typography>
                            <List>
                                {
                                    awards.map((award) => {
                                        return (
                                            <ListItem key={award}>
                                                {award}
                                            </ListItem>
                                        )
                                    })
                                }
                            </List>
                        </>
                    }
                </div>
                <div style={{ flex: 1, minWidth: "400px" }}>
                    <Typography 
                        variant="h5" component="h3"
                        gutterBottom
                    >
                        Curriculum
                    </Typography>
                    {
                        Object.values(CourseType).map(val => {
                            const filteredCourses = courses.filter(
                                course => course.courseType === val
                            )
                            return (
                                <div key={val}>
                                    {
                                        filteredCourses.length !== 0 && 
                                        <Typography 
                                            variant="h6" component="h4"
                                        >
                                            {val}
                                        </Typography>
                                    }
                                    <List>
                                        { 
                                            filteredCourses.map(val => {
                                                return (
                                                    <ListItem key={val.title}>
                                                        {val.courseNum} - {val.title}
                                                    </ListItem>
                                                )
                                            })
                                        }
                                    </List>
                                </div>
                            )
                        })
                    }
                </div>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Close</Button>
            </DialogActions>
        </Dialog>
    )
}

export default DegreeModal;