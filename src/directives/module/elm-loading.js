import { isNotNull } from '@utils/verify'
export default {
  mounted(el, binding, vnode, prevVnode) {
    binding.value && init(el)
  },
  // 绑定元素的父组件更新前调用
  beforeUpdate(el, binding, vnode, prevVnode) {
    if (binding.value && !binding.oldValue) {
      init(el)
    }
    if (!binding.value && binding.oldValue && isNotNull(el.children)) {
      Array.prototype.forEach.call(el.children, (item) => {
        if (Array.prototype.includes.call(item.classList, 'elm-loading-wrap')) {
          el.removeChild(item)
        }
      })
    }
  }
}

function init(el) {
  let loadingText = ''
  if (isNotNull(el.attributes)) {
    Array.prototype.forEach.call(el.attributes, (item) => {
      if (item.name === 'elm-loading-text') {
        loadingText = item.value
      }
    })
  }

  const $loading = createLoading(loadingText)
  el.appendChild($loading)
}

const ns = 'http://www.w3.org/2000/svg'
function createLoading(text) {
  const $circle = document.createElementNS(ns, 'circle')
  $circle.classList.add('path')
  const attrs = {
    cx: '50',
    cy: '50',
    r: '20',
    fill: 'none'
  }
  Object.keys(attrs).forEach((key) => {
    $circle.setAttribute(key, attrs[key])
  })

  // 创建svg元素需要使用createElementNS，在第一个参数传入字符串'http://www.w3.org/2000/svg'
  const $svg = document.createElementNS(ns, 'svg')
  $svg.classList.add('circular')
  $svg.setAttribute('viewBox', '25 25 50 50')
  $svg.appendChild($circle)

  let $text = null
  if (text) {
    $text = document.createElement('div')
    $text.classList.add('loading-text')
    $text.append(text)
  }

  const $div = document.createElement('div')
  $div.classList.add('elm-loading-wrap')
  $div.appendChild($svg)
  text && $div.appendChild($text)

  return $div
}
