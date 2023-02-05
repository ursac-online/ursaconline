
import { Button, TextField } from '@material-ui/core';
import axios from 'axios';
import React, { useState } from 'react';



export default function CreateAdmin() {
    const [data, setData] = useState({
        firstName: '',
        middleName: '',
        lastName: '',
        instructorID: '',
        college: '',
        course: '',
        password: ''
    })

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;

        setData(data => ({...data, [name]: value}));
    }



    const handleSubmit = (e) => {
      const sendData = {
          firstName:data.firstName,
          middleName:data.middleName,
          lastName:data.lastName,
          instructorID:data.instructorID,
          college: data.college,
          course: data.course,
          password:data.password
      }
      axios.post('https://ursacapi.000webhostapp.com/api/registerTeacher.php', JSON.stringify(sendData))
      .then((result) => {
          console.log(result.data)
      })
      .catch(err => console.log(err))
  };



  return (
    
    <div>
        
        <center>
          
      {/* // TEACHER */}
      <div>
        <h1>Create Instructor</h1>
        <br />
        <form onSubmit={handleSubmit}>
            
        
            <TextField variant='outlined' placeholder='Instructor ID'  type="text" name='instructorID' value={data.instructorID} onChange={handleChange} fullWidth/>
            <br /><br />

        
            <TextField variant='outlined' placeholder='First Name'  type="text" name='firstName' value={data.firstName} onChange={handleChange} fullWidth/>
            <br /><br />
            
            
            <TextField variant='outlined' placeholder='Middle Name'  type="text" name='middleName' value={data.middleName} onChange={handleChange} fullWidth/>
            <br /><br />

    
            <TextField variant='outlined' placeholder='Last Name'  type="text" name='lastName' value={data.lastName} onChange={handleChange} fullWidth/>
            <br /><br />
            
        
            <TextField variant='outlined' placeholder='College'  type="text" name='college' value={data.college} onChange={handleChange} fullWidth/>
            <br /><br />
            
        
            <TextField variant='outlined' placeholder='Course'  type="text" name='course' value={data.course} onChange={handleChange} fullWidth/>
            <br /><br />


            <TextField variant='outlined' placeholder='Password'  type="password" name='password' value={data.password} onChange={handleChange} fullWidth/>
            <br /><br />

            <Button fullWidth type='submit' name='submit' variant='contained' color='secondary' >Register</Button>

        </form>
        </div>
         

        </center>
        
    </div>
  )
}
