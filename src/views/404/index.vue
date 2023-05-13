<template>
  <div class="container404">
    <el-result title="404提示" sub-title="抱歉，您访问的页面不存在!">
      <template #icon>
        <el-image
          src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
        />
      </template>
      <template #extra>
        <el-button type="primary" @click="back">Back</el-button>
      </template>
    </el-result>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'

const store = useStore()
const router = useRouter()
const back = () => {
  router.go(-1)
  store.commit('menu/removeSingleTab', store.getters.activeMenu)
}
</script>

<style lang="scss" scoped>
.container404 {
  width: 100%;
  height: 100%;
  background: #fff;
}
</style>