<template>
  <div class="wrapper">
    <div class="label">{{ $attrs.label }}</div>
    <el-input v-bind="$attrs"></el-input>
  </div>
</template>

<script setup>
</script>

<style lang="scss" scoped>
.wrapper {
  position: relative;
  margin-top: 10px;
  padding: 2px 0;
  width: 100%;
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
::v-deep .el-input__inner {
  border: none;
  height: 32px;
}
</style>