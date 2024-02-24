import axios from "axios";
import {Itask} from "types/Itask";


const instance = axios.create({
    baseURL: 'http://localhost:8080',
    withCredentials: true
})

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
