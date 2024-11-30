"use client"
import * as React from 'react';
import { CourseType, Degree } from './school';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, List, ListItem, Slide, Typography } from '@mui/material';

interface Props {
    degree : Degree, open: boolean, handleClose: () => void
}

const DegreeModal = ({degree, open, handleClose}: Props) => {
    const { title, awards, courses } = degree

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            keepMounted
            TransitionComponent={Slide}
            sx={{
                '& .MuiDialog-paper': {
                    maxWidth: 800,
                    margin: '8px',
                    padding: '1em'
                }
            }}
            aria-labelledby="dialog-title"
        >
            <DialogTitle id="dialog-title">{title} Details</DialogTitle>
            <DialogContent style={{ display: 'flex', flexWrap: 'wrap' }}>
                { 
                    awards.length !== 0 && 
                    <div style={{ flex: 1, maxWidth: "250px", minWidth: "200px" }}>
                        <Typography variant="h5" component="h2">
                            Awards
                        </Typography>
                        <List>
                            {
                                awards.map((award) => {
                                    return (
                                        <ListItem key={award}>
                                            <Typography>
                                                {award}
                                            </Typography>
                                        </ListItem>
                                    )
                                })
                            }
                        </List>
                    </div>
                }
                <div style={{ flex: 1, minWidth: '300px' }}>
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
                            return (<div key={val}>
                                {
                                    filteredCourses.length !== 0 && 
                                    <Typography variant="h6" component="h4">
                                        {val}
                                    </Typography>
                                }
                                <List>{ 
                                    filteredCourses.map(val => {
                                        return (
                                            <ListItem key={val.title}>
                                                <Typography>
                                                    {val.courseNum} - {val.title}
                                                </Typography>
                                            </ListItem>
                                        )
                                    })
                                }</List>
                            </div>)
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