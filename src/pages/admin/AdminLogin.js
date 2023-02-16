import { React, useEffect, useState } from 'react'
import { Box, Button, Container, TextField, Link, Typography, Fade } from '@material-ui/core';
import logo2 from '../../images/logo2.png'
import logo1 from '../../images/logo1.png'
import logo from '../../images/logo1.png'
import urslogo from '../../images/urslogo.png'
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
            maxWidth: '100px',
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
            margin: 'auto'
        },
        textCenter: {
            textAlign: 'center'
        }

    }
});

export default function AdminLogin() {
    const navigate = useNavigate();
    const classes = useStyle();


    function sessionCheck() {
        if (Cookies.get('studentID')) {
            navigate('/studentDashboard')
        } else if (Cookies.get('teacherID')) {
            navigate('/teacherDasboard')
        } else if (Cookies.get('adminID')) {
            navigate('/admin')
        }
    }


    useEffect(() => {
        sessionCheck();
    }, [])



    const [data, setData] = useState({
        adminID: '',
        password: ''
    })

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;

        setData(data => ({ ...data, [name]: value }));
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const sendData = {
            adminID: data.adminID,
            password: data.password
        }
        axios.post('https://ursacapi.000webhostapp.com/api/adminLogin.php', JSON.stringify(sendData))
            .then((response) => {

                Cookies.set('adminID', response.data, {
                    expires: 1,
                    path: '/',
                    sameSite: 'strict'
                });

                if (response.data === 'Invalid') {
                    alert('Wrong Credentials');
                } else {
                    navigate('/admin');
                }
            })
            .catch((err) => {
                console.log(err);
            })
    }



    return (
        <Box className={classes.root}>

            <div className={classes.logoContainer}>
                <Box className={classes.responsiveLogo}>
                    <img className={classes.logo} src={logo} alt="URSAC Online logo" />
                </Box>
                <Box className={classes.responsiveLogo1}>
                    <img className={classes.logo} src={logo1} alt="URSAC Online logo" />
                </Box>
                <Box className={classes.responsiveLogo2}>
                    <img className={classes.logo} src={logo2} alt="URSAC Online logo" />
                </Box>

            </div>
            <Container className={classes.formContainer}>
                <Container>
                    <Typography className={classes.textCenter} variant='h3'>
                        Admin
                    </Typography>
                    <br />
                </Container>


                <form className={classes.form} onSubmit={handleSubmit} method='POST' >
                    <TextField
                        onChange={handleChange}
                        value={data.adminID}
                        placeholder='Admin ID'
                        name='adminID'
                        variant='outlined'
                        type='text'
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


                </form>
            </Container>
        </Box>
    )
}
