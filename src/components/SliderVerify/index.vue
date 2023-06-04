<template>
  <div class="slider-container">
    <div
      v-local-loading="formData.showLoading"
      elm-loading-text="加载中..."
      :style="{ 'z-index' : formData.showGraph? 100:-1}"
      :class="['graph-wrapper',formData.showGraph?'show':'hide']"
    >
      <canvas
        ref="fullImgRef"
        :width="width"
        height="130"
        class="full-img"
        :style="{width:width +'px'}"
      ></canvas>
      <canvas
        ref="partialImgRef"
        :width="width"
        height="130"
        :style="{left: formData.left+'px'}"
        class="partial-img"
      ></canvas>
      <div v-show="formData.showGraph" class="icon-wrap">
        <div @click="refresh" class="icon">
          <svg-icon icon="refresh"></svg-icon>
        </div>
        <div @click="close" class="icon">
          <svg-icon icon="fork"></svg-icon>
        </div>
      </div>
    </div>
    <div
      @mouseenter="mouseenter"
      @mouseleave="mouseleave"
      :style="{width:width + 'px'}"
      class="btn-wrapper"
    >
      <div
        ref="sliderRef"
        @mousedown="mouseDown"
        :style="{left:formData.dragDis+'px',transition: formData.isMove ? 'none' : 'left .3s ease-in-out'}"
        :class="[formData.state ? formData.state : '','slider',formData.isMove ? 'is-move' : '']"
      >
        <span class="arrow"></span>
      </div>
      <div
        v-show="formData.isMove && formData.dragDis > 2"
        :class="[formData.state ? formData.state : '','mask']"
        :style="{width:formData.dragDis +'px'}"
      ></div>
      <div ref="trackRef" class="track">{{formData.placeHolder}}</div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, inject } from 'vue'
import { throttle } from '@utils/index'
const sliderRef = ref(null)
const trackRef = ref(null)
const fullImgRef = ref(null)
const partialImgRef = ref(null)
const formData = reactive({
  dragDis: 0,
  left: 0,
  isMove: false,
  showGraph: false,
  state: null,
  showLoading: false,
  placeHolder: '向右滑动完成验证'
})

let initClientX = 0
let fullCvsCtx = null
let partialCvsCtx = null
let portability = true // 可移动
let imgIndex = 1
let offsetX = 0
let isRezie = false // 浏览器窗口是否缩放

const width = inject('width')

// const onSubmit = () => {
//   console.log('onsubmit')
// }

const mouseDownCallback = e => {
  // 阻止默认行为
  // 在滑块上方按住鼠标拖拽，会有一定几率出现拖拽文字的效果，然后此时松手是不会触发mouseup事件
  if (e.preventDefault) {
    e.preventDefault()
  } else {
    window.event.returnValue = false //IE
  }

  formData.isMove = true
  initClientX = e.clientX

  document.addEventListener('mousemove', mouseMove)
  document.addEventListener('mouseup', mouseUp)
}

// 防抖(避免用户1s内多次触发mousedown事件)
const mouseDown = throttle(mouseDownCallback, 1000)

const mouseMoveCallback = e => {
  if (!formData.isMove || !portability) return
  formData.placeHolder = ''
  formData.dragDis = e.clientX - initClientX
  // 边界判断
  if (formData.dragDis < 0) {
    formData.dragDis = 0
  } else if (formData.dragDis > trackRef.value.clientWidth - sliderRef.value.clientWidth) {
    formData.dragDis = trackRef.value.clientWidth - sliderRef.value.clientWidth
  }
  formData.left = formData.dragDis - offsetX
}

// 防抖
const mouseMove = throttle(mouseMoveCallback, 1000 / 60)

