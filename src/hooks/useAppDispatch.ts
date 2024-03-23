import {tasksActions, tasksThunk} from "reducers/taskReducer/tasks.reducer";
import {useDispatch} from "react-redux";
import {bindActionCreators} from "@reduxjs/toolkit";
import {answerActions} from "reducers/answerReducer/answer.reducer";
import {loadingActions} from "reducers/loadingReducer/loading.reducer";
import {settingsThunk} from "reducers/settingsReducer/settings.reducer";
import {userThunk} from "reducers/userReducer/userReducer";
import {AppDispatch} from "store/store";
import {accessesThunk} from "reducers/acessesReducer/accesses.reducer";
import {surveyThunk} from "reducers/surveyReducer/survey.reducer";




const actions = {
  ...tasksActions,
  ...tasksThunk,
  ...answerActions,
  ...loadingActions,
  ...settingsThunk,
  ...userThunk,
  ...accessesThunk,
  ...surveyThunk
}

export const useAppDispatch = () => {
  const dispatch = useDispatch<AppDispatch>()
  return bindActionCreators(actions as any, dispatch as AppDispatch)
}