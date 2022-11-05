import axios from 'axios'
import store from '@/store'
import { ElMessage } from 'element-plus'
import { addPending, removePending } from './helper/cancelToken'
import { showLoading, hideLoading } from './helper/loading'
import handleStatus from './helper/handleStatus'

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
    // 取消重复的请求
    if (config.cancelDuplicateRequest) {
      removePending(config)
      addPending(config)
    }

    config.loading && showLoading()
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// 响应拦截
service.interceptors.response.use(
  response => {
    hideLoading()
    // 取消重复的请求
    response.config.cancelDuplicateRequest && removePending(response.config)

    const res = response.data
    if (response.status === 200 && res.code == 0) {
      return res.data
    } else {
      ElMessage.error(res.msg || 'Error')
      return Promise.reject(res)
    }
  },
  error => {
    hideLoading()
    // 取消重复的请求
    error.config && error.config.cancelDuplicateRequest && removePending(error.config)

    // 根据响应状态码具体处理
    handleStatus(error)
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
