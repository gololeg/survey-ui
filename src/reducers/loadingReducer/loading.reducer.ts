import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {StatusLoading} from "types/statusLoading";

const initialState : { status: StatusLoading } = {status: 'successful'};

const loadingSlice = createSlice({
  name: 'statusLoading',
  initialState,
  reducers: {
    setLoadingStatus(state, action: PayloadAction<StatusLoading>) {
      state.status = action.payload;
    }
  }
})

export const loadingReducer = loadingSlice.reducer;
export const loadingActions = loadingSlice.actions;