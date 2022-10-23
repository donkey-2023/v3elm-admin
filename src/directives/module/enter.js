let callback = null
let $el = null

export default {
  mounted(el, binding) {
    $el = el
    callback = binding.value
    window.addEventListener('keydown', keyDown)
  },
  beforeUnmount(el, binding) {
    console.log('-----enter-beforeUnmount----')
    window.removeEventListener('keydown', keyDown)
  }
}

function keyDown(e) {
  e.keyCode == 13 && typeof callback == 'function' && callback(e)
}
