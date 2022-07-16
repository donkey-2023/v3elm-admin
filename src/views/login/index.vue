<template>
  <div class="outer-container">
    <el-row justify="center">
      <el-col :xs="22" :sm="20" :md="19" :lg="18" :xl="16">
        <div class="inner-wrapper">
          <div class="title"></div>
          <el-form :model="formInline" label-width="0px" class="el-form">
            <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
              <el-tab-pane label="账号密码登录" name="first">
                <el-row>
                  <el-col :span="24">
                    <el-form-item>
                      <input-wrapper
                        v-model="formInline.username"
                        label="用户名"
                        placeholder="请输入用户名"
                        clearable
                        :prefix-icon="User"
                      ></input-wrapper>
                    </el-form-item>
                  </el-col>
                  <el-col :span="24">
                    <el-form-item>
                      <input-wrapper
                        v-model="formInline.password"
                        label="密码"
                        placeholder="请输入密码"
                        :prefix-icon="Lock"
                        show-password
                      ></input-wrapper>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-tab-pane>
              <el-tab-pane label="手机号登录" name="second">
                <el-row>
                  <el-col :span="24">
                    <el-form-item>
                      <input-wrapper
                        v-model="formInline.username"
                        label="手机号"
                        placeholder="请输入手机号码"
                        clearable
                        :prefix-icon="Iphone"
                      ></input-wrapper>
                    </el-form-item>
                  </el-col>
                  <el-col :span="24">
                    <short-msg
                      v-model="formInline.password"
                      label="验证码"
                      placeholder="请输入验证码"
                      :prefix-icon="Cellphone"
                    ></short-msg>
                  </el-col>
                </el-row>
              </el-tab-pane>
            </el-tabs>
            <el-form-item>
              <el-button type="primary" @click="onSubmit">登录</el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { User, Lock, Cellphone, Iphone } from '@element-plus/icons-vue'
// import inputWrapper from '@comp/InputWrapper'

const activeName = ref('first')

const handleClick = (tab, event) => {
  console.log(tab, event)
}

const formInline = ref({
  username: 'admin',
  password: '123'
})
const onSubmit = () => {
  console.log('onsubmit')
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
  height: 40vh;
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

.slide-fade-enter-active {
  transition: all 4s ease-out;
}

.slide-fade-leave-active {
  transition: all 4s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(20px);
  opacity: 0;
}
</style>
