import { Box, Container, Dialog } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';

import Notifications from '../Notification';
import Sidebar from '../Sidebar';
import VideoStream from './VideoStream';

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