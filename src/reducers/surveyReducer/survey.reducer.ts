import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {SurveyStartType} from "types/surveyType/SurveyStartType";
import {loadingActions} from "reducers/loadingReducer/loading.reducer";
import {SurveyService} from "services/surveyService";
import {ResponseStatusEnum} from "enums/responseStatusEnum";
import {errorActions} from "reducers/errorReducer/error.reducer";
import {SurveyInitialStateType} from "types/initialStateTypesForReducers/SurveyInitialStateType";


const getStartSurvey = createAsyncThunk<SurveyStartType, string>(
    'survey/startSurvey',
    async (email: string, {dispatch, rejectWithValue}) => {
        dispatch(loadingActions.setLoadingStatus('loading'));
        try {
            const response = await SurveyService.getSurvey(email);
            dispatch(loadingActions.setLoadingStatus('successful'))
            if (response.status === ResponseStatusEnum.successful) {
                return response.data as SurveyStartType
            } else {
                return rejectWithValue(null);
            }
        } catch (error: any) {
            if (!error.response) {
                dispatch(errorActions.setSurveyError(error.message))
                return rejectWithValue(null);
            } else {
                dispatch(errorActions.setSurveyError(error.response.data.message))
                return rejectWithValue(null);
            }
        }
    }
)


const initialState: SurveyInitialStateType = {
    startSurvey: null,
    survey: null
}

const surveySlice = createSlice({
    name: 'survey',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(getStartSurvey.fulfilled, (state, action) => {
                state.startSurvey = action.payload
            })
    }
})

export const surveyThunk = {getStartSurvey};
export const surveyReducer = surveySlice.reducer;
