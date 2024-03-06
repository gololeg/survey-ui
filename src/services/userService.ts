
import {LoginType} from "types/loginType/loginType";
import {instance} from "services/api/instance";




export const userService = {
    login(payload: LoginType) {
        return instance.post('/login', payload);
    },
    authMe() {
        return instance.get('/auth/me');
    }

}