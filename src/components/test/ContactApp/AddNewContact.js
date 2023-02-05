import { Box } from '@material-ui/core'
import React, { useState } from 'react'

function AddNewContact(props) {
    const [personName, setPersonName] = useState("");

    const handleChange = (e) => {
        setPersonName(e.target.value)
    }

    const handleSubmit = (e) => {
        props.handleAddPerson(personName)
        e.preventDefault();
        setPersonName("")
        
    }

  return (
    <Box>
        <form onSubmit={handleSubmit}>
            <input type="text" value={personName} onChange={handleChange} />
            <input type="submit" value='Add Person' />
        </form>
    </Box>
  )
}

export default AddNewContact