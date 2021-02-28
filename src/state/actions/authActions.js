export function SignInFunc() {
  return (dispatch) => {
    dispatch({
      type: 'SIGN_IN',
      payload: 'User singed in successfully.'
    });
  };
}

export function SignOutFunc() {
  return (dispatch) => {
    dispatch({
      type: 'SIGN_OUT',
      payload: 'User singed out successfully.'
    });
  };
}

export function SignInErrorFunc(error) {
  return (dispatch) => {
    dispatch({
      type: 'SIGN_IN_ERROR',
      payload: error
    });
  };
}

export function ClearAuthMessageFunc() {
  return (dispatch) => {
    dispatch({
      type: 'SIGN_IN_MESSAGE_DELETE'
    });
  };
}
