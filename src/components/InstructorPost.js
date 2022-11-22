import React, { useEffect, useState } from 'react'
import { Avatar, Box, Button, Card, CardActions, CardContent, CardHeader, Divider, Grid, IconButton, List, ListItem, ListItemIcon, ListItemText, makeStyles, Paper, TextField, Typography } from '@material-ui/core'
import Cookies from 'js-cookie'

import axios from 'axios'
import { Link } from 'react-router-dom'
import { DescriptionRounded, FiberManualRecordRounded, SendRounded } from '@material-ui/icons'

const useStyle = makeStyles((theme) => {
    return {
        root: {
            '& .MuiCard-root': {
                transform: 'none',
                [theme.breakpoints.down('xs')]: {
                    margin: '0'
                  },
                '&:hover': {
                    transform: 'none',
                    boxShadow: 'none',
                    backgroundColor: 'rgba(0,0,0,0.03)',
                }
            }
        },
        cardLink: {
            textDecoration: 'none',
            color: 'inherit',
            fontSize: 0
        },
        list: {
            border: '1px solid rgba(0,0,0,0.2)',
            borderRadius: '5px',
            marginTop: theme.spacing(2)
        },
        smallAvatar: {
            width: theme.spacing(3.7),
            height: theme.spacing(3.7)
        }
    }
})

export default function StudentPosts({ activity, img }) {
    const classes = useStyle()

    const file = JSON.parse(activity.files)

    const filesCollection = [];

    for (const key in file) {
        filesCollection.push(
            <ListItem className={classes.list} key={key} >
                <ListItemIcon><DescriptionRounded /></ListItemIcon>
                <ListItemText >{`${file[key]}`}</ListItemText>
            </ListItem>
        );
    }


    return (
        <Box className={classes.root}>
            <Link className={classes.cardLink} to={`/studentActivity/${activity.id}`}>
                <Card variant='outlined'>
                    <CardHeader avatar={
                        <Avatar src={img} />
                    }
                        title={activity.nameWhoPosted}
                        subheader={activity.dateCreated}
                    />
                    <CardContent>


                        <Typography variant='h6'>
                            {activity.title}
                        </Typography>
                        <Typography variant='body2' >
                            {activity.body}
                        </Typography>

                        <List disablePadding dense>{filesCollection}</List>

                    </CardContent>

                    <Divider />

                    <Box ml={2} mb={2} mt={2} mr={2}>
                        <Grid container direction='row' alignItems='center' >
                            <Grid item xs={1}>
                                <Avatar className={classes.smallAvatar} />
                            </Grid>
                            <Grid item xs={10} >
                                <TextField variant='outlined' placeholder='Make a comment...' size='small' fullWidth />
                            </Grid>
                            <Grid item xs={1} >
                                <IconButton>
                                    <SendRounded size='small' />
                                </IconButton>
                            </Grid>
                        </Grid>
                    </Box>

                </Card>
            </Link>
        </Box>
    )
}
