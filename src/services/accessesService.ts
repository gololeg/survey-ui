import {instance} from "services/api/instance";
import {AccessesType} from "types/accessesType/AccessesType";


export const accessesService = {
    getAllAccesses() {
        return instance.get<AccessesType[]>('/settings/accesses')
    },

    getAccess(email: string) {
        return instance.get<AccessesType>(`/settings/accesses/${email}`)
    }
}