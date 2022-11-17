
import React, { useEffect } from 'react';
import { AppBar, Avatar, Drawer, IconButton, List, Menu, ListItem, ListItemText, makeStyles, MenuItem, Toolbar, Tooltip, Box, ListItemIcon, Divider, Typography, CircularProgress } from '@material-ui/core'
import { AddCircle, ChevronLeftRounded, CloseRounded, MenuRounded, ViewModule } from '@material-ui/icons';
import logo4 from '../images/logo4.png'
import logo5 from '../images/logo5.png'
import urs from '../images/urslogo.png'
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

import Cookies from 'js-cookie'

const drawerWidth = 70;

const useStyle = makeStyles(theme => {
  return {
    root: {

      '& .MuiToolbar-root': {
        // boxShadow: 'rgb(35 68 101 / 5%) 0px 4px 16px, rgb(35 68 101 / 5%) 0px 4px 4px;',
        boxShadow: 'rgb(35 68 101 / 5%) 0px 4px 16px, rgb(35 68 101 / 5%) 0px 4px 4px;'
      },

      // '& .MuiCard-root': {
      //   boxShadow: '',
      //   transition: 'all ease-out 0.1s',
      //   [theme.breakpoints.down('xs')]: {
      //     margin: '0 50px'
      //   },

      //   '&:hover': {
      //     transform: 'scale(1.01)',
      //     boxShadow: '2px 5px 7px rgba(0, 0, 0, 0.25)',
      //     transition: 'all ease-out 0.1s',
      //     [theme.breakpoints.down('md')]: {
      //       transform: 'none'
      //     }
      //   }
      // }
    },


    page: {
      background: '#f9fbfd',
      width: '100%',
      paddingTop: theme.spacing(1),
      paddingBottom: theme.spacing(1),
      marginBottom: theme.spacing(5)
    },


    appBar: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
      [theme.breakpoints.down('sm')]: {
        width: '100%',
        backgroundColor: '#162276'
      }
    },
    iconLogo: {
      [theme.breakpoints.down('sm')]: {
        display: 'none'
      }
    },
    toolbar: theme.mixins.toolbar,


    drawer: {
      width: drawerWidth,
      [theme.breakpoints.down('sm')]: {
        display: 'none'
      }
    },
    drawerPaper: {
      width: drawerWidth,
      background: '#162276',
      color: 'white'
    },
    drawerHeader: {
      display: 'flex',
      alignItems: 'center',
      padding: theme.spacing(0, 1),
      // necessary for content to be below app bar
      ...theme.mixins.toolbar,
      justifyContent: 'center'
    },
    mobileDrawer: {
      width: '100vw',
      backgroundColor: '#162276',
      height: '100vh',
    },
    imge: {
      textAlign: 'center'
    },
    menu: {
      marginTop: theme.spacing(5)
    },
    mobileMenu: {
      [theme.breakpoints.up('md')]: {
        display: 'none'
      }
    },
    xBtn: {
      float: 'right'
    },


    title: {
      flexGrow: '1'
    },
    lists: {
      marginTop: '10px',
      color: '#fefefe'
    },
    fullList: {
      width: 'auto',
    },
    center: {
      textAlign: 'center'
    },
    whiteIcon: {
      color: 'white'
    },
    loading: {
      marginTop: theme.spacing(30)
    },
    whiteText: {
      color: '#333',
      [theme.breakpoints.down('sm')]: {
        color: 'white'
      }
    }
  }
});



