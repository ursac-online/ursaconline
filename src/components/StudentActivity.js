import { Box, Button, Container, Divider, Grid, IconButton, makeStyles, Paper, Typography } from '@material-ui/core'
import { ChevronLeftRounded, CloseRounded } from '@material-ui/icons'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Cookies from 'js-cookie'

const useStyle = makeStyles(theme => {
    return {
        activity: {
            padding: theme.spacing(2),
            maxWidth: theme.spacing(50)
        },
        btn: {
            marginTop: theme.spacing(2)
        }
    }
})

function StudentActivity() {
    const classes = useStyle()
    const navigate = useNavigate();
    const Cookie = Cookies.get('idLoggedIn')

    function sessionCheck() {
        if (!Cookie) {
            navigate('/');
        }
    }

    const [post, setPost] = useState({});

    const { id } = useParams();
    async function getPost() {
        const sendData = {
            updateID: id
        };

        await axios.post('https://ursacapi.000webhostapp.com/api/getPostID.php', JSON.stringify(sendData))
            .then(response => {
                if (response.data == 0) {
                    console.log('post ID not found');
                } else {
                    setPost(response.data[0]);
                }
            })


    }

    

    useEffect(() => {
        getPost();
        sessionCheck()
    }, []);



    return (
        <Box>
            <IconButton onClick={() => navigate(-1)} >
                <CloseRounded />
            </IconButton>
            <Container>
                <Grid container spacing={2} justifyContent='center' >
                    <Grid item>
                        <Paper className={classes.activity} elevation={0} square={true} variant='outlined' >
                            <Typography variant='h4' >
                                {post.title}
                            </Typography>


                            <Grid container spacing={1}>
                                <Grid item>
                                    <Typography variant='caption' >
                                        {post.nameWhoPosted}
                                    </Typography>
                                </Grid>
                                <Grid item>
                                    <Typography variant='body1' >
                                        •
                                    </Typography>
                                </Grid>
                                <Grid item>
                                    <Typography variant='caption' >
                                        {post.dateCreated}
                                    </Typography>
                                </Grid>
                            </Grid>





                            <Grid container spacing={1} justifyContent='space-between' >
                                <Grid item>

                                    <Typography variant='body1' >
                                        100 points
                                    </Typography>
                                </Grid>
                                <Grid item>
                                </Grid>
                                <Grid item>
                                    <Typography variant='body1' >
                                       Due {post.dateCreated}
                                    </Typography>
                                </Grid>
                            </Grid>



                            <Divider />

                            <Typography variant='body2' >
                                {post.body}something
                                something asokdjhalkjhsdoihjuawokenm oaisjdlkahjw asjdlkjawlijed askoldjhasdjkljasdj pajoskdikjawioj asopjdoikjasd

                            </Typography>


                        </Paper>
                    </Grid>



                    <Grid item></Grid>

                    <Grid item>
                        <Paper className={classes.activity}>

                            <Grid container justifyContent="space-between" alignContent='center' >
                                <Grid item>
                                    <Typography variant='h6' >
                                        Your work
                                    </Typography>
                                </Grid>
                                <Grid item>
                                    <Typography variant='caption' color='error'  >
                                        Missing
                                    </Typography>
                                </Grid>
                            </Grid>


                            <Button className={classes.btn} color='secondary' variant='outlined' fullWidth >
                                Upload file
                            </Button>

                            <Button className={classes.btn} color='secondary' variant='contained' fullWidth >
                                Submit work
                            </Button>
                        </Paper>
                    </Grid>

                </Grid>

            </Container>
        </Box>
    )
}

export default StudentActivity