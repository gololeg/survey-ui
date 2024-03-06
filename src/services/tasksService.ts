
import {Itask} from "types/requestAndResponseItaskType/Itask";
import {instance} from "services/api/instance";




export const TasksService = {
    getAllTask() {
        return instance.get<Itask[]>('/tasks');
    },
    createTask(task: any) {
        return instance.post<Itask>('/tasks', task, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
    },
    getTask(id: number) {
        return instance.get<Itask>(`/tasks/${id}`)
    }
}
