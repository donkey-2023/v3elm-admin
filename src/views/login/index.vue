<template>
  <div class="outer-container">
    <el-row justify="center">
      <el-col :xs="22" :sm="19" :md="19" :lg="18" :xl="16">
        <div ref="innerRef" class="inner-wrapper">
          <div class="title"></div>
          <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
            <el-tab-pane label="账号密码登录" name="first">
              <transition name="tab1-fade">
                <div v-if="activeName == 'first'">
                  <account-form></account-form>
                </div>
              </transition>
            </el-tab-pane>
            <el-tab-pane label="手机号登录" name="second">
              <transition name="tab2-fade">
                <div v-if="activeName == 'second'">
                  <mobile-form></mobile-form>
                </div>
              </transition>
            </el-tab-pane>
          </el-tabs>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, provide, getCurrentInstance } from 'vue'
import AccountForm from './components/account-form.vue'
import MobileForm from './components/mobile-form.vue'

const activeName = ref('first')

const handleClick = (tab, event) => {
  console.log(tab, event)
}

// 与 SliderVerify组件通信，动态修改其宽度
const width = ref(0)
provide('width', width)

const { proxy } = getCurrentInstance()
const updateSliderWidth = () => {
  width.value = proxy.$refs['innerRef'].clientWidth - 80
  console.log('width', width.value)
}

onMounted(() => {
  document.querySelector('body').classList.add('flex-center')
  updateSliderWidth()
})
onBeforeUnmount(() => {
  document.querySelector('body').classList.remove('flex-center')
})

window.addEventListener('resize', updateSliderWidth)
</script>
<style lang="scss">
@import '@/styles/base.scss';
.flex-center {
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: linear-gradient(rgba(176, 176, 238, 0.5), rgba(255, 255, 255, 1));
}
</style>
<style lang="scss" scoped>
.outer-container {
  .inner-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 20px 40px;
    background: #fff;
    ::v-deep .el-button {
      width: 100%;
    }
  }
}
::v-deep .demo-tabs .el-tabs__header {
  display: flex;
  justify-content: center;
  .el-tabs__item {
    font-size: 15px;
  }
  .el-tabs__nav-wrap::after {
    display: none;
  }
}
@media screen and (max-width: 375px) {
  .outer-container {
    width: 90vw;
  }
}
@media screen and (min-width: 376px) {
  .outer-container {
    width: 85vw;
  }
}
@media screen and (min-width: 480px) {
  .outer-container {
    width: 72vw;
  }
}
@media screen and (min-width: 640px) {
  .outer-container {
    width: 65vw;
  }
}
@media screen and (min-width: 768px) {
  .outer-container {
    width: 60vw;
  }
}
@media screen and (min-width: 992px) {
  .outer-container {
    width: 50vw;
  }
}
@media screen and (min-width: 1200px) {
  .outer-container {
    width: 40vw;
  }
}

.tab1-fade-enter-active,
.tab2-fade-enter-active {
  transition: all 0.3s ease-out;
}
.tab1-fade-enter-from {
  transform: translateX(-50%);
  opacity: 0;
}
.tab2-fade-enter-from {
  transform: translateX(50%);
  opacity: 0;
}
::v-deep .el-form-item.el-form-item--default {
  margin-bottom: 10px;
}
</style>
