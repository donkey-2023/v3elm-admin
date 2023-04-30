<template>
  <div class="screen-full">
    <svg-icon :icon="isFull? 'fullscreen-exit1':'fullscreen1' " @click="toggleScreen" />
  </div>
</template>
<script setup>
import { ref } from 'vue'
import screenfull from 'screenfull'

const isFull = ref(false)
const toggleScreen = () => {
  if (screenfull.isEnabled) {
    screenfull.on('change', () => {
      if (screenfull.isFullscreen) {
        isFull.value = true
      } else {
        isFull.value = false
      }
    })
    screenfull.toggle()
  }
}
</script>

<style lang="scss" scoped>
.screen-full {
  float: right;
  margin: 0 15px;
  cursor: pointer;
  font-size: 26px;
}
</style>