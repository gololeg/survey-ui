
import {LoginType} from "types/loginType/loginType";
import {instance} from "services/api/instance";




export const userService = {
    login(payload: LoginType) {
        return instance.post('/api/v1/login', payload);
    },
    authMe() {
        return instance.get('/api/v1/auth/me');
    }

}