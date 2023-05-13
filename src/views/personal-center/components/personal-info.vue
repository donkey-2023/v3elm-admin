<template>
  <div class="personal-info">
    <div class="header">个人信息</div>
    <div class="body">
      <div class="avatar">
        <img :src="imgUrl" alt />
      </div>
      <div class="info">
        <div class="label">姓名</div>
        <div class="value ellipsis">{{ userInfo.name }}</div>
      </div>
      <div class="info">
        <div class="label">性别</div>
        <div class="value">{{ userInfo.sex === 1 ? '男': '女'}}</div>
      </div>
      <div class="info">
        <div class="label">电话</div>
        <div class="value">{{userInfo.phone }}</div>
      </div>
      <div class="info">
        <div class="label">生日</div>
        <div class="value">{{ userInfo.birthday}}</div>
      </div>
      <div class="info">
        <div class="label">邮箱</div>
        <div class="value ellipsis">{{ userInfo.email}}</div>
      </div>
      <div class="info">
        <div class="label">户籍</div>
        <div class="value ellipsis">{{ userInfo.county }}</div>
      </div>
      <div class="info">
        <div class="label">IP地址</div>
        <div class="value">{{ userInfo.ip }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useStore } from 'vuex'

const store = useStore()
const imgUrl = ref(null)
const userInfo = computed(() => store.getters.userInfo)
setTimeout(() => {
  imgUrl.value = require(`@assets/img/${userInfo.value.sex == '1' ? 'boy' : 'girl'}.jpeg`)
}, 0)
</script>

<style lang="scss" scoped>
.personal-info {
  border-radius: 8px;
  border: solid 1px #f3f3f3;
  background-color: #fff;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  .header {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    height: 60px;
    padding: 0 20px;
    color: #303133;
    border-bottom: 1px solid #ebeef5;
  }

  .body {
    padding: 10px 20px;
    .avatar {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      height: 180px;
      border-bottom: 1px solid #ebeef5;
      img {
        width: 120px;
        height: 120px;
        border-radius: 50%;
      }
    }
    .info {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 40px;
      &:not(:last-child) {
        border-bottom: 1px solid #ebeef5;
      }
      .label {
        color: #333333;
        min-width: 50px;
      }
      .value {
        color: #aaaaaa;
      }
    }
  }
}
</style>