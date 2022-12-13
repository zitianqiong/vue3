import {instance} from "./api.js";

export const logoutAPI = () =>{
    return instance({
        method: 'get',
        url: '/user/logout',
    })
}
