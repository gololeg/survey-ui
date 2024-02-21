import axios from "axios";
import {LoginType} from "types/loginType";

const instance = axios.create({
    baseURL: 'http://localhost:8080',
    withCredentials: true
})

export const userService = {
    login(payload: LoginType){
      return instance.post('/api/v1/login', payload)
    }
}