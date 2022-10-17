import { React, useEffect, useState } from 'react'
import { Box, Card, CardContent, CardHeader, CircularProgress, Container, Fade, Grid, makeStyles, MenuItem, Typography } from '@material-ui/core'
import SubjectCards from '../components/SubjectCards'
import axios from 'axios'

import Cookies from 'js-cookie'
import { useNavigate } from 'react-router-dom'


const useStyle = makeStyles(theme => {
    return {
        root: {
            display: 'flex'
        }, 
        loading: {
            marginTop: theme.spacing(20)
        }

    }
});



export default function StudentDashboard() {

    const classes = useStyle();

    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);
    const Cookie = Cookies.get('idLoggedIn');

    const [noClassroom, setNoClassroom] = useState(true);

    function sessionCheck() {
        if (!Cookie) {
            navigate('/');
        }
    }

    


    const [subjects, setSubjects] = useState([]);

    const showClassrooms = () => {
        axios.post('https://ursacapi.000webhostapp.com/api/getJoinedClassrooms.php', JSON.stringify(Cookie))
            .then((response) => {
                if (response.data == 0) {
                    setNoClassroom(true);
                } else {
                    setSubjects(response.data)
                    setNoClassroom(false);
                    setIsLoading(false)
                }
            })
            .catch(err => console.log(err))
    }


    useEffect(() => {
        sessionCheck();
        showClassrooms();

    }, []);





    return (
        <Box>
            {
                isLoading ?
                
                    <CircularProgress className={classes.loading} color='secondary' />

                    :

                    <Box>
                        {
                            noClassroom ?

                                <MenuItem disabled>
                                    You have no classroom yet.
                                </MenuItem>

                                :

                                <Container className={classes.root}>
                                    <Grid container spacing={3}>
                                        {subjects.map(subject => (
                                            <Grid item xs={12} sm={6} lg={3} zeroMinWidth key={subject.classroomID}>
                                                <SubjectCards subject={subject} />
                                            </Grid>
                                        ))}
                                    </Grid>
                                </Container>

                        }
                    </Box>

            }

        </Box>
    )
}
