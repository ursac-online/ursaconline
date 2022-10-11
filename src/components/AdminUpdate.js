
import { Button, FormHelperText, MenuItem, TextField } from '@material-ui/core'
import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'



export default function AdminUpdate(updateID) {
    const history = useNavigate();

    
    useEffect(() => {
        showAdmin();
      }, []);
    
    const [data, setData] = useState({
        firstName: '',
        lastName: '',
        adminID: '',
        username: '',
        password: ''
    })

    const showAdmin = () => {
        axios.post('https://ursacapi.000webhostapp.com/api/getAdminID.php', JSON.stringify(updateID))
        .then(response => {
            setData(response.data[0])
        })
        .catch(err => console.log(err))
    }







    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;

        setData(data => ({...data, [name]: value}));
    }




    const handleSubmit = (e) => {
        e.preventDefault();
        const sendData = {
            firstName:data.firstName,
            lastName:data.lastName,
            adminID:data.adminID,
            username: data.username,
            password:data.password,
            id: data.id
        }
        
        axios.post('https://ursacapi.000webhostapp.com/api/updateAdmin.php', JSON.stringify(sendData))
        .then((result) => {
            console.log(result.data)
        })
        .catch(err => console.log(err))
    };




    

  return (
    
    <div>
        
        <center>
         
      {/* // STUDENT */}
       <div>
        <form onSubmit={handleSubmit}>

            <FormHelperText>First Name</FormHelperText>
            <TextField variant='outlined' placeholder='First Name'  type="text" name='firstName' value={data.firstName} onChange={handleChange} fullWidth/>
            <br /><br />

            <FormHelperText>Last Name</FormHelperText>
            <TextField variant='outlined' placeholder='Last Name'  type="text" name='lastName' value={data.lastName} onChange={handleChange} fullWidth/>
            <br /><br />
            
            <FormHelperText>Student ID</FormHelperText>
            <TextField variant='outlined' placeholder='Admin ID'  type="text" name='adminID' value={data.adminID} onChange={handleChange} fullWidth/>
            <br /><br />

            <FormHelperText>Username</FormHelperText>
            <TextField variant='outlined' placeholder='username'  type="text" name='username' value={data.username} onChange={handleChange} fullWidth/>
            <br /><br />

            <FormHelperText>Password</FormHelperText>
            <TextField variant='outlined' placeholder='Password'  type="text" name='password' value={data.password} onChange={handleChange} fullWidth/>
            <br /><br />
            

            <Button fullWidth type='submit' name='submit' variant='contained' color='secondary' >Confirm Edit</Button>

        </form>
        </div>
        </center>
        
    </div>
  )
}
