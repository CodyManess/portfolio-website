"use client"
import { Button, Card, CardActionArea, CardContent, CardMedia, Typography } from '@mui/material';
import * as React from 'react';
import { Degree } from './school';
import DegreeModal from './degreeModal';

const SchoolCard = (degree : Degree) => {
    const { schoolName, schoolPhoto, title, subtitle, courses } = degree

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false); 

    return (
        <>
            <Card 
                elevation={3} 
                style={{ margin: "8px", flex: 1, minWidth: "320px" }}
            >
                <CardActionArea 
                    onClick={ handleOpen }
                >
                    <CardMedia
                        component="img"
                        sx={{ height: 180 }}
                        src={ schoolPhoto }
                    />
                    <CardContent>
                        <Typography 
                            gutterBottom 
                            component="h3"
                            sx={{ 
                                color: 'text.secondary', 
                                fontSize: 14,
                                maxHeight: "2em"
                        }}>
                            {schoolName}
                        </Typography>
                        <Typography variant="h5" component="h4">
                            {title}
                        </Typography>
                        {
                            subtitle && <Typography variant="subtitle2">
                                {subtitle}
                            </Typography>
                        }
                    </CardContent>
                </CardActionArea>
            </Card>
            
            <DegreeModal
                degree={degree}
                open={open}
                handleClose={handleClose}
             />
        </>
    )
};

export default SchoolCard;