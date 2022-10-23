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
    return Promise.reject(error)
  }
)

// 响应拦截
service.interceptors.response.use(
  response => {
    const { data } = response.data
    if (response.status === 200 || data.code === 0) {
      return data
    } else {
      ElMessage.error(data)
      return Promise.reject(data)
    }
  },
  error => {
    const { response } = error
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
