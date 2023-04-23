<template>
  <scroll-bar :wheel-speed="30" class="scroll-bar">
    <div class="system-info">
      <svg-icon icon="Vue" class="system-icon"></svg-icon>
      <div class="system-name">Vue3-elm管理系统</div>
    </div>
    <el-menu
      text-color="#fff"
      active-text-color="#ffd04b"
      background-color="rgb(48, 65, 86)"
      class="el-menu-vertical"
      :unique-opened="true"
    >
      <ElmSubMenu v-for="item in menus" :key="item.id" :menu="item"></ElmSubMenu>
    </el-menu>
  </scroll-bar>
</template>

<script setup>
import { ref } from 'vue'
import { useStore } from 'vuex'
import ElmSubMenu from './ElmSubMenu.vue'
import $http from '@/utils/http/index'

const store = useStore()
const menus = ref(store.getters.asyncRoutes)

store.dispatch('user/getUserInfo')
</script>

<style lang="scss" scoped>
.scroll-bar {
  height: 100%;
  background-color: rgb(48, 65, 86);
  .system-info {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: nowrap;
    width: 220px;
    padding: 14px 0;
    color: #fff;
    .system-icon {
      width: 22px;
      height: 22px;
      padding-right: 10px;
    }
    .system-name {
      height: 22px;
      line-height: 22px;
    }
  }
  .el-menu-vertical {
    .el-sub-menu {
      width: 220px;
    }
  }
}
</style>