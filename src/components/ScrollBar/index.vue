<template>
  <div ref="wrapRef" @mouseenter="mouseEnter" @mouseleave="mouseLeave" class="wrap-box">
    <div ref="viewRef" class="view-box">
      <slot></slot>
    </div>
    <div
      @mousedown="mouseDown($event, 'horizontal')"
      v-show="formData.showHtlBar"
      class="scroll-bar is-horizontal"
      :style=" { width: formData.barWidth +'px', left: formData.barLeft + 'px',opacity: formData.opacity}"
    ></div>
    <div
      @mousedown="mouseDown($event,'vertical')"
      v-show="formData.showVtlBar"
      class="scroll-bar is-vertical"
      :style=" { height: formData.barHeight +'px', top: formData.barTop + 'px',opacity: formData.opacity}"
    ></div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, onBeforeUnmount } from 'vue'
import { addResizeListener, removeResizeListener } from '@utils/resizeObserver'
import { throttle, getElementStyle, calcPixelValue } from '@utils/index'
import { isNotNull } from '@utils/verify'
import { BAR_MAP } from './contants'

// 响应式数据
const wrapRef = ref(null)
const viewRef = ref(null)
const formData = reactive({
  showHtlBar: false, // 显示水平滚动条
  showVtlBar: false, // 显示垂直滚动条
  barWidth: 0,
  barHeight: 0,
  barLeft: 0,
  barTop: 0,
  opacity: 0
})

// 鼠标滑轮的速度
const props = defineProps({
  wheelSpeed: {
    type: Number,
    default: 30
  }
})
// 滚动条相关属性的映射
let globalMap = {}
let barObj = {
  isHtlMove: false, // 是否拖动水平滚动条
  isVtlMove: false, // 是否拖动垂直滚动条
  prevClientX: 0,
  prevClientY: 0,
  offsetX: 0,
  offsetY: 0,
  cacheX: {},
  cacheY: {}
}

// 重置表单和滚动条相关变量
const reset = () => {
  formData.showHtlBar = false
  formData.showVtlBar = false
  formData.barWidth = 0
  formData.barHeight = 0
  formData.barLeft = 0
  formData.barTop = 0
  formData.opacity = 0

  barObj = {
    isHtlMove: false,
    isVtlMove: false,
    prevClientX: 0,
    prevClientY: 0,
    offsetX: 0,
    offsetY: 0,
    cacheX: {},
    cacheY: {}
  }
}

onMounted(() => {
  setTimeout(() => {
    if (viewRef.value && isNotNull(viewRef.value.children)) {
      init()

      displayBlock()

      // 为视图区元素绑定resize事件
      addResizeListener(viewRef.value, init)

      // Firefox
      wrapRef.value.addEventListener('DOMMouseScroll', mouseScroll)
      // IE9, Chrome【mousewheel 已废弃，使用 wheel 事件替代】
      wrapRef.value.addEventListener('wheel', mouseScroll)
    }
  }, 0)
})

onBeforeUnmount(() => {
  removeResizeListener(viewRef.value, init)

  wrapRef.value.removeEventListener('DOMMouseScroll', mouseScroll)
  wrapRef.value.removeEventListener('wheel', mouseScroll)
})

// 将子元素中的内联元素设置为块级元素
const displayBlock = () => {
  Array.prototype.forEach.call(viewRef.value.children, item => {
    let styles = getElementStyle(item)
    if (styles.display === 'inline') {
      item.style.display = 'block'
    }
  })
}

const init = () => {
  reset()

  const wrapStyle = getElementStyle(wrapRef.value)
  const viewStyle = getElementStyle(viewRef.value)

  ;['horizontal', 'vertical'].forEach(key => {
    const map = BAR_MAP[key]
    const wrapSize = wrapRef.value[map.clientSize] || calcPixelValue(wrapStyle[map.size])
    const viewSize = viewRef.value[map.offsetSize]

    // 如果组件的尺寸（即宽高）为0，则将其尺寸设置成与视图区的尺寸一致
    if (wrapSize === 0) {
      wrapRef.value.style[map.size] = viewSize + 'px'
    }
    if (viewSize > wrapSize) {
      // 当视图区的尺寸大于外层盒子的尺寸时，显示水平或垂直方向上的滚动条
      formData[map.showBar] = true
      formData.opacity = 1
      barObj[map.cache] = { wrapSize, viewSize }

      createScrollBar(key, viewStyle, barObj[map.cache])
    } else {
      viewRef.value.style[map.dir1] = '0px'
    }
  })
}

