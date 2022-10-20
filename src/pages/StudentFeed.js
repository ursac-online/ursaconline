import { React, useState } from 'react'
import { Container, Grid, Paper, TextField, makeStyles, Button, IconButton, Tooltip, Card, CardContent, MenuItem, Box, List, ListItem, ListItemText, ListItemIcon, Divider } from '@material-ui/core'
import StudentPosts from '../components/StudentPosts'
import { AttachFileRounded, DescriptionRounded, ImageAspectRatioRounded, ImageRounded, InsertDriveFileRounded, MovieCreationRounded, PictureAsPdfRounded } from '@material-ui/icons'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import { useEffect } from 'react'

import Cookies from 'js-cookie'

const useStyle = makeStyles(theme => {
  return {
    paper: {
      padding: theme.spacing(2)
    }
  }
})

export default function StudentFeed({ }) {
  const classes = useStyle()
  const navigate = useNavigate()
  const CookieID = Cookies.get('idLoggedIn');
  const { id } = useParams();





  function sessionCheck() {
    if (!CookieID) {
      navigate('/');
    }
  }










  const [subjectInfo, setSubjectInfo] = useState({});

  const [activities, setActivities] = useState([])

  const [noPost, setNoPost] = useState(true);

  const [img, setImg] = useState('');

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

  const getFiles = () => {
    axios.post('https://ursacapi.000webhostapp.com/api/getFile.php', JSON.stringify(id))
      .then(response => {
        setImg('https://ursacapi.000webhostapp.com/api/' + response.data[0].files)
      })
      .catch(err => console.log(err))
  }









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








  const [filePreview, setFilePreview] = useState([]);

  const [fileOnChange, setFileOnChange] = useState(false);
  const [newFile, setNewFile] = useState(null);
  const handleFileChange = (event) => {
    // let files = event.target.files[0];
    let currentFile = event.target.files;

    setFileOnChange(true)

    for (let file of currentFile) {
      setFilePreview(filePreview => [...filePreview, file])
      console.log(file);
    }




    setNewFile(currentFile)
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





  useEffect(() => {
    streamFeed();
    getClassrooms();
    getFiles();
    sessionCheck();
  }, []);





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

                  <input onChange={handleFileChange} style={{ display: 'none' }} type="file" name='file' multiple id='attach-file' />
                  <label htmlFor="attach-file">
                    <IconButton component='span'><Tooltip title='Attach a file' placement='right-start' ><AttachFileRounded /></Tooltip></IconButton>
                  </label>

                  {
                    fileOnChange ?
                    
                      <Box ml={2}>
                        <List>
                          {
                            filePreview.map(file => (
                              <ListItem key={file.name} dense>
                                <ListItemIcon>
                                  {
                                    file.type === 'application/pdf' ?
                                      <PictureAsPdfRounded />
                                      :
                                      file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ?
                                      <DescriptionRounded />
                                      :
                                      file.type === 'video/x-matroska' ?
                                      <MovieCreationRounded />
                                      :
                                      file.type === 'image/jpeg' || 'image/jpg' || 'image/png' ?
                                      <ImageRounded />
                                      :
                                      <InsertDriveFileRounded />
                                  }
                                </ListItemIcon>
                                <ListItemText>
                                  {file.name}
                                </ListItemText>
                              </ListItem>
                            ))
                          }
                        </List>
                      </Box>

                      :

                      null

                  }

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
