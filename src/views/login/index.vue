<template>
  <div class="outer-container">
    <el-row justify="center">
      <el-col :xs="22" :sm="19" :md="19" :lg="18" :xl="16">
        <div class="inner-wrapper">
          <div class="title"></div>
          <el-form :model="formInline" label-width="0px" style="width:100%;">
            <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
              <el-tab-pane label="账号密码登录" name="first">
                <transition name="tab1-fade">
                  <div v-if="activeName == 'first'">
                    <el-form-item>
                      <input-wrapper
                        v-model="formInline.username"
                        label="用户名"
                        placeholder="请输入用户名"
                        clearable
                        :prefix-icon="User"
                      ></input-wrapper>
                    </el-form-item>
                    <el-form-item>
                      <input-wrapper
                        v-model="formInline.password"
                        label="密码"
                        placeholder="请输入密码"
                        :prefix-icon="Lock"
                        show-password
                      ></input-wrapper>
                    </el-form-item>
                    <el-form-item>
                      <verify-code-wrapper v-model="formInline.verifyCode" label="验证码"></verify-code-wrapper>
                    </el-form-item>
                  </div>
                </transition>
              </el-tab-pane>
              <el-tab-pane label="手机号登录" name="second">
                <transition name="tab2-fade">
                  <div v-if="activeName == 'second'">
                    <el-form-item>
                      <input-wrapper
                        v-model="formInline.mobileNo"
                        label="手机号"
                        placeholder="请输入手机号码"
                        maxlength="11"
                        clearable
                        :prefix-icon="Iphone"
                      ></input-wrapper>
                    </el-form-item>
                    <el-form-item>
                      <short-msg v-model="formInline.msg" label="验证码" placeholder="请输入验证码"></short-msg>
                    </el-form-item>
                  </div>
                </transition>
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
import InputWrapper from '@views/components/InputWrapper'
import ShortMsg from '@views/components/ShortMsg'
import verifyCodeWrapper from '@views/components/VerifyCodeWrapper'

const activeName = ref('first')

const handleClick = (tab, event) => {
  console.log(tab, event)
}

const formInline = ref({
  username: 'admin',
  password: '123',
  verifyCode: '',
  mobileNo: '',
  msg: ''
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
