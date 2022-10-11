
import React from 'react';
import { AppBar, Avatar, Drawer, IconButton, List, Menu, ListItem, ListItemText, makeStyles, MenuItem, Toolbar, Tooltip, Box, ListItemIcon, Divider, Typography } from '@material-ui/core'
import { AddCircle, ChevronLeftRounded, MenuRounded, ViewModule } from '@material-ui/icons';
import logo4 from '../images/logo4.png'
import logo5 from '../images/logo5.png'
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import Cookies from 'js-cookie'

const drawerWidth = 70;

const useStyle = makeStyles(theme => {
  return {
    root: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',

      '& .MuiToolbar-root': {
        // boxShadow: 'rgb(35 68 101 / 5%) 0px 4px 16px, rgb(35 68 101 / 5%) 0px 4px 4px;',
        boxShadow: 'rgb(35 68 101 / 5%) 0px 4px 16px, rgb(35 68 101 / 5%) 0px 4px 4px;'
      },

      '& .MuiCard-root': {
        boxShadow: '',
        transition: 'all ease-out 0.1s',
        [theme.breakpoints.down('xs')]: {
          margin: '0 50px'
        },

        '&:hover': {
          transform: 'scale(1.01)',
          boxShadow: '2px 5px 7px rgba(0, 0, 0, 0.25)',
          transition: 'all ease-out 0.1s',
          [theme.breakpoints.down('md')]: {
            transform: 'none'
          }
        }
      }
    },


    page: {
      background: '#f9fbfd',
      width: '100%',
      padding: theme.spacing(1)
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
      height: '100vh'
    },
    menu: {
      marginTop: theme.spacing(5)
    },
    mobileMenu: {
      [theme.breakpoints.up('md')]: {
        display: 'none'
      }
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
  }
});



export default function Layout({ children }) {
  const classes = useStyle()
  const navigate = useNavigate()
  const [openDrawer, setOpenDrawer] = useState(false)



  const [anchor, setAnchor] = useState(null)
  const openMenu = (event) => {
    setAnchor(event.currentTarget)
  }

  const closeMenu = () => {
    setAnchor(null)
  }


  const logout = () => {
    Cookies.remove('idLoggedIn');
    Cookies.remove('teacherID');
    Cookies.remove('userInfo');
    navigate('/');
  }


  const user = Cookies.get('userInfo');


  const studentSideLinks = [
    {
      text: 'Dashboard',
      icon: <Tooltip title='Dasboard' placement='right-start' ><ViewModule color='error' /></Tooltip>,
      path: '/teacherDashboard',
      id: 1
    },
    {
      text: 'Join/Create',
      icon: <Tooltip title='Join/Create' ><AddCircle color='error' /></Tooltip>,
      path: '/createTeacherClassroom',
      id: 2
    },
  ]



  return (
    <div className={classes.root}>

      {/* // Navigation Bar */}
      <AppBar className={classes.appBar} position='fixed' color='inherit' elevation={0}>
        <Toolbar>

          
          <IconButton className={classes.mobileMenu} onClick={() => setOpenDrawer(true)}>
            <MenuRounded color='error' />
          </IconButton>

          
          <Menu elevation={2} className={classes.menu} open={Boolean(anchor)} anchorEl={anchor} onClose={closeMenu} keepMounted >
            <MenuItem disabled> {user} </MenuItem>
            <Divider />
            <MenuItem dense> Manage Account </MenuItem>
            <MenuItem dense> Settings </MenuItem>
            <MenuItem dense onClick={logout}> Sign Out </MenuItem>
          </Menu>



          {/* Mobile Side Navigation Bar */}
          <Drawer anchor='left' open={openDrawer} onClose={() => setOpenDrawer(false)} >
            <Box className={classes.mobileDrawer} role='presentation' textAlign='center' >

              <IconButton>
                <ChevronLeftRounded color='error' onClick={() => setOpenDrawer(false)} />
              </IconButton>

              <center>
                <img src={logo4} style={{ width: '70px', height: 'auto' }} alt="" />
              </center>

              <List>
                {studentSideLinks.map((links) => (
                  <ListItem className={classes.lists} onClick={() => { navigate(links.path, { replace: true }) }} justifyContent='center' button key={links.id} >
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

          <IconButton onClick={openMenu}>
            <Avatar />
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
    </div>
  )
}
