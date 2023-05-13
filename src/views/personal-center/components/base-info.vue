<template>
  <div class="base-info" :class="deviceType === 'mobile' && 'mobile'">
    <el-tabs v-model="activeName" class="demo-tabs">
      <el-tab-pane label="基本资料" name="first">
        <base-info-form></base-info-form>
      </el-tab-pane>
      <el-tab-pane label="修改密码" name="second">
        <update-psd-form></update-psd-form>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useStore } from 'vuex'
import baseInfoForm from './baseInfo-form.vue'
import updatePsdForm from './updatePsd-form.vue'

const store = useStore()
const deviceType = computed(() => store.getters.deviceType)
const activeName = ref('first')
</script>

<style lang="scss" scoped>
.base-info {
  padding: 0 20px;
  border-radius: 8px;
  border: solid 1px #f3f3f3;
  background-color: #fff;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);

  &.mobile {
    margin-top: 10px;
    margin-bottom: 10px;
  }
  ::v-deep .demo-tabs {
    .el-tabs__item {
      font-size: 16px;
      height: 60px;
      line-height: 60px;
      color: #303133;
    }
  }
}
</style>