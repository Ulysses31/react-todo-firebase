export function selectedTask(task) {
  return (dispatch) => {
    dispatch({
      type: 'TASK_SELECTED',
      payload: task
    });
  };
}
