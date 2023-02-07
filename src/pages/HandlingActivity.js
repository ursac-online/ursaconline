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
import { Description, Done, Title } from "@material-ui/icons";
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

  const [btnDisable, setBtnDisable] = useState(false);
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

        setIsLoaded(true);
      })

      .catch((err) => console.log(err));
  };
  const findFiles = (studentID) => {
    // setGrade({})
    setFileCollection([]);
    const sendData = {
      updateID: id,
      studentID,
    };
    axios
      .post(
        "https://ursacapi.000webhostapp.com/api/isSubmitted.php",
        JSON.stringify(sendData)
      )
      .then((res) => {
        if (res.data[0].returned === 0) {
          setBtnDisable(true);
        } else {
          setBtnDisable(false);
        }
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
      })

      .catch((err) => console.log(err));
  };

  const [grade, setGrade] = useState({});
  const [studentData, setStudentData] = useState({
    studentID: 0,
    score: 0,
    activityID: 0,
  });
  const handleScoreChange = (e, points) => {
    const key = e.target.name;
    const newValue = e.target.value;
    if (parseInt(newValue) > parseInt(points)) {
      setGrade((grade) => ({ ...grade, [key]: points }));
      setStudentData((studentData) => ({
        ...studentData,
        score: points,
        studentID: key,
        activityID: id,
      }));
    } else if (parseInt(newValue) < 0) {
      setGrade((grade) => ({ ...grade, [key]: 0 }));
      setStudentData((studentData) => ({
        ...studentData,
        score: 0,
        studentID: key,
        activityID: id,
      }));
    } else {
      setGrade((grade) => ({ ...grade, [key]: newValue }));
      setStudentData((studentData) => ({
        ...studentData,
        score: newValue,
        studentID: key,
        activityID: id,
      }));
    }

    console.log(studentData);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log(JSON.stringify(studentData));

    if (studentData.score === "") {
      console.log("no score");
    } else {
      axios
        .post(
          "https://ursacapi.000webhostapp.com/api/updateReturn.php",
          JSON.stringify(studentData)
        )
        .then((res) => {
          console.log(res.data);
          findFiles(studentData.studentID);
        });
    }
  };

  useEffect(() => {
    getActivitiesSubmitted();
  }, []);

  return (
    <Box className={classes.root}>
      {submittedActivities ? (
        <Box>
          <Box mb={3} ml={2}>
            {isLoaded ? (
              <Box>
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
          </Box>
          <form onSubmit={handleFormSubmit}>
            <Grid className={classes.gridContainer} container spacing={1}>
              <Grid className={classes.grids1} item xs={12} sm={3}>
                <Container>
                  <Box>
                    <Grid container>
                      <Grid item xs={12} m={6} lg={6}>
                        <Typography variant="h5">Students</Typography>
                        <Typography variant="caption">
                          Point Value:{" "}
                          {isLoaded ? submittedActivities[0].points : null}
                        </Typography>
                      </Grid>
                      <Grid item xs={12} m={6} lg={6}>
                        <Box
                          mt={1}
                          style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          <Button
                            type="submit"
                            color="secondary"
                            size="small"
                            variant="contained"
                          >
                            Return
                          </Button>
                        </Box>
                      </Grid>
                    </Grid>
                    <List>
                      {submittedActivities.map((studentNames) => (
                        <ListItem key={studentNames.id}>
                          <Grid container>
                            <Grid item md={12} lg={6}>
                              <ListItemText className={classes.listItem}>
                                {studentNames.studentName}
                              </ListItemText>
                            </Grid>
                            <Grid item md={12} lg={6}>
                              {studentNames.points === 0 ? (
                                <Box>Ungraded</Box>
                              ) : (
                                <Box>
                                  {/* TODO */}
                                  {studentNames.returned == 1 ? (
                                    <Box mt={2} style={{display: "flex", justifyContent: "center", alignContent: "center"}}><Done /></Box>
                                    
                                  ) : (
                                    <Input
                                      className={classes.input}
                                      name={studentNames.studentID}
                                      type="number"
                                      placeholder="Add grade"
                                      value={
                                        grade[studentNames.studentID] || ""
                                      }
                                      fullWidth
                                      onChange={(e) =>
                                        handleScoreChange(
                                          e,
                                          studentNames.points
                                        )
                                      }
                                      // onBlur={() => console.log(grade)}
                                      onFocus={() =>
                                        findFiles(studentNames.studentID)
                                      }
                                      inputProps={{
                                        style: { textAlign: "right" },
                                        min: 0,
                                        max: studentNames.points,
                                        step: "1",
                                      }}
                                      endAdornment={
                                        <InputAdornment position="start">
                                          <Typography style={{ color: "#777" }}>
                                            /{studentNames.points}
                                          </Typography>
                                        </InputAdornment>
                                      }
                                    />
                                  )}
                                </Box>
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
                      {fileCollection.length > 0 ? (
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
                    {fileCollection.length > 0 ? (
                      <Box>
                        {btnDisable ? (
                          <Button
                            type="submit"
                            className={classes.rtrnBtn}
                            variant="contained"
                            color="secondary"
                          >
                            Return
                          </Button>
                        ) : (
                          <Button
                            type="submit"
                            className={classes.rtrnBtn}
                            variant="contained"
                            color="secondary"
                            disabled
                          >
                            Returned
                          </Button>
                        )}
                      </Box>
                    ) : null}
                  </Box>
                </Container>
              </Grid>
            </Grid>
          </form>
        </Box>
      ) : (
        <Box>
          <center>No one submitted yet</center>
        </Box>
      )}
    </Box>
  );
}

export default HandlingActivity;
