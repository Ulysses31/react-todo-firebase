const initialState = {
  message: '',
  error: '',
  isLoading: false
};

export default function messageReducer(
  state = initialState,
  action
) {
  switch (action.type) {
    case 'MESSAGE_ADD':
      return {
        ...state,
        message: action.payload
      };
    case 'ERROR_MESSAGE_DELETE':
      return {
        ...state,
        message: '',
        error: ''
      };
    case 'ERROR_ADD':
      return {
        ...state,
        error: action.payload
      };
    case 'ISLOADING_TRUE':
      return {
        ...state,
        isLoading: true
      };
    case 'ISLOADING_FALSE':
      return {
        ...state,
        isLoading: false
      };
    default:
      return state;
  }
}
