<template>
  <div class="personal-center">
    personal-center
    <el-row :gutter="10">
      <el-col :xs="8" :sm="6" :md="4" :lg="3" :xl="1">
        <div class="grid-content ep-bg-purple" />
      </el-col>
      <el-col :xs="4" :sm="6" :md="8" :lg="9" :xl="11">
        <div class="grid-content ep-bg-purple-light" />
      </el-col>
      <el-col :xs="4" :sm="6" :md="8" :lg="9" :xl="11">
        <div class="grid-content ep-bg-purple" />
      </el-col>
      <el-col :xs="8" :sm="6" :md="4" :lg="3" :xl="1">
        <div class="grid-content ep-bg-purple-light" />
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'

const router = useRouter()
const store = useStore()
// 设置activeMenu,从而更新面包屑
// store.commit('menu/setActiveMenu', router.currentRoute.value)
</script>

<style lang="scss" scoped>
.personal-center {
  display: flex;
  justify-content: center;
}
</style>