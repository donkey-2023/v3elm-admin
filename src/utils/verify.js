import { getType } from './index'
export function isNullObj(obj) {
  return obj && Object.keys(obj).length === 0
}

export function isNotEmpty(target) {
  return (
    (getType(target) === 'object' && target) ||
    (Array.isArray(target) && target.length)
  )
}

// 判断是否为String或Number类型的数字
export function isNumeric(value) {
  return !isNaN(parseFloat(value)) && isFinite(value)
}
