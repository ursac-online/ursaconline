import React from 'react'
import { Card, CardActionArea, CardContent, CardHeader, CardMedia, Divider, Typography } from '@material-ui/core'
import defaultCoverPhoto from '../images/defaultCoverPhoto.png'
import { makeStyles } from '@material-ui/styles'
import { Link, useNavigate } from 'react-router-dom'
import StudentFeed from '../pages/StudentFeed'

const useStyle = makeStyles(theme => {
  return {
    root: {
      '& .MuiCardActionArea-focusHighlight': {
        background: 'none'
      }
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

    cardLink: {
      textDecoration: 'none',
      color: 'inherit'
    }
  }
})


export default function ClassroomCards({ subject }) {
  const classes = useStyle()


  return (
    <>
      <Card className={classes.root} >

          <CardActionArea>

            <CardMedia
              className={classes.media}
              image={defaultCoverPhoto}
            />
            <CardHeader
              title={subject.subjectName}
              subheader={subject.yearSection}
            />

            <Divider />
            <CardContent>
              <Typography>
                {/* {subject.body} */}
              </Typography>
            </CardContent>

          </CardActionArea>
      </Card>
    </>
  )
}
