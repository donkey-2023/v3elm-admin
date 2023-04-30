<template>
  <el-container class="app-container" :class="deviceType === '02' ? 'mobile' : ''">
    <el-aside class="aside-container" :class="!isCollapse ? 'display' : ''">
      <sider-bar></sider-bar>
    </el-aside>
    <div v-if="deviceType === '02' && !isCollapse" class="mask" @click="hideMask"></div>
    <el-container class="main-container">
      <nav-bar></nav-bar>
      <main-content></main-content>
    </el-container>
  </el-container>
</template>

<script setup>
import { computed } from 'vue'
import { useStore } from 'vuex'
import { MAX_ASIDE_WIDTH, MIN_ASIDE_WIDTH } from '@/utils/constant'
import SiderBar from './components/SideBar.vue'
import MainContent from './components/MainContent.vue'
import NavBar from './components/NavBar'

const store = useStore()
const isCollapse = computed(() => store.getters.isCollapse)
const asideWidth = computed(() => (store.getters.isCollapse ? MIN_ASIDE_WIDTH : MAX_ASIDE_WIDTH))
const deviceType = computed(() => store.getters.deviceType)

const hideMask = () => {
  store.commit('sideBar/toggleCollapse')
}

const setDeviceType = () => {
  // 获取浏览器可视区域的宽度
  const w = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth
  console.log('视口宽度：', w)
  store.commit('app/setDeviceType', w < 1000 ? '02' : '01')
}
setDeviceType()
// 监听浏览器窗口resize事件，当视口宽度小于1000px，将设备类型设置为mobile
window.addEventListener('resize', setDeviceType)
</script>

<style lang="scss">
@import '@/styles/base.scss';
</style>
<style lang="scss" scoped>
.app-container {
  position: relative;
  width: 100%;
  height: 100vh;
  overflow-x: hidden;
  &.mobile {
    .aside-container {
      transform: translateX(-100%);
      transition: transform 0.2s;
      &.display {
        transform: translateX(0);
      }
    }
    .main-container {
      margin-left: 0;
    }
  }

  .aside-container {
    width: v-bind(asideWidth);
    height: 100%;
    overflow: hidden;
    transition: width 0.2s;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 100;
    ::v-deep .view-box {
      width: v-bind(asideWidth);
    }
  }
  .mask {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.3);
    z-index: 99;
  }
  .main-container {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    width: 100%;
    height: 100%;
    background-color: #f7f7f7;
    margin-left: v-bind(asideWidth);
    transition: margin-left 0.2s;
  }
}
</style>