
import { Button, FormHelperText, MenuItem, TextField } from '@material-ui/core'
import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'



export default function CreateAdmin() {
    const history = useNavigate();
    const [data, setData] = useState({
        username: '',
        firstName: '',
        lastName: '',
        adminID: '',
        password: ''
    })

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;

        setData(data => ({...data, [name]: value}));
    }




  
  const handleSubmit = (e) => {
    e.preventDefault();
    const sendData = {
        adminID:data.adminID,
        username:data.username,
        firstName:data.firstName,
        lastName:data.lastName,
        password:data.password
    }
    axios.post('https://ursacapi.000webhostapp.com/api/registerAdmin.php', JSON.stringify(sendData))
    .then((result) => {
        console.log(result.data)
    })
    .catch(err => console.log(err))
};


  return (
    
    <div>
        
        <center>

          {/* ADMIN */}
     <div>
     <h1>Create Admin</h1>
     <br />
     <form onSubmit={handleSubmit}>

     
         <TextField variant='outlined' placeholder='Username'  type="text" name='username' value={data.username} onChange={handleChange} fullWidth/>
         <br /><br />

         <TextField variant='outlined' placeholder='First Name'  type="text" name='firstName' value={data.firstName} onChange={handleChange} fullWidth/>
         <br /><br />

         <TextField variant='outlined' placeholder='Last Name'  type="text" name='lastName' value={data.lastName} onChange={handleChange} fullWidth/>
         <br /><br />
         
     
         <TextField variant='outlined' placeholder='Admin ID'  type="text" name='adminID' value={data.adminID} onChange={handleChange} fullWidth/>
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
