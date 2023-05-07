<template>
  <div class="personal-center">
    <el-row :gutter="10">
      <el-col :xs="24" :sm="24" :md="24" :lg="7" :xl="5">
        <personal-info></personal-info>
      </el-col>
      <el-col :xs="24" :sm="24" :md="24" :lg="17" :xl="19">
        <base-info></base-info>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import PersonalInfo from './components/personal-info.vue'
import BaseInfo from './components/base-info.vue'
</script>

<style lang="scss" scoped>
.personal-center {
  width: 100%;
  padding: 20px;
  box-sizing: border-box;
}
</style>