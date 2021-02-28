import React, { useState } from 'react';
import {
  makeStyles,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import {
  useFirestore,
  useFirestoreConnect
} from 'react-redux-firebase';
import {
  AddErrorAction,
  AddMessageAction,
  IsLoadingFalseAction,
  IsLoadingTrueAction
} from '../../state/actions/msgActions';
import ConfirmDlg from '../layout/confirmDialog';
import Task from './task';

const useStyles = makeStyles({
  table: {
    minWidth: '100%'
  }
});

export default function Tasks() {
  const classes = useStyles();
  const firestore = useFirestore();
  const dispatch = useDispatch();
  useFirestoreConnect(['tasks']);
  const tasks = useSelector(
    (state) => state.firestore.ordered.tasks || []
  );
  const [isOpen, setIsOpen] = useState(false);
  const [taskId, setTaskId] = useState('');

  const handleDlgOpen = (key) => {
    // set current selected key to delete and open confirm
    setTaskId(key);
    setIsOpen(true);
  };

  const handleDlgClose = (answer) => {
    // if confirm answer is yes then delete it
    if (answer) {
      // Loading...
      dispatch(IsLoadingTrueAction());

      firestore
        .delete({
          collection: 'tasks',
          doc: taskId
        })
        .then(() => {
          // Loading...
          dispatch(IsLoadingFalseAction());
          dispatch(AddMessageAction('Delete Complete.'));
        })
        .catch((err) => {
          // Loading...
          dispatch(IsLoadingFalseAction());
          dispatch(AddErrorAction(err));
        });
    }

    // clear selected key and close dialog
    setTaskId('');
    setIsOpen(false);
  };

  return (
    <>
      <ConfirmDlg
        open={isOpen}
        handleClose={handleDlgClose}
        title={'Delete Confirm'}
        content={'Are you sure you want to delete it?'}
      />
      <TableContainer component={Paper}>
        <Table
          className={classes.table}
          aria-label='simple table'
        >
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
              <TableCell>Tasks</TableCell>
              <TableCell>Added On</TableCell>
              <TableCell align='center'>Status</TableCell>
              <TableCell align='center'>Options</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tasks.map((task) => (
              <Task
                task={task}
                key={task.id}
                confirmDeleteOpen={handleDlgOpen}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
