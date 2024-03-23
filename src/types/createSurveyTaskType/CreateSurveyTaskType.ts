export type CreateSurveyTaskType = {
    id: number;
    nextTaskId: number;
    name: string;
    image: string[];
    file: string;
    level: CreateSurveyTaskTypeLevel;
    type: CreateSurveyTaskTypeType;
    answers: CreateSurveyTaskTypeAnswers[];
    ars: number[];
    strAnswers: string;
    description: string;
    imageStr: string;
}
export type CreateSurveyTaskTypeLevel = {
    id: number;
    name: string;
}
export type CreateSurveyTaskTypeType = {
    id: number;
    name: string;
}
export type CreateSurveyTaskTypeAnswers = {
    id: number;
    name: string;
    text: string;
    value: string;
    rowTextNum: number;
    right: boolean;
}
