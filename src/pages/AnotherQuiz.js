import { Button, Card, CardContent, CardHeader, Container, Dialog, DialogContent, DialogTitle, Grid, List, ListItem, makeStyles, Paper, Typography } from '@material-ui/core'
import React from 'react'
import { useState } from 'react'



const useStyle = makeStyles(theme => {
    return {
        title: {
            textAlign: 'center',
            color: '#fefefe'
        },
        answers: {
            border: '1px solid #999',
            borderRadius: '7px',
            marginBottom: theme.spacing(1)
        },
        dialog: {
            backgroundColor: '#162276'
        }
    }
})

const choices = [
    {
        question: 'Sino ang taong mahal na mahal mo na sobrang pogi at mabait pa? Clue: Hindi siya pasaway.',
        answerChoice: [
            {answer: 'Phil', isCorrect: false},
            {answer: 'Philip', isCorrect: true},
            {answer: 'Babi', isCorrect: false},
            {answer: 'Bal', isCorrect: false}
        ]
    },
    {
        question: 'Sino pinakagwapo?',
        answerChoice: [
            {answer: 'Cajurao', isCorrect: true},
            {answer: 'Chanyeol', isCorrect: false},
            {answer: 'DJ', isCorrect: false},
            {answer: 'Joshua', isCorrect: false}
        ]
    },
    {
        question: 'Birthmonth ko?',
        answerChoice: [
            {answer: 'June', isCorrect: true},
            {answer: 'July', isCorrect: false},
            {answer: 'August', isCorrect: false},
            {answer: 'September', isCorrect: false}
        ]
    },
    {
        question: 'My favorite programming language?',
        answerChoice: [
            {answer: 'JavaScript', isCorrect: true},
            {answer: 'Python', isCorrect: false},
            {answer: 'C++', isCorrect: false},
            {answer: 'PHP', isCorrect: false}
        ]
    },
    
]

export default function AnotherQuiz() {
    const classes = useStyle()
    const [quiz, setQuiz] = useState(false);
    const [currentQuestion, setCurrentQuestion] = useState(0)

    const handleAnsweredQuestion = () => {
        
        if (currentQuestion < choices.length) {
        setCurrentQuestion(currentQuestion+1)
        } else {
            alert('nice one all done')
        }
    }

    const openQuiz = () => {
        setQuiz(true)
    }
    const closeQuiz = () => {
        setQuiz(false)
    }

    const number = 1
    const name = `Quiz ${number}/5`

    return (
        <div className={classes.root}>
            <Button variant='contained' color='secondary' onClick={openQuiz}>
                Open Dialog
            </Button>
            <Dialog classes={{paper: classes.dialog}} open={quiz} onClose={closeQuiz} fullScreen>
                <Typography variant='h4' className={classes.title}>Boyfriend Check</Typography>
                <DialogContent>
                    <Card elevation={20} >
                        <Container>
                            <CardHeader title={name} subheader='Pag nasagot mo maganda ka.' />
                            <CardContent>
                                <Grid container spacing={1}>
                                    
                                    <Grid item xs={12}>
                                        <Typography>
                                            {choices[currentQuestion].question}
                                        </Typography>
                                    </Grid>
                                    

                                    <Grid item xs={12}>
                                        <List>
                                            {choices[currentQuestion].answerChoice.map(choice => (
                                                <ListItem onClick={handleAnsweredQuestion} button className={classes.answers} >{choice.answer}</ListItem>
                                            ))}
                                        </List>
                                    </Grid>

                                </Grid>
                            </CardContent>
                        </Container>
                    </Card>
                </DialogContent>
            </Dialog>
        </div>
    )
}
