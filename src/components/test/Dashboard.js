import { Box, Container, makeStyles, Typography } from "@material-ui/core";
import React from "react";

    const useStyle = makeStyles(theme => {
        return {
            root: {
                display: 'flex'
            }
        }
    })

function Dashboard() {

    const classes = useStyle();

  return (
    <Box className={classes.root}>
      <Container>
        <Typography variant="h4">Welcome to your Dashboard!</Typography>
      </Container>
    </Box>
  );
}

export default Dashboard;
