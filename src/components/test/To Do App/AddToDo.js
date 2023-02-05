import { Box, Button, InputLabel, TextField } from "@material-ui/core";
import React, { useState } from "react";

function AddToDo(props) {
  const [todoContent, setTodoContent] = useState({
    title: "",
    body: "",
  });

  const handleChange = (e) => {
    const values = e.target.value;
    const names = e.target.name;

    setTodoContent((todoContent) => ({ ...todoContent, [names]: values }));
  };

  const handleSubmit = (e) => {
    props.handleAddToDo(todoContent);
    props.handleCloseForm(false);
    setTodoContent({
      title: "",
      body: "",
    });
    e.preventDefault();
  };

  return (
    <Box>
      <form onSubmit={handleSubmit}>
        <InputLabel>Title</InputLabel>
        <TextField
          variant="outlined"
          type="text"
          value={todoContent.title}
          name="title"
          onChange={handleChange}
          fullWidth
        />{" "}
        <br />
        <br />
        <InputLabel>Description</InputLabel>
        <TextField
          variant="outlined"
          type="text"
          multiline
          maxRows={100}
          value={todoContent.body}
          name="body"
          onChange={handleChange}
          fullWidth
        />{" "}
        <br />
        <br />
        <Button variant="contained" color="primary" type="submit" fullWidth>
          Add
        </Button>
      </form>
    </Box>
  );
}

export default AddToDo;
