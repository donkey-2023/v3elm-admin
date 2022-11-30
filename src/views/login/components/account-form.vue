
<template>
  <el-form ref="ruleFormRef" :model="formData" :rules="rules" label-width="0px" style="width:100%;">
    <el-form-item prop="username">
      <input-wrap
        v-model="formData.username"
        label="用户名"
        placeholder="请输入用户名：admin"
        clearable
        :prefix-icon="User"
      ></input-wrap>
    </el-form-item>
    <el-form-item prop="password">
      <input-wrap
        v-model="formData.password"
        label="密码"
        placeholder="请输入密码：123"
        :prefix-icon="Lock"
        show-password
      ></input-wrap>
    </el-form-item>
    <el-form-item prop="verifyCode" class="last-form-item">
      <graph-verify-wrap v-model="formData.verifyCode" @clear="clear" label="验证码"></graph-verify-wrap>
    </el-form-item>
    <el-form-item>
      <el-button
        v-elm-enter="onSubmit"
        :disabled="formData.verifyCode.length !== 4"
        type="primary"
        @click="onSubmit"
      >登录</el-button>
    </el-form-item>
  </el-form>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { User, Lock } from '@element-plus/icons-vue'
import InputWrap from '@views/wraps/InputWrap'
import GraphVerifyWrap from '@views/wraps/GraphVerifyWrap'
import { ElMessage } from 'element-plus'
import { useStore } from 'vuex'

const store = useStore()
const formData = reactive({
  username: 'admin',
  password: '123',
  verifyCode: ''
})

const rules = reactive({
  username: [
    {
      required: true,
      message: '用户名不为空',
      trigger: 'change'
    }
  ],
  password: [
    {
      required: true,
      message: '密码不为空',
      trigger: 'change'
    }
  ],
  verifyCode: [
    {
      required: true,
      message: '验证码不为空',
      trigger: 'change'
    }
  ]
})

const ruleFormRef = ref(null)
const onSubmit = () => {
  ruleFormRef.value.validate((valid, fields) => {
    if (valid) {
      if (formData.username !== 'admin' || formData.password !== '123') {
        ElMessage.warning('用户名或密码输入不正确')
        return
      }
      if (formData.verifyCode.length < 4) {
        return
      }
      store
        .dispatch('app/login', formData)
        .then(() => {
          ElMessage.success('登陆成功')
        })
        .finally(() => {
          rules.verifyCode[0].message = '验证码不为空'
        })
    }
  })
}

const clear = () => {
  formData.verifyCode = ''
  rules.verifyCode[0].message = '验证码输入错误'
}
</script>

<style lang="scss" scoped>
::v-deep .last-form-item {
  .el-form-item__error {
    margin-top: -15px;
  }
}
</style>