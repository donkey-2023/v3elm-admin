import axios from 'axios'
import store from '@/store'
import { ElMessage } from 'element-plus'

const service = axios.create({
  // baseURL: process.env.VUE_APP_BASE_API,
  baseURL: '/api',
  timeout: 3000
})

// 请求拦截
service.interceptors.request.use(
  config => {
    const token = store.state.token
    token && (config.headers.Authorization = token)
    return config
  },
  error => {
    console.log(error)
    return Promise.reject(error)
  }
)

// 响应拦截
service.interceptors.response.use(
  response => {
    const res = response.data
    if (response.status === 200) {
      if (res.code == 0) {
        return res.data
      } else {
        ElMessage.error(res.msg)
        return Promise.reject(res)
      }
    } else {
      ElMessage.error(res || 'Error')
      return Promise.reject(res)
    }
  },
  error => {
    const response = error.response
    console.log(response)

    response && ElMessage.error(response.data)
    return Promise.reject(error)
  }
)

const get = (url, params, options = {}) => {
  return service.get(url, { params, ...options })
}

const post = (url, data, options = {}) => {
  return service.post(url, data, { ...options })
}

export default { get, post }
