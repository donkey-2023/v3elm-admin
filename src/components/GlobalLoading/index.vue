<template>
  <div class="global-loading-wrap">
    <div class="loading-view">
      <canvas ref="canvasRef" width="26" height="26" style="margin-top: 6px;"></canvas>
      <div class="loading-text">加载中...</div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { requestAnimationFrame } from '@utils/index'

const canvasRef = ref(null)
let n = 0
let ctx = null
let timer = null
onMounted(() => {
  setTimeout(() => {
    ctx = canvasRef.value.getContext('2d')
    timer = window.requestAnimationFrame(showLoading)
    localStorage.setItem('global-loading-timer', timer)
  }, 0)
})

window.requestAnimationFrame = requestAnimationFrame

function showLoading() {
  console.log('----------showLoading' + n + '----------')
  const diff = (Math.PI / 60) * n++
  ctx.clearRect(0, 0, 26, 26)
  ctx.beginPath()
  ctx.arc(13, 13, 12, 0, 2 * Math.PI)
  ctx.strokeStyle = 'rgba(200,200,200,0.6)'
  ctx.closePath()
  ctx.stroke()
  ctx.beginPath()
  ctx.lineCap = 'round'
  ctx.arc(13, 13, 12, -Math.PI / 2 + diff, diff)
  ctx.strokeStyle = 'rgba(255,255,255,1)'
  ctx.stroke()
  timer = window.requestAnimationFrame(showLoading)
  localStorage.setItem('global-loading-timer', timer)
}
</script>

<style lang="scss" scoped>
.global-loading-wrap {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 2000;
  .loading-view {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 62px;
    height: 64px;
    background-color: rgba(102, 102, 102, 1);
    border-radius: 5px;
    .loading-text {
      margin-top: 4px;
      text-align: center;
      font-size: 12px;
      color: rgba(255, 255, 255, 1);
      transform: scale(0.9);
    }
  }
}
</style>