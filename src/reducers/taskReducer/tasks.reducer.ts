import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

import {TasksService} from "services/tasksService";
import {loadingActions} from "reducers/loadingReducer/loading.reducer";
import {errorActions} from "reducers/errorReducer/error.reducer";
import {TasksReducerInitialStateType} from "types/initialStateTypesForReducers/TasksReducerInitialStateType";
import {Itask} from "types/requestAndResponseItaskType/Itask";

interface ErrorResponse {
    message: string;
}

const fetchTasks = createAsyncThunk<Itask[], undefined>(
    'tasks/fetchTasks',
    async (_, {dispatch, rejectWithValue}) => {
        dispatch(loadingActions.setLoadingStatus('loading'))
        try {
            const response = await TasksService.getAllTask();
            dispatch(loadingActions.setLoadingStatus('successful'))
            return response.data as Itask[];
        } catch (error: any) {

            if (!error.response) {
                dispatch(errorActions.setAllTasksError(error.message))
            } else {
                dispatch(errorActions.setAllTasksError(error.response.data.message))
            }
            return rejectWithValue(error.response ? error.response.message : error.message)
        }

    }
);

const createTask = createAsyncThunk<Itask, Itask, { rejectValue: ErrorResponse }>(
    'tasks/createTask',
    async (task: Itask, {dispatch, rejectWithValue}) => {
        dispatch(loadingActions.setLoadingStatus('loading'));
        try {
            const response = await TasksService.createTask(JSON.stringify(task));
            dispatch(loadingActions.setLoadingStatus('successful'));
            return response.data as Itask;
        } catch (error: any) {
            if (!error.response) {
                dispatch(errorActions.setCreateTaskError(error.message));
            } else {
                dispatch(errorActions.setCreateTaskError(error.response.data.message))
            }
            return rejectWithValue(error.response ? error.response.data.message : error.message);
        }


    }
);

const getTask = createAsyncThunk<Itask, number, { rejectValue: ErrorResponse }>(
    'tasks/getTask',
    async (id: number, {dispatch, rejectWithValue}) => {
        dispatch(loadingActions.setLoadingStatus('loading'))
        try {
            const response = await TasksService.getTask(id);
            dispatch(loadingActions.setLoadingStatus('successful'))
            return response.data as Itask;
        } catch (error: any) {
            if (!error.response) {
                dispatch(errorActions.setTaskError(error.message))
            } else {
                dispatch(errorActions.setTaskError(error.response.data.message))
            }
            return rejectWithValue(error.response ? error.response.data.message : error.message)
        }

    }
)

const initialState: TasksReducerInitialStateType = {
    currentTasks: null,
    allTasks: []
}
const tasksSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchTasks.fulfilled, (state, action) => {
                state.allTasks = [...action.payload];
            })
            .addCase(createTask.fulfilled, (state, action) => {
            })
            .addCase(getTask.fulfilled, (state, action) => {
                state.currentTasks = action.payload
            })


    }
})


export const tasksReducer = tasksSlice.reducer;
export const tasksActions = tasksSlice.actions;
export const tasksThunk = {fetchTasks, createTask, getTask}