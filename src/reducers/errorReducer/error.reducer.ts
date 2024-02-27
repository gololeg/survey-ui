import {createSlice, PayloadAction} from "@reduxjs/toolkit";

type ErrorReducerStateType = {
    loginError: null | string,
    createTaskError: null | string,
    getAllTasksError: null | string,
    getTaskError: null | string
    getSettingsError: null | string,
    createSettingsError: null | string,
    authError: null | string
}

const initialState: ErrorReducerStateType = {
    loginError: null,
    createSettingsError: null,
    getAllTasksError: null,
    getTaskError: null,
    getSettingsError: null,
    createTaskError: null,
    authError: null
}

const errorSlice = createSlice({
    name: 'error',
    initialState,
    reducers: {
        setLoginError(state, action: PayloadAction<string>) {
            state.loginError = action.payload;
        },
        setCreateSettingsError(state, action: PayloadAction<string>) {
            state.createSettingsError = action.payload;
        },
        setAllTasksError(state, action: PayloadAction<string>) {
            state.getAllTasksError = action.payload;
        },
        setTaskError(state, action: PayloadAction<string>){
            state.getTaskError = action.payload;
        },
        setAllSettingsError(state, action: PayloadAction<string>){
            state.getSettingsError = action.payload;
        },
        setCreateTaskError(state, action: PayloadAction<string>){
            state.createTaskError = action.payload;
        },
        setAuthMeError(state, action: PayloadAction<string>){
            state.authError = action.payload
        }
    }
})


export const errorActions = errorSlice.actions;
export const errorReducer = errorSlice.reducer;