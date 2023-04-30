<template>
  <div class="hamburger" @click="toggleCollapse">
    <svg-icon :icon="$store.getters.isCollapse ? 'menuOpen' : 'menuClose'" class="icon"></svg-icon>
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
  font-size: 18px;
  cursor: pointer;
}
</style>