import { Box, Button, Card, CardActions, CardContent, CardHeader, makeStyles, TextField } from '@material-ui/core'
import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

import Cookies from 'js-cookie';

const useStyle = makeStyles(theme => {
    return {
        root: {
            '& .MuiCard-root': {
                '&:hover': {
                    transform: 'scale(1)',
                    boxShadow: '0px 0px 0px'
                  }
        }
    }
}})

function JoinClass() {
    const classes = useStyle();
    const Cookie = Cookies.get('idLoggedIn')
    // const [classroomID, setClassroomID] = useState(0);

    const navigate = useNavigate();

    const [classCode, setClassCode] = useState('');
    const [error, setError] = useState(false);


    const handleSubmit = (e) => {
        e.preventDefault();

        axios.post('https://ursacapi.000webhostapp.com/api/joinClass.php', JSON.stringify(classCode))
            .then((response) => {
                if(response.data == 0) {
                    setError(true)
                } else {
                    const classroomID = response.data[0].id;
                    const sendData = {
                        classroomID,
                        Cookie
                    };
                    axios.post('https://ursacapi.000webhostapp.com/api/registerMembers.php', JSON.stringify(sendData))
                    .then(response => {
                        console.log(response.data);
                    })
                    navigate('/studentDashboard');
                }
            })
            .catch((err) => {
                console.log(err);
            })
    }
    



    return (
        <Box className={classes.root}>
            <Card variant='outlined'>
                <CardHeader title='Join Classroom' subheader='Ask your teacher for the class code, then enter it here.' />
                <CardContent  >
                    
                    <form onSubmit={handleSubmit} >
                        <TextField 
                        placeholder='Class Code' 
                        variant='outlined' 
                        type='text'
                        value={classCode}
                        onChange={(e) => {setClassCode(e.target.value); setError(false)}}
                        error={error}
                        helperText={error && 'No classroom detected'}
                        />
                        
                <CardActions>
                    <Button size="small" type='submit' variant='contained' color='secondary' >Join Classroom</Button>
                </CardActions>
                    </form>
                </CardContent>
            </Card>
        </Box>
    )
}

export default JoinClass