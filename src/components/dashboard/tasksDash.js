import React from 'react';
import { makeStyles, Paper } from '@material-ui/core';
import { useSelector } from 'react-redux';
import AddTask from '../tasks/addTask';
import Tasks from '../tasks/tasks';

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

export default function TasksDash() {
  const classes = useStyles();
  const uid = useSelector(
    (state) => state.firebase.auth.uid
  );

  return (
    <>
      <Paper className={classes.paper} elevation={3}>
        <h2>Tasks</h2>
      </Paper>
      <br />
      {/* add task is allowed only if user is authenticated */}
      {uid ? (
        <>
          <Paper className={classes.paper} elevation={3}>
            <AddTask />
          </Paper>
          <br />
        </>
      ) : (
        ''
      )}
      <Paper className={classes.paper} elevation={3}>
        <Tasks />
      </Paper>
    </>
  );
}
