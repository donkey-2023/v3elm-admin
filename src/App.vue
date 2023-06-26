<template>
  <el-config-provider :locale="locale">
    <router-view />
  </el-config-provider>
</template>

<script setup>
import { ref } from 'vue'
import { ElConfigProvider } from 'element-plus'
import zhCn from 'element-plus/lib/locale/lang/zh-cn'
// 将element plus组件的语言设置为中文
const locale = ref(null)
locale.value = zhCn
</script>