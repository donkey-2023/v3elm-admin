<template>
  <div type="flex" justify="space-between" class="container">
    <div class="input-wrapper">
      <div class="label">{{ $attrs.label }}</div>
      <el-input v-bind="$attrs" maxlength="6">
        <template #prefix>
          <svg-icon icon="msg"></svg-icon>
        </template>
      </el-input>
    </div>
    <div class="btn-wrapper">
      <el-button
        @click="open"
        :disabled="!props.mobileNo || props.mobileNo.length != 11 || form.showTimer"
        style="position:relative;"
      >
        获取验证码
        <div v-if="form.showTimer" class="timer">{{ form.num + ' s'}}</div>
      </el-button>
    </div>
  </div>
</template>

<script setup>
import { h, ref, reactive } from 'vue'
import { ElNotification } from 'element-plus'
import { generateRandomInt } from '@/utils/index'

const props = defineProps({
  mobileNo: {
    type: [String, Number]
  }
})

const form = reactive({
  showTimer: false,
  num: 30
})

const emits = defineEmits(['setVal'])
const open = () => {
  let code = generateRandomInt(1000, 9999)
  emits('setVal', code)
  ElNotification({
    title: '短信验证码',
    message: h('i', { style: 'color: teal' }, code)
  })

  form.showTimer = true
  fn()
}

const fn = () => {
  setTimeout(() => {
    if (--form.num >= 0) {
      fn()
    } else {
      form.showTimer = false
      form.num = 30
    }
  }, 1000)
}
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  justify-content: space-between;
  flex-wrap: nowrap;
  width: 100%;
  margin-bottom: 20px;
  .input-wrapper {
    position: relative;
    margin-top: 20px;
    padding: 2px 0;
    flex-grow: 1;
    max-width: calc(100% - 120px);
    .label {
      position: absolute;
      top: -4px;
      left: 30px;
      z-index: 9;
      padding: 0 5px;
      line-height: 1;
      font-size: 14px;
      color: #888;
      background: #fff;
    }
  }
  .btn-wrapper {
    position: relative;
    display: flex;
    align-items: flex-end;
    width: 90px;
    .timer {
      display: flex;
      justify-content: center;
      align-items: center;
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      background-color: rgba(255, 255, 255, 1);
      color: #409eff;
    }
  }
}
::v-deep {
  .el-input__inner {
    border: none;
  }
  .el-button {
    width: 100%;
    height: 40px;
  }
  .el-input__prefix-inner {
    display: flex;
    align-items: center;
  }
}
</style>