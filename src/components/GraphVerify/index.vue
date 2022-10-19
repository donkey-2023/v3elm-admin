<!-- #参考文章https://juejin.cn/post/6844903901699784711 -->
<template>
  <div ref="containerRef" class="canvas-container">
    <canvas ref="canvasRef" :width="width" :height="height" class="canvas"></canvas>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { generateRandomInt } from '@/utils/index'

const canvasRef = ref(null)
const containerRef = ref(null)
let ctx = null
let text = ''
let width = 100
onMounted(() => {
  setTimeout(() => {
    width = containerRef.value.getBoundingClientRect().width
    ctx = canvasRef.value.getContext('2d')
    onClick()
    text = randomText()
    drawLine()
    drawText()
  }, 0)
})

const onClick = () => {
  canvasRef.value.addEventListener(
    'click',
    () => {
      text = randomText()
      drawLine()
      drawText()
    },
    false
  )
}

// 生成随机rgba颜色码
const generateRgbCode = (opacity = 1) =>
  generateRandomInt(100, 220) +
  ',' +
  generateRandomInt(100, 220) +
  ',' +
  generateRandomInt(100, 220) +
  ',' +
  opacity

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
    ctx.strokeStyle =
      'rgba(' + generateRgbCode(generateRandomInt(4, 6) / 10) + ')'
    ctx.moveTo(generateRandomInt(0, width), generateRandomInt(0, props.height))
    ctx.lineTo(
      generateRandomInt(width / 3, width),
      generateRandomInt(props.height / 3, props.height)
    )
    ctx.stroke()
  }
  ctx.restore()
}

// 绘制文本
const drawText = () => {
  let len = text.length
  for (let i = 0; i < len; i++) {
    ctx.fillStyle = 'rgb(' + generateRgbCode() + ')'
    ctx.font = '26px Helvetica'
    ctx.textBaseline = 'middle'

    let xPos = (width / 4) * Math.random() + (width / 4 + 2) * i
    ctx.fillText(
      text[i],
      xPos > width - 20 ? width - 20 : xPos,
      Math.random() * 5 + props.height / 2
    )
  }
}

const emits = defineEmits(['generate-code'])
// 生产随机文本(字母和数字)
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
  emits('generate-code', code)
  return code
}
</script>

<style lang="scss" scoped>
.canvas {
  background: #f7f7f7;
}
</style>