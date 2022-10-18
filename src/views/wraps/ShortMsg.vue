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
      <el-button>获取验证码</el-button>
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
  margin-bottom: 20px;
  .input-wrapper {
    position: relative;
    margin-top: 20px;
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
  .btn-wrapper {
    display: flex;
    align-items: flex-end;
    width: 90px;
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