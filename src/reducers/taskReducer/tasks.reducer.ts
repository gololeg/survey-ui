import {AsyncThunkAction, createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Itask} from "types/Itask";
import {API} from "API/api";


const fetchTasks = createAsyncThunk<Itask[], undefined>(
  'tasks/fetchTasks',
  async () => {
    const response = await API.getAllTask();
    return response.data as Itask[];
  }
);

const createTask = createAsyncThunk<Itask, Itask>(
  'tasks/createTask',
  async (task: Itask) => {
    const response = await API.createTask(JSON.stringify(task));
    return response.data as Itask
  }
);

const getTask = createAsyncThunk<Itask, number>(
  'tasks/getTask',
  async (id: number) => {
    const response = await API.getTask(id)
    return response.data as Itask
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