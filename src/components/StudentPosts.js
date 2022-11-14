import React, { useEffect, useState } from 'react'
import { Avatar, Box, Button, Card, CardActions, CardContent, CardHeader, Divider, Grid, IconButton, List, ListItem, ListItemIcon, ListItemText, makeStyles, Menu, MenuItem, Paper, TextField, Typography } from '@material-ui/core'
import Cookies from 'js-cookie'

import { format } from 'date-fns'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { DeleteForever, DescriptionRounded, FiberManualRecordRounded, More, MoreVert, SendRounded } from '@material-ui/icons'

const useStyle = makeStyles((theme) => {
    return {
        root: {
            '& .MuiPaper-root': {
                transform: 'none',
                [theme.breakpoints.down('xs')]: {
                    margin: '0'
                },
                '&:hover': {
                    transform: 'none',
                    boxShadow: 'none'
                }
            },

        },
        cardLink: {
            textDecoration: 'none',
            color: 'inherit',
            fontSize: 0
        },
        list: {
            border: '1px solid rgba(0,0,0,0.2)',
            borderRadius: '5px',
            marginTop: theme.spacing(2),
            '&:hover': {
                transform: 'scale(1.007)',
                backgroundColor: 'rgba(0,0,0,0.1)',
                cursor: 'pointer'
            }
        },
        listText: {
            overflow: 'hidden',
            minWidth: theme.spacing(1),
        },
        smallAvatar: {
            width: theme.spacing(3.7),
            height: theme.spacing(3.7)
        },
        error: {
            color: 'red'
        },
        focus: {
            backgroundColor: 'rgba(0, 0, 0, 0.2)'
        },
        classheader: {
            '& .MuiCardHeader-subheader': {
                maxWidth: theme.spacing(6),
                padding: 0,
                fontSize: '.7em'
            }
        },
        card: {
            '& .MuiCard-root': {
                transform: 'none',
                width: '100%',
                [theme.breakpoints.down('xs')]: {
                    margin: '0'
                },
                '&:hover': {
                    transform: 'none',
                    boxShadow: 'none'
                }
            },
        },
        cardContainer: {
            maxWidth: theme.spacing(60),
            margin: '0px auto',
            paddingLeft: theme.spacing(1),
            paddingRight: theme.spacing(1),
        }
    }
})

export default function StudentPosts({ activity, streamFeed }) {
    const classes = useStyle()

    const file = JSON.parse(activity.files)
    const [focused, setFocused] = useState('');


    const [fileCollection, setFileCollection] = useState([]);
    const storeFiles = () => {
        for (const key in file) {
            setFileCollection(fileCollection => [...fileCollection, file[key]])
        }
    }

    const removePost = () => {

        setOpenMenu(false)
        axios.post('https://ursacapi.000webhostapp.com/api/removePost.php', activity.id)
            .then(res => {
                console.log(res.data);
                setAnchor(null)
                setFocused('');
                streamFeed()

            })
            .catch(err => console.log(err));

    }

    const [openMenu, setOpenMenu] = useState(false);
    const [anchor, setAnchor] = useState(null);
    const handleClickMenu = (event) => {
        setOpenMenu(true);
        setAnchor(event.currentTarget)
        setFocused(classes.focus)
    }
    const handleClose = () => {
        setOpenMenu(false)
        setAnchor(null)
        setFocused('')
    }

    useEffect(() => {
        storeFiles()

    }, []);

    const date = new Date(activity.dateCreated)
    const currentDate = format(date, 'MMM dd h:mm aaa')

    return (
        <Box className={classes.root}>
            <Menu
                keepMounted
                anchorEl={anchor}
                getContentAnchorEl={null}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                open={openMenu}
                onClose={handleClose}
                elevation={1}

            >
                <MenuItem dense onClick={removePost}> Remove</MenuItem>
            </Menu>
            <Box className={classes.cardContainer}>
                <Card variant='outlined' className={classes.card}>
                    <CardHeader
                        className={classes.classheader}
                        avatar={
                            <Avatar src={activity.profilePicture} />
                        }
                        title={activity.nameWhoPosted}
                        subheader={currentDate}

                        action={
                            <IconButton aria-label="settings" className={focused} onClick={handleClickMenu}>
                                <MoreVert />
                            </IconButton>
                        }
                    />
                    <CardContent>


                        <Typography variant='h6'>
                            {activity.title}
                        </Typography>
                        <Typography variant='body2' >
                            {activity.body}
                        </Typography>

                        <List>
                            {
                                fileCollection.map(keys => (
                                    <ListItem className={classes.list} key={keys}>
                                        <ListItemIcon><DescriptionRounded /></ListItemIcon>
                                        <ListItemText className={classes.listText}><Typography noWrap>{keys}</Typography></ListItemText>
                                    </ListItem>
                                ))
                            }
                        </List>

                    </CardContent>

                    <Divider />

                    {/* <Box ml={2} mb={2} mt={2} mr={2}>
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
                </Box> */}

                </Card>
            </Box>

        </Box>
    )
}
