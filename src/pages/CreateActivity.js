import { AppBar, Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Icon, IconButton, List, makeStyles, TextField, Toolbar, Tooltip, Typography } from '@material-ui/core'
import { Assignment, AssignmentIndRounded, AttachFileRounded, CloseRounded } from '@material-ui/icons'
import React, { useState } from 'react'

const useStyles = makeStyles(theme => {
    return {
        root: {
            display: 'flex'
        },
        title: {
            display: 'flex',
            alignContent: 'center'
        },
        icon: {
            marginRight: theme.spacing(0.5),
            marginLeft: theme.spacing(0.5),
        },
        white: {
            color: '#fefefe'
        },
        toolbar: theme.mixins.toolbar,
        btn: {
            marginTop: theme.spacing(2)
        },
        formContainer: {
            maxWidth: theme.spacing(100),
            margin: 'auto'
        },
        appBar: {
            backgroundColor: 'rgba(0,0,0,0.2)'
        },
        closeDialog: {
            zIndex: 2
        }
    }
})

function CreateActivity({ attachActivity, setAttachActivity }) {
    const classes = useStyles()

    const [closeDialog, setCloseDialog] = useState(false);


    return (
        <Box className={classes.root}>
            
            <Dialog open={attachActivity} fullScreen>
                <DialogTitle>
                    <AppBar color='secondary' elevation={0}>
                        <Toolbar>
                            <IconButton onClick={() => {setCloseDialog(true)}}><CloseRounded className={classes.white} /></IconButton>
                            <Box className={classes.title}><Icon className={classes.icon}><Assignment /></Icon> Create Activity</Box>
                        </Toolbar>
                    </AppBar>
                </DialogTitle>
                <DialogContent>
                    <Box className={classes.formContainer}>
                        <Box className={classes.toolbar} />
                        <form action="">
                            <TextField
                                variant='filled'
                                type='text'
                                name='title'
                                // value={postData.title}
                                // onChange={handleChange}
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
                                // value={postData.body}
                                // onChange={handleChange}
                                color='secondary'
                                label='Say something here...'
                                minRows={4}
                                margin='normal'
                                fullWidth
                                multiline
                                required
                            />
                            <input
                                //  onChange={handleFileChange} 
                                style={{ display: 'none' }}
                                type="file" name='files[]' multiple id='attach-file' />
                            <label htmlFor="attach-file">
                                <IconButton component='span'><Tooltip title='Attach a file' placement='right-start' ><AttachFileRounded /></Tooltip></IconButton>
                            </label>
                            {/* {
                                fileOnChange ? */}

                                    <Box ml={2}>
                                        <List>
                                            {/* {
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
                                            } */}
                                        </List>
                                    </Box>
{/* 
                                    :

                                    null

                            } */}

                            <Button className={classes.btn} variant='contained' color='secondary' fullWidth>Post</Button>
                        </form>
                    </Box>
                </DialogContent>
            </Dialog>


            {/* DIALOG */}
            <Dialog 
            open={closeDialog} 
            onClose={() => {setCloseDialog(false)}}
            className={classes.closeDialog}
            >
                <DialogTitle>
                    Discard changes?
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        If you leave without saving, your changes won't be made
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => {setCloseDialog(false)}}>Cancel</Button>
                    <Button onClick={() => {setAttachActivity(false); setCloseDialog(false)}} variant='contained' color='secondary'>Discard</Button>
                </DialogActions>
            </Dialog>



            
        </Box>
    )
}

export default CreateActivity