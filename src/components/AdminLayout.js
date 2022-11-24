
import React from 'react';
import { AppBar, Avatar, Drawer, IconButton, List, Menu, ListItem, ListItemText, makeStyles, MenuItem, Toolbar, Tooltip, Box, ListItemIcon, Divider, Typography } from '@material-ui/core'
import { AddCircle, ChevronLeftRounded, MenuRounded, ViewModule, SupervisorAccountRounded, AssignmentIndRounded, PersonRounded, MeetingRoomRounded, PersonAddRounded } from '@material-ui/icons';
import phil from '../images/phil.png'
import logo4 from '../images/logo4.png'
import logo5 from '../images/logo5.png'
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import Cookies from 'js-cookie';
import ursacOnlineLogo from '../images/logo5.png'

const drawerWidth = 70;

const useStyle = makeStyles(theme => {
  return {
    root: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',

      '& .MuiAppBar-root': {
        boxShadow: 'rgb(35 68 101 / 5%) 0px 4px 16px, rgb(35 68 101 / 5%) 0px 4px 4px;'
      }
    },



    divider: {
      backgroundColor: 'white'
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
    left: {
      display: 'flex',
      alignItems: 'flex-start',
      marginBottom: '-50px'
    }
  }
});



export default function AdminLayout({ children }) {
  const classes = useStyle()
  const navigate = useNavigate();
  const [openDrawer, setOpenDrawer] = useState(false)



  const [anchor, setAnchor] = useState(null)
  const openMenu = (event) => {
    setAnchor(event.currentTarget)
  }

  const closeMenu = () => {
    setAnchor(null)
  }

  const defaultProfilePic = ursacOnlineLogo;
  const [profilePicture, setProfilePicture] = useState(defaultProfilePic)


  const studentSideLinks = [
    {
      text: 'Dashboard',
      icon: <Tooltip title='Dasboard' placement='right-start' ><ViewModule /></Tooltip>,
      path: '/admin',
      id: 1
    }
  ]
  const listLinks = [
    {
      text: 'Student List',
      icon: <Tooltip title='List of Students' ><AssignmentIndRounded /></Tooltip>,
      path: '/studentList',
      id: 1
    },
    {
      text: 'Instructor List',
      icon: <Tooltip title='List of Instructors' ><SupervisorAccountRounded /></Tooltip>,
      path: '/instructorList',
      id: 2
    },
    {
      text: 'Admins',
      icon: <Tooltip title='Admins' ><PersonRounded /></Tooltip>,
      path: '/adminList',
      id: 3
    },
    {
      text: 'Subject Classrooms',
      icon: <Tooltip title='Classrooms' ><MeetingRoomRounded /></Tooltip>,
      path: '/classroomList',
      id: 4
    },
    {
      text: 'Create User',
      icon: <Tooltip title='Create User' ><PersonAddRounded /></Tooltip>,
      path: '/createAdmin',
      id: 5
    }
  ]

  const user = Cookies.get('userName')
  const userInfo = Cookies.get('userInfo')

  const logout = () => {
    Cookies.remove('adminID');
    navigate('/adminLogin');
  }



  return (
    <div className={classes.root}>

      {/* // Navigation Bar */}
      <AppBar className={classes.appBar} position='fixed' color='inherit'>
        <Toolbar>

          <IconButton className={classes.mobileMenu} onClick={() => setOpenDrawer(true)}>
            <MenuRounded color='error' />
          </IconButton>


          <Menu elevation={2} className={classes.menu} open={Boolean(anchor)} anchorEl={anchor} onClose={closeMenu} keepMounted >
            <MenuItem disabled> {user} </MenuItem>
            <Divider />
            <MenuItem dense onClick={logout}> Sign Out </MenuItem>
          </Menu>



          {/* Mobile Side Navigation Bar */}
          <Drawer anchor='left' open={openDrawer} onClose={() => setOpenDrawer(false)} >
            <Box className={classes.mobileDrawer} role='presentation' textAlign='center' >

              <div className={classes.left}>
                <IconButton>
                  <ChevronLeftRounded fontSize='large' onClick={() => setOpenDrawer(false)} />
                </IconButton>
              </div>

              <div>
                <center>
                  <img src={logo4} style={{ width: '70px', height: 'auto' }} alt="" />
                </center>
              </div>

              <List>
                {studentSideLinks.map((links) => (
                  <ListItem className={classes.lists} onClick={() => { navigate(links.path, { replace: true }) }} justifyContent='center' button key={links.id} >
                    <ListItemIcon>{links.icon}</ListItemIcon>
                    <ListItemText primary={links.text} />
                  </ListItem>
                ))}
              </List>
              <br />
              <Divider className={classes.divider} variant='middle' />
              <br />
              <List>
                {listLinks.map((list) => (
                  <ListItem className={classes.lists} onClick={() => { navigate(list.path, { replace: true }) }} justifyContent='center' button key={list.id} >
                    <ListItemIcon>{list.icon}</ListItemIcon>
                    <ListItemText primary={list.text} />
                  </ListItem>
                ))}
              </List>
            </Box>
          </Drawer>


          <div className={classes.title}>
            <Link to='/'><img className={classes.iconLogo} src={logo5} style={{ width: '40px', height: 'auto' }} alt="" /></Link>
          </div>

                  <Typography variant='subtitle1'>{user}</Typography>
          <IconButton onClick={openMenu}>
            <Avatar src={profilePicture} />
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
        <br />
        <Divider className={classes.divider} variant='middle' />
        <br />
        <List>
          {listLinks.map((list) => (
            <ListItem onClick={() => { navigate(list.path, { replace: true }) }} button key={list.id}>
              <ListItemText className={classes.center} primary={list.icon} />
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
