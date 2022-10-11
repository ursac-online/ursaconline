import React, { useState } from 'react'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import Container from '@material-ui/core/Container'
import { makeStyles } from '@material-ui/core'
import TextField from '@material-ui/core/TextField'
import axios from 'axios';
import { useNavigate } from 'react-router-dom'

import Cookies from 'js-cookie'

const useStyles = makeStyles({
  field: {
    marginTop: 20,
    marginBottom: 20,
    display: 'block'
  }
})

export default function CreateClassroom() {
  const classes = useStyles()
  const navigate = useNavigate()
  const Cookie = Cookies.get('teacherID');
  const [titleError, setTitleError] = useState('')
  const [instructorError, setInstructorError] = useState('')
  const [yearSectionError, setYearSectionError] = useState('')

  const [data, setData] = useState({
    title: '',
    instructor: '',
    yearSection: ''
  })

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    setData(data => ({ ...data, [name]: value }));
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    const sendData = {
      title: data.title,
      instructor: data.instructor,
      yearSection: data.yearSection,
      instructorID: 2,
      classroomCode: 130
    }


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

  return (
    <>
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
          <TextField className={classes.field}
            onChange={handleChange}
            value={data.title}
            name='title'
            placeholder="Class name"
            variant="outlined"
            color="secondary"
            fullWidth
            helperText={titleError}
          />
          <TextField className={classes.field}
            onChange={handleChange}
            value={data.instructor}
            name='instructor'
            placeholder="Instructor"
            variant="outlined"
            color="secondary"
            fullWidth
            helperText={instructorError}
          />
          <TextField className={classes.field}
            onChange={handleChange}
            value={data.yearSection}
            name='yearSection'
            placeholder="Year&Section"
            variant="outlined"
            color="secondary"
            fullWidth
            helperText={yearSectionError}
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
    </>
  )
}
