<template>
  <div class="navbar-wrapper">
    <hamburger></hamburger>
    <bread-crumb></bread-crumb>
    <avatar></avatar>
    <screen-full></screen-full>
  </div>
</template>
  
<script setup>
import hamburger from './hamburger.vue'
import breadCrumb from './breadCrumb.vue'
import screenFull from './screenFull.vue'
import Avatar from './avatar.vue'
</script>
  
<style lang="scss" scoped>
.navbar-wrapper {
  height: 38px;
  line-height: 38px;
  width: 100%;
  padding: 5px 0;
  border-bottom: solid 1px #f3f3f3;
  background-color: #fff;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
}
</style>