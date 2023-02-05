import { Box, makeStyles } from "@material-ui/core";
import Cookies from "js-cookie";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SideNavigationBar from "./SideNavigationBar";
import TopNavigationBar from "./TopNavigationBar";

const useStyle = makeStyles((theme) => {
  return {
    page: {
      display: 'flex',
      background: "#f9fbfd",
      paddingTop: theme.spacing(1),
      paddingBottom: theme.spacing(1),
      marginBottom: theme.spacing(5),
      marginTop: theme.spacing(5),
      width: `calc(100% - ${80})`,
      marginLeft: 100,
      marginRight: 100,
      [theme.breakpoints.down("sm")]: {
        width: `calc(100% - ${30})`,
        marginLeft: 30,
        marginRight: 30,
      },
    },
    toolbar: theme.mixins.toolbar,
    drawerHeader: {
      alignItems: "center",
      padding: theme.spacing(0, 1),
      // necessary for content to be below app bar
      ...theme.mixins.toolbar,
      justifyContent: "center",
    },
  };
});

function Layout(props) {
  const links = props.linksFromApp;
  const userName = props.userNameFromApp;
  const role = props.roleFromApp
  const children = props.children;
  const logout = props.logout
  const navigate = useNavigate();
  const classes = useStyle();

  const checkCookies = () => {
    if (Cookies.get("idLoggedIn") == "" || Cookies.get("instructorID") == "" || Cookies.get("adminID") == "" ) {
      navigate('/')
    } 
  };

  useEffect(() => {
    checkCookies()
  }, [Cookies]);

  return (
    <Box>
      <TopNavigationBar userNameFromLayout={userName} roleFromLayout={role} logout={logout} />
      <SideNavigationBar listOfLinks={links} />
        <div className={classes.drawerHeader} />
        <div className={classes.page}>
          <div className={classes.toolbar} elevation={0}></div>
          {children}
      </div>
    </Box>
  );
}

export default Layout;
