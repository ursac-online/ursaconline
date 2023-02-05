import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Grid,
  IconButton,
} from "@material-ui/core";
import { Delete } from "@material-ui/icons";
import React from "react";

function ToDoList(props) {
  const todo = props.todo
  const index = props.index
  return (
    <Card style={{ margin: 15 }} elevation={5}>
      <CardHeader
        title={todo.title}
        action={
          <IconButton onClick={() => props.handleDeleteToDo(index)}>
            <Delete />
          </IconButton>
        }
      />
      <CardContent>{todo.body}</CardContent>
    </Card>
  );
}

export default ToDoList;
