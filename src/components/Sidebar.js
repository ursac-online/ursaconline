import React, { useState, useContext } from 'react';
import { Button, TextField, Grid, Typography, Container, Paper, Box } from '@material-ui/core';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Assignment, Phone, PhoneDisabled } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';

import { Context } from '../Context';

const useStyles = makeStyles((theme) => ({
  margin: {
    marginTop: theme.spacing(2),
  }
}));

const Sidebar = ({ children }) => {
  const { me, callAccepted, name, setName, callEnded, leaveCall, callUser } = useContext(Context);
  const [idToCall, setIdToCall] = useState('');
  const classes = useStyles();

  return (
    <Box>
      <form noValidate autoComplete="off">
        <Grid container spacing={5} className={classes.gridContainer}>
          <Grid item xs={12} md={6}>
            <Typography gutterBottom variant="h6">Account Info</Typography>
            <TextField label="Name" value={name} onChange={(e) => setName(e.target.value)} fullWidth />


            <Box mt={2}>
              <CopyToClipboard text={me}>
                <Button variant="contained" color="secondary" fullWidth startIcon={<Assignment fontSize="large" />}>
                  Copy Your ID
                </Button>
              </CopyToClipboard>
            </Box>


          </Grid>
          <Grid item xs={12} md={6}>
            <Typography gutterBottom variant="h6">Make a call</Typography>
            <TextField label="ID to call" value={idToCall} onChange={(e) => setIdToCall(e.target.value)} fullWidth />

            <Box mt={2}>
              {callAccepted && !callEnded ? (
                <Button variant="contained"  startIcon={<PhoneDisabled fontSize="large" />} fullWidth onClick={leaveCall}>
                  Hang Up
                </Button>
              ) : (
                <Button variant="contained" color="secondary" startIcon={<Phone fontSize="large" />} fullWidth onClick={() => callUser(idToCall)}>
                  Call
                </Button>
              )}
            </Box>

          </Grid>
        </Grid>
      </form>
      {children}
    </Box>
  );
};

export default Sidebar;