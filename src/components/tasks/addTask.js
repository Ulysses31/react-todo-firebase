import React, { useEffect, useState } from 'react';
import {
  Button,
  Grid,
  makeStyles,
  TextField
} from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { useFirestore } from 'react-redux-firebase';
import {
  IsLoadingFalseAction,
  IsLoadingTrueAction,
  AddErrorAction,
  AddMessageAction
} from '../../state/actions/msgActions';
import { selectedTask } from '../../state/actions/taskActions';

const useStyles = makeStyles((theme) => ({
  root: {
    // display: "flex",
    // flexWrap: "wrap",
    // marginBottom: "30px"
    flexGrow: 1
  }
}));

export default function AddTask() {
  const classes = useStyles();
  const firestore = useFirestore();
  const dispatch = useDispatch();
  const uid = useSelector(
    (state) => state.firebase.auth.uid || ''
  );
  const selectedStoreTask = useSelector(
    (state) => state.tasks.selectedTask || {}
  );
  const [state, setState] = useState(selectedStoreTask);

  useEffect(() => {
    setState(selectedStoreTask);
  }, [selectedStoreTask]);

  const handleChange = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmitForm = (e) => {
    e.preventDefault();

    // Loading...
    dispatch(IsLoadingTrueAction());

    if (state.id === 0) {
      // ...insert method
      firestore
        .collection('tasks')
        .add({
          uid: uid,
          task: state.task,
          done: false,
          date: firestore.FieldValue.serverTimestamp()
        })
        .then(() => {
          // Loading...
          dispatch(IsLoadingFalseAction());
          dispatch(AddMessageAction('Insert Complete.'));
        })
        .catch((err) => {
          // Loading...
          dispatch(IsLoadingFalseAction());
          dispatch(AddErrorAction(err));
        });
    } else {
      // ...update method
      firestore
        .update(`tasks/${state.id}`, state)
        .then(() => {
          // Loading...
          dispatch(IsLoadingFalseAction());
          dispatch(AddMessageAction('Update Complete.'));
        })
        .catch((err) => {
          // Loading...
          dispatch(IsLoadingFalseAction());
          dispatch(AddErrorAction(err));
        });
    }

    clearSelectedTask();
  };

  const clearSelectedTask = () => {
    dispatch(
      selectedTask({
        id: 0,
        task: '',
        done: false,
        date: ''
      })
    );
  };

  return (
    <div className={classes.root}>
      <form autoComplete='off' onSubmit={handleSubmitForm}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <TextField
              id='task'
              name='task'
              value={state.task}
              onChange={handleChange}
              autoComplete='off'
              label='enter task description'
              variant='outlined'
              size='small'
              margin='none'
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Button
              type='submit'
              variant='contained'
              color='primary'
              fullWidth
            >
              {/* <ClearIcon style={{ fontSize: 18 }}/>&nbsp; */}
              {selectedStoreTask.id === 0
                ? 'Insert'
                : 'Update'}
            </Button>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Button
              type='button'
              variant='contained'
              color='primary'
              fullWidth
              onClick={clearSelectedTask}
            >
              {/* <ClearIcon style={{ fontSize: 18 }}/>&nbsp; */}
              Clear
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
}
