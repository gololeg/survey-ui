import axios from "axios";
import {SettingsType} from "types/settingsType";


const instance = axios.create({
    baseURL: 'http://localhost:8080',
    withCredentials: true
})

export const SettingsService = {
    getSettings() {
        return instance.get<SettingsType>('/api/v1/settings')
    },
    createSettings(settings: SettingsType) {
        return instance.post<SettingsType>('/api/v1/settings', settings)
    }
}