import { Box, CircularProgress, Container, Grid, makeStyles, Menu, MenuItem, Typography } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import ClassroomCards from '../components/ClassroomCards'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

import Cookies from 'js-cookie'


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


export default function TeacherDashboard() {

    const classes = useStyle();

    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);
    const Cookie = Cookies.get('instructorID');

    const [noClassroom, setNoClassroom] = useState(true);

    function sessionCheck() {
        if (!Cookie) {
            navigate('/');
        }
    }

    const [subjects, setSubjects] = useState([]);
    const showClassrooms = () => {
        axios.post('https://ursacapi.000webhostapp.com/api/getCreatedClassrooms.php', JSON.stringify(Cookie))
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

                                <Container >

                                    <Grid container spacing={7}>
                                        <div>{subjects.subjectName}</div>
                                        {subjects.map(subject => (
                                            <Grid item xs={12} sm={6} lg={3} key={subject.id}>
                                                <ClassroomCards subject={subject} />
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
