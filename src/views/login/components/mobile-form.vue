<template>
  <el-form ref="ruleFormRef" :model="formData" :rules="rules" label-width="0px" style="width:100%;">
    <el-form-item prop="mobileNo">
      <input-wrap
        ref="btnRef"
        v-model="formData.mobileNo"
        label="手机号"
        placeholder="请输入11位手机号码"
        maxlength="11"
        clearable
        :prefix-icon="Iphone"
      ></input-wrap>
    </el-form-item>
    <el-form-item prop="shortMsgCode" class="last-form-item">
      <short-msg
        v-model="formData.shortMsgCode"
        label="验证码"
        placeholder="请输入验证码"
        :mobileNo="formData.mobileNo"
        @setVal="setVerifyCode"
      ></short-msg>
    </el-form-item>
    <el-form-item>
      <slider-verify @success="formData.sliderVerify = true" />
    </el-form-item>
    <el-form-item>
      <el-button
        :disabled="!formData.sliderVerify"
        v-elm-enter="onSubmit"
        type="primary"
        @click="onSubmit"
      >{{ btnText }}</el-button>
    </el-form-item>
  </el-form>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { Iphone } from '@element-plus/icons-vue'
import InputWrap from '@views/wraps/InputWrap'
import ShortMsg from '@views/wraps/ShortMsg'
import { ElMessage } from 'element-plus'
import { useStore } from 'vuex'

const store = useStore()

const formData = reactive({
  mobileNo: '13511111111',
  shortMsgCode: '',
  sliderVerify: false
})
const rules = reactive({
  mobileNo: [
    {
      required: true,
      message: '手机号码不为空',
      trigger: 'change'
    }
  ],
  shortMsgCode: [
    {
      required: true,
      message: '验证码不为空',
      trigger: 'change'
    }
  ]
})

let verifyCode = null
const setVerifyCode = code => {
  verifyCode = code
}

const ruleFormRef = ref(null)
const btnText = ref('登录')
const onSubmit = () => {
  ruleFormRef.value.validate((valid, fields) => {
    if (valid) {
      if (formData.shortMsgCode != verifyCode) {
        ElMessage.warning('短信验证码输入错误')
        return
      }
      if (!formData.sliderVerify) return false
      btnText.value = '登录中...'
      store.dispatch('app/login', formData).then(() => {
        ElMessage.success('登录成功')
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