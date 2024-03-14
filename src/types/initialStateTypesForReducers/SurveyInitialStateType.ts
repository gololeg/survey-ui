import {SurveyStartType} from "types/surveyType/SurveyStartType";
import {SurveyResponseType} from "types/surveyType/SurveyResponseType";
import {GetSurveyTasksType} from "types/getSurveyTasksType/GetSurveyTasksType";


export type SurveyInitialStateType ={
    startSurvey: null | SurveyStartType,
    survey: null | SurveyResponseType,
    surveyTask: null | GetSurveyTasksType
}