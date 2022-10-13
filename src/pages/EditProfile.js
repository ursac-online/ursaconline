
import { Avatar, Badge, Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, FormHelperText, Grid, Icon, makeStyles, MenuItem, Paper, TextField, Typography } from '@material-ui/core'
import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'
import { CheckCircleOutlineRounded, PhotoCameraRounded } from '@material-ui/icons'

const useStyle = makeStyles(theme => {
    return {
        root: {
            '& .MuiTextField-root': {
                marginBottom: theme.spacing(2)
            }
        },
        avatarSize: {
            width: theme.spacing(10),
            height: theme.spacing(10),
            overflow: 'hidden'

        },
        avatarContainer: {
            display: 'flex',
            justifyContent: 'center',
            borderRadius: 100,
            width: 0,
            backgroundColor: 'rgba(0,0,0,0.5)',
            position: 'relative',
            cursor: 'pointer',
            '&:hover': {
                "& $overlay": {
                    opacity: 0.5,
                },
                "& $avatarSize": {
                    filter: 'blur(1.1px)',
                }

            }
        },
        overlay: {
            borderRadius: 100,
            position: 'absolute',
            height: theme.spacing(10),
            width: theme.spacing(10),
            opacity: 0,
            transition: '.5s ease',
            backgroundColor: '#333',
        },
        camera: {
            height: '100%',
            color: 'white'
        },
        previewText: {
            backgroundColor: 'rgba(0,0,0,0.7)',
            padding: theme.spacing(0.2),
            borderRadius: '2px',
            color: 'white'
        },
        btn: {
            marginTop: theme.spacing(3)
        },
        green: {
            color: 'green'
        },
        iconContainer: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
        }
    }
})



