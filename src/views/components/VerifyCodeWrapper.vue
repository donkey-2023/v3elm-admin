<template>
  <div class="container">
    <div class="input-wrapper">
      <div class="label">{{ $attrs.label }}</div>
      <el-input v-bind="$attrs" maxlength="4"></el-input>
    </div>
    <div class="code-wrapper">
      <graph-verify-code :height="38"></graph-verify-code>
    </div>
  </div>
</template>

<script setup>
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
      z-index: 999;
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
}
</style>