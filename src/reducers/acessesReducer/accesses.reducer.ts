import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {AccessesReducerInitialStateType} from "types/initialStateTypesForReducers/AccessesReducerInitialStateType";
import {AccessesType} from "types/accessesType/AccessesType";
import {accessesService} from "services/accessesService";
import {loadingActions} from "reducers/loadingReducer/loading.reducer";
import {errorActions} from "reducers/errorReducer/error.reducer";
import {ResponseStatusEnum} from "enums/responseStatusEnum";


const fetchAllAccesses = createAsyncThunk<AccessesType[], undefined>(
    'accesses/all',
    async (_, {dispatch, rejectWithValue}) => {
        dispatch(loadingActions.setLoadingStatus('loading'));
        try {
            const response = await accessesService.getAllAccesses();
            dispatch(loadingActions.setLoadingStatus('successful'));
            if (response.status === ResponseStatusEnum.successful) {
                return response.data as AccessesType[];
            } else {
                return rejectWithValue(null);
            }

        } catch (error: any) {
            if (!error.response) {
                dispatch(errorActions.setAccessesError(error.message));
                return rejectWithValue(null);
            } else {
                dispatch(errorActions.setAccessesError(error.response.data.message));
                return rejectWithValue(null);
            }

        }
    }
)

const getAccess = createAsyncThunk<AccessesType, string>(
    'accesses/access',
    async (email: string, {dispatch, rejectWithValue}) => {
        dispatch(loadingActions.setLoadingStatus('loading'))
        try {
            const response = await accessesService.getAccess(email)
            dispatch(loadingActions.setLoadingStatus('successful'));
            if (response.status === ResponseStatusEnum.successful) {
                return response.data as AccessesType;
            } else {
                return rejectWithValue(null)
            }


        } catch (error: any) {
            if (!error.response) {
                dispatch(errorActions.setAccessesError(error.message));
                return rejectWithValue(null);
            } else {
                dispatch(errorActions.setAccessesError(error.response.data.message));
                return rejectWithValue(null);
            }

        }
    }
)
const createAccesses = createAsyncThunk<AccessesType, AccessesType>(
    'accesses/createAccesses',
    async (accesses: AccessesType, {dispatch, rejectWithValue}) => {
        dispatch(loadingActions.setLoadingStatus('loading'));
        try {
            const response = await accessesService.createAccesses(accesses);
            dispatch(loadingActions.setLoadingStatus('successful'));
            if (response.status === ResponseStatusEnum.successful) {
                return response.data
            } else {
                return rejectWithValue(null);
            }
        } catch (error: any) {
            if (!error.response) {
                dispatch(errorActions.setAccessesError(error.message))
                return rejectWithValue(null)
            } else {
                dispatch(errorActions.setAccessesError(error.response.data.message));
                return rejectWithValue(null);
            }

        }
    }
)


const initialState: AccessesReducerInitialStateType = {
    allAccesses: [],
    access: null,
    createAccess: null
}

const accessesSlice = createSlice({
    name: 'accesses',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(fetchAllAccesses.fulfilled, (state, action) => {
                state.allAccesses = [...action.payload];
            })
            .addCase(getAccess.fulfilled, (state, action) => {
                state.access = action.payload;
            })
            .addCase(createAccesses.fulfilled, (state, action) => {
                state.createAccess = action.payload;
            })
    }
})

export const accessesReducer = accessesSlice.reducer;
export const accessesThunk = {fetchAllAccesses, getAccess, createAccesses};