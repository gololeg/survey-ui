import {configureStore} from "@reduxjs/toolkit";
import {tasksReducer} from "reducers/taskReducer/tasks.reducer";
import {answerReducer} from "reducers/answerReducer/answer.reducer";

export const store = configureStore({
  reducer: {
    tasks: tasksReducer,
    answer: answerReducer
  }
})

export type AppRootStateType = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;