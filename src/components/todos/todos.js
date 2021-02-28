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
  useFirebase,
  useFirebaseConnect
} from 'react-redux-firebase';
import {
  AddErrorAction,
  AddMessageAction,
  IsLoadingFalseAction,
  IsLoadingTrueAction
} from '../../state/actions/msgActions';
import ConfirmDlg from '../layout/confirmDialog';
import Todo from './todo';

const useStyles = makeStyles({
  table: {
    minWidth: '100%'
  },
  cell: {
    whiteSpace: 'normal',
    wordWrap: 'normal'
  }
});

export default function Todos() {
  const classes = useStyles();
  const firebase = useFirebase();
  const dispatch = useDispatch();
  useFirebaseConnect(['todos']);
  const todos = useSelector(
    (state) => state.firebase.ordered.todos || []
  );
  const [isOpen, setIsOpen] = useState(false);
  const [todoKey, setTodoKey] = useState('');

  const handleDlgOpen = (key) => {
    // set current selected key to delete and open confirm
    setTodoKey(key);
    setIsOpen(true);
  };

  const handleDlgClose = (answer) => {
    // if confirm answer is yes then delete it
    if (answer) {
      // Loading...
      dispatch(IsLoadingTrueAction());

      firebase
        .remove(`todos/${todoKey}`)
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
    setTodoKey('');
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
              <TableCell
                className={classes.cell}
              ></TableCell>
              <TableCell className={classes.cell}>
                Todo
              </TableCell>
              <TableCell className={classes.cell}>
                Added On
              </TableCell>
              <TableCell
                className={classes.cell}
                align='center'
              >
                Status
              </TableCell>
              <TableCell
                className={classes.cell}
                align='center'
              >
                Options
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {todos.map((todo) => (
              <Todo
                todo={todo}
                key={todo.key}
                confirmDeleteOpen={handleDlgOpen}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
