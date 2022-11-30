<template>
  <el-container class="app-container">
    <el-aside class="aside-container">
      <sider-bar></sider-bar>
    </el-aside>
    <el-container class="offside-container">
      <el-header>Header</el-header>
      <el-main>Main</el-main>
    </el-container>
  </el-container>
</template>

<script setup>
import SiderBar from './components/SideBar.vue'
</script>

<style lang="scss">
@import '@/styles/base.scss';
</style>
<style lang="scss" scoped>
.app-container {
  position: relative;
  width: 100%;
  height: 100vh;
  .aside-container {
    width: 200px;
    height: 100%;
    overflow: hidden;
  }
  .offside-container {
    width: calc(100% - 200px);
    height: 100%;
  }
}
</style>