
import {instance} from "services/api/instance";
import {SurveyStartType} from "types/surveyType/SurveyStartType";



export const SurveyService = {
    getSurvey(email: string){
        return instance.get<SurveyStartType>(`/survey/start/${email}`)
    }
}



