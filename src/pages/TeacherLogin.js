import { React, useState } from 'react'
import { Box, Button, TextField, Link, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import Cookies from 'js-cookie';

const useStyle = makeStyles(theme => {
    return {
        root: {
            '& .MuiInputBase-root': {
                marginBottom: theme.spacing(1)
            },
            '& .MuiInputBase-input': {
                padding: theme.spacing(2)
            },
            '& .MuiLink-root': {
                color: '#162276',
            }
        },
        form: {
            margin: '0 auto',
            maxWidth: '350px'
        },
        btn: {
            width: '100%',
            margin: '12px 0'
        },
        changeLogin: {
            cursor: 'pointer'
        }
    }
});

export default function TeacherLogin(props) {
    const navigate = useNavigate();
    const classes = useStyle();

    const [error, setError] = useState(false);


    const [data, setData] = useState({
        instructorID: '',
        password: ''
    })

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;

        setError(false)
        setData(data => ({ ...data, [name]: value }));
    }



    const handleSubmit = (event) => {
        event.preventDefault();
        const sendData = {
            instructorID: data.instructorID,
            password: data.password
        }
        axios.post('https://ursacapi.000webhostapp.com/api/teacherLogin.php', JSON.stringify(sendData))
            .then((response) => {

                Cookies.set('instructorID', response.data, {
                    expires: 1,
                    path: '/',
                    sameSite: 'strict',
                    strict: true
                });

                if (response.data === 'Invalid') {
                    setError(true);
                } else {
                    navigate('/teacherDashboard');
                }
            })
            .catch((err) => {
                console.log(err);
            })
    }


    // const [position, setPosition] = useState('Student');

    return (
        <Box>

            {/* <FormHelperText>
                                Please select your position first.
                            </FormHelperText>
                            <TextField
                                onChange={handleChangeSelect}
                                value={position}
                                select
                                name='position'
                                variant='outlined'
                                type='text'
                                autoComplete='off'
                                fullWidth
                                required
                            >
                                <MenuItem value='Student'>Student</MenuItem>
                                <MenuItem value='Teacher'>Teacher</MenuItem>
                            </TextField> */}

            <form className={classes.form} onSubmit={handleSubmit} method='POST' >
                <Typography variant='h4' align='center' >
                    Instructor
                </Typography>

                <TextField
                    onChange={handleChange}
                    value={data.instructorID}
                    placeholder='Instructor ID'
                    name='instructorID'
                    variant='outlined'
                    type='text'
                    error={error}
                    autoComplete='off'
                    fullWidth
                    required
                />

                <TextField
                    onChange={handleChange}
                    value={data.password}
                    placeholder='Password'
                    name='password'
                    variant='outlined'
                    type='password'
                    helperText={error && 'Wrong Credentials!'}
                    error={error}
                    fullWidth
                    required
                />

                <Button
                    type='submit'
                    name='save'
                    className={classes.btn}
                    size='large'
                    variant='contained'
                    color='secondary'>
                    LOGIN
                </Button>

                <center>
                    <div>
                        <Link className={classes.changeLogin} onClick={props.handleChangeToStudent}>
                            <Typography variant='caption'>
                                Student Login.
                            </Typography>
                        </Link>
                    </div>
                </center>

            </form>

        </Box>
    )
}
