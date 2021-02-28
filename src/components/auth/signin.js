import React, { useState } from 'react';
import {
  Button,
  Grid,
  makeStyles,
  Paper,
  TextField,
  Typography
} from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { useFirebase } from 'react-redux-firebase';
import { Redirect } from 'react-router-dom';
import {
  SignInErrorFunc,
  SignInFunc
} from '../../state/actions/authActions';
import {
  IsLoadingFalseAction,
  IsLoadingTrueAction
} from '../../state/actions/msgActions';

const useStyles = makeStyles((theme) => ({
  root: {
    // display: "flex",
    // flexWrap: "wrap",
    // marginBottom: "30px"
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing(2),
    color: theme.palette.text.secondary
  }
}));

export default function SignIn() {
  const classes = useStyles();
  const firebase = useFirebase();
  const dispatch = useDispatch();
  const [state, setState] = useState({
    email: 'iordanidischr@gmail.com',
    password: 'ci281978'
  });
  const uid = useSelector(
    (state) => state.firebase.auth.uid
  );

  // is is authenticated redirect to dashboard
  if (uid) return <Redirect to='/todos' />;

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

    firebase
      .auth()
      .signInWithEmailAndPassword(
        state.email,
        state.password
      )
      .then((userCredentials) => {
        console.log('userCredentials', userCredentials);

        // Loading...
        dispatch(IsLoadingFalseAction());
        dispatch(SignInFunc());
      })
      .catch((err) => {
        console.log('err', JSON.stringify(err));
        // Loading...
        dispatch(IsLoadingFalseAction());
        dispatch(SignInErrorFunc(err.message));
      });
  };

  return (
    <Paper className={classes.paper} elevation={3}>
      <form
        autoComplete='off'
        style={{ marginTop: '30px' }}
        onSubmit={handleSubmitForm}
      >
        <Grid container spacing={2}>
          <Grid item xs={12} lg={12}>
            <Typography
              variant='h4'
              component='h5'
              align='center'
            >
              SignIn
            </Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField
              id='email'
              name='email'
              value={state.email}
              onChange={handleChange}
              autoComplete='off'
              label='enter email'
              variant='outlined'
              size='small'
              margin='none'
              fullWidth
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField
              id='password'
              name='password'
              value={state.password}
              onChange={handleChange}
              autoComplete='off'
              label='enter password'
              variant='outlined'
              size='small'
              margin='none'
              fullWidth
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <Button
              type='submit'
              variant='contained'
              color='primary'
              fullWidth
            >
              SignIn
            </Button>
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
}
