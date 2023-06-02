<!-- #参考文章https://juejin.cn/post/6844903901699784711 -->
<template>
  <div ref="containerRef" class="canvas-container">
    <canvas ref="canvasRef" :width="width" :height="height" class="canvas"></canvas>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { generateRandomInt } from '@/utils/index'

const canvasRef = ref(null)
const containerRef = ref(null)
let ctx = null
let text = ''
let width = 100

const init = () => {
  text = randomText()
  drawLine()
  drawText()
}
onMounted(() => {
  setTimeout(() => {
    width = containerRef.value.getBoundingClientRect().width
    ctx = canvasRef.value.getContext('2d')
    init()

    canvasRef.value.addEventListener('click', init)
  }, 0)
})
onBeforeUnmount(() => {
  canvasRef.value.removeEventListener('click', init)
})

// 生成随机rgba颜色码
const generateRgbCode = (opacity = 1, cb) => cb(50, 200) + ',' + cb(50, 200) + ',' + cb(50, 200) + ',' + opacity

const props = defineProps({
  height: {
    type: Number,
    default: 32
  },
  lineNum: {
    type: Number,
    default: 4
  }
})

// 绘制干扰线条
const drawLine = () => {
  ctx.clearRect(0, 0, width, props.height)
  ctx.save()
  for (let i = 0; i < props.lineNum; i++) {
    ctx.beginPath()
    ctx.lineWidth = 2
    ctx.strokeStyle = 'rgba(' + generateRgbCode(generateRandomInt(2, 5) / 10, generateRandomInt) + ')'
    ctx.moveTo(Math.random() * width, Math.random() * props.height)
    ctx.lineTo(Math.random() * width, Math.random() * props.height)
    ctx.stroke()
  }
  ctx.restore()
}

// 绘制文本
const drawText = () => {
  let len = text.length
  for (let i = 0; i < len; i++) {
    ctx.fillStyle = 'rgb(' + generateRgbCode(generateRandomInt(8, 10) / 10, generateRandomInt) + ')'
    ctx.font = '26px Helvetica'
    ctx.textBaseline = 'middle'

    let xPos = (width / 4) * Math.random() + (width / 4 + 2) * i
    ctx.fillText(text[i], xPos > width - 20 ? width - 20 : xPos, Math.random() * 5 + props.height / 2)
  }
}

const emits = defineEmits(['captcha'])
// 生成随机文本(字母和数字)
const randomText = () => {
  let code = 'xyXY'.replace(/[xyXY]/g, function (c) {
    let res = ''
    switch (c) {
      case 'x':
        // 生成数字:0~4
        res = generateRandomInt(0, 4)
        break
      case 'X':
        // 生成数字:5~9
        res = generateRandomInt(5, 9)
        break
      case 'y':
        //1.小写字母a~z的ASCII码值是97~122;2.调用String.fromCharCode方法，其会根据传入ASCII值返回对应的字符串
        // 生成小写字母:a ~ m
        res = String.fromCharCode(generateRandomInt(97, 109))
        break
      case 'Y':
        // 生成小写字母:n ~ z
        res = String.fromCharCode(generateRandomInt(110, 122))
        break
    }
    return res
  })
  console.log('-------- text -------- ', code)
  emits('captcha', code)
  return code
}
defineExpose({
  init
})
</script>

<style lang="scss" scoped>
.canvas {
  background: #f4f4f4;
}
</style>