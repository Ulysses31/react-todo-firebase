import React from 'react';
import {
  Button,
  TableCell,
  TableRow
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { PropTypes } from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { useFirestore } from 'react-redux-firebase';
import { AddErrorAction } from '../../state/actions/msgActions';
import { selectedTask } from '../../state/actions/taskActions';

export default function Task({ task, confirmDeleteOpen }) {
  const dispatch = useDispatch();
  const firestore = useFirestore();
  const uid = useSelector(
    (state) => state.firebase.auth.uid
  );

  const handleEditBtn = (task) => {
    dispatch(selectedTask(task));
  };

  const handleDoneChk = (task) => {
    firestore
      .update(`tasks/${task.id}`, { done: !task.done })
      .catch((err) => dispatch(AddErrorAction(err)));
  };

  const handleDeleteBtn = (taskId) => {
    confirmDeleteOpen(taskId);
  };

  return (
    <TableRow>
      <TableCell>
        <input
          type='checkbox'
          checked={task.done}
          onChange={() => handleDoneChk(task)}
          disabled={!uid}
        />
      </TableCell>
      <TableCell>
        <span
          style={{
            textDecoration: task.done ? 'line-through' : ''
          }}
        >
          {task.task}
        </span>
      </TableCell>
      <TableCell>
        {task.date
          ? new Date(task.date.toDate()).toLocaleString(
              'el'
            )
          : ''}
      </TableCell>
      <TableCell align='center'>
        <span role='img' aria-label='emoji'>
          {!task.done ? '😎' : '😡'}
        </span>
      </TableCell>
      <TableCell align='center'>
        <Button
          onClick={() => handleEditBtn(task)}
          disabled={!uid}
        >
          <EditIcon color='primary' />
        </Button>
        <Button
          onClick={() => handleDeleteBtn(task.id)}
          disabled={!uid}
        >
          <DeleteIcon color='secondary' />
        </Button>
      </TableCell>
    </TableRow>
  );
}

// Props Validation
Task.propTypes = {
  task: PropTypes.object.isRequired,
  confirmDeleteOpen: PropTypes.func.isRequired
};
