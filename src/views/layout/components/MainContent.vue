<template>
  <div class="main-content">
    <router-view v-slot="{ Component }">
      <transition name="fade" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
  </div>
</template>

<style lang="scss" scoped>
.main-content {
  width: 100%;
  height: 100%;
  padding: 10px;
  box-sizing: border-box;
}
.fade-leave-active,
.fade-enter-active {
  transition: all 0.2s;
}

.fade-enter-from {
  opacity: 0;
  transform: translateX(-50px);
}

.fade-leave-to {
  opacity: 0;
  transform: translateX(50px);
}
</style>