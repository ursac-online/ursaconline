
import { Button, FormHelperText, MenuItem, TextField } from '@material-ui/core'
import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'



export default function ClassroomUpdate(updateID) {
    const history = useNavigate();

    
    useEffect(() => {
        showStudent();
      }, []);
    
    const [data, setData] = useState({
        subjectName: '',
        instructor: '',
        yearSection: ''
    })

    const showStudent = () => {
        axios.post('https://ursacapi.000webhostapp.com/api/getClassroomID.php', JSON.stringify(updateID))
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
            subjectName:data.subjectName,
            instructor:data.instructor,
            yearSection:data.yearSection,
            id: data.id
        }
        
        axios.post('https://ursacapi.000webhostapp.com/api/updateClassroom.php', JSON.stringify(sendData))
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

            <FormHelperText>Subject</FormHelperText>
            <TextField variant='outlined' placeholder='First Name'  type="text" name='subjectName' value={data.subjectName} onChange={handleChange} fullWidth/>
            <br /><br />
            
            <FormHelperText>Instructor</FormHelperText>
            <TextField variant='outlined' placeholder='Middle Name'  type="text" name='instructor' value={data.instructor} onChange={handleChange} fullWidth/>
            <br /><br />

            <FormHelperText>Year & Section</FormHelperText>
            <TextField variant='outlined' placeholder='Last Name'  type="text" name='yearSection' value={data.yearSection} onChange={handleChange} fullWidth/>
            <br /><br />
            

            <Button fullWidth type='submit' name='submit' variant='contained' color='secondary' >Confirm Edit</Button>

        </form>
        </div>
        </center>
        
    </div>
  )
}
