
import { Box, Button, TextField } from '@material-ui/core'
import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Register() {
    const history = useNavigate();
    const [data, setData] = useState({
        name: '',
        studentID: '',
        password: ''
    })

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;

        setData(data => ({...data, [name]: value}));
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const sendData = {
            name:data.name,
            studentID:data.studentID,
            password:data.password
        }
        axios.post('https://ursacapi.000webhostapp.com/api/register.php', sendData)
        .then((result) => {
            console.log(result.data)
            if(result.data.Status == 'Invalid') {
                alert('Invalid User');
            } else {
                console.log('Sent')
            }
        })
    }

  return (
    <Box>
        
        <center>
        <h1>Register</h1>
        <form onSubmit={handleSubmit}>

            <label>Name: </label>
            <TextField  type="text" name='name' value={data.name} onChange={handleChange} />
            <br /><br />

            <label>Student ID: </label>
            <TextField  type="text" name='studentID' value={data.studentID} onChange={handleChange} />
            <br /><br />

            <label>Password: </label>
            <TextField  type="password" name='password' value={data.password} onChange={handleChange} />
            <br /><br />

            <Button type='submit' name='submit' variant='contained' color='secondary' >Register</Button>

        </form>
        </center>
    </Box>
  )
}
