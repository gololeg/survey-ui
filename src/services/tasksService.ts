
import {Itask} from "types/requestAndResponseItaskType/Itask";
import {instance} from "services/api/instance";




export const TasksService = {
    getAllTask() {
        return instance.get<Itask[]>('/api/v1/tasks');
    },
    createTask(task: any) {
        return instance.post<Itask>('/api/v1/tasks', task, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
    },
    getTask(id: number) {
        return instance.get<Itask>(`/api/v1/tasks/${id}`)
    }
}