const emits = defineEmits(['success'])
const mouseUp = () => {
  // 设置允许误差距
  if (Math.abs(formData.dragDis - offsetX) < 3) {
    // 滑块验证成功
    formData.state = 'success'
    formData.showGraph = false
    portability = false // 不可移动
    emits('success')
  } else {
    // 滑块验证失败
    formData.state = 'fail'
    imgIndex = imgIndex > 8 ? 1 : imgIndex + 1

    formData.showLoading = true
    startDrawing(fullCvsCtx, partialCvsCtx)
    setTimeout(() => {
      formData.state = null
      formData.isMove = false
      formData.dragDis = 0
      formData.placeHolder = '向右滑动完成验证'
      formData.showLoading = false
    }, 500)
  }

  document.removeEventListener('mousemove', mouseMove)
  document.removeEventListener('mouseup', mouseUp)
}

// 优化：鼠标在滑道上停留0.5s才显示图片
let timer = null
const mouseenter = () => {
  // 验证成功后不再显示拼图
  if (!portability) return
  timer && clearTimeout(timer)
  timer = setTimeout(() => {
    formData.showGraph = true
    fullCvsCtx = fullImgRef.value.getContext('2d')
    partialCvsCtx = partialImgRef.value.getContext('2d')

    if (firstTime || isRezie) {
      firstTime = false
      startDrawing(fullCvsCtx, partialCvsCtx)
    }
  }, 500)
}

const mouseleave = () => {
  timer && clearTimeout(timer)
}

window.addEventListener('resize', () => {
  isRezie = true
  formData.showGraph = false
})

// ==============   canvas  =================

const img = new Image()
let firstTime = true

// 刷新拼图
const refresh = () => {
  imgIndex = imgIndex > 8 ? 1 : imgIndex + 1
  startDrawing(fullCvsCtx, partialCvsCtx)
}

// 关闭拼图
const close = () => {
  formData.showGraph = false
}

const startDrawing = (fullCvsCtx, partialCvsCtx) => {
  offsetX = getRandomNum(width.value - 65, 100)
  const offsetY = getRandomNum(150 - 65, 20)

  img.src = require(`@assets/img/slider/${imgIndex}.jpeg`)
  img.onload = () => {
    drawFivePointedStar(fullCvsCtx, offsetX, offsetY, 'fill')
    drawFivePointedStar(partialCvsCtx, offsetX, offsetY, 'clip')
    // 防止出现在滑块验证失败后，新图还没有绘制完时，滑块向左位移到无规则位置的情况
    formData.left = -offsetX
  }
}
const getRandomNum = (max, min) => {
  return Math.random() * (max - min + 1) + min
}

// 先绘制五角星，再绘制背景图
const drawFivePointedStar = (ctx, offsetX, offsetY, type) => {
  let R = 24
  let x = 0
  let y = 0
  ctx.clearRect(0, 0, width.value, 150)
  ctx.save()
  ctx.save()
  ctx.beginPath()
  ctx.translate(R + offsetX, R + offsetY)

  for (let i = 0; i < 5; i++) {
    x = Math.cos(((-90 + 72 * i) / 180) * Math.PI) * R
    y = Math.sin(((-90 + 72 * i) / 180) * Math.PI) * R
    ctx.lineTo(x, y)
    x = (Math.cos(((-54 + 72 * i) / 180) * Math.PI) * R * 5) / 9
    y = (Math.sin(((-54 + 72 * i) / 180) * Math.PI) * R * 5) / 9
    ctx.lineTo(x, y)
  }

  if (type === 'fill') {
    ctx.fillStyle = 'rgba(255,255,255,0.8)'
    ctx.fill()
    ctx.restore()
    ctx.globalCompositeOperation = 'destination-over'
  } else {
    ctx.closePath()
    ctx.lineWidth = 2
    ctx.strokeStyle = 'rgba(255,255,255,0.8)'
    ctx.stroke()
    ctx.restore()
    ctx.clip()
  }
  ctx.drawImage(img, 0, 0, width.value, 150)
  ctx.restore()
}
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>