// 创建滚动条
const createScrollBar = (key, viewStyle, { wrapSize, viewSize }) => {
  const map = BAR_MAP[key]
  // 计算视图区已经卷曲的尺寸(取绝对值)
  let viewScrollSize = Math.abs(calcPixelValue(viewStyle[map.dir1]))

  // 当视图区的尺寸发生变化时，会出现viewScrollSize + wrapSize > viewSize的情况
  // 此时需要重新设置滚动条的边偏移(即top或left)
  if (viewScrollSize + wrapSize > viewSize) {
    viewScrollSize = viewSize - wrapSize
    viewRef.value.style[map.dir1] = -viewScrollSize + 'px'
  }
  /**
   * 以垂直滚动条为例, 涉及2个公式：
   * 滚动条的高度/外层div高度 = 外层div高度/整体视图区高度
   * 滚动条的位置/(外层div高度-滚动条高度) = 视图区卷曲的高度/(整体视图区的高度-外层div高度)
   */
  // 滚动条尺寸
  formData[map.barSize] = Math.pow(wrapSize, 2) / viewSize
  // 滚动条位置(left | top)
  formData[map.barDir] = (viewScrollSize * (wrapSize - formData[map.barSize])) / (viewSize - wrapSize)
}

const mouseDown = (e, key) => {
  console.log('mousedown')
  // 阻止默认行为
  // 在滑块上方按住鼠标拖拽，会有一定几率出现拖拽文字的效果，然后此时松手是不会触发mouseup事件
  if (e.preventDefault) {
    e.preventDefault()
  } else {
    window.event.returnValue = false //IE
  }
  globalMap = BAR_MAP[key]
  barObj[globalMap.isMove] = true
  barObj[globalMap.prevClient] = e[globalMap.client]
  barObj[globalMap.offset] = e[globalMap.offset]

  document.addEventListener('mousemove', mouseMove)
  document.addEventListener('mouseup', mouseUp)
}

const mouseMoveCb = e => {
  if (!barObj[globalMap.isMove]) return

  // 设置滚动条的位置
  moveBar(globalMap, e[globalMap.client] - barObj[globalMap.prevClient])
  // 设置视图区的位置
  setPositionOfView(globalMap)
}

// 防抖
const mouseMove = throttle(mouseMoveCb, 1000 / 60)

// diff 指滚动条鼠标移动的距离或者鼠标滑轮滚动的距离
const moveBar = (map, diff) => {
  const { wrapSize } = barObj[map.cache]
  const position = formData[map.barDir] + diff

  const wrapClientRect = wrapRef.value.getBoundingClientRect()
  // 边界判断：滚动条不能超出轨道
  if (position < 0) {
    formData[map.barDir] = 0
    barObj[map.prevClient] = wrapClientRect[map.dir1] + barObj[map.offset]
  } else if (position > wrapSize - formData[map.barSize]) {
    formData[map.barDir] = wrapSize - formData[map.barSize]

    barObj[map.prevClient] = wrapClientRect[map.dir2] - formData[map.barSize] + barObj[map.offset]
  } else {
    formData[map.barDir] = position
    barObj[map.prevClient] = barObj[map.prevClient] + diff
  }
}

// 同步设置视图区的位置， 即left 或 top
const setPositionOfView = map => {
  const { wrapSize, viewSize } = barObj[map.cache]
  const viewScrollSize = (formData[map.barDir] * (viewSize - wrapSize)) / (wrapSize - formData[map.barSize])
  viewRef.value.style[map.dir1] = -viewScrollSize + 'px'
}

const mouseUp = e => {
  barObj[globalMap.isMove] = false
  barObj[globalMap.prevClient] = e[globalMap.client]

  document.removeEventListener('mousemove', mouseMove)
  document.removeEventListener('mouseup', mouseUp)
}

// 鼠标滑轮滚动
const mouseScroll = e => {
  if (!formData.showVtlBar) {
    return false
  }
  // 当用户滚动鼠标滑轮时，保持垂直滚动条的显示
  formData.opacity = 1

  let tag = e.wheelDeltaY || -e.deltaY
  let diff = 0
  if (tag < 0) {
    //滚轮往下滚动，页面往上走
    diff = props.wheelSpeed
  } else {
    //滚轮往上滚动，页面往上走
    diff = -props.wheelSpeed
  }
  const map = BAR_MAP['vertical']
  // 设置滚动条的位置
  moveBar(map, diff)
  // 设置视图区的位置
  setPositionOfView(map)
}

const mouseEnter = () => {
  formData.opacity = 1
}
const mouseLeave = () => {
  // 当用户还在拖动滚动条时，垂直滚动条不能隐藏
  if (!barObj[globalMap.isMove]) {
    formData.opacity = 0
  }
}
</script>

<style lang="scss" scoped>
@import 'index.scss';
</style>