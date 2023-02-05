import { React, useEffect, useState } from 'react'
import { Box, Container, Fade, Icon } from '@material-ui/core';
import logo2 from '../images/logo2.png'
import logo1 from '../images/logo1.png'
import logo from '../images/logo1.png'
import urslogo from '../images/urslogo.png'
import { makeStyles } from '@material-ui/styles';
import { useNavigate } from 'react-router-dom';

import Cookies from 'js-cookie';
import StudentLogin from './StudentLogin';
import TeacherLogin from './TeacherLogin';

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
        formContainer: {
            display: 'fixed',
            backgroundColor: '#f9fbfd',
            padding: '22px',
            [theme.breakpoints.up('sm')]: {
                display: 'block',
                boxShadow: 'rgba(11, 21, 31, 0.1) 0px 4px 16px, rgba(11, 21, 31, 0.1) 0px 4px 4px;',
                maxWidth: '400px',
                borderRadius: '7px',
                marginTop: '10%',
                paddingBottom: '30px',
                backgroundColor: '#ffffff'
            }
        },
        logoContainer: {
            maxWidth: '300px',
            margin: '0 auto'
        },
        logo: {
            width: '100%',
            paddingTop: '10%'
        },
        responsiveLogo: {
            display: 'none',
            [theme.breakpoints.up('md')]: {
                display: 'block'
            }
        },
        responsiveLogo1: {
            display: 'none',
            [theme.breakpoints.only('sm')]: {
                display: 'block'
            }
        },
        responsiveLogo2: {
            display: 'none',
            [theme.breakpoints.down('xs')]: {
                display: 'block'
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
        loading: {
            display: 'flex',
            height: '100%',
            width: '100%',
            zIndex: 1,
            position: 'absolute',
            background: '#f9fbfd',
            top: '-40px'
        },
        loadingImage: {
            width: '200px',
            margin: 'auto',
        }

    }
});

export default function Login() {
    const navigate = useNavigate();
    const classes = useStyle();


    function sessionCheck() {
        if (Cookies.get('idLoggedIn')) {
            navigate('/studentDashboard')
        } else if (Cookies.get('instructorID')) {
            navigate('/teacherDashboard')
        } else if (Cookies.get('adminID')) {
            navigate('/admin')
        }
    }



    const [isLoading, setIsLoading] = useState(false);
    const [isPending, setIsPending] = useState(true);
    const [selectPosition, setSelectPosition] = useState(true);
    useEffect(() => {
        setTimeout(() => {
            fetch(' https://www.ursaconline.com/')
                .then(setIsPending(false))
                .catch(err => {
                    console.log(err.message)
                })
                .then(sessionCheck());
        }, 1510);
        sessionCheck();
        setTimeout(() => {
            fetch(' https://www.ursaconline.com/')
                .then(setIsLoading(true))
        }, 1500);
    }, [])




    const handleChangeToTeacher = () => {
        setSelectPosition(false)
    }
    const handleChangeToStudent = () => {
        setSelectPosition(true)
    }


    // const [position, setPosition] = useState('Student');

    return (
        <Box className={classes.root}>
            {isPending &&
                <Fade in={isPending}>
                    <div className={classes.loading}>
                        <img src={urslogo} className={classes.loadingImage}  />
                    </div>
                </Fade>
            }

            {isLoading &&
                <Fade in={true} timeout={1500}>
                    <Container className={classes.formContainer}>

                        <div className={classes.logoContainer}>
                            <Box className={classes.responsiveLogo}>
                                <Icon><img className={classes.logo} src={logo} alt="URSAC Online logo" /></Icon>
                            </Box>
                            <Box className={classes.responsiveLogo1}>
                                <Icon><img className={classes.logo} src={logo1} alt="URSAC Online logo" /></Icon>
                            </Box>
                            <Box className={classes.responsiveLogo2}>
                                <Icon><img className={classes.logo} src={logo2} alt="URSAC Online logo" /></Icon>
                            </Box>
                        </div>

                        <Box className={classes.form}>

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


                            {selectPosition ? 
                            (<StudentLogin handleChangeToTeacher={handleChangeToTeacher} />
                            ) : (
                            <TeacherLogin handleChangeToStudent={handleChangeToStudent} />)}
                        </Box>


                    </Container>
                </Fade>
            }
        </Box>
    )
}
