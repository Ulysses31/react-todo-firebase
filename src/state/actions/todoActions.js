export function selectedTodo(todo) {
  return (dispatch) => {
    dispatch({
      type: 'TODO_SELECTED',
      payload: todo
    });
  };
}
