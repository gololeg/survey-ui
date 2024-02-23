import {createSlice, PayloadAction} from "@reduxjs/toolkit";

type ErrorReducerStateType = {
    error: null | string
}

const initialState: ErrorReducerStateType = {
    error: null
}

const errorSlice = createSlice({
    name: 'error',
    initialState,
    reducers: {
        setError(state, action:PayloadAction<string>) {
            state.error = action.payload
        }
    }
})


export const errorActions = errorSlice.actions;
export const errorReducer = errorSlice.reducer;