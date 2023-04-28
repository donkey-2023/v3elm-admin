<template>
  <scroll-bar :wheel-speed="30" class="scroll-bar">
    <div class="system-info">
      <svg-icon
        icon="Vue"
        class="system-icon"
        :style="{'padding-right': $store.getters.isCollapse ? '' : '10px'}"
      ></svg-icon>
      <div v-if="!$store.getters.isCollapse" class="system-name elipsis">Vue3-elm管理系统</div>
    </div>
    <el-menu
      :unique-opened="true"
      :default-active="$store.getters.activeMenu.id"
      :collapse="$store.getters.isCollapse"
      :collapse-transition="false"
      text-color="#fff"
      active-text-color="#ffd04b"
      background-color="rgb(48, 65, 86)"
      class="el-menu-vertical"
    >
      <ElmSubMenu v-for="item in menus" :key="item.id" :menu="item"></ElmSubMenu>
    </el-menu>
  </scroll-bar>
</template>

<script setup>
import { ref, reactive, computed } from 'vue'
import { useStore } from 'vuex'
import ElmSubMenu from './ElmSubMenu.vue'

const store = useStore()
const menus = ref(store.getters.asyncRoutes)
// const activeMenu = ref(store.getters.activeMenu)
// const activeMenu = computed(() => store.getters.activeMenu)
const asideWidth = computed(() => (store.getters.isCollapse ? '62px' : '222px'))
//获取当前登录人的信息
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
    width: 100%;
    padding: 14px 0;
    color: #fff;
    .system-icon {
      width: 20px;
      height: 20px;
    }
    .system-name {
      max-width: 140px;
      height: 22px;
      line-height: 22px;
    }
  }
  .el-menu-vertical {
    border-right: none;
    .el-sub-menu {
      width: v-bind(asideWidth);
    }
  }
}
</style>