export default function EditProfile() {
    const classes = useStyle();
    const navigate = useNavigate();

    const id = Cookies.get('idLoggedIn');
    const [passwordDialog, setPasswordDialog] = useState(false);

    const [wrongPassword, setWrongPassword] = useState(false);

    const [emptyPassword, setEmptyPassword] = useState(false);

    const [userPassword, setUserPassword] = useState('');

    const [success, setSuccess] = useState(false);

    const [preview, setPreview] = useState(false);

    const [profilePic, setProfilePic] = useState('https://ursacapi.000webhostapp.com/api/files/174302-phil.png');

    const changePic = () => {
        setProfilePic('https://ursacapi.000webhostapp.com/api/files/827835-anonymous-v-for-vendetta-black-background-dark-wallpaper.jpg')
    }





    const cancelSubmit = () => {
        setPasswordDialog(false)
    }

    const checkPassword = () => {
        if (userPassword == '') {
            setEmptyPassword(true)
            setWrongPassword(false)
        } else {
            const sendData = {
                password: userPassword,
                id,
                firstName: data.firstName,
                middleName: data.middleName,
                lastName: data.lastName,
                course: data.course,
                college: data.college
            }

            axios.post('https://ursacapi.000webhostapp.com/api/individualUpdateStudent.php', JSON.stringify(sendData))
                .then(response => {
                    if (response.data == 'Success') {
                        setSuccess(true);
                        setUserPassword('');
                        setPreview(false);
                        setProfilePic('https://ursacapi.000webhostapp.com/api/files/174302-phil.png')
                    } else {
                        setWrongPassword(true)
                    }
                })
                .catch(error => console.log(error))
        }

    }

    const handlePasswordChange = (event) => {
        setUserPassword(event.target.value)
        setWrongPassword(false)
        setEmptyPassword(false)
    }



    const showStudent = () => {
        const sendData = {
            updateID: id
        }
        axios.post('https://ursacapi.000webhostapp.com/api/getStudentID.php', JSON.stringify(sendData))
            .then(response => {
                setData(response.data[0])
            })
            .catch(err => console.log(err))
    }




    const [data, setData] = useState({
        studentID: '',
        firstName: '',
        middleName: '',
        lastName: '',
        college: '',
        course: '',
        password: ''
    })




    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;

        setData(data => ({ ...data, [name]: value }));
    }




    const handleSubmit = (e) => {
        e.preventDefault();
        setPasswordDialog(true)
        setSuccess(false)
    };


    useEffect(() => {
        showStudent();
    }, []);

    const handleChangePicture = (e) => {
        const reader = new FileReader();
        reader.onload = () => {
            if (reader.readyState === 2) {
                setProfilePic(reader.result);
            }
        }
        reader.readAsDataURL(e.target.files[0])

        setPreview(true);
    }



    return (

        <Box className={classes.root}>

            <center>

                <Grid container spacing={4} >
                    <Grid item xs={6}>
                        <input type="file" id='changeDP' style={{ display: 'none' }} accept="image/*"  onChange={handleChangePicture} />

                        <label htmlFor="changeDP" className={classes.avatarContainer} >
                            <Avatar className={classes.avatarSize} src={profilePic} />

                            <Box className={classes.overlay}>
                                <PhotoCameraRounded className={classes.camera} fontSize='large' />
                            </Box>
                        </label>

                        {
                            preview ?

                                <Typography className={classes.previewText} variant='caption' >Preview</Typography>

                                :

                                null

                        }

                    </Grid>
                    <Grid item xs={6}>

                        <FormHelperText>Student ID: </FormHelperText>
                        <Typography align='left'  >{data.studentID}</Typography>

                    </Grid>
                </Grid>
                {/* <Button onClick={changePic} >change picture</Button> */}


                {/* // STUDENT */}
                <Box mt={7}>
                    <form onSubmit={handleSubmit}>

                        <FormHelperText>First Name</FormHelperText>
                        <TextField variant='outlined' placeholder='First Name' type="text" name='firstName' value={data.firstName} onChange={handleChange} fullWidth required />

                        <FormHelperText>Middle Name</FormHelperText>
                        <TextField variant='outlined' placeholder='Middle Name' type="text" name='middleName' value={data.middleName} onChange={handleChange} fullWidth required />

                        <FormHelperText>Last Name</FormHelperText>
                        <TextField variant='outlined' placeholder='Last Name' type="text" name='lastName' value={data.lastName} onChange={handleChange} fullWidth required />

                        <FormHelperText>College</FormHelperText>
                        <TextField variant='outlined' placeholder='College' type="text" name='college' value={data.college} onChange={handleChange} fullWidth required />

                        <FormHelperText>Course</FormHelperText>
                        <TextField variant='outlined' placeholder='Course' type="text" name='course' value={data.course} onChange={handleChange} fullWidth required multiline />


                        <Button className={classes.btn} fullWidth type='submit' name='submit' variant='contained' color='secondary'> Save Changes </Button>

                    </form>
                </Box>
            </center>

            <Dialog
                open={passwordDialog}
                onClose={cancelSubmit}
            >
                {
                    success ?

                        <Box>


                            <DialogContent className={classes.iconContainer}>
                            <DialogContentText>
                                    <Icon><CheckCircleOutlineRounded className={classes.green} fontSize='large' /></Icon>
                                </DialogContentText>
                                <DialogContentText>
                                    Changes applied
                                </DialogContentText>
                                <DialogContentText>
                                    Changes may take time.
                                </DialogContentText>
                            </DialogContent>

                        </Box>


                        :

                        <Box>
                            <DialogTitle>
                                Enter password to confirm
                            </DialogTitle>

                            <DialogContent>
                                <TextField
                                    label='Password'
                                    type='password'
                                    value={userPassword}
                                    onChange={handlePasswordChange}
                                    error={wrongPassword || emptyPassword}
                                    helperText={emptyPassword ? "Please enter your password" : wrongPassword && "Wrong Password!"}
                                    fullWidth
                                />
                            </DialogContent>

                            <DialogActions>
                                <Button variant='contained' color='secondary' onClick={checkPassword} >Confirm</Button>
                                <Button variant='outlined' color='secondary' onClick={cancelSubmit} >Cancel</Button>
                            </DialogActions>
                        </Box>
                }



            </Dialog>

        </Box>
    )
}
