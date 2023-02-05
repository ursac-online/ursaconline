import { Box, Drawer, makeStyles, Toolbar } from "@material-ui/core";
import React from "react";

const useStyle = makeStyles((theme) => {
  return {
    drawer: {
      backgroundColor: "#162276",
      height: "100%",
      width: 80
    },
    listClass: {
      listStyleType: 'none',
    },
    toolbar: {
      padding: 0,
      display: 'flex',
      justifyContent: 'center'
    }
  };
});

function SideNavigationBar(props) {
  const drawerList = props.listOfLinks;
  const classes = useStyle();
  const list = drawerList.map((link, index) => {
   return <li key={index}>{link}</li>;
  });

  return (
    <Box>
      <Drawer variant="permanent">
        <Box className={classes.drawer}>
          <Toolbar className={classes.toolbar}>
            <ul className={classes.listClass}>{list}</ul>
          </Toolbar>
        </Box>
      </Drawer>
    </Box>
  );
}

export default SideNavigationBar;
