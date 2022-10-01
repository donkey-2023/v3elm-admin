<template>
  <div class="slider-container">
    <div
      :style="{ 'z-index' : data.showGraph? 100:-1}"
      :class="['graph-wrapper',data.showGraph?'show':'hide']"
    >
      <canvas
        ref="fullImgRef"
        :width="width"
        height="150"
        class="full-img"
        :style="{width:width +'px'}"
      ></canvas>
      <canvas
        ref="partialImgRef"
        :width="width"
        height="150"
        :style="{left: data.left+'px'}"
        class="partial-img"
      ></canvas>
      <div v-show="data.showGraph" class="icon-wrap">
        <div @click="refresh" class="refresh"></div>
        <div @click="close" class="close"></div>
      </div>
    </div>
    <div @mouseenter="mouseenter" :style="{width:width + 'px'}" class="btn-wrapper">
      <div
        ref="sliderRef"
        @mousedown="hanleMouseDownEvent"
        :style="{left:data.slideDistance+'px',transition: data.isMove ? 'none' : 'left 0.3s ease-in-out'}"
        :class="[data.state ? data.state : '','slider',data.isMove ? 'is-move' : '']"
      >
        <span class="arrow"></span>
      </div>
      <div
        v-show="data.isMove && data.slideDistance > 2"
        :class="[data.state ? data.state : '','mask']"
        :style="{width:data.slideDistance +'px'}"
      ></div>
      <div ref="trackRef" class="track">{{data.showPlaceHolder ? '向右滑动完成验证' : ''}}</div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, toRef, inject } from 'vue'
// ==============   滑块  =================
const data = reactive({
  slideDistance: 0,
  left: 0,
  isMove: false,
  showGraph: false,
  state: null,
  showPlaceHolder: true
})
const sliderRef = ref(null)
const trackRef = ref(null)

const onSubmit = () => {
  console.log('onsubmit')
}

let initClientX = 0
let fullCvsCtx = null
let partialCvsCtx = null
let portability = true // 可移动
let imgIndex = 1
let offsetX = 0
let isRezie = false // 浏览器窗口是否缩放

const width = inject('width')

const hanleMouseDownEvent = (e) => {
  // 阻止默认行为
  // 在滑块上方按住鼠标拖拽，会有一定几率出现拖拽文字的效果，然后此时松手是不会触发mouseup事件
  if (e.preventDefault) {
    e.preventDefault()
  } else {
    window.event.returnValue = false //IE
  }

  data.isMove = true
  initClientX = e.clientX

  document.addEventListener('mousemove', hanleMouseMoveEvent)
  document.addEventListener('mouseup', hanleMouseUpEvent)
}

const hanleMouseMoveEvent = (e) => {
  if (!data.isMove || !portability) return
  data.showPlaceHolder = false
  data.slideDistance = e.clientX - initClientX
  // 边界判断
  if (data.slideDistance < 0) {
    data.slideDistance = 0
  } else if (
    data.slideDistance >
    trackRef.value.clientWidth - sliderRef.value.clientWidth
  ) {
    data.slideDistance =
      trackRef.value.clientWidth - sliderRef.value.clientWidth
  }
  data.left = data.slideDistance - offsetX
}

const hanleMouseUpEvent = () => {
  // 设置允许误差距为±3px
  if (Math.abs(data.slideDistance - offsetX) < 3) {
    data.state = 'success'
    data.showGraph = false
    portability = false // 不可移动
  } else {
    data.state = 'fail'
    imgIndex = imgIndex > 8 ? 1 : imgIndex + 1
    setTimeout(() => {
      data.state = null
      data.isMove = false
      data.slideDistance = 0
      startDrawing(fullCvsCtx, partialCvsCtx)

      // 等滑块复位之后(.3s)，才显示“向右滑动完成验证”
      setTimeout(() => {
        data.showPlaceHolder = true
      }, 300)
    }, 400)
  }

  document.removeEventListener('mousemove', hanleMouseMoveEvent)
  document.removeEventListener('mouseup', hanleMouseUpEvent)
}

const mouseenter = () => {
  // 验证成功后不再显示拼图
  if (!portability) return
  data.showGraph = true
  fullCvsCtx = fullImgRef.value.getContext('2d')
  partialCvsCtx = partialImgRef.value.getContext('2d')

  if (firstTime || isRezie) {
    firstTime = false
    startDrawing(fullCvsCtx, partialCvsCtx)
  }
}

