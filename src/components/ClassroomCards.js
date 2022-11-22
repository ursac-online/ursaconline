import React, { useState } from 'react'
import { Avatar, Box, Button, Card, CardActionArea, CardActions, CardContent, CardHeader, CardMedia, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, IconButton, Menu, MenuItem, Typography } from '@material-ui/core'
import defaultCoverPhoto from '../images/defaultCoverPhoto.png'
import { makeStyles } from '@material-ui/styles'
import { Link } from 'react-router-dom'
import { MoreVert } from '@material-ui/icons'
import axios from 'axios'


const useStyle = makeStyles(theme => {
  return {
    root: {
      '& .MuiCardActionArea-focusHighlight': {
        background: 'none',
      },
      '& .MuiCardHeader-subheader': {
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
      },

      height: theme.spacing(37),
    },
    avatar: {
      background: '#162276',
      width: theme.spacing(7),
      height: theme.spacing(7),
    },
    media: {
      height: 0,
      paddingTop: '56.25%'
    },
    titleHeaderContainer: {
      width: theme.spacing(33),
      [theme.breakpoints.down('xs')]: {
        width: theme.spacing(25),
      }
    },
    cardLink: {
      textDecoration: 'none',
      color: 'inherit'
    },
    card: {
      width: theme.spacing(37),
      [theme.breakpoints.down('xs')]: {
        width: theme.spacing(29),
      },
      boxShadow: '',
      transition: 'all ease-out 0.1s',

      '&:hover': {
        // transform: 'scale(1.01)',
        boxShadow: '2px 3px 7px rgba(0, 0, 0, 0.15)',
        transition: 'all ease-out 0.1s',
        [theme.breakpoints.down('md')]: {
          transform: 'none'
        }
      }
    },
    removeBtn: {
      float: 'right',
      backgroundColor: 'rgba(0, 0, 0, 0.2)'
    }
  }
})


export default function ClassroomCards({ subject, showClassrooms }) {
  const classes = useStyle()


  const [uploadBG, setUploadBG] = useState(false);
  const handleUploadBG = () => {
    setUploadBG(true);
  }
  const handleCloseBG = () => {
    setUploadBG(false)
  }


  const removePost = () => {

    setOpenMenu(false)
    axios.post('https://ursacapi.000webhostapp.com/api/removeClassroom.php', subject.id)
      .then(res => {
        console.log(res.data);
        setAnchor(null)
        setFocused('');
        showClassrooms()

      })
      .catch(err => console.log(err));

  }


  const [focused, setFocused] = useState('');
  const [openMenu, setOpenMenu] = useState(false);
  const [anchor, setAnchor] = useState(null);
  const handleClickMenu = (event) => {
    setOpenMenu(true);
    setAnchor(event.currentTarget)
    setFocused(classes.focus)
  }
  const handleClose = () => {
    setOpenMenu(false)
    setAnchor(null)
    setFocused('')
  }

  return (
    <Box className={classes.root}>
      <Card className={classes.card} elevation={0} variant="outlined">



        <CardMedia
          className={classes.media}
          image={defaultCoverPhoto}
        />
        <Link className={classes.cardLink}
          to={`/teacherFeed/${subject.id}`} >

          <CardHeader
            title={
              <Box className={classes.titleHeaderContainer}>
                <Typography variant='h5' title={subject.subjectName} noWrap>
                  {subject.subjectName}
                </Typography>
              </Box>
            }
            subheader={subject.yearSection}

          />
        </Link>


        <Divider />

        <CardActions>
          <IconButton className={focused} aria-label="remove" size='small' onClick={handleClickMenu}>
            <MoreVert fontSize='small' />
          </IconButton>
        </CardActions>

        <Menu
          keepMounted
          anchorEl={anchor}
          getContentAnchorEl={null}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
          open={openMenu}
          onClose={handleClose}
          elevation={1}

        >
          <MenuItem dense onClick={removePost}> Remove</MenuItem>
          <MenuItem dense onClick={handleUploadBG}> Change cover photo</MenuItem>
        </Menu>


      </Card>



      {/* <Dialog
        open={uploadBG}
        onClose={handleCloseBG}
      >
        <DialogTitle>
          Change background photo
        </DialogTitle>


        <DialogContent>
          <DialogContentText>
            <img src={defaultCoverPhoto} style={{ width: '500px', height: '200px' }} alt="background-photo" />
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant='contained' color='secondary' fullWidth >Upload</Button>
        </DialogActions>
        <Divider />
        <DialogActions>
          <Button onClick={handleCloseBG} >Cancel</Button>
          <Button disabled >Save</Button>
        </DialogActions>
      </Dialog> */}


    </Box>
  )
}
