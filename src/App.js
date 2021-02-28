import React, { useEffect, useState } from 'react';
import {
  Backdrop,
  CircularProgress,
  Container,
  CssBaseline,
  Grid,
  IconButton,
  makeStyles,
  Snackbar,
  Typography
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { Router, Route, Switch } from 'react-router-dom';
import { onAuthStateChange } from '.';
import history from '../src/history';
import SignIn from './components/auth/signin';
import SignUp from './components/auth/signup';
import TasksDash from './components/dashboard/tasksDash';
import TodosDash from './components/dashboard/todosDash';
import NavBar from './components/layout/navbar';
import { ClearAuthMessageFunc } from './state/actions/authActions';
import { ErrorMessageDeleteAction } from './state/actions/msgActions';

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff'
  }
}));

// Snackbar Message Dialog
const SnackBarDlg = (props) => {
  const dispatch = useDispatch();
  const { open, handleSnackDlgClose, message } = props;

  const handleClose = (state) => {
    dispatch(ClearAuthMessageFunc());
    dispatch(ErrorMessageDeleteAction());
    handleSnackDlgClose(state);
  };

  return (
    <Snackbar
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center'
      }}
      open={open}
      autoHideDuration={3000}
      onClose={() => handleClose(false)}
      message={message}
      action={
        <React.Fragment>
          <IconButton
            size='small'
            aria-label='close'
            color='inherit'
            onClick={() => handleClose(false)}
          >
            <CloseIcon fontSize='small' />
          </IconButton>
        </React.Fragment>
      }
    />
  );
};

// BackDrop Loading...
const BackDropDlg = (props) => {
  const classes = useStyles();
  const { open } = props;

  return (
    <Backdrop className={classes.backdrop} open={open}>
      <CircularProgress color='inherit' />
    </Backdrop>
  );
};

function App() {
  const [openSnck, setOpenSnck] = useState(false);
  const [snckMessage, setSnckMessage] = useState('');
  const [openBackDrop, setOpenBackDrop] = useState(true);
  const bckDropState = useSelector(
    (state) =>
      state.firebase.requesting.todos ||
      state.firestore.status.requesting.tasks ||
      state.messages.isLoading
  );
  const messagesMsg = useSelector(
    (state) =>
      state.authentication.message ||
      state.authentication.error ||
      state.messages.message ||
      state.messages.error
  );

  useEffect(() => {
    onAuthStateChange();

    // BackDrop
    setOpenBackDrop(bckDropState);

    // snackBar
    setSnckMessage(messagesMsg);
    setOpenSnck(messagesMsg.length > 0);
  });

  const handleSnackState = (state) => {
    setOpenSnck(state);
  };

  return (
    <>
      <Router history={history}>
        <CssBaseline>
          <Container fixed>
            <BackDropDlg open={openBackDrop} />
            <SnackBarDlg
              open={openSnck}
              handleSnackDlgClose={handleSnackState}
              message={snckMessage}
            />
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <NavBar history={history} />
              </Grid>
              <Grid item xs={12}>
                <Switch>
                  <Route
                    path='/signin'
                    component={SignIn}
                  />
                  <Route
                    path='/signup'
                    component={SignUp}
                  />
                  <Route
                    path='/todos'
                    exact
                    component={TodosDash}
                  />
                  <Route
                    path='/'
                    exact
                    component={TasksDash}
                  />
                </Switch>
              </Grid>
              <Grid item xs={12}>
                <Typography
                  variant='p'
                  component='h6'
                  style={{
                    fontSize: '1em',
                    opacity: 0.5
                  }}
                >
                  Todo - Tasks &copy; Iordanidis Chris
                </Typography>
              </Grid>
            </Grid>
          </Container>
        </CssBaseline>
      </Router>
    </>
  );
}

export default App;

SnackBarDlg.propTypes = {
  open: PropTypes.bool.isRequired,
  message: PropTypes.string.isRequired,
  handleSnackDlgClose: PropTypes.func.isRequired
};

BackDropDlg.propTypes = {
  open: PropTypes.bool.isRequired
};
