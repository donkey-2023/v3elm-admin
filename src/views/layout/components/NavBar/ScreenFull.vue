<template>
  <div class="screen-full" @click="toggleFullScreen">
    <svg-icon :icon="isFull? 'fullscreen-exit1':'fullscreen1' " />
  </div>
</template>
<script setup>
import { ref, onMounted, onBeforeMount } from 'vue'
import screenfull from 'screenfull'

const isFull = ref(false)
const toggleFullScreen = () => {
  if (screenfull.isEnabled) {
    screenfull.toggle()
  }
}
const fn = () => {
  isFull.value = screenfull.isFullscreen
}
onMounted(() => {
  screenfull.on('change', fn)
})

onBeforeMount(() => {
  screenfull.off('change')
})
</script>

<style lang="scss" scoped>
.screen-full {
  margin: 0 15px;
  cursor: pointer;
  font-size: 26px;
  &:hover {
    color: #53a8ff;
  }
}
</style>