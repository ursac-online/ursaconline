
import { Box, Button, CircularProgress, Dialog, DialogContent, DialogContentText, FormHelperText, Icon, makeStyles, MenuItem, TextField } from '@material-ui/core'
import { CheckCircleOutlineRounded } from '@material-ui/icons';
import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'


const useStyles = makeStyles(theme => {
    return {
        dialogContainer: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
        },
        green: {
            color: '#55CA36'
        },
    }
})



export default function InstructorUpdate(updateID) {
    const history = useNavigate();

    const classes = useStyles();
    
    const [isLoading, setisLoading] = useState(false);

    const [loadingDialog, setLoadingDialog] = useState(false);

    
    useEffect(() => {
        showInstructor();
      }, []);
    
    const [data, setData] = useState({
        firstName: '',
        middleName: '',
        lastName: '',
        instructorID: '',
        college: '',
        course: '',
        password: ''
    })

    const showInstructor = () => {
        axios.post('https://ursacapi.000webhostapp.com/api/getInstructorID.php', JSON.stringify(updateID))
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
        setLoadingDialog(true)
        setisLoading(true);
        e.preventDefault();
        const sendData = {
            firstName:data.firstName,
            middleName:data.middleName,
            lastName:data.lastName,
            instructorID:data.instructorID,
            college: data.college,
            course: data.course,
            password:data.password,
            id: data.id
        }
        
        axios.post('https://ursacapi.000webhostapp.com/api/updateInstructor.php', JSON.stringify(sendData))
        .then((result) => {
            console.log(result.data)
            setLoadingDialog(false)
            setisLoading(false);
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
            
            <FormHelperText>Middle Name</FormHelperText>
            <TextField variant='outlined' placeholder='Middle Name'  type="text" name='middleName' value={data.middleName} onChange={handleChange} fullWidth/>
            <br /><br />

            <FormHelperText>Last Name</FormHelperText>
            <TextField variant='outlined' placeholder='Last Name'  type="text" name='lastName' value={data.lastName} onChange={handleChange} fullWidth/>
            <br /><br />
            
            <FormHelperText>Student ID</FormHelperText>
            <TextField variant='outlined' placeholder='Student ID'  type="text" name='instructorID' value={data.instructorID} onChange={handleChange} fullWidth/>
            <br /><br />

            <FormHelperText>College</FormHelperText>
            <TextField variant='outlined' placeholder='College'  type="text" name='college' value={data.college} onChange={handleChange} fullWidth/>
            <br /><br />

            <FormHelperText>Course</FormHelperText>
            <TextField variant='outlined' placeholder='Course'  type="text" name='course' value={data.course} onChange={handleChange} fullWidth/>
            <br /><br />

            <FormHelperText>Password</FormHelperText>
            <TextField variant='outlined' placeholder='Password'  type="text" name='password' value={data.password} onChange={handleChange} fullWidth/>
            <br /><br />
            

            <Button fullWidth type='submit' name='submit' variant='contained' color='secondary' >Confirm Edit</Button>

        </form>
        </div>




        <Dialog
                        open={loadingDialog}
                    >
                        <DialogContent>

                            {
                                isLoading ?


                                    <Box className={classes.dialogContainer}>
                                        <Box mb={1}>
                                            <CircularProgress color='secondary' />
                                        </Box>
                                        <DialogContentText>
                                            Saving...
                                        </DialogContentText>
                                    </Box>

                                    :

                                    <Box className={classes.dialogContainer}>
                                        <DialogContentText>
                                            <Icon><CheckCircleOutlineRounded className={classes.green} fontSize='large' /></Icon>
                                        </DialogContentText>
                                        <DialogContentText>
                                            Changes applied
                                        </DialogContentText>
                                    </Box>

                            }





                        </DialogContent>

                    </Dialog>
        </center>
        
    </div>
  )
}
