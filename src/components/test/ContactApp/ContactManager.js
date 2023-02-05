import { Box, Typography } from "@material-ui/core";
import React, { useState } from "react";
import AddNewContact from "./AddNewContact";
import ContactList from "./ContactList";

function ContactManager() {
  const [names, setNames] = useState([]);

  const addPerson = (newName) => {
    setNames([...names, newName]);
  };

  return (
    <Box>
      <Typography variant="h5">Avenger's Contact List</Typography>
      <AddNewContact handleAddPerson={addPerson} />
      <ContactList data={names} />
    </Box>
  );
}

export default ContactManager;
