import {AccessesType} from "types/accessesType/AccessesType";

export type AccessesReducerInitialStateType = {
    allAccesses: AccessesType[],
    access: AccessesType | null
}