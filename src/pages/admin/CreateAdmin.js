
import { FormHelperText, MenuItem, TextField } from '@material-ui/core'
import React, { useState } from 'react'
import AdminRegister from '../../components/admin/AdminRegister'
import StudentRegister from '../../components/student/StudentRegister'
import TeacherRegister from '../../components/teacher/TeacherRegister'



export default function CreateAdmin() {
   
      
  const [position, setPosition] = useState('Student')

  const [teacherPosition, setTeacherPosition] = useState(false)
  const [adminPosition, setAdminPosition] = useState(false)

    
   const handleChangeSelect = (event) => {
    setPosition(event.target.value);
    if(event.target.value === 'Instructor') {
      setTeacherPosition(true)
      setAdminPosition(false)
    } else if (event.target.value === 'Admin') {
      setTeacherPosition(false)
      setAdminPosition(true)
    } else {
      setTeacherPosition(false)
      setAdminPosition(false)
    }
   }

  return (
    
    <div>
        
        <center>
          <FormHelperText>Select position.</FormHelperText>
        <TextField variant='outlined' select value={position} onChange={handleChangeSelect} fullWidth>
            <MenuItem value='Student'> Student </MenuItem>
            <MenuItem value='Instructor'> Instructor </MenuItem>
            <MenuItem value='Admin'> Admin </MenuItem>
          </TextField>
            <br /><br />

         
        {
          adminPosition ? <AdminRegister /> :
            teacherPosition ? <TeacherRegister /> :
              <StudentRegister />
        }
        </center>
        
    </div>
  )
}
