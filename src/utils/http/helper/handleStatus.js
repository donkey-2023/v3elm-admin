import axios from 'axios'
import { ElMessage } from 'element-plus'

export default function (error) {
  if (axios.isCancel(error)) {
    console.log('取消重复的请求：' + error.message)
    return
  }
  let errorMsg = ''
  if (error && error.response) {
    switch (error.response.status) {
      case 400:
        errorMsg = '请求报文语法有误'
        break
      case 401:
        errorMsg = '未认证，请重新登录'
        break
      case 403:
        errorMsg = '当前账号无权限访问'
        break
      case 404:
        errorMsg = '访问的资源不存在'
        break
      case 405:
        errorMsg = '请求方法未允许'
        break
      case 408:
        errorMsg = '请求超时'
        break
      case 500:
        errorMsg = '服务器内部错误'
        break
      case 502:
        errorMsg = '网关错误'
        break
      case 503:
        errorMsg = '服务不可用'
        break
      case 504:
        errorMsg = '网关超时'
        break
      case 505:
        errorMsg = 'http版本不支持该请求'
        break
      default:
        errorMsg = '未知错误，请联系管理员！'
    }
  }
  if (error.message.includes('timeout')) {
    errorMsg = '网络请求超时！'
  }
  if (error.message.includes('Network')) {
    errorMsg = window.navigator.onLine ? '服务端异常！' : '您断网了！'
  }
  ElMessage.error(errorMsg)
}
