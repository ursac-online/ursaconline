import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormHelperText, FormLabel, Icon, makeStyles, TextField, Typography } from '@material-ui/core'
import axios from 'axios';
import React from 'react'
import { useState } from 'react';
import Cookies from 'js-cookie';
import { CheckCircleOutlineRounded } from '@material-ui/icons';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

    const useStyle = makeStyles(theme => {
        return {
            green: {
                color: '#55CA36'
            },
            iconContainer: {
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
            }
        }
    })

function EditPassword() {

    const classes = useStyle()
    const navigate = useNavigate()

    const Cookie = Cookies.get('instructorID')

    function sessionCheck() {
        if (!Cookie) {
            navigate('/');
        }
    }

    useEffect(() => {
      sessionCheck();
    }, []);

    const [error, setError] = useState(false);
    const [wrongPassword, setWrongPassword] = useState(false);
    const [success, setSuccess] = useState(false);

    const [confirmChanges, setConfirmChanges] = useState(false);


    const [data, setData] = useState({
        currentPassword: '',
        newPassword: '',
        repeatNewPassword: ''
    });

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;

        setError(false)
        setWrongPassword(false)
        setData(data => ({ ...data, [name]: value }));
    }

    const confirmSubmit = () => {
        const sendData = {
            currentPassword: data.currentPassword,
            newPassword: data.newPassword,
            id: Cookie
        }

        axios.post('https://ursacapi.000webhostapp.com/api/updatePasswordInstructor.php', JSON.stringify(sendData))
            .then(response => {
                if (response.data == 'Invalid') {
                    setWrongPassword(true);
                    setConfirmChanges(false);
                } else {
                    setSuccess(true);
                    setData({
                        currentPassword: '',
                        newPassword: '',
                        repeatNewPassword: ''
                    })
                }
            })
            .catch(error => console.log(error))
    }

    const cancelSubmit = () => {
        setConfirmChanges(false);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setSuccess(false);
        if (data.newPassword === data.repeatNewPassword) {
            setConfirmChanges(true)
        } else {
            setError(true);
        }
    }


    return (
        <Box>
            <Typography variant='h3' >
                Change Password
            </Typography>

            <form onSubmit={handleSubmit}>

                <FormHelperText>Enter your password to confirm.</FormHelperText>
                <TextField
                    variant='outlined'
                    placeholder='Current Password'
                    name='currentPassword'
                    type='password'
                    value={data.currentPassword}
                    onChange={handleChange}
                    helperText={wrongPassword && 'Wrong Password!'}
                    error={wrongPassword}
                    required
                    fullWidth
                />

                <br />
                <br />
                <br />

                <TextField
                    variant='outlined'
                    placeholder='New Password'
                    name='newPassword'
                    type='password'
                    value={data.newPassword}
                    onChange={handleChange}
                    required
                    fullWidth
                />

                <br />
                <br />

                <TextField
                    variant='outlined'
                    placeholder='Repeat New Password'
                    name='repeatNewPassword'
                    type='password'
                    value={data.repeatNewPassword}
                    onChange={handleChange}
                    helperText={error && 'Password not matched!'}
                    error={error}
                    required
                    fullWidth
                />

                <br />
                <br />

                <Button variant='contained' type='submit' name='submit' color='secondary' fullWidth >
                    Confirm changes
                </Button>
            </form>


            <Dialog
                open={confirmChanges}
                onClose={cancelSubmit}
            >

                {
                    success ?
                        <DialogContent className={classes.iconContainer}>
                            <DialogContentText >
                                <Icon><CheckCircleOutlineRounded className={classes.green} fontSize='large' /></Icon>
                            </DialogContentText>
                            <DialogContentText>
                                Password Changes Applied
                            </DialogContentText>
                        </DialogContent>

                        :

                        <Box>
                            <DialogTitle>
                                Confirm Changes?
                            </DialogTitle>




                            <DialogActions>
                                <Button variant='contained' color='secondary' onClick={confirmSubmit} >
                                    Confirm
                                </Button>
                                <Button variant='outlined' color='secondary' onClick={cancelSubmit} >
                                    Cancel
                                </Button>
                            </DialogActions>
                        </Box>
                }





            </Dialog>

        </Box>
    )
}

export default EditPassword