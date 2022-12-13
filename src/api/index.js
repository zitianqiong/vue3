//传送json格式的post请求
import {instance} from "./api.js";

export const postJson = (url, params) =>{
    return instance({
        method:'post',
        url:url,
        data:params,
    })
}

//传送json格式的get请求
export const get = (url,params) =>{
    return instance({
        method: 'get',
        url:url,
        params:params,
    })
}

//传送json格式的put请求
export const putJson = (url,params) =>{
    return instance({
        method:'put',
        url:url,
        data:params
    })
}

//传送json格式的delete请求
export const deleteJson = (url,params) =>{
    return instance({
        method:'delete',
        url:url,
        params:params
    })
}

export const postFile = (url,params) =>{
    return instance({
        method: 'post',
        url: url,
        data: params,
    })
}

export const download = (url,params) =>{
    return instance({
        method: 'post',
        url: url,
        data: params,
        transformRequest: [function (data) {
            let ret = ''
            for (const it in data) {
                ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
            }
            return ret
        }],
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        responseType: 'blob'
    })
}

