<template>
  <div class="system-info">
    <svg-icon icon="Vue" class="system-icon" :style="{'padding-right': isCollapse ? '' : '10px'}"></svg-icon>
    <div v-if="!isCollapse" class="system-name ellipsis">V3elm Admin</div>
  </div>
  <scroll-bar :wheel-speed="30" class="scroll-bar">
    <el-menu
      :unique-opened="true"
      :default-active="activeMenu.path"
      :collapse="isCollapse"
      :collapse-transition="false"
      text-color="#fff"
      active-text-color="#ffd04b"
      background-color="rgb(48, 65, 86)"
      class="el-menu-vertical"
    >
      <ElmSubMenu v-for="item in allMenus" :key="item.id" :menu="item"></ElmSubMenu>
    </el-menu>
  </scroll-bar>
</template>

<script setup>
import { computed, watch } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import ElmSubMenu from './elmSubMenu.vue'

const store = useStore()
const router = useRouter()

const isCollapse = computed(() => store.getters.isCollapse)
const activeMenu = computed(() => store.getters.activeMenu)
const allMenus = computed(() => store.getters.asyncRoutes)

//获取当前登录人的信息
store.dispatch('user/getUserInfo')

// 若当前路由fullPath为'/'，则须清空活跃菜单的缓存数据
watch(
  () => router.currentRoute.value,
  newValue => {
    newValue.fullPath === '/' && store.commit('menu/clearActiveMenu')
  },
  {
    immediate: true
  }
)
</script>

<style lang="scss" scoped>
.system-info {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: nowrap;
  width: 100%;
  padding: 14px 0;
  color: #fff;
  background-color: rgb(48, 65, 86);
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
.scroll-bar {
  width: 100%;
  height: 100%;
  background-color: rgb(48, 65, 86);

  .el-menu-vertical {
    border-right: none;
    width: 100%;
    &.el-menu--collapse {
      ::v-deep .el-sub-menu__title {
        display: flex;
        justify-content: center;
      }
    }
  }
}
</style>