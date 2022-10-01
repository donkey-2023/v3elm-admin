<template>
  <el-form :model="formData" label-width="0px" style="width:100%;">
    <el-form-item>
      <input-wrapper
        v-model="formData.username"
        label="用户名"
        placeholder="请输入用户名"
        clearable
        :prefix-icon="User"
      ></input-wrapper>
    </el-form-item>
    <el-form-item>
      <input-wrapper
        v-model="formData.password"
        label="密码"
        placeholder="请输入密码"
        :prefix-icon="Lock"
        show-password
      ></input-wrapper>
    </el-form-item>
    <el-form-item>
      <verify-code-wrapper v-model="formData.verifyCode" label="验证码"></verify-code-wrapper>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">登录</el-button>
    </el-form-item>
  </el-form>
</template>

<script setup>
import { ref } from 'vue'
import { User, Lock } from '@element-plus/icons-vue'
import InputWrapper from '@views/components/InputWrapper'
import verifyCodeWrapper from '@views/components/VerifyCodeWrapper'
const formData = ref({
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