import { isNotNull } from '@utils/verify'
import { createApp } from 'vue'
import LocalLoading from '@/components/LocalLoading'

export default {
  mounted(el, binding, vnode, prevVnode) {
    binding.value && showLoading(el)
  },
  // 绑定元素的父组件更新前调用
  beforeUpdate(el, binding, vnode, prevVnode) {
    if (binding.value && !binding.oldValue) {
      showLoading(el)
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

function showLoading(el) {
  const instance = createApp(LocalLoading).mount(document.createElement('div'))
  el.appendChild(instance.$el.parentElement.firstChild)
}
