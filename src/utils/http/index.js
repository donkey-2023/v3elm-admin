import axios from 'axios'
import store from '@/store'
import { ElMessage } from 'element-plus'
import { addPending, removePending } from './helper/cancelToken'
import { showLoading, hideLoading } from './helper/loading'
import handleStatus from './helper/handleStatus'
import { isValid } from '@/utils/verify'
import { TOKEN_EXPIRED } from '@/utils/constant'

const service = axios.create({
  // baseURL: process.env.VUE_APP_BASE_API,
  baseURL: '/api',
  timeout: 3000
})

// 请求拦截
service.interceptors.request.use(
  config => {
    const token = store.getters.token
    if (token && !isValid()) {
      store.dispatch('app/logout')
      return Promise.reject(new Error(TOKEN_EXPIRED))
    }
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

    if (response.status === 200 && response.data.code == 0) {
      return response.data
    } else {
      ElMessage.error(response.data.msg || 'Error')
      return Promise.reject(response.data)
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
