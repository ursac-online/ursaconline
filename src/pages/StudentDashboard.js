import { React, useEffect, useState } from "react";
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  CircularProgress,
  Container,
  Fade,
  Grid,
  makeStyles,
  MenuItem,
  Typography,
} from "@material-ui/core";
import SubjectCards from "../components/SubjectCards";
import axios from "axios";

import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const width = 70;
const smwidth = 20;
const useStyle = makeStyles((theme) => {
  return {
    root: {
      width: `calc(100% - ${width})`,
      marginLeft: width,
      marginRight: width,
      [theme.breakpoints.down("sm")]: {
        width: `calc(100% - ${smwidth})`,
        marginLeft: smwidth,
        marginRight: smwidth,
      },
    },
    loading: {
      marginTop: theme.spacing(20),
    },
    loadingContainer: {
      display: "flex",
      justifyContent: "center",
      width: "100%",
    },
    dashContainer: {
      marginLeft: smwidth,
      [theme.breakpoints.down("sm")]: {
        marginLeft: 0,
      },
    },
    noClassText: {
      maxWidth: 230,
      margin: "0 auto",
    },
  };
});

export default function StudentDashboard() {
  const classes = useStyle();

  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const Cookie = Cookies.get("idLoggedIn");

  const [noClassroom, setNoClassroom] = useState(true);

  function sessionCheck() {
    if (!Cookie) {
      navigate("/");
    }
  }

  const [subjects, setSubjects] = useState([]);

  const showClassrooms = () => {
    axios
      .post(
        "https://ursacapi.000webhostapp.com/api/getJoinedClassrooms.php",
        JSON.stringify(Cookie)
      )
      .then((response) => {
        if (response.data == 0) {
          setNoClassroom(true);
        } else {
          setSubjects(response.data);
          setNoClassroom(false);
          setIsLoading(false);
        }
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    sessionCheck();
    showClassrooms();
  }, []);

  return (
    <Box className={classes.root}>
      {noClassroom ? (
        <Box>
          <MenuItem disabled className={classes.noClassText}>
            You have no classroom yet.
          </MenuItem>
        </Box>
      ) : (
        <Box>
          {isLoading ? (
            <Box className={classes.loadingContainer}>
              <CircularProgress className={classes.loading} color="secondary" />
            </Box>
          ) : (
            <Box className={classes.dashContainer}>
              <Grid container spacing={4}>
                {subjects.map((subject) => (
                  <Grid item key={subject.classroomID}>
                    <SubjectCards subject={subject} />
                  </Grid>
                ))}
              </Grid>
            </Box>
          )}
        </Box>
      )}
    </Box>
  );
}
