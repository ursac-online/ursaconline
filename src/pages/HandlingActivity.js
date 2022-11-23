import {
  Box,
  Button,
  Container,
  Grid,
  Input,
  InputAdornment,
  List,
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
  makeStyles,
  TextField,
  Typography,
} from "@material-ui/core";
import { Description, Title } from "@material-ui/icons";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const width = 70;
const smwidth = 20;
const useStyle = makeStyles((theme) => {
  return {
    root: {
      marginTop: -48,
      width: `calc(100% - ${width})`,
      marginLeft: width,
      marginRight: width,
      [theme.breakpoints.down("sm")]: {
        width: `calc(100% - ${smwidth})`,
        marginLeft: smwidth,
        marginRight: smwidth,
      },
    },
    grids1: {
      borderRight: "1px solid black",
    },
    gridContainer: {
      height: "100%",
    },
    listFile: {
      border: "1px solid #333",
      borderRadius: "7px",
      marginBottom: theme.spacing(1),
      "&:hover": {
        backgroundColor: "rgba(0,0,0,0.1)",
        cursor: "pointer",
      },
    },
    rtrnBtn: {
      float: "right",
    },
    input: {
      maxWidth: theme.spacing(17),
    },
    listItem: {
      borderLeft: "4px solid #162276",
      paddingLeft: theme.spacing(1),
      borderRadius: "2px",
    },
  };
});

function HandlingActivity() {
  const classes = useStyle();
  const { id } = useParams();

  const [fileCollection, setFileCollection] = useState([]);
  const [submittedActivities, setSubmittedActivities] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const getActivitiesSubmitted = () => {
    axios
      .post(
        "https://ursacapi.000webhostapp.com/api/getActivitiesSubmitted.php",
        id
      )
      .then((res) => {
        setSubmittedActivities(res.data);
        const file = JSON.parse(res.data[0].filesSubmitted);
        for (const key in file) {
          setFileCollection((fileCollection) => [
            ...fileCollection,
            {
              fileName: file[key],
              keyLink: key.slice(15),
            },
          ]);
        }
        setIsLoaded(true);
      })

      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getActivitiesSubmitted();
  }, []);

  return (
    <Box className={classes.root}>
      {submittedActivities ? (
        <Box>
          {isLoaded ? (
            <Box mb={3} ml={2}>
              <Typography variant="h3">
                <Box>{submittedActivities[0].activityName}</Box>
              </Typography>
              <ListItem>
                <Typography variant="subtitle1">
                  {submittedActivities[0].activityBody}
                </Typography>
              </ListItem>
            </Box>
          ) : null}

          <Grid className={classes.gridContainer} container spacing={1}>
            <Grid className={classes.grids1} item xs={12} sm={3}>
              <Container>
                <Box>
                  <Typography variant="h5">Students</Typography>
                  <Typography variant="caption">
                    Point Value: {submittedActivities.points}
                  </Typography>
                  <List>
                    {submittedActivities.map((studentNames) => (
                      <ListItem>
                        <Grid container>
                          <Grid item md={12} lg={6}>
                            <ListItemText
                              className={classes.listItem}
                              key={studentNames.studentName}
                            >
                              {studentNames.studentName}
                            </ListItemText>
                          </Grid>
                          <Grid item md={12} lg={6}>
                            {studentNames.points == 0 ? (
                              <Box>Ungraded</Box>
                            ) : (
                              <Input
                                className={classes.input}
                                placeholder="Add grade"
                                type="number"
                                inputProps={{ style: { textAlign: "right" } }}
                                endAdornment={
                                  <InputAdornment position="start">
                                    <Typography>
                                      /{studentNames.points}
                                    </Typography>
                                  </InputAdornment>
                                }
                              />
                            )}
                          </Grid>
                        </Grid>
                      </ListItem>
                    ))}
                  </List>
                </Box>
              </Container>
            </Grid>
            <Grid className={classes.grids2} item xs={12} sm={9}>
              <Container>
                <Box>
                  File Submitted
                  <List>
                    {fileCollection.length > 1 ? (
                      <Box>
                        {fileCollection.map((eachFile) => (
                          <ListItem
                            className={classes.listFile}
                            key={eachFile.keyLink}
                          >
                            <ListItemIcon>
                              <Description />
                            </ListItemIcon>
                            <ListItemText>{eachFile.fileName}</ListItemText>
                          </ListItem>
                        ))}
                      </Box>
                    ) : null}
                  </List>
                  <Button
                    className={classes.rtrnBtn}
                    variant="contained"
                    color="secondary"
                  >
                    Return
                  </Button>
                </Box>
              </Container>
            </Grid>
          </Grid>
        </Box>
      ) : null}
    </Box>
  );
}

export default HandlingActivity;
