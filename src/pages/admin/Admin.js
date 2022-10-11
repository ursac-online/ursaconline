
import React, { useEffect, useState } from 'react'
import { Card, CardActionArea, CardContent, CardHeader, Container, Grid, Typography } from '@material-ui/core'
import StudentTable from '../../components/tables/StudentTable'
import TeacherTable from '../../components/tables/TeacherTable'
import ClassroomTable from '../../components/tables/ClassroomTable'
import AdminTable from '../../components/tables/AdminTable'
import axios from 'axios'

import Cookies from 'js-cookie'
import { useNavigate } from 'react-router-dom'



function Admin() {

  const navigate = useNavigate();
  const Cookie = Cookies.get('adminID');

  function sessionCheck() {
    if (!Cookie) {
      navigate('/adminLogin');
    }
  }

  function showAdminInfo() {
    axios.post('https://ursacapi.000webhostapp.com/api/getAdmins.php', JSON.stringify(Cookie))
      .then((response) => {
        if (response.data) {
          Cookies.set('userName', response.data[0].firstName);
          Cookies.set('userInfo', response.data[0].username)
        }

      })
      .catch(error => {
        console.log(error);
      })
  }

  const [studentCount, setStudentCount] = useState(0);
  const studentUsers = () => {
    axios.get('https://ursacapi.000webhostapp.com/api/countStudent.php')
    .then(response => {
      setStudentCount(response.data)
    })
    .catch(err => console.log(err));
  }


  const [instructorCount, setInstructorCount] = useState(0);
  const instructorUsers = () => {
    axios.get('https://ursacapi.000webhostapp.com/api/countInstructor.php')
    .then(response => {
      setInstructorCount(response.data)
    })
    .catch(err => console.log(err));
  }


  const [adminCount, setAdminCount] = useState(0);
  const adminUsers = () => {
    axios.get('https://ursacapi.000webhostapp.com/api/countAdmin.php')
    .then(response => {
      setAdminCount(response.data)
    })
    .catch(err => console.log(err));
  }

  const [classroomCount, setClassroomCount] = useState(0);
  const classroomCreated = () => {
    axios.get('https://ursacapi.000webhostapp.com/api/countClassroom.php')
    .then(response => {
      setClassroomCount(response.data)
    })
    .catch(err => console.log(err));
  }

  useEffect(() => {
    studentUsers();
    instructorUsers();
    adminUsers();
    classroomCreated();
    sessionCheck();
    showAdminInfo()
  }, [])


  return (
    <>
      <Container>


        <Grid container spacing={10}>
          

          <Grid item xs={12} md={6} lg={4}>
            <Card variant='outlined'>
              <CardActionArea onClick={() => {navigate('/studentList')}}>
              <CardHeader subheader='Students' />
              <CardContent>
                <Typography variant='h4'>
                  {studentCount}
                </Typography>
              </CardContent>
              </CardActionArea>
            </Card>
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <Card variant='outlined'>
              <CardActionArea onClick={() => {navigate('/instructorList')}}>
              <CardHeader subheader='Instructors' />
              <CardContent>
                <Typography variant='h4'>
                  {instructorCount}
                </Typography>
              </CardContent>
              </CardActionArea>
            </Card>
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <Card variant='outlined'>
              <CardActionArea onClick={() => {navigate('/adminList')}}>
              <CardHeader subheader='Admins' />
              <CardContent>
                <Typography variant='h4'>
                  {adminCount}
                </Typography>
              </CardContent>
              </CardActionArea>
            </Card>
          </Grid>


        </Grid>

        <Grid container spacing={10}>
          

          <Grid item xs={12}>
            <Card variant='outlined'>
              <CardActionArea onClick={() => {navigate('/classroomList')}}>
              <CardHeader subheader='Classrooms' />
              <CardContent>
                <Typography variant='h4'>
                  {classroomCount}
                </Typography>
              </CardContent>
              </CardActionArea>
            </Card>
          </Grid>


        </Grid>




        {/* <Grid container spacing={10}>


          <Grid item xs={12}>
            <AdminTable />
          </Grid>

          <Grid item xs={12}>
            <StudentTable />
          </Grid>

          <Grid item xs={12}>
            <TeacherTable />
          </Grid>

          <Grid item xs={12}>
            <ClassroomTable />
          </Grid>


        </Grid> */}
      </Container>
    </>
  )
}
export default Admin


