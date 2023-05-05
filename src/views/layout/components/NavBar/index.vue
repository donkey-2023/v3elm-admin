<template>
  <div class="navbar-wrapper">
    <div class="left-part">
      <hamburger></hamburger>
      <bread-crumb></bread-crumb>
    </div>
    <div class="right-part">
      <screen-full></screen-full>
      <avatar></avatar>
    </div>
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
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 3px 25px 3px 10px;
  box-sizing: border-box;
  border-bottom: solid 1px #d9d9d9;
  background-color: #fff;
  .left-part {
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }
  .right-part {
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }
}
</style>