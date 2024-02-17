import axios from "axios";
import {SettingsType} from "types/settingsType";


const instance = axios.create({
  baseURL: 'http://localhost:8080'
})

export const SettingsService = {
   getSettings() {
    return instance.get<SettingsType>('/api/v1/setting')
  }
}