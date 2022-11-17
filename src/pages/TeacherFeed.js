import { React, useState } from 'react'
import { Container, Grid, Paper, TextField, makeStyles, Button, IconButton, Tooltip, MenuItem, Box, List, ListItem, ListItemText, ListItemIcon, Divider, FormLabel, Slide, Switch } from '@material-ui/core'
import StudentPosts from '../components/StudentPosts'
import { Assessment, Assignment, AttachFileRounded, Close, DescriptionRounded, ImageAspectRatioRounded, ImageRounded, InsertDriveFileRounded, MovieCreationRounded, PictureAsPdfRounded } from '@material-ui/icons'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { format } from 'date-fns'
import axios from 'axios'
import { useEffect } from 'react'

import Cookies from 'js-cookie'
import CreateActivity from './CreateActivity'

const useStyle = makeStyles(theme => {
  return {
    root: {
      display: 'flex'
    },
    paper: {
      padding: theme.spacing(2)
    },
    posts: {
      width: '100%'
    }
  }
})

export default function TeacherFeed() {
  const classes = useStyle()
  const navigate = useNavigate()
  const CookieID = Cookies.get('instructorID');
  const { id } = useParams();

  const date = new Date();
  const today = format(date, "yyyy-MM-dd");
  const currentTime = format(date, "23:59");





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

  // const getFiles = () => {
  //   axios.post('https://ursacapi.000webhostapp.com/api/getFile.php', JSON.stringify(id))
  //     .then(response => {
  //       setImges('https://ursacapi.000webhostapp.com/api/' + response.data[0].files)
  //     })
  //     .catch(err => console.log(err))
  // }

  const showInstructorsInfo = () => {
    axios.post('https://ursacapi.000webhostapp.com/api/getInstructors.php', JSON.stringify(CookieID))
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
    name: Cookies.get('userName')
  });

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    setPostData(postData => ({ ...postData, [name]: value }));
  }

  const handlePost = async (e) => {
    e.preventDefault()

    let res = await uploadFile(filePreview, postData);
    console.log(res.data);
    setPostData({
      title: '',
      body: '',
      name: Cookies.get('userName')
    });
    setFilePreview([]);
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


  const [attachActivity, setAttachActivity] = useState(false);
  const [makeActivity, setMakeActivity] = useState(false);
  const toggleChecked = () => {
    setMakeActivity((prev) => !prev);
  };
  const isDisplay = () => {
    if (makeActivity) {
      return 'block';
    } else {
      return 'none';
    }
  }



  const uploadFile = async (filePreview) => {
    const formdata = new FormData();

    for (let i = 0; i < filePreview.length; i++) {
      formdata.append("files[]", filePreview[i]);
    }

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
    showInstructorsInfo();
  }, []);



  return (
    <div className={classes.root}>
      <Container maxWidth='sm'>
        <CreateActivity attachActivity={attachActivity} setAttachActivity={setAttachActivity} />
        <Grid container spacing={3} justifyContent='center' className={classes.content} >

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
                    required
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

                  {/* <IconButton component='span' onClick={() => { setAttachActivity(true) }}><Tooltip title='Attach an activity' placement='right-start' ><Assignment /></Tooltip></IconButton> */}

                  {/* <button type='button' onClick={removeFile}>Click</button> */}

                  {
                    fileOnChange ?

                      <Box ml={2}>
                        <List>
                          Files to be uploaded:
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

                  <Box mt={2}>
                    <Switch checked={makeActivity} onChange={toggleChecked} />
                    <label>Post as an Activity</label>
                  </Box>
                  <Box mb={2} mt={2} display={isDisplay()}>
                    <Grid container justifyContent='center'>
                      <Grid item>
                        <label htmlFor='points'>Points</label><br />
                        <TextField
                          InputProps={{ inputProps: { min: "0" } }}
                          variant='filled'
                          name='points'
                          type='number'
                          min='1'
                        />
                      </Grid>
                    </Grid>

                    <Grid container spacing={3} justifyContent='center'>
                      <Grid item>
                        <Box mb={2} mt={2}>
                          <label>Due date</label><br />
                          <TextField variant='filled' type='date' value={today} />
                        </Box>
                      </Grid>
                      <Grid item>
                        <Box mb={2} mt={2}>
                          <label>Due time</label><br />
                          <TextField variant='filled' type='time' value={currentTime} />
                        </Box>
                      </Grid>
                    </Grid>
                  </Box>



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
                      <StudentPosts streamFeed={streamFeed} activity={activity} />
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
