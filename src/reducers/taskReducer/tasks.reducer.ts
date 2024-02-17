import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {Itask} from "types/Itask";
import {TasksService} from "services/tasksService";
import {loadingActions} from "reducers/loadingReducer/loading.reducer";
import {Simulate} from "react-dom/test-utils";
import error = Simulate.error;


const fetchTasks = createAsyncThunk<Itask[], undefined>(
  'tasks/fetchTasks',
  async (_, {dispatch}) => {
    dispatch(loadingActions.setLoadingStatus('loading'))
    try {
      const response = await TasksService.getAllTask();
      return response.data as Itask[];
    } catch (e) {
      throw error;
    } finally {
      dispatch(loadingActions.setLoadingStatus('successful'))
    }

  }
);

const createTask = createAsyncThunk<Itask, Itask>(
  'tasks/createTask',
  async (task: Itask, {dispatch}) => {
    dispatch(loadingActions.setLoadingStatus('loading'));
    try {
      const response = await TasksService.createTask(JSON.stringify(task));
      return response.data as Itask;
    } catch (e) {
      throw error
    } finally {
      dispatch(loadingActions.setLoadingStatus('successful'))
    }

  }
);

const getTask = createAsyncThunk<Itask, number>(
  'tasks/getTask',
  async (id: number, {dispatch}) => {
    dispatch(loadingActions.setLoadingStatus('loading'))
    try {
      const response = await TasksService.getTask(id);
      return response.data as Itask;
    } catch (e) {
      throw error;
    } finally {
      dispatch(loadingActions.setLoadingStatus('successful'))
    }

  }
)

type InitialStateType = {
  currentTasks: Itask | null,
  allTasks: Itask[]
}

const initialState: InitialStateType = {
  currentTasks: null,
  allTasks: []
}
const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.allTasks = [...action.payload];
      })
      .addCase(createTask.fulfilled, (state, action) => {

      })
      .addCase(getTask.fulfilled, (state, action) => {
        state.currentTasks = action.payload
      })


  }
})


export const tasksReducer = tasksSlice.reducer;
export const tasksActions = tasksSlice.actions;
export const tasksThunk = {fetchTasks, createTask, getTask}