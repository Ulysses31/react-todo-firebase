const initialState = {
  selectedTask: {
    id: 0,
    task: '',
    done: false,
    date: ''
  }
};

export default function taskReducer(
  state = initialState,
  action
) {
  switch (action.type) {
    case 'TASK_SELECTED':
      // console.log("TASK_SELECTED", state, action);
      return {
        ...state,
        selectedTask: action.payload
      };
    default:
      return state;
  }
}
