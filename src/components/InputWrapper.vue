<template>
  <div class="wrapper">
      <div class="label">{{ $attrs.label }}</div>
      <el-input v-bind="$attrs"></el-input>
  </div>
</template>

<script setup>
</script>

<style lang="scss" scoped>
.wrapper{
    position: relative;
    margin-top: 20px;
    padding: 2px 0;
    width: 100%;
    border: solid 1px #dcdfe6;
    .label{
        position: absolute;
        top: -8px;
        left: 20px;
        z-index: 999;
        padding: 0 5px;
        line-height: 1;
        font-size: 14px;
        color: #515a6e;
        background: #fff;
    }
}
::v-deep .el-input__inner{
    border: none;
}
</style>