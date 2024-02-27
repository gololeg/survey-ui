import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {LoginType} from "types/loginType";
import {userService} from "services/userService";
import {loadingActions} from "reducers/loadingReducer/loading.reducer";
import {errorActions} from "reducers/errorReducer/error.reducer";


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
            return response.data;

        } catch (error: any) {
            if (!error.response) {
                dispatch(errorActions.setLoginError(error.message));
            } else {
                dispatch(errorActions.setLoginError(error.response.data.message));
            }
            return rejectWithValue(error.response ? error.response.data.message : error.message);
        }
    }
);

export const isAuthMe = createAsyncThunk<boolean, undefined>(
    'user/isAuthMe',
    async (_, {dispatch, rejectWithValue}) => {
        dispatch(loadingActions.setLoadingStatus('loading'));
        try {
            const response = await userService.authMe();
            dispatch(loadingActions.setLoadingStatus('successful'));
            return response.data;
        } catch (error: any) {
            if (!error.response) {
                dispatch(errorActions.setAuthMeError(error.message));
            } else {
                dispatch(errorActions.setAuthMeError(error.response.data.message))
            }
            return rejectWithValue(error.response ? error.response.data.message : error.message);
        }

    }
)

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
                state.isLoggedIn = true;
            })
            .addCase(login.rejected, (state, action) => {
                state.isLoggedIn = false;
            })
            .addCase(isAuthMe.fulfilled, (state, action) => {
                state.isLoggedIn = true;
            })
            .addCase(isAuthMe.rejected, (state, action) => {
                state.isLoggedIn = false;
            })
    }
})

export const userAction = userSlice.actions;
export const userReducer = userSlice.reducer;
export const userThunk = {login, isAuthMe}
