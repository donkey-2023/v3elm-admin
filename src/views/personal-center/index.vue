<template>
  <div class="personal-center">个人中心</div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'

const router = useRouter()
const store = useStore()
// 设置activeMenu,从而更新面包屑
store.commit('menu/setActiveMenu', router.currentRoute.value)
</script>

<style lang="scss" scoped>
.personal-center {
  display: flex;
  justify-content: center;
}
</style>