export default function Layout({ children }) {
  const classes = useStyle()
  const navigate = useNavigate()
  const [openDrawer, setOpenDrawer] = useState(false)
  const [profilePic, setProfilePic] = useState('');
  const [isLayoutLoading, setIsLayoutLoading] = useState(true);
  const Cookie = Cookies.get('instructorID');

  const showInstructorsInfo = () => {
    axios.post('https://ursacapi.000webhostapp.com/api/getInstructors.php', JSON.stringify(Cookie))
      .then((response) => {
        if (response.data) {
          Cookies.set('userName', response.data[0].firstName + ' ' + response.data[0].lastName)
          Cookies.set('userFirstName', response.data[0].firstName)
          setProfilePic('https://ursacapi.000webhostapp.com/api/' + response.data[0].profilePicture)
        }

      })
      .catch(error => {
        console.log(error);
      })
      setIsLayoutLoading(false)

  }


  useEffect(() => {
    showInstructorsInfo();
  }, []);

  const [anchor, setAnchor] = useState(null)
  const openMenu = (event) => {
    setAnchor(event.currentTarget)
  }

  const closeMenu = () => {
    setAnchor(null)
  }


  const logout = () => {
    Cookies.remove('idLoggedIn');
    Cookies.remove('instructorID');
    Cookies.remove('userInfo');
    Cookies.remove('userFirstName');
    Cookies.remove('userName');
    navigate('/');
  }


  const user = Cookies.get('userName');
  const userFirstName = Cookies.get('userFirstName');


  const studentSideLinks = [
    {
      text: 'Dashboard',
      icon: <Tooltip title='Dasboard' placement='right-start' ><ViewModule className={classes.whiteIcon} /></Tooltip>,
      path: '/teacherDashboard',
      id: 1
    },
    {
      text: 'Join/Create',
      icon: <Tooltip title='Join/Create' ><AddCircle className={classes.whiteIcon} /></Tooltip>,
      path: '/createTeacherClassroom',
      id: 2
    },
  ]



  return (
    <div className={classes.root}>
      {/* {
        isLayoutLoading ?

          <Box>
            <CircularProgress className={classes.loading} color='secondary' />
            <img src={urs} alt="" />
          </Box>

          : */}

          <Box>
            {/* // Navigation Bar */}
            <AppBar className={classes.appBar} position='fixed' color='inherit' elevation={0}>
              <Toolbar>


                <IconButton className={classes.mobileMenu} onClick={() => setOpenDrawer(true)}>
                  <MenuRounded className={classes.whiteIcon} />
                </IconButton>


                <Menu elevation={2} className={classes.menu} open={Boolean(anchor)} anchorEl={anchor} onClose={closeMenu} keepMounted >
                  <MenuItem disabled> {user} </MenuItem>
                  <MenuItem dense onClick={() => { navigate('/instructorEditProfile'); setAnchor(null) }}> Edit Profile </MenuItem>
                  <MenuItem dense onClick={() => { navigate('/instructorEditPassword'); setAnchor(null) }}> Change Password </MenuItem>
                  <Divider />
                  {/* <MenuItem dense onClick={accountDetails}> Account Details </MenuItem> */}
                  <MenuItem dense onClick={logout}> Sign Out </MenuItem>
                </Menu>



                {/* Mobile Side Navigation Bar */}
                <Drawer anchor='left' open={openDrawer} onClose={() => setOpenDrawer(false)} >
                  <Box className={classes.mobileDrawer} role='presentation'>

                    <IconButton onClick={() => {setOpenDrawer(false)}} className={classes.xBtn}>
                      <CloseRounded className={classes.whiteIcon} />
                    </IconButton>

                    <Box mt={5} className={classes.imge}>
                      <img src={logo4} style={{ width: '70px', height: 'auto' }} alt="" />
                    </Box>

                    <List>
                      {studentSideLinks.map((links) => (
                        <ListItem className={classes.lists} onClick={() => { navigate(links.path, { replace: true }); setOpenDrawer(false) }} button key={links.id} >
                          <ListItemIcon>{links.icon}</ListItemIcon>
                          <ListItemText primary={links.text} />
                        </ListItem>
                      ))}
                    </List>
                  </Box>
                </Drawer>


                <div className={classes.title}>
                  <Link to='/'><img className={classes.iconLogo} src={logo5} style={{ width: '40px', height: 'auto' }} alt="" /></Link>
                </div>

                <Typography className={classes.whiteText} >{userFirstName}</Typography>
                <IconButton onClick={openMenu}>
                  <Avatar src={profilePic} />
                </IconButton>
              </Toolbar>
            </AppBar>



            {/* sidebar */}
            <Drawer
              className={classes.drawer}
              variant="permanent"
              anchor="left"
              classes={{ paper: classes.drawerPaper }}
            >

              <List>
                {studentSideLinks.map((links) => (
                  <ListItem onClick={() => { navigate(links.path, { replace: true }) }} button key={links.id}>
                    <ListItemText className={classes.center} primary={links.icon} />
                  </ListItem>
                ))}
              </List>

            </Drawer>

            <div className={classes.content}>
              <div className={classes.drawerHeader} />
              <div className={classes.page}>
                <div className={classes.toolbar} elevation={0}></div>
                {children}
              </div>
            </div>
          </Box>

      {/* } */}


    </div>
  )
}
