import { isNotNull } from './verify'

export function addResizeListener(target, callback) {
  const iframe = document.createElement('iframe')
  iframe.classList.add('invisible-iframe')
  iframe.style.cssText = `
      position: absolute; 
      left: 0; 
      top: 0;
      width: 100%; 
      height: 100%;
      border: 0;
      margin: 0; 
      display: block; 
      z-index: -999;
    `
  target.appendChild(iframe)

  let oldWidth = target.offsetWidth
  let oldHeight = target.offsetHeight

  function resizeHandler() {
    const newWidth = target.offsetWidth
    const newHeight = target.offsetHeight
    if (oldWidth !== newWidth || oldHeight !== newHeight) {
      typeof callback === 'function' &&
        callback(
          { width: newWidth, height: newHeight },
          { width: oldWidth, height: oldHeight }
        )
      oldWidth = newWidth
      oldHeight = newHeight
    }
  }

  ;(iframe.contentWindow || iframe).onresize = function () {
    // 防抖
    target._timer_ && clearTimeout(target._timer_)
    target._timer_ = setTimeout(resizeHandler, 20)
  }
}

export function removeResizeListener(target) {
  target._timer_ && clearTimeout(target._timer_)

  isNotNull(target.children) &&
    target.children.forEach((el) => {
      if (
        el.tagName.toLowerCase() === 'iframe' &&
        Array.prototype.includes.call(el.classList, 'invisible-iframe')
      ) {
        target.removeChild(el)
      }
    })
}
