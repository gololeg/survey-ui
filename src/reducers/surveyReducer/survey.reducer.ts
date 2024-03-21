import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {SurveyStartType} from "types/surveyType/SurveyStartType";
import {loadingActions} from "reducers/loadingReducer/loading.reducer";
import {SurveyService} from "services/surveyService";
import {ResponseStatusEnum} from "enums/responseStatusEnum";
import {errorActions} from "reducers/errorReducer/error.reducer";
import {SurveyInitialStateType} from "types/initialStateTypesForReducers/SurveyInitialStateType";
import {GetSurveyTasksType} from "types/getSurveyTasksType/GetSurveyTasksType";
import {CreateSurveyTaskType} from "types/createSurveyTaskType/CreateSurveyTaskType";
import {SurveyResultResponseType} from "types/surveyResultResponseType/SurveyResultResponseType";

const getStartSurvey = createAsyncThunk<SurveyStartType, string>(
    'survey/startSurvey',
    async (email: string, {dispatch, rejectWithValue}) => {
        dispatch(loadingActions.setLoadingStatus('loading'));
        try {
            const response = await SurveyService.getSurvey(email);
            if (response.status === ResponseStatusEnum.successful) {
                localStorage.setItem('tasksIds', JSON.stringify(response.data.taskIds))
                localStorage.setItem('surveyId', JSON.stringify(response.data.surveyId));
                localStorage.setItem('secondsCount', JSON.stringify(response.data.secondsCount))
                return response.data as SurveyStartType
            } else {
                return rejectWithValue(null);
            }
        } catch (error: any) {
            if (!error.response) {
                dispatch(errorActions.setSurveyError(error.message));
                debugger
                return rejectWithValue(null);
            } else {
                dispatch(errorActions.setSurveyError(error.response.data.message))
                debugger
                return rejectWithValue(null);
            }
        } finally {
            dispatch(loadingActions.setLoadingStatus('successful'))
        }
    }
)

const getSurveyTask = createAsyncThunk<GetSurveyTasksType, number>(
    'survey/getSurveyTask',
    async (taskId: number, {dispatch, rejectWithValue}) => {
        dispatch(loadingActions.setLoadingStatus('loading'));
        try {
            const response = await SurveyService.getSurveyTask(taskId);
            if (response.status === ResponseStatusEnum.successful) {
                return response.data as GetSurveyTasksType;
            } else {
                return rejectWithValue(null);
            }
        } catch (error: any) {
            if (!error.response) {
                dispatch(errorActions.setSurveyError(error.message));
                return rejectWithValue(null);
            } else {
                dispatch(errorActions.setSurveyError(error.response.data.message))
                return rejectWithValue(null);
            }
        } finally {
            dispatch(loadingActions.setLoadingStatus('successful'));
        }
    }
)

const createSurvey = createAsyncThunk<string, { surveyId: string, values: CreateSurveyTaskType }>(
    'survey/createSurvey',
    async ({surveyId, values}, {dispatch, rejectWithValue}) => {
        dispatch(loadingActions.setLoadingStatus('loading'));
        try {
            const response = await SurveyService.saveAnswers(surveyId, values);
            debugger
            if (response.status === ResponseStatusEnum.successful) {

                const arrayTasksId = localStorage.getItem('tasksIds');
                const tasksId = JSON.parse(arrayTasksId as string);
                localStorage.setItem('tasksIds', JSON.stringify(tasksId.slice(1)))

                return response.data as string;
            } else {
                return rejectWithValue(null);
            }

        } catch (error: any) {
            debugger
            if (!error.response) {
                dispatch(errorActions.setSurveyError(error.message));
                return rejectWithValue(null);
            } else {
                dispatch(errorActions.setSurveyError(error.response.data.message))
                return rejectWithValue(null);
            }
        } finally {
            dispatch(loadingActions.setLoadingStatus('successful'));
        }
    }
)

const surveyResult = createAsyncThunk<SurveyResultResponseType, string>(
    'survey/result',
    async (surveyId: string, {dispatch, rejectWithValue}) => {
        dispatch(loadingActions.setLoadingStatus('loading'));
        try {
            const response = await SurveyService.getResult(surveyId);
            if (response.status === 200) {
                return response.data as SurveyResultResponseType;
            } else {
                return rejectWithValue(null);
            }
        } catch (error: any) {
            if (!error.response) {
                dispatch(errorActions.setSurveyError(error.message));
                return rejectWithValue(null);
            } else {
                dispatch(errorActions.setSurveyError(error.response.data.message))
                return rejectWithValue(null);
            }
        } finally {
            dispatch(loadingActions.setLoadingStatus('successful'))
        }
    }
)

const initialState: SurveyInitialStateType = {
    startSurvey: null,
    survey: null,
    surveyTask: null,
    surveyString: null,
    result: null
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
            .addCase(getSurveyTask.fulfilled, (state, action) => {
                state.surveyTask = action.payload;
            })
            .addCase(createSurvey.fulfilled, (state, action) => {
                state.surveyString = action.payload;
            })
            .addCase(surveyResult.fulfilled, (state, action) => {
                state.result = action.payload;
            })

    }
})

export const surveyThunk = {getStartSurvey, getSurveyTask, createSurvey, surveyResult,};
export const surveyReducer = surveySlice.reducer;


