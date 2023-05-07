<template>
  <div class="avatar">
    <el-dropdown placement="bottom-start" trigger="click" @command="handleCommand">
      <div class="img-wrapper">
        <img :src="imgUrl" alt />
        <el-icon>
          <arrow-down />
        </el-icon>
      </div>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item command="a">
            <el-icon>
              <svg-icon icon="personalCenter"></svg-icon>
            </el-icon>
            <span>个人中心</span>
          </el-dropdown-item>
          <el-dropdown-item command="b" divided>
            <el-icon>
              <svg-icon icon="logout"></svg-icon>
            </el-icon>
            <span>退出登录</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { ArrowDown } from '@element-plus/icons-vue'
import { ElMessageBox } from 'element-plus'
const store = useStore()
const router = useRouter()

const imgUrl = ref(null)
setTimeout(() => {
  imgUrl.value = require(`@assets/img/${store.getters.userInfo.sex == '1' ? 'boy' : 'girl'}.jpeg`)
}, 0)

const handleCommand = command => {
  if (command === 'a') {
    router.push('/personalCenter')
  } else if (command === 'b') {
    ElMessageBox.confirm('确定退出登录?', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }).then(() => {
      store.dispatch('app/logout')
    })
  }
}
</script>

<style lang="scss" scoped>
.avatar {
  display: flex;
  justify-items: center;
  cursor: pointer;
  .img-wrapper {
    display: flex;
    justify-content: center;
    align-items: flex-end;
    img {
      width: 40px;
      height: 40px;
      border-radius: 10px;
      margin-right: 5px;
    }
  }
}
.el-icon {
  font-size: 18px;
}
</style>