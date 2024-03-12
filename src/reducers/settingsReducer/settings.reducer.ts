import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

import {loadingActions} from "reducers/loadingReducer/loading.reducer";
import {SettingsService} from "services/settingsService";
import {errorActions} from "reducers/errorReducer/error.reducer";
import {SettingsReducerInitialStateType} from "types/initialStateTypesForReducers/SettingsReducerInitialStateType";
import {SettingsType} from "types/settingsType/SettingsType";
import {ResponseStatusEnum} from "enums/responseStatusEnum";



const fetchSettings = createAsyncThunk<SettingsType, undefined>(
    'settings/fetchSettings',
    async (_, {dispatch, rejectWithValue}) => {
        dispatch(loadingActions.setLoadingStatus('loading'))
        try {
            const response = await SettingsService.getSettings();
            dispatch(loadingActions.setLoadingStatus('successful'));
            if (response.status === ResponseStatusEnum.successful){
                return response.data as SettingsType;
            }else {
                return rejectWithValue(null)
            }

        } catch (error: any) {
            if (!error.response) {
                dispatch(errorActions.setAllSettingsError(error.message))
                return rejectWithValue(null);
            } else {
                dispatch(errorActions.setAllSettingsError(error.response.data.message))
                return rejectWithValue(null);
            }

        }


    }
)
const createSettings = createAsyncThunk<SettingsType, SettingsType>(
    'settings/createSettings',
    async (settings: SettingsType, {dispatch, rejectWithValue}) => {
        dispatch(loadingActions.setLoadingStatus('loading'));
        try {
            const response = await SettingsService.createSettings(settings);
            dispatch(loadingActions.setLoadingStatus('successful'));
            if (response.status === ResponseStatusEnum.successful){
                return response.data
            }else {
                return rejectWithValue(null)
            }

        } catch (error: any) {
            if (!error.response) {
                dispatch(errorActions.setCreateSettingsError(error.message));
                return rejectWithValue(null);
            } else {
                dispatch(errorActions.setCreateSettingsError(error.response.data.message));
                return rejectWithValue(null)
            }

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