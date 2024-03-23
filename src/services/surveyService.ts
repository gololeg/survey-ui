import {instance} from "services/api/instance";
import {SurveyStartType} from "types/surveyType/SurveyStartType";
import {GetSurveyTasksType} from "types/getSurveyTasksType/GetSurveyTasksType";
import {CreateSurveyTaskType} from "types/createSurveyTaskType/CreateSurveyTaskType";
import {SurveyResultResponseType} from "types/surveyResultResponseType/SurveyResultResponseType";


export const SurveyService = {
    getSurvey(email: string) {
        return instance.get<SurveyStartType>(`/survey/start/${email}`);
    },
    getSurveyTask(taskId: number) {
        return instance.get<GetSurveyTasksType>(`/survey/task/${taskId}`);
    },
    saveAnswers(surveyId: string, payload: CreateSurveyTaskType) {
        return instance.post<string>(`/survey/${surveyId}`, payload);
    },
    getResult(surveyId: string) {
        return instance.get<SurveyResultResponseType>(`survey/${surveyId}/result`)
    }
}




