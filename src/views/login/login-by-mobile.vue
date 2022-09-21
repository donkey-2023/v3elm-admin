<template>
  <el-form :model="formData" label-width="0px" style="width:100%;">
    <el-form-item>
      <input-wrapper
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
      <div class="slider-container">
        <div class="graph-wrapper"></div>
        <div class="btn-wrapper">
          <div class="slider">
            <span class="arrow"></span>
          </div>
          <div class="tips">向右滑动完成验证</div>
        </div>
      </div>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">登录</el-button>
    </el-form-item>
  </el-form>
</template>

<script setup>
import { ref } from 'vue'
import { Iphone } from '@element-plus/icons-vue'
import InputWrapper from '@views/components/InputWrapper'
import ShortMsg from '@views/components/ShortMsg'
const formData = ref({
  mobileNo: '',
  msg: ''
})
const onSubmit = () => {
  console.log('onsubmit')
}
</script>

<style lang="scss" scoped>
.slider-container {
  position: relative;
  width: 100%;
  margin-bottom: 15px;
  .graph-wrapper {
    position: absolute;
  }
  .btn-wrapper {
    position: relative;
    margin-left: 2px;
    .slider {
      display: flex;
      justify-content: center;
      align-items: center;
      position: absolute;
      left: 0px;
      top: 0;
      width: 34px;
      height: 32px;
      border: solid 1px #dcdfe6;
      box-shadow: 0 0 3px 0 #dcdfe6;
      cursor: pointer;
      .arrow {
        width: 14px;
        height: 12px;
        background-image: url('@assets/img/slider.png');
        background-position: 0 -25px;
      }
    }
    .tips {
      border: solid 1px #dcdfe6;
      color: #45494c;
      text-align: center;
    }
  }
}
</style>