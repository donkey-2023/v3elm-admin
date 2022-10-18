<template>
  <el-form :model="formData" label-width="0px" style="width:100%;">
    <el-form-item>
      <input-wrap
        v-model="formData.username"
        label="用户名"
        placeholder="请输入用户名"
        clearable
        :prefix-icon="User"
      ></input-wrap>
    </el-form-item>
    <el-form-item>
      <input-wrap
        v-model="formData.password"
        label="密码"
        placeholder="请输入密码"
        :prefix-icon="Lock"
        show-password
      ></input-wrap>
    </el-form-item>
    <el-form-item>
      <graph-verify-wrap v-model="formData.verifyCode" label="验证码"></graph-verify-wrap>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">登录</el-button>
    </el-form-item>
  </el-form>
</template>

<script setup>
import { reactive } from 'vue'
import { User, Lock } from '@element-plus/icons-vue'
import InputWrap from '@views/wraps/InputWrap'
import GraphVerifyWrap from '@views/wraps/GraphVerifyWrap'
import { showLoading, hideLoading } from '@utils/index'

const formData = reactive({
  username: '',
  password: '',
  verifyCode: ''
})
const onSubmit = () => {
  console.log('onsubmit')
}
</script>

<style lang="scss" scoped>
</style>