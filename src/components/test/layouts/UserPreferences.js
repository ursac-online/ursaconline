import {
  Avatar,
  Box,
  Divider,
  IconButton,
  makeStyles,
  Menu,
  MenuItem,
  MenuList,
} from "@material-ui/core";
import Cookies from "js-cookie";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const useStyle = makeStyles((theme) => {
  return {
    menu: {
      "& .MuiPaper-root": {
        margin: -7,
      },
    },
  };
});

function UserPreferences(props) {
  const classes = useStyle();
  const [anchor, setAnchor] = useState(null);
  const [open, setOpen] = useState(false);
  const userName = props.userNameFromTopNavBar;
  const navigate = useNavigate();

  const handleClick = (e) => {
    setOpen(true);
    setAnchor(e.currentTarget);
  };

  const handleClose = () => {
    setAnchor(null);
    setOpen(false);
  };

  const toLogin = () => {
    navigate("/");
  };

  

  return (
    <Box>
      <IconButton onClick={handleClick} size="medium">
        <Avatar />
      </IconButton>
      <Menu
        className={classes.menu}
        open={open}
        anchorEl={anchor}
        onClose={handleClose}
        getContentAnchorEl={null}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        elevation={2}
      >
        {userName === "" ? (
          <Box>
            <MenuList>
              <MenuItem disabled>Please login an account first</MenuItem>
              <MenuItem onClick={toLogin}>Login</MenuItem>
            </MenuList>
          </Box>
        ) : (
          <Box>
            <MenuList>
              <MenuItem disabled>{userName}</MenuItem>
              <Divider />
              <MenuItem>Account Details</MenuItem>
              <MenuItem onClick={() => {props.logout(); navigate("/")}}>Sign out</MenuItem>
            </MenuList>
          </Box>
        )}
      </Menu>
    </Box>
  );
}

export default UserPreferences;
