<template>
  <div class="navbar-container">
    <div class="layout-wrapper">
      <hamburger></hamburger>
      <bread-crumb></bread-crumb>
    </div>
    <div class="tags-wrapper"></div>
  </div>
</template>
  
<script setup>
import Hamburger from './Hamburger.vue'
import BreadCrumb from './BreadCrumb.vue'
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
    padding: 5px 15px;
    border-bottom: solid 1px #f3f3f3;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  }
}
</style>