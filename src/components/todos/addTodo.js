import React, { useEffect, useState } from 'react';
import {
  Button,
  Grid,
  makeStyles,
  TextField
} from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { useFirebase } from 'react-redux-firebase';
import {
  IsLoadingFalseAction,
  IsLoadingTrueAction,
  AddErrorAction,
  AddMessageAction
} from '../../state/actions/msgActions';
import { selectedTodo } from '../../state/actions/todoActions';

const useStyles = makeStyles((theme) => ({
  root: {
    // display: "flex",
    // flexWrap: "wrap",
    // marginBottom: "30px"
    flexGrow: 1
  }
}));

export default function AddTodo() {
  const classes = useStyles();
  const firebase = useFirebase();
  const dispatch = useDispatch();

  const selectedStoreTodo = useSelector(
    (state) =>
      state.todos.selectedTodo || {
        key: 0,
        value: {
          todo: '',
          done: false,
          date: ''
        }
      }
  );
  const [state, setState] = useState(selectedStoreTodo);

  useEffect(() => {
    setState(selectedStoreTodo);
  }, [selectedStoreTodo]);

  const handleChange = (e) => {
    setState({
      ...state,
      value: {
        todo: e.target.value,
        done: state.value.done,
        date: state.value.state
      }
    });
  };

  const handleSubmitForm = (e) => {
    e.preventDefault();

    // Loading...
    dispatch(IsLoadingTrueAction());

    if (state.key === 0) {
      // ...insert method
      firebase
        .push('todos', {
          todo: state.value.todo,
          done: false,
          date: firebase.database.ServerValue.TIMESTAMP
        })
        .then(() => {
          // Loading...
          dispatch(IsLoadingFalseAction());
          dispatch(AddMessageAction('Insert Complete.'));
        })
        .catch((err) => dispatch(AddErrorAction(err)));
    } else {
      // ...update method
      firebase
        .update(`todos/${state.key}`, {
          todo: state.value.todo
        })
        .then(() => {
          // Loading...
          dispatch(IsLoadingFalseAction());
          dispatch(AddMessageAction('Update Complete.'));
        })
        .catch((err) => dispatch(AddErrorAction(err)));
    }

    clearSelectedTodo();
  };

  const clearSelectedTodo = () => {
    dispatch(
      selectedTodo({
        key: 0,
        value: {
          todo: '',
          done: false,
          date: ''
        }
      })
    );
  };

  return (
    <div className={classes.root}>
      <form autoComplete='off' onSubmit={handleSubmitForm}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <TextField
              id='todo'
              name='todo'
              value={state.value.todo}
              onChange={handleChange}
              autoComplete='off'
              label='enter todo description'
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
              {selectedStoreTodo.key === 0
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
              onClick={clearSelectedTodo}
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
