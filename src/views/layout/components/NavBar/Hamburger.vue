<template>
  <div class="hamburger" @click="toggleCollapse">
    <svg-icon :icon="$store.getters.isCollapse ? 'menuOpen' : 'menuClose'"></svg-icon>
  </div>
</template>

<script setup>
import { useStore } from 'vuex'
const store = useStore()
const toggleCollapse = () => {
  store.commit('sideBar/toggleCollapse')
}
</script>

<style lang="scss" scoped>
.hamburger {
  float: left;
  margin-left: 15px;
  font-size: 20px;
  cursor: pointer;
}
</style>