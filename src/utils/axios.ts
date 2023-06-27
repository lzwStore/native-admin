import axios from 'axios'
import type { AxiosInstance, AxiosResponse } from 'axios'
import { createDiscreteApi } from 'naive-ui'
const { loadingBar } = createDiscreteApi(['loadingBar'])
const instance: AxiosInstance = axios.create({
  // 请求的base地址 TODO:这块以后根据不同的模块调不同的api
  baseURL: import.meta.env.VITE_API_URL
})

// 请求拦截器
instance.interceptors.request.use((config) => {
  loadingBar.start()
  console.log(config, '---')
  const data = config.data || '{}'
  console.log('data', data)

  // config.headers['Access-Control-Allow-Origin'] = 'https://api.youlai.tech/'
  // const token = localStorage.getItem('token')
  // if (token && config.headers) {
  //   config.headers.Authorization = token
  // }
  return config
})

// 响应拦截器
instance.interceptors.response.use(
  (res: AxiosResponse) => {
    loadingBar.finish()
    if (res.status === 200) {
      return Promise.resolve(res.data)
    } else {
      return Promise.reject(res.data)
    }
  },
  (err) => {
    loadingBar.error()
    return Promise.reject(err)
  }
)

export default instance
