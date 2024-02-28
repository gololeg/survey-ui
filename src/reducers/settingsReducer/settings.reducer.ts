import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

import {loadingActions} from "reducers/loadingReducer/loading.reducer";
import {SettingsService} from "services/settingsService";
import {errorActions} from "reducers/errorReducer/error.reducer";
import {SettingsReducerInitialStateType} from "types/initialStateTypesForReducers/SettingsReducerInitialStateType";
import {SettingsType} from "types/settingsType/SettingsType";

interface ErrorResponse {
    message: string;
}

const fetchSettings = createAsyncThunk<SettingsType, undefined, { rejectValue: ErrorResponse }>(
    'settings/fetchSettings',
    async (_, {dispatch, rejectWithValue}) => {
        dispatch(loadingActions.setLoadingStatus('loading'))
        try {
            const response = await SettingsService.getSettings();
            dispatch(loadingActions.setLoadingStatus('successful'))
            return response.data as SettingsType;
        } catch (error: any) {
            if (!error.response) {
                dispatch(errorActions.setAllSettingsError(error.message))
            } else {
                dispatch(errorActions.setAllSettingsError(error.response.data.message))
            }
            return rejectWithValue(error.response ? error.response.data.message : error.message)
        }


    }
)
const createSettings = createAsyncThunk<SettingsType, SettingsType, { rejectValue: ErrorResponse }>(
    'settings/createSettings',
    async (settings: SettingsType, {dispatch, rejectWithValue}) => {
        dispatch(loadingActions.setLoadingStatus('loading'));
        try {
            const response = await SettingsService.createSettings(settings);
            dispatch(loadingActions.setLoadingStatus('successful'));
            return response.data
        } catch (error: any) {
            if (!error.response) {
                dispatch(errorActions.setCreateSettingsError(error.message));
            } else {
                dispatch(errorActions.setCreateSettingsError(error.response.data.message))
            }
            return rejectWithValue(error.response ? error.response.data.message : error.message)
        }


    }
)


const initialState: SettingsReducerInitialStateType = {
    setting: null
}

const settingsSlice = createSlice({
    name: 'settings',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchSettings.fulfilled, (state, action) => {
                state.setting = action.payload;
            })
            .addCase(createSettings.fulfilled, (state, action) => {

            })
    }
})

export const settingsReducer = settingsSlice.reducer;
export const settingsThunk = {fetchSettings, createSettings};