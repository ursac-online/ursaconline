import { Box, Button, Container, Divider, FormControl, FormControlLabel, FormLabel, Grid, IconButton, makeStyles, Paper, Radio, RadioGroup, TextField, Typography } from '@material-ui/core';
import { AddRounded, CheckBox, DeleteForeverRounded } from '@material-ui/icons';
import React from 'react';

const useStyle = makeStyles(theme => {
  return {
    paper: {
      padding: theme.spacing(2),
      borderTop: '10px solid #162276'
    },
    quizPaper: {
      padding: theme.spacing(2),
      borderLeft: '10px solid #162276'
    }
  }
})

const CreateQuiz = () => {
  const classes = useStyle()


  return (
    <Container>


      <Box mb={2}>
        Create Quiz
        <Paper className={classes.paper}>
          <TextField placeholder='Quiz title' fullWidth />
          <TextField placeholder='Description' fullWidth />
        </Paper>
      </Box>



      <Box mb={2}>
        <Grid container>
          <Grid item xs={12}>
            <Paper className={classes.quizPaper}>
              <TextField variant='outlined' placeholder='Question' multiline fullWidth />

              <Box mt={2}>
                <Grid container direction='row'>
                  <Grid item><Radio disabled /></Grid>
                  <Grid item><TextField value='Option' fullWidth /></Grid>
                </Grid>
                <Grid container direction='row'>
                  <Grid item><Radio disabled /></Grid>
                  <Grid item><TextField placeholder='Add Option' /></Grid>
                </Grid>
              </Box>


              <Box mt={3}>
                <Divider />
                <Typography variant='caption' onClick={() => { console.log('something') }}>Set correct answer</Typography>
              </Box>

            </Paper>
          </Grid>
          <Grid item xs={12}>
            <Box mt={2}>
              <Paper className={classes.paper}>
                <IconButton size='small'>
                  <DeleteForeverRounded />
                </IconButton>
                <IconButton size='small'>
                  <AddRounded />
                </IconButton>
              </Paper>
            </Box>

          </Grid>
        </Grid>

      </Box>



    </Container>
  );
}

export default CreateQuiz;
