import { Box } from '@material-ui/core'
import React from 'react'

function ContactList(props) {

    const arr = props.data;

    const personList = arr.map((person, key) => {
        return <li key={key}>{person}</li>
    })


  return (
    <Box>
        <ul>
            {personList}
        </ul>
    </Box>
  )
}

export default ContactList