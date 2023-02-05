import {
  AppBar,
  Box,
  makeStyles,
  Toolbar,
  Typography,
} from "@material-ui/core";
import React from "react";
import UserPreferences from "./UserPreferences";

const useStyle = makeStyles((theme) => {
  return {
    toolbarSpacing: {
      display: "flex",
      alignContent: "center",
      justifyContent: "space-between",
    },
    appBar: {
      backgroundColor: "#fefefe",
      marginLeft: 80,
      width: `calc(100% - ${80}px)`,
    },
  };
});

function TopNavigationBar(props) {
  const classes = useStyle();
  const userName = props.userNameFromLayout;
  const role = props.roleFromLayout
  const logout = props.logout

  return (
    <Box>
      <AppBar className={classes.appBar} elevation={1}>
        <Toolbar className={classes.toolbarSpacing}>
          <Typography variant="h6" color="primary">URSAC Online | {role}</Typography>
          <UserPreferences userNameFromTopNavBar={userName} logout={logout} />
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default TopNavigationBar;
