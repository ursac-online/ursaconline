import React, { useEffect, useState } from 'react'
import { Avatar, Box, Card, CardContent, CardHeader, makeStyles, Paper, Typography } from '@material-ui/core'
import Cookies from 'js-cookie'

import axios from 'axios'
import { Link } from 'react-router-dom'

const useStyle = makeStyles((theme) => {
    return {
        root: {
            '& .MuiCard-root': {
                transform: 'none',
                '&:hover': {
                    transform: 'none',
                    boxShadow: 'none',
                    backgroundColor: 'rgba(0,0,0,0.03)',
                  }
            }
        },
        cardLink: {
            textDecoration: 'none',
            color: 'inherit'
        }
    }
})

export default function StudentPosts({ activity }) {
    const classes = useStyle()


    return (
        <Box className={classes.root}>
            <Link className={classes.cardLink} to={`/studentActivity/${activity.id}`}>
                <Card className={classes.root} variant='outlined'>
                    <CardHeader avatar={
                        <Avatar />
                    }
                        title={activity.nameWhoPosted}
                    />
                    <CardContent>
                        <Typography variant='h6'>
                            {activity.title}
                        </Typography>
                        <Typography variant='body2' >
                            {activity.body}
                        </Typography>

                    </CardContent>
                </Card>
                <br />
            </Link>
        </Box>
    )
}
