import { TimelineOppositeContent, TimelineItem, TimelineContent, TimelineConnector, TimelineDot, TimelineSeparator } from "@mui/lab"
import { Paper, Typography } from "@mui/material"
import React, { useEffect, useState } from "react"
import Image from 'next/image'
import Role from "./role"

export default function RoleItem({date, title, companyName, companyLogo, description}: Role) {

    const [width, setWidth] = useState<undefined | number>(undefined);

    useEffect(() => {
        const handleResize = () => setWidth(window.innerWidth);
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <TimelineItem>
            <TimelineOppositeContent sx={{ padding: 0, flex: 0 }}>
                {
                    (width ?? 0) > 620 &&
                    <Typography 
                        variant="h6" 
                        component="p"
                        sx={{
                            padding: "1em",
                            textWrap: "nowrap",
                            paddingTop: "1.5em",
                        }}
                    >
                        { date }
                    </Typography>
                    
                }
            </TimelineOppositeContent>
            <TimelineSeparator>
                {
                    (width ?? 0) <= 620 &&
                    <Typography 
                        variant="h6" 
                        component="p"
                        sx={{
                            textWrap: "nowrap",
                            paddingTop: "0.5rem",
                        }}
                    >
                            { date }
                    </Typography>
                }
                <TimelineDot 
                    style={{ 
                        margin: "0.5rem auto", 
                        width: "4em", 
                        height: "4em",
                        backgroundColor: "white"
                    }} 
                    variant="outlined"
                    color="primary"
                >
                    <Image
                        style={{ margin: "auto" }}
                        width={60} height={30}
                        src={companyLogo}
                        alt={`${companyName} Logo`}
                     />
                </TimelineDot>
                <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent>
                <Paper 
                    elevation={3} 
                    style={{ padding: "1em" }}
                >
                    <Typography variant="h6" component="h3">{title}</Typography>
                    <Typography variant="subtitle1" component="p">{companyName}</Typography>
                    <Typography
                        style={{ whiteSpace: "pre-line" }}
                    >
                        {description}
                    </Typography>
                </Paper>
            </TimelineContent>
        </TimelineItem>
    )
}