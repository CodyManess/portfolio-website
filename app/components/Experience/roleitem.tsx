import { TimelineOppositeContent, TimelineItem, TimelineContent, TimelineConnector, TimelineDot, TimelineSeparator } from "@mui/lab"
import { Paper, Typography } from "@mui/material"
import React from "react"
import Role from "./role"

export default function RoleItem({date, title, companyName, companyLogo, description}: Role) {

    return (
        <TimelineItem>
            <TimelineOppositeContent sx={{flex: 0}}>
                <Typography 
                    variant="h6" 
                    component="p"
                    color="primary"
                    sx={{
                        textWrap: "nowrap",
                        paddingTop: "1.5em",
                    }}
                >
                    { date }
                </Typography>
            </TimelineOppositeContent>
            <TimelineSeparator>
                <TimelineDot 
                    style={{ alignContent: "center", width: "4em", height: "4em" }} 
                    variant="outlined"
                    color="primary"
                >
                    <img 
                        style={{
                            margin: "auto",
                            width: "90%"
                        }}
                        src={companyLogo}
                    />
                </TimelineDot>
                <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent>
                <Paper 
                    elevation={3} 
                    sx={{ padding: "1em" }}
                >
                    <Typography variant="h6" component="h2">{title}</Typography>
                    <Typography variant="subtitle1" component="p">{companyName}</Typography>
                    <Typography 
                        variant="body1" 
                        style={{whiteSpace: "pre-line"}}
                    >
                        {description}
                    </Typography>
                </Paper>
            </TimelineContent>
        </TimelineItem>
    )
}