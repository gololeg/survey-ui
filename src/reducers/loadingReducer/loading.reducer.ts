import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {LoadingReducerInitialStateType} from "types/initialStateTypesForReducers/LoadingReducerInitialStateType";
import {StatusLoading} from "types/statusLoading/StatusLoading";

const initialState: LoadingReducerInitialStateType = {
    statusLoading: "successful"
};

const loadingSlice = createSlice({
    name: 'statusLoading',
    initialState,
    reducers: {
        setLoadingStatus(state, action: PayloadAction<StatusLoading>) {
            state.statusLoading = action.payload;
        }
    }
})

export const loadingReducer = loadingSlice.reducer;
export const loadingActions = loadingSlice.actions;