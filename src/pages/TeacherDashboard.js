import { Box, Container, Grid, Menu, MenuItem, Typography } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import SubjectCards from '../components/SubjectCards'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

import Cookies from 'js-cookie'



export default function TeacherDashboard() {
    const navigate = useNavigate();
    const Cookie = Cookies.get('teacherID');

    const [noClassroom, setNoClassroom] = useState(true);

    function sessionCheck() {
        if (!Cookie) {
            navigate('/');
        }
    }

    function showTeachersInfo() {
        axios.post('http://localhost:80/api/getInstructors.php', Cookie)
            .then((response) => {
                if (response.data) {
                    Cookies.set('userInfo', response.data[0].firstName + ' ' + response.data[0].lastName)
                }

            })
            .catch(error => {
                console.log(error);
            })
    }


    useEffect(() => {
        // sessionCheck();
        showTeachersInfo()
        showClassrooms();
    }, []);

    const [subjects, setSubjects] = useState([]);

    function showClassrooms() {
        axios.post('http://localhost:80/api/getClassrooms.php', Cookie)
            .then((response) => {
                if(response.data == 0) {
                    setNoClassroom(true);
                } else {
                    setSubjects(response.data)
                    setNoClassroom(false);
                }
            })
    }


    return (
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
                                    <SubjectCards subject={subject} />
                                </Grid>
                            ))}
                        </Grid>
                    </Container>

            }

        </Box>
    )
}
