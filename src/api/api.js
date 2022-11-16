import axios from 'axios'
import { ElMessage } from 'element-plus'
import router from "../router/index.js";

// 配置axios的属性
export const instance = axios.create({
    baseURL: '/api', // 你的接口地址
    timeout: 6000,  // 超时，401
    responseType: "json",
    withCredentials: true,//是否允许带cookie这些
})

instance.interceptors.request.use(config=>{
    //如果存在token，请求将携带这个token
    if(window.sessionStorage.getItem('tokenStr')){
        config.headers['Authorization'] = window.sessionStorage.getItem('tokenStr');
    }
    return config;
},error=>{
    console.log(error);
})

//响应拦截器
instance.interceptors.response.use(success=>{
//    业务逻辑错误
    if (success.status && success.status === 200){
        if (success.data.code === 500||success.data.code === 401||success.data.code === 403){
            ElMessage.error({message:success.data.msg})
            return;
        }
        // if (success.data.msg){
        //     ElMessage.success({message:success.data.msg});
        // }
    }
    return success.data;
},error => {
    console.log(error)
    if (error.response.code === 404||error.response.code === 504){
        ElMessage.error({message:'服务器飞走了~'})
    }else if (error.response.code === 403){
        ElMessage.error({message:'宁配吗'})
    }else if (error.response.code === 401){
        ElMessage.error({message:'妹有登录啊'});
        router.replace('/login');
    }else {
        if (error.response.data.message){
            ElMessage.error({message:error.response.data.message})
        }else {
            ElMessage.error({message:'未知错误'})
        }
    }
})
