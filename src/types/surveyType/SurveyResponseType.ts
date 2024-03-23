export type SurveyResponseType = {
    results: SurveyResponseTypeResults[];
    lowLevelPercent: number;
    middleLevelPercent: number;
    highLevelPercent: number;
    commonPercent: number;
}
export type SurveyResponseTypeResultsTaskLevel = {
    id: number;
    name: string;
}
export type SurveyResponseTypeResultsTaskType = {
    id: number;
    name: string;
}
export type SurveyResponseTypeResultsTaskAnswers = {
    id: number;
    name: string;
    text: string;
    value: string;
    rowTextNum: number;
    right: boolean;
}
export type SurveyResponseTypeResultsTask = {
    id: number;
    nextTaskId: number;
    name: string;
    image: string[];
    file: string;
    level: SurveyResponseTypeResultsTaskLevel;
    type: SurveyResponseTypeResultsTaskType;
    answers: SurveyResponseTypeResultsTaskAnswers[];
    ars: number[];
    strAnswers: string;
    description: string;
    imageStr: string;
}
export type SurveyResponseTypeResultsClientAnswers = {
    id: number;
    name: string;
    text: string;
    value: string;
    rowTextNum: number;
    right: boolean;
}
export type SurveyResponseTypeResults = {
    task: SurveyResponseTypeResultsTask;
    clientAnswers: SurveyResponseTypeResultsClientAnswers[];
}