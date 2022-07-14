<template>
  <div class="container">
      <el-form :model="formInline" label-width="0px" class="form-wrapper">
        <el-row>
          <el-col :span="24">
            <el-form-item>
              <input-wrapper v-model="formInline.username" label="用户名" placeholder="请输入用户名"></input-wrapper>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item>
              <input-wrapper v-model="formInline.password" label="密码" placeholder="请输入密码"></input-wrapper>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item>
              <el-button type="primary" @click="onSubmit">登录</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
// import inputWrapper from '@comp/InputWrapper'
const formInline = ref({
  username: 'admin',
  password: '123'
})
const onSubmit = () => {
  console.log('onsubmit')
}
</script>
<style lang="scss">
  @import '@/styles/base.scss';
  body{
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>
<style lang="scss" scoped>
.container{
    height: 40vh;
    margin: 0 40px;
    .form-wrapper{
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 20px;
        background: #fff;
        ::v-deep .el-button{
          width:100%;
        }
    }
}
</style>
