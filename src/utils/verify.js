import { getType } from './index'
import { EFFECTIVE_TIME, DURATION } from './constant'

export function isNull(obj) {
  return !obj && obj !== 0
}

// 非空(类)数组
export function isNotNull(obj) {
  return obj && obj.length
}

// 非空对象 + 非空数组
export function isNotEmpty(target) {
  return (getType(target) === 'object' && Object.keys(target).length) || (Array.isArray(target) && target.length)
}

// 判断是否为String或Number类型的数字
export function isNumeric(value) {
  return !isNaN(parseFloat(value)) && isFinite(value)
}

// 判断token是否有效
export function isValid() {
  const createTime = localStorage.getItem(EFFECTIVE_TIME)
  return Date.now() - createTime <= DURATION
}
