import {tasksActions, tasksThunk} from "reducers/taskReducer/tasks.reducer";
import {useDispatch} from "react-redux";
import {bindActionCreators} from "@reduxjs/toolkit";
import {answerActions} from "reducers/answerReducer/answer.reducer";
import {loadingActions} from "reducers/loadingReducer/loading.reducer";
import {settingsActions, settingsThunk} from "reducers/settingsReducer/settings.reducer";


const actions = {
  ...tasksActions,
  ...tasksThunk,
  ...answerActions,
  ...loadingActions,
  ...settingsThunk
}

export const useAppDispatch = () => {
  const dispatch = useDispatch()
  return bindActionCreators(actions, dispatch)
}