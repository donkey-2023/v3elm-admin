<template>
  <el-row :gutter="10" class="container">
    <el-col :xs="24" :sm="24" :md="7" :lg="7" :xl="5">
      <dept-tree></dept-tree>
    </el-col>
    <el-col :xs="24" :sm="24" :md="17" :lg="17" :xl="19">
      <user-form></user-form>
    </el-col>
  </el-row>
</template>
  
<script setup>
import DeptTree from './components/dept-tree.vue'
import UserForm from './components/user-form'
</script>
  
<style lang="scss" scoped>
.container {
  height: 100%;
  overflow: hidden;
}
</style>