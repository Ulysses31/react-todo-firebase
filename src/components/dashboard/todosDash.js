import React from 'react';
import { makeStyles, Paper } from '@material-ui/core';
import { useSelector } from 'react-redux';
import AddTodo from '../todos/addTodo';
import Todos from '../todos/todos';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing(2),
    color: theme.palette.text.secondary
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff'
  }
}));

export default function TodosDash() {
  const classes = useStyles();
  const uid = useSelector(
    (state) => state.firebase.auth.uid
  );

  return (
    <>
      <Paper className={classes.paper} elevation={3}>
        <h2>Todos</h2>
      </Paper>
      <br />
      {/* add todos is allowed only if user is authenticated */}
      {uid ? (
        <>
          <Paper className={classes.paper} elevation={3}>
            <AddTodo />
          </Paper>
          <br />
        </>
      ) : (
        ''
      )}
      <Paper className={classes.paper} elevation={3}>
        <Todos />
      </Paper>
    </>
  );
}
