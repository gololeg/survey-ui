import {configureStore} from "@reduxjs/toolkit";
import {tasksReducer} from "reducers/taskReducer/tasks.reducer";
import {answerReducer} from "reducers/answerReducer/answer.reducer";
import {loadingReducer} from "reducers/loadingReducer/loading.reducer";
import {settingsReducer} from "reducers/settingsReducer/settings.reducer";
import {userReducer} from "reducers/userReducer/userReducer";
import {errorReducer} from "reducers/errorReducer/error.reducer";
import {accessesReducer} from "reducers/acessesReducer/accesses.reducer";
import {surveyReducer} from "reducers/surveyReducer/survey.reducer";


export const store = configureStore({
    reducer: {
        tasks: tasksReducer,
        answer: answerReducer,
        loading: loadingReducer,
        settings: settingsReducer,
        users: userReducer,
        error: errorReducer,
        accesses: accessesReducer,
        survey: surveyReducer
    }
});

export type AppRootStateType = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;