import React from 'react';
import { Checkbox, IconButton, ListItem, ListItemText } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const TodoItem = ({ todo, onToggle, onDelete }) => {
  return (
    <ListItem className={`todo-item ${todo.completed ? 'completed' : ''}`}>
      <Checkbox
        checked={todo.completed}
        onChange={() => onToggle(todo.id)}
      />
      <ListItemText primary={todo.text} />
      <IconButton edge="end" onClick={() => onDelete(todo.id)}>
        <DeleteIcon />
      </IconButton>
    </ListItem>
  );
};

export default TodoItem;