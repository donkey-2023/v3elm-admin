<template>
  <el-form ref="ruleFormRef" :model="formData" :rules="rules" label-width="0px" style="width:100%;">
    <el-form-item prop="mobileNo">
      <input-wrap
        ref="btnRef"
        v-model="formData.mobileNo"
        label="手机号"
        placeholder="请输入手机号码"
        maxlength="11"
        clearable
        :prefix-icon="Iphone"
      ></input-wrap>
    </el-form-item>
    <el-form-item prop="msg" class="last-form-item">
      <short-msg v-model="formData.msg" label="验证码" placeholder="请输入验证码"></short-msg>
    </el-form-item>
    <el-form-item>
      <slider-verify />
    </el-form-item>
    <el-form-item>
      <el-button v-elm-enter="onSubmit" type="primary" @click="onSubmit">登录</el-button>
    </el-form-item>
  </el-form>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { Iphone } from '@element-plus/icons-vue'
import InputWrap from '@views/wraps/InputWrap'
import ShortMsg from '@views/wraps/ShortMsg'
import { ElMessage } from 'element-plus'
import httpUtil from '@/utils/httpUtil'

const formData = reactive({
  mobileNo: '',
  msg: ''
})
const rules = reactive({
  mobileNo: [
    {
      required: true,
      message: '手机号码不为空',
      trigger: 'change'
    }
  ],
  msg: [
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
      httpUtil.post('/login', formData).then(data => {
        ElMessage.success('登陆成功')
      })
    }
  })
}

// 预加载图片
Array.from({ length: 9 }).forEach((e, i) => {
  new Image().src = require(`@assets/img/slider/${i + 1}.jpeg`)
})
</script>

<style lang="scss" scoped>
::v-deep .last-form-item {
  .el-form-item__error {
    margin-top: -18px;
  }
}
</style>