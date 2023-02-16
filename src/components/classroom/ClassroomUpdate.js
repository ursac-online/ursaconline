
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

export default function ClassroomUpdate(updateID) {
    const classes = useStyles();
    
    const [isLoading, setisLoading] = useState(false);

    const [loadingDialog, setLoadingDialog] = useState(false);


    
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
