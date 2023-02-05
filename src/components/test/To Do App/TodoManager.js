import {
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  makeStyles,
  Typography,
} from "@material-ui/core";
import { AddCircle } from "@material-ui/icons";
import React, { useState } from "react";
import AddToDo from "./AddToDo";
import ToDoList from "./ToDoList";

const useStyle = makeStyles((theme) => {
  return {
    addBtn: {
      position: "fixed",
      bottom: 90,
      right: 90,
    },
  };
});

function TodoManager() {
  const classes = useStyle();

  const [open, setOpen] = useState(false);
  const [todos, setTodos] = useState([]);
  const [hasNoPost, setHasNoPost] = useState(true);

  const addToDo = (newToDo) => {
    setTodos([...todos, newToDo]);
    setHasNoPost(false);
  };
  const deleteToDo = (index) => {
    let deleteThis = [...todos];
    deleteThis.splice(index, 1);
    setTodos(deleteThis);
  };

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box>
      <Typography style={{ textAlign: "center" }} variant="h5">
        To Do App
      </Typography>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle style={{ textAlign: "center" }}>To-Do</DialogTitle>
        <DialogContent>
          <AddToDo handleAddToDo={addToDo} handleCloseForm={handleClose} />
        </DialogContent>
      </Dialog>

      {hasNoPost ? (
        <Box mt={5}>
          <Typography style={{ textAlign: "center", color: "gray" }}>
            Your notes goes here...
          </Typography>
        </Box>
      ) : (
        <Grid
          container
          spacing={5}
          style={{
            width: "100%",
            margin: "auto",
            display: "flex",
          }}
        >
          {todos.map((todo, index) => (
            <Grid item xs={3} key={index}>
              <ToDoList
                todo={todo}
                index={index}
                handleDeleteToDo={deleteToDo}
              />
            </Grid>
          ))}
        </Grid>
      )}

      <IconButton className={classes.addBtn} onClick={handleOpen}>
        <AddCircle style={{ fontSize: 50 }} fontSize="large" />
      </IconButton>
    </Box>
  );
}

export default TodoManager;
