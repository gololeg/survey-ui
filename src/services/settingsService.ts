
import {SettingsType} from "types/settingsType/SettingsType";
import {instance} from "services/api/instance";


export const SettingsService = {
    getSettings() {
        return instance.get<SettingsType>('/settings')
    },
    createSettings(settings: SettingsType) {
        return instance.post<SettingsType>('/settings', settings)
    }
}