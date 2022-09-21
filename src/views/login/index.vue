<template>
  <div class="outer-container">
    <el-row justify="center">
      <el-col :xs="22" :sm="19" :md="19" :lg="18" :xl="16">
        <div class="inner-wrapper">
          <div class="title"></div>
          <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
            <el-tab-pane label="账号密码登录" name="first">
              <transition name="tab1-fade">
                <div v-if="activeName == 'first'">
                  <login-by-account></login-by-account>
                </div>
              </transition>
            </el-tab-pane>
            <el-tab-pane label="手机号登录" name="second">
              <transition name="tab2-fade">
                <div v-if="activeName == 'second'">
                  <login-by-mobile></login-by-mobile>
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
import { ref } from 'vue'
import LoginByAccount from './login-by-account.vue'
import LoginByMobile from './login-by-mobile.vue'

const activeName = ref('first')

const handleClick = (tab, event) => {
  console.log(tab, event)
}
</script>
<style lang="scss">
@import '@/styles/base.scss';
body {
  display: flex;
  justify-content: center;
  align-items: center;
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

@media screen and (min-width: 1920px) {
  .outer-container {
    width: 30vw;
  }
}
@media screen and (min-width: 1200px) and (max-width: 1920px) {
  .outer-container {
    width: 40vw;
  }
}
@media screen and (min-width: 992px) and (max-width: 1200px) {
  .outer-container {
    width: 50vw;
  }
}
@media screen and (min-width: 768px) and (max-width: 992px) {
  .outer-container {
    width: 60vw;
  }
}
@media screen and (min-width: 420px) and (max-width: 768px) {
  .outer-container {
    width: 75vw;
  }
}
@media screen and (max-width: 420px) {
  .outer-container {
    width: 100vw;
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
