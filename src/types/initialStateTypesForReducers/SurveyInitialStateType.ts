import {SurveyStartType} from "types/surveyType/SurveyStartType";
import {SurveyResponseType} from "types/surveyType/SurveyResponseType";

export type SurveyInitialStateType ={
    startSurvey: null | SurveyStartType,
    survey: null | SurveyResponseType
}