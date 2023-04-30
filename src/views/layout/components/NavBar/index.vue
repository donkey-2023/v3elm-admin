<template>
  <div class="navbar-wrapper">
    <div class="header">
      <hamburger></hamburger>
      <bread-crumb></bread-crumb>
      <avatar></avatar>
      <screen-full></screen-full>
    </div>
    <div class="tabs"></div>
  </div>
</template>
  
<script setup>
import Hamburger from './Hamburger.vue'
import BreadCrumb from './BreadCrumb.vue'
import ScreenFull from './ScreenFull.vue'
import Avatar from './Avatar.vue'
</script>
  
<style lang="scss" scoped>
.navbar-wrapper {
  height: 90px;
  width: 100%;
  background: #fff;
  .header {
    height: 38px;
    line-height: 38px;
    width: 100%;
    padding: 5px 0;
    border-bottom: solid 1px #f3f3f3;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
    :after {
      clear: both;
    }
  }
}
</style>