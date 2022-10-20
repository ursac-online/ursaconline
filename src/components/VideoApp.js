import React from 'react';
import { Typography, AppBar, Dialog, Container, Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import VideoStream from './VideoStream';
import Sidebar from './Sidebar';
import Notifications from './Notification';

const useStyles = makeStyles((theme) => ({
  appBar: {
    backgroundColor: 'red'
  }
}));

const VideoApp = () => {
  const classes = useStyles();

  return (
    <Dialog open={true} className={classes.appBar} fullScreen>
      <Container>
        <Box mt={7}>
          <VideoStream />
          <Sidebar>
            <Notifications />
          </Sidebar>
        </Box>
      </Container>

    </Dialog>
  );
};

export default VideoApp;