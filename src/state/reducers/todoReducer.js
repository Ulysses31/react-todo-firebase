const initialState = {
  selectedTodo: {
    key: 0,
    value: {
      uid: '',
      todo: '',
      done: false,
      date: ''
    }
  }
};

export default function todoReducer(
  state = initialState,
  action
) {
  switch (action.type) {
    case 'TODO_SELECTED':
      // console.log("TODO_SELECTED", state, action);
      return {
        ...state,
        selectedTodo: action.payload
      };
    default:
      return state;
  }
}
