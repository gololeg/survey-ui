import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {LoginType} from "types/loginType";
import {userService} from "services/userService";
import {Simulate} from "react-dom/test-utils";
import error = Simulate.error;
import {loadingActions} from "reducers/loadingReducer/loading.reducer";

const login = createAsyncThunk<boolean, LoginType>(
    'user/isLoggedIn',
    async (payload: LoginType, {dispatch}) => {
        dispatch(loadingActions.setLoadingStatus('loading'))
        try {
            const response = await userService.login(payload);
            return response.data
        } catch (e) {
            throw error;
        } finally {
            dispatch(loadingActions.setLoadingStatus('successful'))
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
               state.isLoggedIn = action.payload;
            })
    }
})

export const userAction = userSlice.actions;
export const userReducer = userSlice.reducer;
export const userThunk = {login}
