import React from 'react'
import { Avatar, Box, Card, CardActionArea, CardContent, CardHeader, CardMedia, Divider, Typography } from '@material-ui/core'
import defaultCoverPhoto from '../images/defaultCoverPhoto.png'
import { makeStyles } from '@material-ui/styles'
import { Link } from 'react-router-dom'


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

        width: '270px',
        maxWidth: theme.spacing(23)
      },
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
      width: theme.spacing(23),
      [theme.breakpoints.down('xs')]: {
        width: theme.spacing(16),
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
    }
  }
})


export default function SubjectCards({ subject }) {
  const classes = useStyle()
  const firstName = subject.instructor.split('')[0]

  return (
    <Box className={classes.root}>
      <Card className={classes.card}>

        <CardMedia
          className={classes.media}
          image={defaultCoverPhoto}
        />

        <Link className={classes.cardLink}
          to={`/studentFeed/${subject.classroomID}`} >
          <CardHeader
            avatar={
              <Avatar className={classes.avatar} src={subject.image} sizes='medium'>
                {firstName}
              </Avatar>
            }
            title={
              <Box className={classes.titleHeaderContainer}>
                <Typography variant='h6' noWrap>
                  {subject.subjectName}
                </Typography>
              </Box>
            }
            subheader={subject.instructor}
          />
        </Link>

        <Divider />

        <CardContent>
          <Typography sx={{ textAlign: 'center' }} >
            {/* {subject.body} */}
          </Typography>
        </CardContent>
      </Card>
    </Box>
  )
}
