<template>
  <div class="navbar-container">
    <div class="layout-wrapper">
      <div class="menu-close" @click="toggleCollapse">
        <svg-icon :icon="$store.getters.isCollapse ? 'menuOpen' : 'menuClose'" class="icon"></svg-icon>
      </div>
    </div>
    <div class="tags-wrapper"></div>
  </div>
</template>

<script setup>
import { useStore } from 'vuex'
const store = useStore()
const toggleCollapse = () => {
  store.commit('menu/toggleCollapse')
}
</script>

<style lang="scss" scoped>
.navbar-container {
  height: 80px;
  width: 100%;
  background: #fff;
  .layout-wrapper {
    height: 32px;
    line-height: 32px;
    width: 100%;
    padding: 5px 10px;
    border-bottom: solid 1px #f3f3f3;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
    .menu-close {
      float: left;
      font-size: 18px;
      cursor: pointer;
    }
  }
}
</style>