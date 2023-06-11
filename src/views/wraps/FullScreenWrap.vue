<template>
  <el-icon @click="toggleFullScreen">
    <svg-icon :icon="isFull? 'fullscreen-exit2':'fullscreen2' "></svg-icon>
  </el-icon>
</template>

<script setup>
import { ref } from 'vue'
import screenfull from 'screenfull'

const props = defineProps({
  tableWrapRef: {
    type: Object
  }
})

// 全屏切换
const isFull = ref(false)
const toggleFullScreen = () => {
  if (screenfull.isEnabled) {
    if (!isFull.value) {
      screenfull.request(props.tableWrapRef)
    } else {
      screenfull.exit(props.tableWrapRef)
    }
    isFull.value = !isFull.value
  }
}
</script>

<style lang="scss" scoped>
</style>