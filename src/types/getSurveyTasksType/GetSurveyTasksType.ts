export type GetSurveyTasksType = {
    id: number;
    nextTaskId: number;
    name: string;
    image: string[];
    file: string;
    level: GetSurveyTasksTypeLevel;
    type: GetSurveyTasksTypeType;
    answers: GetSurveyTasksTypeAnswers[];
    ars: number[];
    strAnswers: string;
    description: string;
    imageStr: string;
}
export type GetSurveyTasksTypeLevel = {
    id: number;
    name: string;
}
export type GetSurveyTasksTypeType = {
    id: number;
    name: string;
}
export type GetSurveyTasksTypeAnswers = {
    id: number;
    name: string;
    text: string;
    value: string;
    rowTextNum: number;
    right: boolean;
}