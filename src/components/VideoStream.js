import { Button, Container, Grid, makeStyles, Paper } from '@material-ui/core'
import { React, useRef, useState } from 'react'
import Webcam from 'react-webcam'

const videoConstraints = {
    width: 1280,
    height: 720,
    facingMode: "user"
};

const useStyle = makeStyles(theme => {
    return {
        paper: {
            padding: '20px'
        }
    }
})

export default function VideoStream() {
    const classes = useStyle()
    const webref = useRef(true)
    const [showImage, setShowImage] = useState(null)
    const handleSnap = () => {
       let img = webref.current.getScreenShot()
       setShowImage(img)
    }
    return (
        <div>
            <Container>
            <Paper className={classes.paper} elevation={2}>
                <Container>
                    <Grid container justifyContent='center' alignContent='center' alignItems='center'>
                        <Grid item>
                            <Container>
                <Webcam
                
                    audio={false}
                    height='auto'
                    screenshotFormat="image/jpeg"
                    width={450}
                    videoConstraints={videoConstraints} />
                    </Container>
                <Button onClick={handleSnap} variant='contained'color='secondary' fullWidth >Snap</Button>
                
                <img src={showImage} alt="" />
                </Grid>
                </Grid>
                </Container>
            </Paper>
            </Container>
        </div>
    )
}
