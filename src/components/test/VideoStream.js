import { Box, Grid, makeStyles, Typography } from '@material-ui/core';
import React, { useContext } from 'react';

import { Context } from '../../Context';

const useStyles = makeStyles((theme) => ({
  video: {
    width: '100%',
    [theme.breakpoints.down('xs')]: {
      width: '300px',
    },
  },
  container: {
    width: '100%',
    maxWidth: '1400px',
    boxShadow: theme.shadows[5]
  },
  gridContainer: {
    justifyContent: 'center',
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column',
    },
  },
  paper: {
    padding: '10px'
  },
}));

const VideoStream = () => {
  const { name, callAccepted, myVideo, userVideo, callEnded, stream, call } = useContext(Context);
  const classes = useStyles();

  return (
    <Grid container justifyContent='center' spacing={10}>
      {stream && (
        <Box mb={5} mt={2} p={5} className={classes.container}>
          <Grid item xs={12}>
              <Typography variant="h5" gutterBottom>{name || 'Phil Cajurao'}</Typography>
              <video playsInline muted ref={myVideo} autoPlay className={classes.video} />
          </Grid>
        </Box>
      )}
      {callAccepted && !callEnded && (
        <Box mb={5} p={5} className={classes.container}>
          <Grid item xs={12}>
              <Typography variant="h5" gutterBottom>{call.name || 'Phil Cajurao'}</Typography>
              <video playsInline muted ref={userVideo} autoPlay className={classes.video} />
          </Grid>
        </Box>
      )}
    </Grid>
  );
};

export default VideoStream;