"use client"
import { Card, CardActionArea, CardContent, CardMedia, Typography } from '@mui/material';
import * as React from 'react';
import { Degree } from '../../models/school';
import DegreeModal from './degreeModal';
import Image from 'next/image';

const SchoolCard = (degree : Degree) => {
    const { schoolName, schoolPhoto, title, subtitle } = degree

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
                    <CardMedia style={{ height: "180px", width: "100%", position: 'relative' }}>
                        <Image fill
                            src={ schoolPhoto }
                            alt={ schoolName } 
                            sizes="(max-width: 600px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            style={{ objectFit: "cover" }}
                        />
                    </CardMedia>
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
                            subtitle && <Typography variant="subtitle2" component="h5">
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