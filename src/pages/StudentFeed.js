import { Box, Button, Container, Grid, IconButton, List, ListItem, ListItemIcon, ListItemText, makeStyles, MenuItem, Paper, TextField, Tooltip } from '@material-ui/core'
import { AttachFileRounded, Close, DescriptionRounded, ImageRounded, MovieCreationRounded, PictureAsPdfRounded } from '@material-ui/icons'
import axios from 'axios'
import { React, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import StudentPosts from '../components/student/StudentPosts'

import Cookies from 'js-cookie'

const useStyle = makeStyles(theme => {
  return {
    paper: {
      padding: theme.spacing(2)
    },
    posts: {
      width: "100%",
    },
  }
})

export default function StudentFeed() {
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
          setActivities(response.data.reverse())
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

  const showStudentsInfo = () => {
    axios.post('https://ursacapi.000webhostapp.com/api/getStudents.php', JSON.stringify(CookieID))
      .then((response) => {
        if (response.data) {
          Cookies.set('userName', response.data[0].firstName + ' ' + response.data[0].lastName)
          // Cookies.set('userFirstName', response.data[0].firstName)
          setImg('https://ursacapi.000webhostapp.com/api/' + response.data[0].profilePicture)

          // setProfilePic('https://ursacapi.000webhostapp.com/api/' + response.data[0].profilePicture)
        }

      })
      .catch(error => {
        console.log(error);
      })
  }









  const [postData, setPostData] = useState({
    title: '',
    body: '',
    name: ''
  });

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    setPostData(postData => ({ ...postData, [name]: value }));
  }

  const handlePost = async (e) => {
    e.preventDefault()

    let res = await uploadFile(filePreview, postData)
    console.log(res.data);
    setPostData({
      title: '',
      body: '',
      name: Cookies.get('userName')
    });
    streamFeed();

  }







  const [filePreview, setFilePreview] = useState([]);

  const [fileOnChange, setFileOnChange] = useState(false);
  // const [newFile, setNewFile] = useState([]);
  const handleFileChange = (event) => {

    let currentFile = event.target.files;

    setFileOnChange(true)

    for (let file of currentFile) {
      setFilePreview(filePreview => [...filePreview, file])
      console.log(file);

    }
    // setNewFile(currentFile)
  }

  const checkFileLength = () => {
    if (filePreview.length == 1) {
      setFileOnChange(false)

    } else {
      setFileOnChange(true)
    }
  }


  const uploadFile = async (filePreview) => {
    const formdata = new FormData();

    for (let i = 0; i < filePreview.length; i++) {
      formdata.append("files[]", filePreview[i]);
    }

    formdata.append("isAnActivity", 0);
    formdata.append("points", 0);
    formdata.append("dueDate", '0000-00-00 00:00:00');
    formdata.append("title", postData.title)
    formdata.append("body", postData.body)
    formdata.append("name", postData.name)
    formdata.append("userid", CookieID)
    formdata.append("profilePicture", img)
    formdata.append("classroomID", id)
    formdata.append("submit", 'submit')


    return await axios({
      url: 'https://ursacapi.000webhostapp.com/api/addPost.php',
      method: "POST",
      headers: {
        'content-type': 'multipart/form-data'
      },
      data: formdata
    })
  }






  useEffect(() => {
    streamFeed();
    getClassrooms();
    // getFiles();
    sessionCheck();
    showStudentsInfo();
  }, []);





  return (
    <div className={classes.root}>
      <Container maxWidth='sm'>
        <Grid container spacing={3} justifyContent='center' >

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
                    label='Title (Optional)'
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
                    required
                  />

                  <input onChange={handleFileChange} style={{ display: 'none' }} type="file" name='files[]' multiple id='attach-file' />
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
                                      file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' || 'application/vnd.openxmlformats-officedocument.presentationml.presentation' ?
                                        <DescriptionRounded />
                                        :
                                        file.type === 'video/x-matroska' ?
                                          <MovieCreationRounded />
                                          :
                                          file.type === 'image/jpeg' || 'image/jpg' || 'image/png' ?
                                            <ImageRounded />
                                            :
                                            <DescriptionRounded />
                                  }
                                </ListItemIcon>
                                <ListItemText>
                                  {file.name}
                                </ListItemText>
                                <IconButton onClick={() => {
                                  setFilePreview(filePreview.filter(thisFile => thisFile.name !== file.name));
                                  checkFileLength();
                                }}><Close />
                                </IconButton>
                              </ListItem>
                            ))
                          }
                        </List>
                      </Box>

                      :

                      null

                  }

                  <Button variant='contained' color='secondary' type='submit' name='submit' size='large' fullWidth disableElevation>Post</Button>

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

              <Box className={classes.posts}>
                {activities.map(activity => (
                  <Grid item xs={12} key={activity.id}>
                    <Box mt={5}>
                      <StudentPosts streamFeed={streamFeed} activity={activity} img={img} />
                    </Box>
                  </Grid>
                ))}
              </Box>

          }


        </Grid>
      </Container>
    </div>
  )
}
