import {instance} from "services/api/instance";
import {SurveyStartType} from "types/surveyType/SurveyStartType";
import {GetSurveyTasksType} from "types/getSurveyTasksType/GetSurveyTasksType";
import {CreateSurveyTaskType} from "types/createSurveyTaskType/CreateSurveyTaskType";


export const SurveyService = {
    getSurvey(email: string) {
        return instance.get<SurveyStartType>(`/survey/start/${email}`);
    },
    getSurveyTask(taskId: number) {
        return instance.get<GetSurveyTasksType>(`/survey/task/${taskId}`);
    },
    saveAnswers(surveyId: string, payload: CreateSurveyTaskType) {
        return instance.post<string>(`/survey/${surveyId}`, payload);
    }
}





