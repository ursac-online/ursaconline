
import { Avatar, Box, Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, FormHelperText, Grid, Icon, makeStyles, MenuItem, TextField, Typography } from '@material-ui/core'
import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'
import { CheckCircleOutlineRounded, PhotoCameraRounded } from '@material-ui/icons'

const useStyle = makeStyles(theme => {
    return {
        // MAIN CONTAINER
        root: {
            boxShadow: theme.shadows[2],
            padding: theme.spacing(4),
            '& .MuiTextField-root': {
                marginBottom: theme.spacing(2)
            }
        },





        // PROFILE PICTURE
        avatarSize: {
            width: theme.spacing(10),
            height: theme.spacing(10),
            overflow: 'hidden',
            boxShadow: theme.shadows[3]

        },
        avatarContainer: {
            display: 'flex',
            justifyContent: 'center',
            borderRadius: 100,
            width: 0,
            backgroundColor: 'rgba(0,0,0,0.5)',
            position: 'relative',
            cursor: 'pointer',
            marginBottom: theme.spacing(1),
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





        // DIALOG
        dialogContainer: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
        },
        green: {
            color: '#55CA36'
        },
    }
})



export default function EditProfile() {
    const classes = useStyle();
    const navigate = useNavigate();
    const id = Cookies.get('instructorID');




    // SESSION CHECK
    function sessionCheck() {
        if (!id) {
            navigate('/');
        }
    }









    // RENDERS FETCHED DATA
    const showStudent = () => {
        const sendData = {
            updateID: id
        }
        axios.post('https://ursacapi.000webhostapp.com/api/getInstructorID.php', JSON.stringify(sendData))
            .then(response => {
                setData(response.data[0])
                setProfilePic('https://ursacapi.000webhostapp.com/api/' + response.data[0].profilePicture)
            })
            .catch(err => console.log(err))
    }









    // PROFILE PICTURE
    const [isLoading, setisLoading] = useState(false);

    const [loadingDialog, setLoadingDialog] = useState(false);

    const [preview, setPreview] = useState(false);

    const [profilePic, setProfilePic] = useState('');

    const [uploadPhoto, setUploadPhoto] = useState(null);

    const handleChangePicture = (event) => {
        const reader = new FileReader();
        reader.onload = () => {
            if (reader.readyState === 2) {
                setProfilePic(reader.result);
            }
        }
        reader.readAsDataURL(event.target.files[0])

        let currentPhoto = event.target.files[0]

        setPreview(true);

        setUploadPhoto(currentPhoto);
    }

    const submitPhoto = async (e) => {
        e.preventDefault()
        let res = await uploadProfilePhoto(uploadPhoto, id)
        console.log(res.data);
        setProfilePic(res.data.url)
        setisLoading(false)
        setPreview(false)
        setTimeout(() => {
            setLoadingDialog(false)
        }, 1500);
        window.location.reload()

    }

    const uploadProfilePhoto = async (uploadPhoto, id) => {
        const formdata = new FormData();

        setLoadingDialog(true)
        setisLoading(true);

        formdata.append('profilePhoto', uploadPhoto);
        
        formdata.append('userid', id);

        return await axios({
            url: 'https://ursacapi.000webhostapp.com/api/changePhotoInstructor.php',
            method: "POST",
            headers: {
                'content-type': 'multipart/form-data'
            },
            data: formdata
        })
    }









    // FORM
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









    // DIALOGS
    const [passwordDialog, setPasswordDialog] = useState(false);

    const [wrongPassword, setWrongPassword] = useState(false);

    const [emptyPassword, setEmptyPassword] = useState(false);

    const [userPassword, setUserPassword] = useState('');

    const [success, setSuccess] = useState(false);

    const handlePasswordChange = (event) => {
        setUserPassword(event.target.value)
        setWrongPassword(false)
        setEmptyPassword(false)
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

            axios.post('https://ursacapi.000webhostapp.com/api/individualUpdateInstructor.php', JSON.stringify(sendData))
                .then(response => {
                    if (response.data == 'Success') {
                        setSuccess(true);
                        setUserPassword('');
                        setPreview(false);
                        showStudent();
                    } else {
                        setWrongPassword(true)
                    }
                })
                .catch(error => console.log(error))
        }

    }




    // RENDERER
    useEffect(() => {
        showStudent();
        sessionCheck()
    }, []);





    return (

        <Box className={classes.root}>
            <center>





                {/* PROFILE PICTURE AND STUDENT ID */}
                <Box mb={3}>
                    <Grid container spacing={4} >
                        <Grid item xs={6}>

                            <form onSubmit={submitPhoto}>

                                <input type="file" name='file' id='changeDP' style={{ display: 'none' }} accept="image/*" onChange={handleChangePicture} />
                                <input type="text" name='id' value={id} style={{ display: 'none' }} onChange={handleChangePicture} />

                                <label htmlFor="changeDP" className={classes.avatarContainer} >

                                    <Avatar className={classes.avatarSize} src={profilePic} />

                                    <Box className={classes.overlay}>
                                        <PhotoCameraRounded className={classes.camera} fontSize='large' />
                                    </Box>

                                </label>

                                {
                                    preview ?

                                        <Button variant='contained' type='submit' name='submit' color='secondary' size='small'> Save </Button>

                                        :

                                        null
                                }

                            </form>

                        </Grid>
                        <Grid item xs={6}>

                            <FormHelperText>Instructor ID: </FormHelperText>
                            <Typography align='left'>{data.instructorID}</Typography>

                        </Grid>
                    </Grid>
                </Box>



                <Divider className={classes.divider} />



                {/* FORM */}
                <Box mt={3}>

                    <form onSubmit={handleSubmit}>

                        <FormHelperText>First Name</FormHelperText>
                        <TextField variant='outlined' placeholder='First Name' type="text" name='firstName' value={data.firstName} onChange={handleChange} fullWidth required />

                        <FormHelperText>Middle Name</FormHelperText>
                        <TextField variant='outlined' placeholder='Middle Name' type="text" name='middleName' value={data.middleName} onChange={handleChange} fullWidth required />

                        <FormHelperText>Last Name</FormHelperText>
                        <TextField variant='outlined' placeholder='Last Name' type="text" name='lastName' value={data.lastName} onChange={handleChange} fullWidth required />

                        <FormHelperText>College</FormHelperText>
                        <TextField variant='outlined' placeholder='College' type="text" name='college' value={data.college} onChange={handleChange} fullWidth required disabled/>

                        <FormHelperText>Course</FormHelperText>
                        <TextField variant='outlined' placeholder='Course' type="text" name='course' value={data.course} onChange={handleChange} fullWidth required multiline disabled/>


                        <Button className={classes.btn} fullWidth type='submit' name='submit' variant='contained' color='secondary'> Save Changes </Button>
                    </form>
                </Box>


                <Dialog
                    open={loadingDialog}
                >
                    <DialogContent>

                        {
                            isLoading ?


                                <Box className={classes.dialogContainer}>
                                    <Box mb={1}>
                                        <CircularProgress color='secondary' />
                                    </Box>
                                    <DialogContentText>
                                        Saving...
                                    </DialogContentText>
                                </Box>

                                :

                                <Box className={classes.dialogContainer}>
                                    <DialogContentText>
                                        <Icon><CheckCircleOutlineRounded className={classes.green} fontSize='large' /></Icon>
                                    </DialogContentText>
                                    <DialogContentText>
                                        Changes applied
                                    </DialogContentText>
                                </Box>

                        }





                    </DialogContent>

                </Dialog>





            </center>




            {/* DIALOG */}
            <Dialog
                open={passwordDialog}
                onClose={cancelSubmit}
            >
                {
                    success ?

                        <Box>
                            <DialogContent className={classes.dialogContainer}>
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
