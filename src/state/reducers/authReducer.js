const initialState = {
  message: '',
  error: ''
};

export default function authReducer(
  state = initialState,
  action
) {
  switch (action.type) {
    case 'SIGN_IN':
      // console.log("SIGN_IN", state, action);
      return {
        ...state,
        message: action.payload,
        error: ''
      };
    case 'SIGN_OUT':
      // console.log("SIGN_OUT", state, action);
      return {
        ...state,
        message: action.payload,
        error: ''
      };
    case 'SIGN_IN_ERROR':
      // console.log("SIGN_IN_ERROR", state, action);
      return {
        ...state,
        message: '',
        error: action.payload
      };
    case 'SIGN_IN_MESSAGE_DELETE':
      // console.log("SIGN_IN_MESSAGE_DELETE", state, action);
      return {
        ...state,
        message: '',
        error: ''
      };
    default:
      return state;
  }
}
