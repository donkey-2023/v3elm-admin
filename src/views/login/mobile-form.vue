<template>
  <el-form :model="formData" label-width="0px" style="width:100%;">
    <el-form-item>
      <input-wrapper
        ref="btnRef"
        v-model="formData.mobileNo"
        label="手机号"
        placeholder="请输入手机号码"
        maxlength="11"
        clearable
        :prefix-icon="Iphone"
      ></input-wrapper>
    </el-form-item>
    <el-form-item>
      <short-msg v-model="formData.msg" label="图形验证码" placeholder="请输入图形验证码"></short-msg>
    </el-form-item>
    <el-form-item>
      <slider-verify />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">登录</el-button>
    </el-form-item>
  </el-form>
</template>

<script setup>
import { ref, toRef } from 'vue'
import { Iphone } from '@element-plus/icons-vue'
import InputWrapper from '@views/components/InputWrapper'
import ShortMsg from '@views/components/ShortMsg'

const formData = ref({
  mobileNo: '',
  msg: ''
})

// 预加载图片
Array.from({ length: 9 }).forEach((e, i) => {
  new Image().src = require(`@assets/img/slider/${i + 1}.jpeg`)
})
</script>

<style lang="scss" scoped>
</style>