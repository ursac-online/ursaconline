import React, { useEffect, useState } from 'react'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import Container from '@material-ui/core/Container'
import { makeStyles, Paper } from '@material-ui/core'
import TextField from '@material-ui/core/TextField'
import axios from 'axios';
import { useNavigate } from 'react-router-dom'

import Cookies from 'js-cookie'

const useStyles = makeStyles({
  field: {
    marginTop: 20,
    marginBottom: 20,
    display: 'block'
  },
  main: {
    maxWidth: 500,
    padding: '40px 15px',
    margin: '0 auto'
  }
})

export default function CreateClassroom() {
  const classes = useStyles()
  const navigate = useNavigate()
  const Cookie = Cookies.get('instructorID');
  const [titleError, setTitleError] = useState(false);
  const [sectionError, setSectionError] = useState(false);

  const showInstructorsInfo = () => {
    axios.post('https://ursacapi.000webhostapp.com/api/getInstructors.php', JSON.stringify(Cookie))
      .then((response) => {
        if (response.data) {
          Cookies.set('userName', response.data[0].firstName + ' ' + response.data[0].lastName)
          Cookies.set('userFirstName', response.data[0].firstName)
          // setProfilePic('https://ursacapi.000webhostapp.com/api/' + response.data[0].profilePicture)
        }

      })
      .catch(error => {
        console.log(error);
      })
  }


  useEffect(() => {
    showInstructorsInfo();
  }, []);

  const [data, setData] = useState({
    title: '',
    instructor: Cookies.get('userName'),
    yearSection: ''
  })

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;

      setTitleError(false);
      setSectionError(false);
      setData(data => ({ ...data, [name]: value }));
  }

  const handleSubmit = (event) => {

    const sendData = {
      title: data.title,
      instructor: data.instructor,
      yearSection: data.yearSection,
      instructorID: Cookie
    }

    event.preventDefault();
    if (data.title == '') {
      setTitleError(true);
    } else if (data.yearSection == '') {
      setSectionError(true);
    } else {
      axios.post('https://ursacapi.000webhostapp.com/api/classrooms.php', JSON.stringify(sendData))
        .then((result) => {
          console.log(result.data)
          if (result.data.Status == 'Invalid') {
            alert('Invalid User');
          } else {
            navigate('/teacherDashboard')
          }
        })
    }




  }

  return (
    <Paper className={classes.main} variant='outlined' >
      <Container size="md">
        <Typography
          variant="h6"
          color="textSecondary"
          component="h2"
          gutterBottom
        >
          Create a classroom
        </Typography>



        <form noValidate autoComplete="off" onSubmit={handleSubmit}>
          <TextField
            className={classes.field}
            value={data.instructor}
            name='instructor'
            placeholder="Instructor"
            variant="outlined"
            color="secondary"
            fullWidth
            disabled
            style={{ display: 'none' }}
          />
          <TextField className={classes.field}
            onChange={handleChange}
            value={data.title}
            name='title'
            placeholder="Class name"
            variant="outlined"
            color="secondary"
            fullWidth
            error={titleError}
            helperText={titleError ? 'Please fill up this field' : null}
          />

          <TextField
            className={classes.field}
            onChange={handleChange}
            value={data.yearSection}
            name='yearSection'
            placeholder="Year&Section"
            variant="outlined"
            color="secondary"
            fullWidth
            error={sectionError}
            helperText={sectionError ? 'Please fill up this field' : null}
          />

          <Button
            type="submit"
            color="secondary"
            variant="contained"
            fullWidth>
            Create
          </Button>
        </form>

      </Container>
    </Paper>
  )
}
