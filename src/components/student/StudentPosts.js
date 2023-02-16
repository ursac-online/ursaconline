import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  Icon,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
  Menu,
  MenuItem,
  Typography,
} from "@material-ui/core";
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";

import { Check, DescriptionRounded, GetAppRounded, MoreVert } from "@material-ui/icons";
import axios from "axios";
import { format } from "date-fns";
import { Link } from "react-router-dom";
import PDFPreview from "../test/PDFPreview";
import { SpecialZoomLevel, Viewer, OpenFile } from "@react-pdf-viewer/core";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import { getFilePlugin } from '@react-pdf-viewer/get-file';

import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";


const useStyle = makeStyles((theme) => {
  return {
    root: {
      "& .MuiPaper-root": {
        transform: "none",
        [theme.breakpoints.down("xs")]: {
          margin: "0",
        },
        "&:hover": {
          transform: "none",
          boxShadow: "none",
        },
      },
    },
    cardLink: {
      textDecoration: "none",
      color: "inherit",
      fontSize: 0,
    },
    list: {
      border: "1px solid rgba(0,0,0,0.2)",
      borderRadius: "5px",
      marginTop: theme.spacing(2),
      "&:hover": {
        transform: "scale(1.007)",
        backgroundColor: "rgba(0,0,0,0.1)",
        cursor: "pointer",
      },
    },
    listText: {
      overflow: "hidden",
      minWidth: theme.spacing(1),
    },
    smallAvatar: {
      width: theme.spacing(3.7),
      height: theme.spacing(3.7),
    },
    error: {
      color: "red",
    },
    focus: {
      backgroundColor: "rgba(0, 0, 0, 0.2)",
    },
    classheader: {
      "& .MuiCardHeader-subheader": {
        maxWidth: theme.spacing(10),
        padding: 0,
        fontSize: ".7em",
      },
    },
    card: {
      "& .MuiCard-root": {
        transform: "none",
        width: "100%",
        [theme.breakpoints.down("xs")]: {
          margin: "0",
        },
        "&:hover": {
          transform: "none",
          boxShadow: "none",
        },
      },
    },
    cardContainer: {
      maxWidth: theme.spacing(60),
      margin: "0px auto",
      paddingLeft: theme.spacing(1),
      paddingRight: theme.spacing(1),
    },
    actionContainer: {
      background: "#55CA36",
      transition: ".2s",
      "&:hover": {
        background: "#48a82d",
      },
    },
    activityLink: {
      color: "#fefefe",
      textDecoration: "none",
    },
    linkText: {
      justifyContent: "center",
    },
    actionContainerRed: {
      background: "#d32f2f",
      transition: ".2s",
      "&:hover": {
        background: "#b52626",
      },
    },
    actionContainerBlack: {
      background: "#333",
      transition: ".2s",
      "&:hover": {
        background: "#222",
      },
    },
    onlyActivity: {
      paddingTop: 0,
      paddingBottom: 0,
    },
  };
});

