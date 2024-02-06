import {tasksActions, tasksThunk} from "reducers/taskReducer/tasks.reducer";
import {useDispatch} from "react-redux";
import {bindActionCreators} from "@reduxjs/toolkit";
import {answerActions} from "reducers/answerReducer/answer.reducer";


const actions = {
  ...tasksActions,
  ...tasksThunk,
  ...answerActions
}

export const useAppDispatch = () => {
  const dispatch = useDispatch()
  return bindActionCreators(actions, dispatch)
}