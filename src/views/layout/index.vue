<template>
  <el-container class="app-container">
    <el-aside class="aside-container" :width="$store.getters.isCollapse ? '60px' :'220px'">
      <sider-bar></sider-bar>
    </el-aside>
    <el-container class="main-container">
      <nav-bar></nav-bar>
      <main-content></main-content>
    </el-container>
  </el-container>
</template>

<script setup>
import { computed } from 'vue'
import { useStore } from 'vuex'
import SiderBar from './components/SideBar.vue'
import MainContent from './components/MainContent.vue'
import NavBar from './components/NavBar.vue'

const store = useStore()
const asideWidth = computed(() => (store.getters.isCollapse ? '60px' : '220px'))
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
  .aside-container {
    height: 100%;
    overflow: hidden;
    transition: width 0.2s;
    position: fixed;
    top: 0;
    left: 0;
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