window.addEventListener('resize', () => {
  isRezie = true
  data.showGraph = false
})

// ==============   canvas  =================
const fullImgRef = ref(null)
const partialImgRef = ref(null)

const img = new Image()
let firstTime = true

// 刷新拼图
const refresh = () => {
  imgIndex = imgIndex > 8 ? 1 : imgIndex + 1
  startDrawing(fullCvsCtx, partialCvsCtx)
}

// 关闭拼图
const close = () => {
  data.showGraph = false
}

const startDrawing = (fullCvsCtx, partialCvsCtx) => {
  offsetX = getRandomNum(width.value - 65, 100)
  const offsetY = getRandomNum(150 - 65, 20)

  img.src = require(`@assets/img/slider/${imgIndex}.jpeg`)
  img.onload = () => {
    drawFivePointedStar(fullCvsCtx, offsetX, offsetY, 'fill')
    drawFivePointedStar(partialCvsCtx, offsetX, offsetY, 'clip')
    // 防止出现在滑块验证失败后，新图还没有绘制完时，滑块向左位移到无规则位置的情况
    data.left = -offsetX
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
.slider-container {
  position: relative;
  width: 100%;
  margin-bottom: 15px;
  .graph-wrapper {
    position: absolute;
    width: 100%;
    height: 150px;
    left: 1px;
    border-radius: 8px;
    transition: all 0.3s ease-in-out;
    .full-img {
      height: 150px;
    }
    .partial-img {
      position: absolute;
      height: 150px;
      top: 0;
      left: 0;
    }
    &.hide {
      top: -150px;
      opacity: 0;
    }
    &.show {
      top: -158px;
      opacity: 1;
    }
    .icon-wrap {
      position: absolute;
      top: 0px;
      right: 0px;
      background: rgba(0, 0, 0, 0.1);
      display: flex;
      justify-content: space-between;
      align-items: center;
      .refresh {
        width: 24px;
        height: 29px;
        background-image: url('@assets/img/slider.png');
        background-position: 0 30px;
        padding-right: 10px;
        transform: scale(0.85);
        cursor: pointer;
      }
      .close {
        width: 20px;
        height: 12px;
        background-image: url('@assets/img/slider.png');
        background-position: 0 -83px;
        transform: scale(1.2);
        cursor: pointer;
      }
    }
  }
  .btn-wrapper {
    position: relative;
    margin-left: 2px;
    .slider {
      display: flex;
      justify-content: center;
      align-items: center;
      position: absolute;
      left: 0px;
      top: 0;
      width: 34px;
      height: 32px;
      border: solid 1px #dcdfe6;
      box-shadow: 0 0 3px 0 #dcdfe6;
      cursor: pointer;
      .arrow {
        width: 14px;
        height: 12px;
        background-image: url('@assets/img/slider.png');
        background-position: 0 -25px;
      }
      &.is-move {
        border: solid 1px #409eff;
        box-shadow: 0 0 3px 0 #409eff;
        background-color: #409eff;
        &.success {
          border: solid 1px #52ccba;
          box-shadow: 0 0 3px 0 #52ccba;
          background-color: #52ccba;
          .arrow {
            background-position: 0 0;
          }
        }
        &.fail {
          border: solid 1px #f57a7a;
          box-shadow: 0 0 3px 0 #f57a7a;
          background-color: #f57a7a;
          .arrow {
            background-position: 0 -82px;
          }
        }
        .arrow {
          background-position: 0 -12px;
        }
      }
      z-index: 12;
    }
    .mask {
      position: absolute;
      left: 0;
      top: 0;
      width: 0px;
      height: 32px;
      border: solid 1px #1991fa;
      background-color: #d1e9fe;
      &.success {
        border: solid 1px #52ccba;
        background-color: #d2f4ef;
      }
      &.fail {
        border: solid 1px #f57a7a;
        background-color: #fce1e1;
      }
    }
    .track {
      border: solid 1px #dcdfe6;
      color: #45494c;
      text-align: center;
      user-select: none;
      height: 32px;
    }
  }
}
@keyframes rise {
  0% {
    -webkit-transform: translateY(0);
    transform: translateY(0);
  }
  100% {
    -webkit-transform: translateY(-10px);
    transform: translateY(-10px);
  }
}
</style>