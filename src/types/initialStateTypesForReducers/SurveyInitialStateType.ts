import {SurveyStartType} from "types/surveyType/SurveyStartType";
import {SurveyResponseType} from "types/surveyType/SurveyResponseType";
import {GetSurveyTasksType} from "types/getSurveyTasksType/GetSurveyTasksType";
import {SurveyResultResponseType} from "types/surveyResultResponseType/SurveyResultResponseType";


export type SurveyInitialStateType ={
    startSurvey: null | SurveyStartType,
    survey: null | SurveyResponseType,
    surveyTask: null | GetSurveyTasksType,
    surveyString: null | string,
    result: null | SurveyResultResponseType
}