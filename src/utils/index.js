import { isNumeric } from '@utils/verify'
export function getType(v) {
  return Object.prototype.toString.call(v).slice(8, -1).toLowerCase()
}

// 加法
export function accAdd(arg1, arg2) {
  var r1, r2, m
  try {
    r1 = arg1.toString().split('.')[1].length
  } catch (e) {
    r1 = 0
  }
  try {
    r2 = arg2.toString().split('.')[1].length
  } catch (e) {
    r2 = 0
  }
  m = Math.pow(10, Math.max(r1, r2))
  return (arg1 * m + arg2 * m) / m
}

//减法
export function accSub(arg1, arg2) {
  return accAdd(arg1, -arg2)
}

//乘法
export function accMul(arg1, arg2) {
  var m = 0,
    s1 = arg1.toString(),
    s2 = arg2.toString()
  try {
    m += s1.split('.')[1].length
  } catch (e) {}
  try {
    m += s2.split('.')[1].length
  } catch (e) {}
  return (
    (Number(s1.replace('.', '')) * Number(s2.replace('.', ''))) /
    Math.pow(10, m)
  )
}

//除法
export function accDiv(arg1, arg2) {
  var t1 = 0,
    t2 = 0,
    r1,
    r2
  try {
    t1 = arg1.toString().split('.')[1].length
  } catch (e) {}
  try {
    t2 = arg2.toString().split('.')[1].length
  } catch (e) {}
  r1 = Number(arg1.toString().replace('.', ''))
  r2 = Number(arg2.toString().replace('.', ''))
  return accMul(r1 / r2, pow(10, t2 - t1))
}

// 节流
export function throttle(fn, delay) {
  let start = null
  return function (...args) {
    const now = Date.now()
    if (now - start > delay) {
      fn.apply(this, args)
      start = Date.now()
    }
  }
}

// 获取元素的样式
export function getElementStyle(el) {
  // 兼容IE: currentStyle
  return el.currentStyle ? el.currentStyle : window.getComputedStyle(el, null)
}

// 从字符串 '100px' 中提取 数字100
export function calcPixelValue(str) {
  if (str && str.includes('px')) {
    return Number(str.split('px')[0])
  } else if (isNumeric(str)) {
    return Number(str)
  }
  return 0
}