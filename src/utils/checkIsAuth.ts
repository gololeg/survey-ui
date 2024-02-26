import {SettingsService} from "services/settingsService";



export const checkIsAuth = () => {
    const promise = new Promise((resolve, reject) => {
        const response = SettingsService.getSettings();
        response.then(res => {
            if (res.status === 200) {
                resolve(true);
            } else if (res.status === 401) {
                reject(false);
            }
        }).catch(error => {
            reject(false);
        });
    });
    return promise;
};
