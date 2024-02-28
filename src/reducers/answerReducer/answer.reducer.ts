import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {v1} from "uuid";
import {NewAnswer} from "types/newAnswerType/NewAnswer";


const initialState: NewAnswer[] = [
  {id: v1(), value: '', checked: false},
  {id: v1(), value: '', checked: false}
];

const answerSlice = createSlice({
  name: 'answer',
  initialState,
  reducers: {
    setNewAnswer(state, action: PayloadAction<NewAnswer>) {
      state.push(action.payload)
    },
    setNewAnswerValue(state, action: PayloadAction<{ id: string, value: string }>) {
      const answerToUpdate = state.find(answer => answer.id === action.payload.id);
      if (answerToUpdate) {
        answerToUpdate.value = action.payload.value;
      }
    },
    setChecked(state, action: PayloadAction<{ id: string, isChecked: boolean }>) {
       const checked = state.find(checked => checked.id === action.payload.id);
       if (checked){
         checked.checked = action.payload.isChecked;
       }
    }
  }
})

export const answerReducer = answerSlice.reducer;
export const answerActions = answerSlice.actions;