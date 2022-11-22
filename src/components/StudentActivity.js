import {
  Box,
  Button,
  Container,
  Divider,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
  Paper,
  Typography,
} from "@material-ui/core";
import {
  ChevronLeftRounded,
  CloseRounded,
  DescriptionRounded,
} from "@material-ui/icons";
import axios from "axios";
import { format } from "date-fns";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Cookies from "js-cookie";

const width = 70;
const smwidth = 20;
const useStyle = makeStyles((theme) => {
  return {
    root: {
        width: `calc(100% - ${width})`,
        marginLeft: width,
        marginRight: width,
        [theme.breakpoints.down('sm')]: {
            width: `calc(100% - ${smwidth})`,
            marginLeft: smwidth,
            marginRight: smwidth,
        }

    },
    activity: {
      padding: theme.spacing(2),
      maxWidth: theme.spacing(50),
    },
    btn: {
      marginTop: theme.spacing(2),
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
  };
});

function StudentActivity() {
  const classes = useStyle();
  const navigate = useNavigate();
  const Cookie = Cookies.get("idLoggedIn");

  function sessionCheck() {
    if (!Cookie) {
      navigate("/");
    }
  }

  const [post, setPost] = useState({});
  const [isLoaded, setisLoaded] = useState(false);
  const [currentDate, setCurrentDate] = useState("");
  const [dueDate, setDueDate] = useState("");

  const [fileCollection, setFileCollection] = useState([]);
  const { id } = useParams();
  async function getPost() {
    const sendData = {
      updateID: id,
    };

    await axios
      .post(
        "https://ursacapi.000webhostapp.com/api/getPostID.php",
        JSON.stringify(sendData)
      )
      .then((response) => {
        if (response.data == 0) {
          console.log("post ID not found");
        } else {
          setPost(response.data[0]);
          const date = new Date(response.data[0].dateCreated);
          setCurrentDate(format(date, "MMM dd, yyyy hh:mm aaa"));
          const dueDateData = new Date(response.data[0].due);
          setDueDate(format(dueDateData, "MMM dd hh:mm aaa"));

          const file = JSON.parse(response.data[0].files);
          for (const key in file) {
            setFileCollection((fileCollection) => [
              ...fileCollection,
              {
                fileName: file[key],
                keyLink: key.slice(6),
              },
            ]);
          }
        }
      });
  }

  const dateTo = new Date();
  const dateToday = format(dateTo, "MMM dd, yyyy hh:mm aaa");

  console.log(dueDate);
  useEffect(() => {
    getPost();
    // sessionCheck()
  }, []);

  return (
    <Box className={classes.root}>
      <Box>
        <IconButton onClick={() => navigate(-1)}>
          <CloseRounded fontSize="large" />
        </IconButton>
        <Container>
          <Grid container spacing={2} justifyContent="center">
            <Grid item>
              <Paper
                className={classes.activity}
                elevation={0}
                square={true}
                variant="outlined"
              >
                <Typography variant="h4">{post.title}</Typography>

                <Grid container spacing={1}>
                  <Grid item>
                    <Typography variant="caption">
                      {post.nameWhoPosted}
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography variant="body1">•</Typography>
                  </Grid>
                  <Grid item>
                    <Typography variant="caption">{currentDate}</Typography>
                  </Grid>
                </Grid>

                <Grid container spacing={1} justifyContent="space-between">
                  <Grid item>
                    <Typography variant="body1">
                        {
                            post.points == 0 ?
                            "Not Graded"
                            :
                            post.points
                        }
                    </Typography>
                  </Grid>
                  <Grid item></Grid>
                  <Grid item>
                    <Typography variant="body1">Due {dueDate}</Typography>
                  </Grid>
                </Grid>

                <Divider />

                <Typography variant="body2">{post.body}</Typography>
                <List>
                  {fileCollection.map((keys) => (
                    <a
                      href={
                        "https://ursacapi.000webhostapp.com/api/downloadFile.php?file=" +
                        keys.keyLink
                      }
                      style={{
                        textDecoration: "none",
                        color: "#333",
                      }}
                      key={keys.keyLink}
                    >
                      <ListItem className={classes.list}>
                        <ListItemIcon>
                          <DescriptionRounded />
                        </ListItemIcon>
                        <ListItemText className={classes.listText}>
                          <Typography noWrap>{keys.fileName}</Typography>
                        </ListItemText>
                      </ListItem>
                    </a>
                  ))}
                </List>
              </Paper>
            </Grid>

            <Grid item></Grid>

            <Grid item>
              <Paper className={classes.activity}>
                <Grid
                  container
                  justifyContent="space-between"
                  alignContent="center"
                >
                  <Grid item>
                    <Typography variant="h6">Your work</Typography>
                  </Grid>
                  <Grid item>
                    {dateToday > dueDate ? (
                      <Typography variant="caption" color="error">
                        Missing
                      </Typography>
                    ) : null}
                  </Grid>
                </Grid>

                <Button
                  className={classes.btn}
                  color="secondary"
                  variant="outlined"
                  fullWidth
                >
                  Upload file
                </Button>

                <Button
                  className={classes.btn}
                  color="secondary"
                  variant="contained"
                  fullWidth
                >
                  Submit work
                </Button>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
}

export default StudentActivity;
