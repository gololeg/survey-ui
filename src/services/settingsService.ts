
import {SettingsType} from "types/settingsType/SettingsType";
import {instance} from "services/api/instance";


export const SettingsService = {
    getSettings() {
        return instance.get<SettingsType>('/api/v1/settings')
    },
    createSettings(settings: SettingsType) {
        return instance.post<SettingsType>('/api/v1/settings', settings)
    }
}