import {Itask} from "types/requestAndResponseItaskType/Itask";


export type TasksReducerInitialStateType = {
    currentTasks: Itask | null,
    allTasks: Itask[]
}