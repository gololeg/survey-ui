export type SurveyResultResponseType = {
    results: SurveyResultResponseDataResults[];
    lowLevelPercent: number;
    middleLevelPercent: number;
    highLevelPercent: number;
    commonPercent: number;
}
export type SurveyResultResponseDataResultsTaskLevel = {
    id: number;
    name: string;
}
export type SurveyResultResponseDataResultsTaskType = {
    id: number;
    name: string;
}
export type SurveyResultResponseDataResultsTaskAnswers = {
    id: number;
    name: string;
    text: string;
    value: string;
    rowTextNum: number;
    right: boolean;
}
export type SurveyResultResponseDataResultsTask = {
    id: number;
    nextTaskId: number;
    name: string;
    image: string[];
    file: string;
    level: SurveyResultResponseDataResultsTaskLevel;
    type: SurveyResultResponseDataResultsTaskType;
    answers: SurveyResultResponseDataResultsTaskAnswers[];
    ars: number[];
    strAnswers: string;
    description: string;
    imageStr: string;
}
export type SurveyResultResponseDataResultsClientAnswers = {
    id: number;
    name: string;
    text: string;
    value: string;
    rowTextNum: number;
    right: boolean;
}
export type SurveyResultResponseDataResults = {
    task: SurveyResultResponseDataResultsTask;
    clientAnswers: SurveyResultResponseDataResultsClientAnswers[];
}
