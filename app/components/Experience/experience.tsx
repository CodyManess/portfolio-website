"use client";
import { Timeline } from "@mui/lab/";
import { Container, Typography } from "@mui/material";
import * as React from 'react';
import './experience.module.css'
import RoleItem from "./roleItem";
import { roles } from '../../data/experience'

const Experience = () => {

    return (
        <div
            style={{
                display: 'flex',
                background: 'white',
                boxShadow: '0px -12px 20px black',
                padding: '4em 0',
                justifyContent: 'center',
            }}
        >
            <Container>
                <Typography 
                    variant="h2"
                    sx={{ color: "black" }}
                >
                    Experience
                </Typography>

                <Timeline 
                    position="right"
                    style={{ padding: 0 }}
                >
                {
                    roles.map((role, index) => (
                        <RoleItem 
                            key={ index } 
                            { ...role }
                        />
                    ))
                }
                </Timeline>
            </Container>
        </div>
    );
}

export default Experience;
