import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import MenuIcon from '@material-ui/icons/Menu';
import { useDispatch, useSelector } from 'react-redux';
import { useFirebase } from 'react-redux-firebase';
import history from '../../history';
import { SignOutFunc } from '../../state/actions/authActions';
import { AddErrorAction } from '../../state/actions/msgActions';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  }
}));

export default function NavBar() {
  const classes = useStyles();
  const firebase = useFirebase();
  const dispatch = useDispatch();
  const uid = useSelector(
    (state) => state.firebase.auth.uid
  );
  // const email = useSelector(
  //   (state) => state.firebase.auth.email
  // );

  const handleSignOut = () => {
    if (uid) {
      firebase
        .auth()
        .signOut()
        .then(() => {
          dispatch(SignOutFunc());
        })
        .catch((err) => {
          dispatch(AddErrorAction(err));
        });
    }
  };

  // if not authenticated redirect to login page
  // if (!uid) return <Redirect to="/signin" />;

  return (
    <>
      <AppBar position='static'>
        <Toolbar>
          <IconButton
            edge='start'
            className={classes.menuButton}
            color='inherit'
            aria-label='menu'
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant='h6'
            className={classes.title}
          >
            Todos & Tasks
          </Typography>
          <Button
            color='inherit'
            onClick={() => history.push('/')}
          >
            Tasks
          </Button>
          <Button
            color='inherit'
            onClick={() => history.push('/todos')}
          >
            Todos
          </Button>
          {!uid ? (
            <Button
              color='inherit'
              onClick={() => history.push('/signin')}
            >
              SignIn
            </Button>
          ) : (
            <Button color='inherit' onClick={handleSignOut}>
              SignOut
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </>
  );
}
