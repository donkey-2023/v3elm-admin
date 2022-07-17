<!-- #参考文章https://juejin.cn/post/6844903901699784711 -->
<template>
  <div ref="containerRef">
    <canvas ref="canvasRef" :width="width" :height="height" class="container"></canvas>
  </div>
</template>

<script setup>
import { ref, onMounted, getCurrentInstance, defineEmits } from 'vue'
const emits = defineEmits(['generate-code'])
const props = defineProps({
  height: {
    type: Number,
    default: 32
  },
  lineNum: {
    type: Number,
    default: 5
  }
})

//第一种方式获取dom节点：
let canvasRef = ref(null)
let containerRef = ref(null)
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

//第二种方式获取dom节点：
// const { proxy } = getCurrentInstance()
// onMounted(() => {
//   const dom = proxy.$refs['canvasRef']
//   let ctx = dom.getContext('2d')
// })

let onClick = () => {
  var _ = this
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

let getRandomRgbStr = (o = 0.6) =>
  255 * Math.random() +
  ',' +
  255 * Math.random() +
  ',' +
  255 * Math.random() +
  ',' +
  o

// 绘制干扰线
let drawLine = () => {
  ctx.clearRect(0, 0, width, props.height)
  for (let i = 0; i < props.lineNum; i++) {
    ctx.strokeStyle = 'rgba(' + getRandomRgbStr(0.4) + ')'
    ctx.beginPath()
    ctx.moveTo(Math.random() * width, Math.random() * props.height)
    ctx.lineTo(Math.random() * width, Math.random() * props.height)
    ctx.stroke()
  }
}
// 画文字
let drawText = () => {
  let len = text.length
  for (let i = 0; i < len; i++) {
    ctx.fillStyle = 'rgb(' + getRandomRgbStr() + ')'
    ctx.font = '30px Helvetica'
    ctx.textBaseline = 'middle'

    let xPos = (width / 4) * Math.random() + (width / 4 + 5) * i
    ctx.fillText(
      text[i],
      xPos > width - 30 ? width - 30 : xPos,
      Math.random() * 5 + props.height / 2
    )
  }
}

let randomText = () => {
  let code = 'xyXY'.replace(/[xyXY]/g, function (c) {
    let res = ''
    switch (c) {
      case 'x':
        res = Math.floor(Math.random() * 5)
        break
      case 'X':
        res = 5 + Math.floor(Math.random() * 4)
        break
      case 'y':
        //小写字母'a'的ASCII是97,a~z的ASCII码就是97 + 0~25;
        //然后调用String.fromCharCode()传入ASCII值
        res = String.fromCharCode(97 + Math.ceil(Math.random() * 13))
        break
      case 'Y':
        res = String.fromCharCode(110 + Math.ceil(Math.random() * 12))
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
.container {
  background: #f7f7f7;
}
</style>