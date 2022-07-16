<template>
  <el-row type="flex" justify="space-between" class="container">
    <el-col :xs="14" :sm="16" :md="16" :lg="15" :xl="16">
      <div class="wrapper">
        <div class="label">{{ $attrs.label }}</div>
        <el-input v-bind="$attrs"></el-input>
      </div>
    </el-col>
    <el-col :xs="8" :sm="6" :md="6" :lg="7" :xl="6" class="btn-wrapper">
      <el-button>获取验证码</el-button>
    </el-col>
  </el-row>
</template>

<script setup>
</script>

<style lang="scss" scoped>
.container {
  margin-bottom: 20px;
  .btn-wrapper {
    display: flex;
    align-items: flex-end;
    ::v-deep .el-button {
      height: 38px;
    }
  }
}
.wrapper {
  position: relative;
  margin-top: 20px;
  padding: 2px 0;
  width: 100%;
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
::v-deep .el-input__inner {
  border: none;
}
::v-deep .el-button {
  width: 100%;
}
</style>