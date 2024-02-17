import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {SettingsType} from "types/settingsType";
import {loadingActions} from "reducers/loadingReducer/loading.reducer";
import {SettingsService} from "services/settingsService";
import {Simulate} from "react-dom/test-utils";
import error = Simulate.error;


const fetchSettings = createAsyncThunk<SettingsType, undefined>(
  'settings/fetchSettings',
  async (_, {dispatch}) => {
    dispatch(loadingActions.setLoadingStatus('loading'))
    try {
      const response = await SettingsService.getSettings();
      return response.data as SettingsType;
    } catch (e) {
      throw error;
    } finally {
      dispatch(loadingActions.setLoadingStatus('successful'))
    }
  }
)

type InitialStateType = {
  setting: SettingsType | null
}

const initialState: InitialStateType = {
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
  }
})

export const settingsReducer = settingsSlice.reducer;
export const settingsActions = settingsSlice.actions;
export const settingsThunk = {fetchSettings};