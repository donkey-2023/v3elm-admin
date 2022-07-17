<template>
  <el-row type="flex" justify="space-between" class="container">
    <el-col :xs="14" :sm="16" :md="16" :lg="15" :xl="16">
      <el-input v-bind="$attrs" maxlength="4"></el-input>
    </el-col>
    <el-col :xs="8" :sm="6" :md="6" :lg="7" :xl="6" class="btn-wrapper">
      <graph-verify-code></graph-verify-code>
    </el-col>
  </el-row>
</template>

<script setup>
</script>

<style lang="scss" scoped>
</style>