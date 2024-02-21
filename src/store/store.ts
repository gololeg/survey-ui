import {configureStore} from "@reduxjs/toolkit";
import {tasksReducer} from "reducers/taskReducer/tasks.reducer";
import {answerReducer} from "reducers/answerReducer/answer.reducer";
import {loadingReducer} from "reducers/loadingReducer/loading.reducer";
import {settingsReducer} from "reducers/settingsReducer/settings.reducer";
import {userReducer} from "reducers/userReducer/userReducer";

export const store = configureStore({
  reducer: {
    tasks: tasksReducer,
    answer: answerReducer,
    loading: loadingReducer,
    settings: settingsReducer,
    users: userReducer
  }
})

export type AppRootStateType = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;