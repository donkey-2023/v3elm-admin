<template>
  <div class="avatar">
    <el-dropdown placement="bottom-start" @command="handleCommand">
      <div class="img-wrapper">
        <img :src="require(`@assets/img/${sex == '1' ? 'boy' : 'girl'}.jpeg`)" alt />
        <el-icon>
          <arrow-down />
        </el-icon>
      </div>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item command="a">个人中心</el-dropdown-item>
          <el-dropdown-item command="b" divided>退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { ArrowDown } from '@element-plus/icons-vue'
import { ElMessageBox } from 'element-plus'
const store = useStore()
const router = useRouter()
const sex = computed(() => store.getters.userInfo.sex)

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
  float: right;
  margin: -1px 25px 0 0;
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
</style>