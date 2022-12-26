import axios from 'axios'     //引入
import { Message } from 'element-ui'

let baseURL = 'http://dev-api.theone.art'

//这一步的目的是判断出当前是开发环境还是生成环境，方法不止一种，达到目的就行
// if(process.env.NODE_ENV=="development"){
//   baseURL=''
// }else{
//   baseURL=''
// }

let config = {
  baseURL: process.env.VUE_APP_API_BASE_URL,
  timeout: 1000 * 10,// 超时时间ms    
  headers: { 'Content-Type': 'application/json;charset=UTF-8' },
}
const _axios = axios.create(config)

/* 请求拦截器（请求之前的操作） */
_axios.interceptors.request.use(
  config => {
    //如果有需要在这里开启请求时的loading动画效果
    // config.headers.Authorization = getToken;  //添加token,需要结合自己的实际情况添加，
    let token = localStorage.getItem("authorization");
    if (token && token != "undefined") {
      config.headers["authorization"] = token;
    }
    return config;
  },
  err => Promise.reject(err)
);

/* 请求之后的操作 */
_axios.interceptors.response.use(
  res => {
    //在这里关闭请求时的loading动画效果
    //这里用于处理返回的结果，比如如果是返回401无权限，可能会是跳回到登录页的操作，结合自己的业务逻辑写
    if (res.data.code === 401) {

      const redirect = `${window.location.href}`;
      window.location.href = `/login?redirect=${encodeURIComponent(
        redirect
      )}`;
      localStorage.removeItem("userInfo");
      localStorage.removeItem("authorization");
      localStorage.removeItem('THEONE_USER')
    }
    return res;

  },
  err => {
    return Promise.reject(err);
  }
);


const createRequestFuc = (type) => {
  return function (url, params, success) {//请求地址和请求参数
    //返回请求的Promise的对象
    return new Promise((resolve, reject) => {
      _axios[type](url, type == 'get' ? { params } : params)
        .then(res => {
          if (success && typeof success == 'function') {
            success(res.data)
          }
          resolve(res);
        })
        .catch((err) => {
          resolve({
            data: {
              data: false,
              code: 503,
              errorCode: 10001,
              message: '服务异常'
            }

          });
        });

    });
  }
};
//封装post,get方法
const http = {
  get: createRequestFuc('get'),
  post: createRequestFuc('post'),
}


export default http
