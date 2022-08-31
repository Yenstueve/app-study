
//导入axios 为了之后发送给请求
import axios from 'axios'

export function request(config){
     //1、创建axios实例
      const instance =axios.create({
          baseURL:'http://152.136.185.210:7878/api/hy66'
      })
//2、axios拦截器
//2.1请求拦截器
   instance.interceptors.request.use(config =>{
    return config
},err =>{
})

//2.2、响应拦截器
instance.interceptors.response.use(res =>{
    return res.data
},err =>{
  console.log(err)
})

//3、发送正真的网络请求
return instance(config)
}