export default function StudentPosts({ activity, streamFeed }) {
  const classes = useStyle();
  const id = activity.id;
  const [focused, setFocused] = useState("");



  const StudentCookie = Cookies.get("idLoggedIn");
  const InstructorCookie = Cookies.get("instructorID");

  const [submitted, setSubmitted] = useState(false);

  const checkIfSubmitted = () => {
    const sendData = {
      updateID: id,
      studentID: StudentCookie,
    };
    axios
      .post(
        "https://ursacapi.000webhostapp.com/api/isSubmitted.php",
        JSON.stringify(sendData)
      )
      .then((response) => {
        if (response.data.length > 0) {
          setSubmitted(true);
          console.log(response.data);
        } else {
          console.log("not submitted");
        }
      });
  };

  const removePost = () => {
    setOpenMenu(false);
    axios
      .post(
        "https://ursacapi.000webhostapp.com/api/removePost.php",
        activity.id
      )
      .then((res) => {
        console.log(res.data);
        setAnchor(null);
        setFocused("");
        streamFeed();
      })
      .catch((err) => console.log(err));
  };

  const [isStudent, setIsStudent] = useState("block");
  const [openMenu, setOpenMenu] = useState(false);
  const [anchor, setAnchor] = useState(null);
  const handleClickMenu = (event) => {
    setOpenMenu(true);
    setAnchor(event.currentTarget);
    setFocused(classes.focus);
  };
  const handleClose = () => {
    setOpenMenu(false);
    setAnchor(null);
    setFocused("");
  };
  const [fileCollection, setFileCollection] = useState(null);

  const [viewPDF, setViewPDF] = useState(null);
  const [open, setOpen] = useState(false);
  const handleCloseDialog = () => {
    setOpen(false);
  };

  const renderToolbar = (Toolbar) => (
    <Toolbar>
      {(slots) => {
        const {
          Download,
          CurrentPageInput,
          NumberOfPages
        } = slots;

        const getFilePluginInstance = getFilePlugin(
          {
            fileNameGenerator: () => {
              return `a-copy-of-${pdfName}`;
            },
          }
        );
        
        return (
          <div
            style={{
              display: 'flex',

              alignItems: 'center',
              width: '100%',
              justifyContent: "flex-end",
              marginRight: "5%"
              
            }}
          >
            <div style={{ padding: '0px 2px', width: '4rem' }}>
              <CurrentPageInput />
            </div>
            <div style={{ padding: '0px 2px' }}>
              / <NumberOfPages />
            </div>
            <div style={{ marginLeft: "25px"
            }}>
              <Download downloadPlugin={getFilePluginInstance}>
                {(props) => (
                  <Button
                    variant="contained"
                    color="secondary"
                    endIcon={<GetAppRounded />}
                    onClick={props.onClick}
                  >
                    Download
                  </Button>
                )}
              </Download>
            </div>
          </div>
        );
      }}

    </Toolbar>);

  const newPlugin = defaultLayoutPlugin({
    renderToolbar,
    sidebarTabs: (defaultTabs) => []
  });
  const renderLoader = () => {
    return <div>Loading...</div>;
  };
  const [pdfName, setPdfName] = useState("file");

  // const { DownloadButton } = getFilePluginInstance;

  const dialogStyle = {
    width: '100%',
    height: '750px',
  };

  useEffect(() => {
    const storeFiles = async () => {
      try {
        const res = await axios.post(
          "https://ursacapi.000webhostapp.com/api/getThisFiles.php",
          JSON.stringify(activity.id)
        );
        const resData = res.data;
        if (resData === "") {
          setFileCollection(null)

        } else {
          setFileCollection(resData)

          // for (const i of res.data) {
          //   console.log(i);
          // }
        }
      } catch (error) {
        console.log(error);
      }
    };
    storeFiles();

    if (Cookies.get("idLoggedIn")) {
      checkIfSubmitted();
      setIsStudent("none");
    }
  }, []);

  // fileCollection?.map(file => {
  //   console.log(file.file_name);
  // })
  const handleOpenDialog = (fileData, fileName) => {
    setPdfName(fileName)
    const pdfUint8Array = new Uint8Array(atob(fileData).split('').map(char => char.charCodeAt(0)));
    setViewPDF(pdfUint8Array)
    setOpen(true)
  }






  const date = new Date(activity.dateCreated);
  const currentDate = format(date, "MMM dd yyyy h:mm aaa");

  return (
    <Box className={classes.root}>
      <Menu
        keepMounted
        anchorEl={anchor}
        getContentAnchorEl={null}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={openMenu}
        onClose={handleClose}
        elevation={1}
      >
        <MenuItem dense onClick={removePost}>
          {" "}
          Remove
        </MenuItem>
      </Menu>
      <Box className={classes.cardContainer}>
        {/* TODO */}
        <Card variant="outlined" className={classes.card}>
          <CardHeader
            className={classes.classheader}
            avatar={<Avatar src={activity.profilePicture} />}
            title={activity.nameWhoPosted}
            subheader={currentDate}
            action={
              <IconButton
                aria-label="settings"
                style={{ display: isStudent }}
                className={focused}
                onClick={handleClickMenu}
              >
                <MoreVert />
              </IconButton>
            }
          />

          <Dialog PaperProps={{ style: dialogStyle }} maxWidth="md" open={open} onClose={handleCloseDialog} fullWidth>
            <Box className="pdfPreview">
              <Box
                className="pdfContainer"

              >

                {/* <div
                    style={{
                      border: "1px solid rgba(0, 0, 0, 0.3)",
                      borderRadius: "7px"
                    }}
                  >
                    <DownloadButton />
                  </div> */}

                {viewPDF && (
                  <div style={{ height: "700px" }}>
                    <Viewer
                      fileUrl={viewPDF ? viewPDF : ""}
                      defaultScale={SpecialZoomLevel.FitToWidth}
                      plugins={[newPlugin]}
                      renderLoader={renderLoader}
                    />
                  </div>
                )}
                {!viewPDF && (
                  <div
                    style={{
                      alignItems: "center",
                      border: "2px dashed rgba(0, 0, 0, .3)",
                      display: "flex",
                      fontSize: "2rem",
                      height: "100%",
                      justifyContent: "center",
                      width: "100%",
                    }}
                  >
                    NO PDF
                  </div>
                )}
              </Box>
            </Box>
          </Dialog>

          {activity.isAnActivity == 0 ? (
            <CardContent>
              <Typography variant="h6">{activity.title}</Typography>
              <Typography variant="body2">{activity.body}</Typography>
              {fileCollection === null ? "" :

                <List>
                  {fileCollection.map(file => (
                    <ListItem key={file.file_id} className={classes.list} onClick={() => handleOpenDialog(file.file_data, file.file_name)}>
                      <ListItemIcon>
                        <DescriptionRounded />
                      </ListItemIcon>
                      <ListItemText className={classes.listText}>
                        <Typography noWrap >{file.file_name}</Typography>
                      </ListItemText>
                    </ListItem>

                  ))}
                </List>}
            </CardContent>
          ) : (
            <Box>
              <CardContent className={classes.onlyActivity}>
                <Typography variant="h6">{activity.title}</Typography>
              </CardContent>

              <Divider />

              {InstructorCookie ? (
                <Box>
                  {new Date() > new Date(activity.due) ? (
                    <Box className={classes.actionContainerBlack}>
                      <Link
                        to={`/handleActivity/${activity.id}`}
                        className={classes.activityLink}
                      >
                        <CardActions className={classes.linkText}>
                          Activity Due Done{" "}
                          <Icon>
                            <Check />
                          </Icon>
                        </CardActions>
                      </Link>
                    </Box>
                  ) : (
                    <Box className={classes.actionContainer}>
                      <Link
                        to={`/handleActivity/${activity.id}`}
                        className={classes.activityLink}
                      >
                        <CardActions className={classes.linkText}>
                          Activity assigned
                        </CardActions>
                      </Link>
                    </Box>
                  )}
                </Box>
              ) : StudentCookie ? (
                <Box>
                  {submitted ? (
                    <Box className={classes.actionContainerBlack}>
                      <Link
                        to={`/studentActivity/${activity.id}`}
                        className={classes.activityLink}
                      >
                        <CardActions className={classes.linkText}>
                          Activity Submitted{" "}
                          <Icon>
                            <Check />
                          </Icon>
                        </CardActions>
                      </Link>
                    </Box>
                  ) : (
                    <Box>
                      {new Date() > new Date(activity.due) ? (
                        <Box className={classes.actionContainerRed}>
                          <Link
                            to={`/studentActivity/${activity.id}`}
                            className={classes.activityLink}
                          >
                            <CardActions className={classes.linkText}>
                              Open Activity (Missing)
                            </CardActions>
                          </Link>
                        </Box>
                      ) : (
                        <Box className={classes.actionContainer}>
                          <Link
                            to={`/studentActivity/${activity.id}`}
                            className={classes.activityLink}
                          >
                            <CardActions className={classes.linkText}>
                              Open Activity
                            </CardActions>
                          </Link>
                        </Box>
                      )}
                    </Box>
                  )}
                </Box>
              ) : null}
            </Box>
          )}

          {/* <Box ml={2} mb={2} mt={2} mr={2}>
                    <Grid container direction='row' alignItems='center' >
                        <Grid item xs={1}>
                            <Avatar className={classes.smallAvatar} />
                        </Grid>
                        <Grid item xs={10} >
                            <TextField variant='outlined' placeholder='Make a comment...' size='small' fullWidth />
                        </Grid>
                        <Grid item xs={1} >
                            <IconButton>
                                <SendRounded size='small' />
                            </IconButton>
                        </Grid>
                    </Grid>
                </Box> */}
        </Card>
      </Box>
    </Box>
  );
}
