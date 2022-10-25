<template>
  <div class="container">
    <div class="input-wrapper">
      <div class="label">{{ $attrs.label }}</div>
      <el-input v-bind="$attrs" maxlength="4" @input="inputCaptcha">
        <template #prefix>
          <svg-icon :icon="icon"></svg-icon>
        </template>
      </el-input>
    </div>
    <div class="code-wrapper">
      <graph-verify ref="captchaRef" :height="38" @captcha="updateCaptcha"></graph-verify>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { ElMessage } from 'element-plus'

let correctCaptcha = '' // 正确的验证码
const updateCaptcha = val => {
  correctCaptcha = val
}

const icon = ref('captcha01')
const captchaRef = ref(null)
const emits = defineEmits(['clear'])
// 监听验证码的输入
const inputCaptcha = val => {
  if (val && val.length === 4) {
    if (val.toLowerCase() === correctCaptcha) {
      icon.value = 'captcha02'
    } else {
      // 刷新验证码
      captchaRef.value.init()
      emits('clear')
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  justify-content: space-between;
  flex-wrap: nowrap;
  width: 100%;
  margin: 15px auto;
  .input-wrapper {
    position: relative;
    padding: 2px 0;
    flex-grow: 1;
    max-width: calc(100% - 120px);
    border: solid 1px #dcdfe6;
    .label {
      position: absolute;
      top: -8px;
      left: 30px;
      z-index: 9;
      padding: 0 5px;
      line-height: 1;
      font-size: 14px;
      color: #888;
      background: #fff;
    }
  }
  .code-wrapper {
    display: flex;
    align-items: flex-end;
    flex-basis: 100px;
    height: 38px;
  }
}
::v-deep {
  .el-input__inner {
    border: none;
  }
  .canvas-container {
    display: flex;
    align-items: flex-end;
  }
  .el-input__prefix-inner {
    display: flex;
    align-items: center;
  }
}
</style>