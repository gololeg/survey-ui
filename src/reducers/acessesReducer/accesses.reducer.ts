import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {AccessesReducerInitialStateType} from "types/initialStateTypesForReducers/AccessesReducerInitialStateType";
import {AccessesType} from "types/accessesType/AccessesType";
import {accessesService} from "services/accessesService";
import {loadingActions} from "reducers/loadingReducer/loading.reducer";
import {errorActions} from "reducers/errorReducer/error.reducer";

const initialState: AccessesReducerInitialStateType = {
    allAccesses: [],
    access: null
}


const fetchAllAccesses = createAsyncThunk<AccessesType[], undefined>(
    'accesses/all',
    async (_, {dispatch, rejectWithValue}) => {
        dispatch(loadingActions.setLoadingStatus('loading'));
        try {
            const response = await accessesService.getAllAccesses();
            dispatch(loadingActions.setLoadingStatus('successful'));
            if (response.status === 200) {
                return response.data as AccessesType[];
            } else {
                return rejectWithValue(null);
            }

        } catch (error: any) {
            if (!error.response) {
                dispatch(errorActions.setAccessesError(error.message));
                return rejectWithValue(null);
            } else {
                if (error.response.status === 401) {
                    dispatch(errorActions.setAccessesError(error.response.data.message));
                    return rejectWithValue(null);
                }
            }
            return rejectWithValue(null);
        }
    }
)


const accessesSlice = createSlice({
    name: 'accesses',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(fetchAllAccesses.fulfilled, (state, action) => {
                state.allAccesses = [...action.payload];
            })
    }
})

export const accessesReducer = accessesSlice.reducer;
export const accessesThunk = {fetchAllAccesses};