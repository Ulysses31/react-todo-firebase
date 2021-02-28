import React from 'react';
import {
  Button,
  TableCell,
  TableRow
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { useFirebase } from 'react-redux-firebase';
import { AddErrorAction } from '../../state/actions/msgActions';
import { selectedTodo } from '../../state/actions/todoActions';
export default function Todo({ todo, confirmDeleteOpen }) {
  const firebase = useFirebase();
  const dispatch = useDispatch();
  const uid = useSelector(
    (state) => state.firebase.auth.uid
  );

  const handleEditBtn = (todo) => {
    dispatch(selectedTodo(todo));
  };

  const handleDoneChk = (task) => {
    firebase
      .update(`todos/${task.key}`, {
        done: !task.value.done
      })
      .catch((err) => dispatch(AddErrorAction(err)));
  };

  const handleDeleteBtn = (key) => {
    confirmDeleteOpen(key);
  };

  return (
    <TableRow>
      <TableCell>
        <input
          type='checkbox'
          checked={todo.value.done}
          onChange={() => handleDoneChk(todo)}
          disabled={!uid}
        />
      </TableCell>
      <TableCell>
        <span
          style={{
            textDecoration: todo.value.done
              ? 'line-through'
              : ''
          }}
        >
          {todo.value.todo}
        </span>
      </TableCell>
      <TableCell>
        {new Date(todo.value.date).toLocaleString('el')}
      </TableCell>
      <TableCell align='center'>
        <span role='img' aria-label='emoji'>
          {!todo.value.done ? '😎' : '😡'}
        </span>
      </TableCell>
      <TableCell align='center'>
        <Button
          onClick={() => handleEditBtn(todo)}
          disabled={!uid}
        >
          <EditIcon color='primary' />
        </Button>
        <Button
          onClick={() => handleDeleteBtn(todo.key)}
          disabled={!uid}
        >
          <DeleteIcon color='secondary' />
        </Button>
      </TableCell>
    </TableRow>
  );
}

// Props Validation
Todo.propTypes = {
  todo: PropTypes.object.isRequired,
  confirmDeleteOpen: PropTypes.func.isRequired
};
