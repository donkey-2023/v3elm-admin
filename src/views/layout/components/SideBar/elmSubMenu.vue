<template>
  <el-sub-menu v-if="isNotEmpty(menu.children)" :index="menu.id">
    <template #title>
      <el-icon class="icon-wrapper">
        <svg-icon :icon="menu.icon"></svg-icon>
      </el-icon>
      <span>{{ menu.name }}</span>
    </template>
    <ElmSubMenu v-for="item in menu.children" :menu="item" :key="item.id"></ElmSubMenu>
  </el-sub-menu>
  <el-menu-item v-else :index="menu.path" @click="clickMenu(menu)">
    <el-icon class="icon-wrapper">
      <svg-icon :icon="activeMenu.path === menu.path ? (menu.icon + '1'): menu.icon"></svg-icon>
    </el-icon>
    <span>{{ menu.name }}</span>
  </el-menu-item>
</template>

<script setup name="ElmSubMenu">
import { computed } from 'vue'
import { isNotEmpty } from '@/utils/verify'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'

const props = defineProps({
  menu: {
    type: [Array, Object]
  }
})

const router = useRouter()
const store = useStore()
const activeMenu = computed(() => store.getters.activeMenu)

const clickMenu = menu => {
  router.push(menu.url)
}
</script>

<style lang="scss" scoped>
.el-sub-menu .el-icon.icon-wrapper {
  margin-right: 10px;
}
</style>