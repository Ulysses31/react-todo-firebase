export function AddMessageAction(msg) {
  return (dispatch) => {
    dispatch({
      type: 'MESSAGE_ADD',
      payload: msg
    });
  };
}

export function AddErrorAction(msg) {
  return (dispatch) => {
    dispatch({
      type: 'ERROR_ADD',
      payload: msg
    });
  };
}

export function ErrorMessageDeleteAction() {
  return (dispatch) => {
    dispatch({
      type: 'ERROR_MESSAGE_DELETE'
    });
  };
}

export function IsLoadingTrueAction() {
  return (dispatch) => {
    dispatch({
      type: 'ISLOADING_TRUE'
    });
  };
}

export function IsLoadingFalseAction() {
  return (dispatch) => {
    dispatch({
      type: 'ISLOADING_FALSE'
    });
  };
}
