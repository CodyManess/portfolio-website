"use client";
import { Timeline } from "@mui/lab/";
import { Container, Typography } from "@mui/material";
import * as React from 'react';
import './experience.module.css'
import RoleItem from "./roleitem";
import { roles } from '../../data/experience'

const Experience = () => {

    return (
        <Container>
            <Typography 
                variant="h2"
                sx={{ color: "black" }}
            >
                Experience
            </Typography>

            <Timeline position="right">
            {
                roles.map((role, index) => (
                    <RoleItem 
                        key={index} 
                        { ...role }
                    />
                ))
            }
            </Timeline>
        </Container>
    );
}

export default Experience;
