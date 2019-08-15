import axios from 'axios'
import store from '@/store'
import { getToken } from '@/utils/auth'
import { Loading,Message } from 'element-ui';
axios.defaults.withCredentials=true
let loadingInstance;
// create an axios instance
const service = axios.create({
  baseURL: process.env.BASE_API, // api的base_url
  timeout: 50000 // request timeout
})
// axios.defaults.withCredentials = true
// request interceptor
service.interceptors.request.use(config => {
  //全局loading
  // loadingInstance=Loading.service({ fullscreen: true });

  // Do something before request is sent
  // if (store.getters.token) {
  //   config.headers['X-Token'] = getToken() // 让每个请求携带token-- ['X-Token']为自定义key 请根据实际情况自行修改
  // }

  return config
}, error => {
  // Do something with request error
  console.log(error) // for debug
  Promise.reject(error)
})

// respone interceptor
service.interceptors.response.use(
  response => {
    // loadingInstance.close();
    /**
     * 下面的注释为通过response自定义code来标示请求状态，当code返回如下情况为权限有问题，登出并返回到登录页
     * 如通过xmlhttprequest 状态码标识 逻辑可写在下面error中
     */
     const res = response.data;
        if (res.code !== 'SUCCESS'&&res.code !== 'ok') {
          Message({
            message: res.msg,
            type: 'error',
            duration: 2 * 1000
          });
          if (res.code === 'NO_LOGIN_ERR') {
            store.dispatch('FedLogOut').then(() => {
              store.dispatch('FedLogOut').then(() => {
                location.reload();// 为了重新实例化vue-router对象 避免bug
              });
            });
          }
          return Promise.reject('error');
        } else {
          return response.data;
        }
    // return Promise.resolve(response.data,);
  },
  error => {
    // loadingInstance.close();
    console.log('err' + error)// for debug
    if(error.response.status=== 500){
      Message({
        message: error.response.data.msg,
        type: 'error',
        duration: 5 * 1000
      })
    }
    if(error.response.status=== 400||error.response.status=== 404){
      Message({
        message: '输入有误',
        type: 'error',
        duration: 5 * 1000
      })
    }
    if(error.response.data.code=== 'NO_LOGIN_ERR'){
      store.dispatch('FedLogOut').then(() => {
        location.reload();// 为了重新实例化vue-router对象 避免bug
      });
    }

    return Promise.reject(error)
  })

export default service
