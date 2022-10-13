import { React, useState } from 'react'
import { Container, Grid, Paper, TextField, makeStyles, Button, IconButton, Tooltip, Card, CardContent, MenuItem, Box } from '@material-ui/core'
import StudentPosts from '../components/StudentPosts'
import { AttachFileRounded } from '@material-ui/icons'
import { useLocation, useParams } from 'react-router-dom'
import axios from 'axios'
import { useEffect } from 'react'

import Cookies from 'js-cookie'

const useStyle = makeStyles(theme => {
  return {
    paper: {
      padding: theme.spacing(2)
    },
    input: {
      display: 'none'
    }
  }
})

export default function StudentFeed({ }) {

  const classes = useStyle()
  // const location = useLocation()
  // const subject = location.search.slice(1)
  // const subjectSpace = subject.replace("%20", " ")
  const CookieID = Cookies.get('idLoggedIn');
  const CookieName = Cookies.get('userName');



  const { id } = useParams();
  const [subjectInfo, setSubjectInfo] = useState({});

  const getClassrooms = () => {
    const sendData = {
      updateID: id
    };


    axios.post('https://ursacapi.000webhostapp.com/api/getClassroomID.php', JSON.stringify(sendData))
      .then(response => {
        if (response.data == 0) {
          console.log('classroom ID not found');
        } else {
          setSubjectInfo(response.data[0]);
        }
      })
  }



  const streamFeed = () => {
    axios.post('https://ursacapi.000webhostapp.com/api/getPost.php', JSON.stringify(id))
      .then((response) => {
        if (response.data == 0) {
          setNoPost(true);
        } else {
          setActivities(response.data)
          setNoPost(false);

        }

      })
      .catch(error => {
        console.log(error);
      })
  }


  useEffect(() => {
    streamFeed();
    getClassrooms();
    getFiles();
    // user();
  }, []);

  const [img, setImg] = useState('');
  const getFiles = () => {

    axios.post('https://ursacapi.000webhostapp.com/api/getFile.php', JSON.stringify(id))
    .then(response => {
      setImg('https://ursacapi.000webhostapp.com/api/' + response.data[0].files)
      console.log(response.data[0].files);
    })
    .catch(err => console.log(err))
  }


  const [noPost, setNoPost] = useState(true);
  const [postData, setPostData] = useState({
    title: '',
    body: '',
    file: ''
  });

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    setPostData(postData => ({ ...postData, [name]: value }));
  }


  const [activities, setActivities] = useState([])

  const [newFile, setNewFile] = useState(null);
  const handleFileChange = (event) => {
    // let files = event.target.files[0];
   let currentFile = event.target.files[0];

    setNewFile(currentFile)
  }

  const handlePost = async (e) => {
e.preventDefault()
    // const sendData = {
    //   title: postData.title,
    //   body: postData.body,
    //   file: postData.file,
    //   updateID: CookieID,
    //   updateName: CookieName,
    //   id
    // };


    let res = await uploadFile(newFile) 
    console.log(res.data);
    
      // .then(response => {
      //   console.log(response.data);
      // })
      // .catch(err => console.log(err))
    
  }

  const uploadFile = async (newFile) => {
    const formdata = new FormData();

    formdata.append('avatar', newFile);


    return await axios.post('https://ursacapi.000webhostapp.com/api/addPost.php', formdata, {
      headers: {
        'content-type': 'multipart/form-data'
      }
    });
  }


  


  return (
    <div className={classes.root}>
      <Container maxWidth='sm'>
        <Grid container spacing={3} >

          <Grid item xs={12}>
            <h1>{subjectInfo.subjectName}</h1>
            <p>{subjectInfo.yearSection}</p>
          </Grid>

          <Grid item xs={12}>
            <Paper className={classes.paper} >

              <div>
                <form onSubmit={handlePost} >
                  <TextField
                    variant='filled'
                    type='text'
                    name='title'
                    value={postData.title}
                    onChange={handleChange}
                    color='secondary'
                    label='Title'
                    margin='normal'
                    fullWidth
                    multiline
                  />

                  <TextField
                    variant='filled'
                    type='text'
                    name='body'
                    value={postData.body}
                    onChange={handleChange}
                    color='secondary'
                    label='Say something here...'
                    minRows={4}
                    margin='normal'
                    fullWidth
                    multiline
                  />

                  <input  onChange={handleFileChange} type="file" name='file' id='attach-file' />
                  <label htmlFor="attach-file">
                    <IconButton component='span'><Tooltip title='Attach a file' placement='right-start' ><AttachFileRounded /></Tooltip></IconButton>
                  </label>

                  <Button variant='contained' color='secondary' type='submit' size='large' fullWidth disableElevation>Post</Button>

                </form>

              </div>
            </Paper>
          </Grid>
          {
            noPost ?

              <Paper variant='outlined' >
                <MenuItem disabled>
                  You have no announcement yet.
                </MenuItem>
              </Paper>

              :

              <Box>
                {activities.map(activity => (
                  <Grid item xs={12} key={activity.id}>
                    <StudentPosts activity={activity} img={img} />
                  </Grid>
                ))}
              </Box>

          }


        </Grid>
      </Container>
    </div>
  )
}
