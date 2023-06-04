<template>
  <div class="container">
    <div class="input-wrapper">
      <div class="label">{{ $attrs.label }}</div>
      <el-input v-bind="$attrs" maxlength="4">
        <template #prefix>
          <svg-icon icon="captcha01"></svg-icon>
        </template>
      </el-input>
    </div>
    <div class="code-wrapper">
      <graph-verify :height="32" @captcha="updateCaptcha"></graph-verify>
    </div>
  </div>
</template>

<script setup>
const emits = defineEmits(['setVal'])
const updateCaptcha = val => {
  emits('setVal', val)
}
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: nowrap;
  width: 100%;
  margin: 10px auto;
  .input-wrapper {
    position: relative;
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
  .code-wrapper {
    display: flex;
    align-items: flex-end;
    flex-basis: 100px;
    height: 32px;
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