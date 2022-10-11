import React, { useEffect, useState } from 'react'
import { Container, Grid, Paper, TextField, makeStyles, Button, IconButton, Tooltip, Typography, useTheme } from '@material-ui/core'
import { Assignment, AttachFileRounded } from '@material-ui/icons'
import { useLocation } from 'react-router-dom'
import axios from 'axios'

import StudentPosts from '../components/StudentPosts'

const useStyle = makeStyles(theme => {
    return {
        paper: {
            padding: theme.spacing(2)
        },
        input: {
            display: 'none'
        }
    }
})

export default function TeacherFeed() {
    const classes = useStyle()
    const location = useLocation()
    const subject = location.search.slice(1)
    const subjectName = subject.replace('%20', ' ')


    useEffect(() => {
        showClassrooms();
    }, []);

    const [activities, setActivities] = useState([]);

    function showClassrooms() {
        axios.get('http://localhost:80/api/feeds.php')
        .then((response) => {
            console.log(response.data);
            setActivities(response.data);
            if(response.data.Status == 'Invalid') {
                alert('Invalid User');
            } else {
                // navigate('/teacherDashboard')
            }
        })
    }

    // const [open, setOpen] = React.useState(false);
    // const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

    // const handleClickOpen = () => {
    //     setOpen(true);
    // };

    // const handleClose = () => {
    //     setOpen(false);
    // };

    const [data, setData] = useState({
        title: '',
        details: ''
    })

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;

        setData(data => ({ ...data, [name]: value }));
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        const sendData = {
            title: data.title,
            details: data.details
        }
        console.log(sendData)


        axios.post('https://ursacapi.000webhostapp.com/createFeed.php', sendData)
            .then((result) => {
                console.log(result.data)
                if (result.data.Status == 'Invalid') {
                    alert('Invalid User');
                } else {
                    showClassrooms();
                }
            })
    }


    // const [activities, setActivities] = useState([
    //     { title: 'Assignment 1 mahaba mabahaba', body: 'May 11', id: 1 },
    //     { title: 'Assignment 2 mahaba mabahaba', body: 'May 2', id: 2 },
    //     { title: 'Assignment 3 mahaba mabahaba', body: 'May 3', id: 3 },
    //     { title: 'Assignment 4 mahaba mabahaba', body: 'May 4', id: 4 },
    //     { title: 'Assignment 5 mahaba mabahaba', body: 'May 5', id: 5 },
    //     { title: 'Assignment 6 mahaba mabahaba', body: 'May 6', id: 6 },
    //     { title: 'Assignment 7 mahaba mabahaba', body: 'May 7', id: 7 },
    //     { title: 'Assignment 8 mahaba mabahaba', body: 'May 8', id: 8 },
    //     { title: 'Assignment 9 mahaba mabahaba', body: 'May 9', id: 9 },
    //     { title: 'Assignment 10 mahaba mabahaba', body: 'May 10', id: 10 },
    // ])

    return (
        <>
            <Container maxWidth='sm'>
                <Grid container spacing={3}>

                    <Grid item xs={12}>
                        <h1>{subjectName}</h1>
                        <p>BSCpE - 3A</p>
                    </Grid>

                    <Grid item xs={12}>
                        <form noValidate autoComplete="off" onSubmit={handleSubmit}>
                            <Paper className={classes.paper} >
                                <Typography variant='h5'>
                                    Create post
                                </Typography>

                                <TextField onChange={handleChange} value={data.title} name='title' variant='filled' label='Title ' margin='normal' fullWidth />

                                <TextField onChange={handleChange} value={data.details} name='details' variant='filled' color='secondary' label='Announcement' minRows={5} margin='normal' multiline fullWidth />

                                <div>
                                    <input className={classes.input} type="file" accept='image/*' id='attach-file' />
                                    <label htmlFor="attach-file">
                                        <IconButton component='span'><Tooltip title='Attach a file' placement='top' ><AttachFileRounded /></Tooltip></IconButton>
                                    </label>
                                    <IconButton component='span'><Tooltip title='Attach a Quiz form' placement='top' ><Assignment /></Tooltip></IconButton>
                                </div>

                                <div>
                                    <Button type='submit' name='submit' variant='contained' color='secondary' size='large' fullWidth disableElevation >Post</Button>
                                </div>
                            </Paper>
                        </form>

                        {/* <Dialog
                            fullScreen={fullScreen}
                            open={open}
                            onClose={handleClose}
                        >
                            <DialogContent>
                                <DialogContentText>
                                    Are you sure you want to post this?
                                </DialogContentText>
                            </DialogContent>
                            <DialogActions>
                                <Button autoFocus onClick={handleClose} color="primary">
                                    Cancel
                                </Button>
                                <Button onClick={handleClose} color="primary" autoFocus>
                                    Confirm
                                </Button>
                            </DialogActions>
                        </Dialog> */}
                    </Grid>

                    {activities.map(activity => (
                        <Grid item xs={12} key={activity.id}>
                            <StudentPosts activity={activity} />
                        </Grid>
                    ))}

                </Grid>
            </Container>
        </>
    )
}
