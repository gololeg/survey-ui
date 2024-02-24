import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {LoginType} from "types/loginType";
import {userService} from "services/userService";
import {Simulate} from "react-dom/test-utils";
import error = Simulate.error;
import {loadingActions} from "reducers/loadingReducer/loading.reducer";
import {Axios, AxiosError} from "axios";
import {errorActions} from "reducers/errorReducer/error.reducer";
import {useNavigate} from "react-router-dom";

interface ErrorResponse {
    message: string;
}

export const login = createAsyncThunk<boolean, LoginType, { rejectValue: ErrorResponse }>(
    'user/isLoggedIn',
    async (payload: LoginType, {dispatch, rejectWithValue}) => {
        dispatch(loadingActions.setLoadingStatus('loading'));
        try {
            const response = await userService.login(payload);
            dispatch(loadingActions.setLoadingStatus('successful'));
            console.log(response)
            return response.data;

        } catch (error: any) {
            if (!error.response) {
                dispatch(errorActions.setError(error.message));
            } else {
                dispatch(errorActions.setError(error.response.data.message));
            }
            return rejectWithValue(error.response ? error.response.data.message : error.message);
        }
    }
);

type InitialStateType = {
    isLoggedIn: boolean
}

const initialState: InitialStateType = {
    isLoggedIn: false
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(login.fulfilled, (state, action) => {
                state.isLoggedIn = action.payload;
            })
            .addCase(login.rejected, (state, action) => {
                console.log(action.payload)
            })
    }
})

export const userAction = userSlice.actions;
export const userReducer = userSlice.reducer;
export const userThunk = {login}
