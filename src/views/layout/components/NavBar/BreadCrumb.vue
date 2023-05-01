<template>
  <div v-if="deviceType === '01'" class="bread-crumb">
    <span :key="index" v-for="(item,index ) in fullNameArr" class="menu-name">
      {{ item }}
      <span v-if="index < fullNameArr.length - 1" class="separator">/</span>
    </span>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
const store = useStore()
const fullNameArr = computed(() => {
  const activeMenu = store.getters.activeMenu
  if (activeMenu && activeMenu.fullName) {
    return activeMenu.fullName.split('/')
  } else if (activeMenu.name) {
    return [activeMenu.name]
  }
  return []
})

// 01 PC , 02 Mobile
const deviceType = computed(() => store.getters.deviceType)
</script>

<style lang="scss" scoped>
.bread-crumb {
  float: left;
  margin: 0 10px;
  font-size: 15px;
  color: #333;
  .menu-name:last-child {
    color: #97a8be;
  }
  .separator {
    padding: 0 5px;
    color: #97a8be;
  }
}
</style>