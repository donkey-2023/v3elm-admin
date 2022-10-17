<template>
  <scroll-bar v-elm-loading="word2" elm-loading-text="加载中..." class="outer">
    <span class="demo01">{{ word1 }}</span>
    <span class="demo02">{{ word1 }}</span>
  </scroll-bar>
</template>

<script setup>
import { ref } from 'vue'
import { showLoading, hideLoading } from '@/utils/index'
const word1 = ref(
  '最近在用VUE写一个后台管理系统，顶部标签页涉及鼠标滚轮事件，由于每个浏览器对滚轮事件的处理方式不一样，个人对这个又不懂，折腾了很久，参考了大神的代码，也把百度翻烂了，找到了一篇陈旧的博文(其实是主题很土，发布时间未知)。写得非常清楚，解决了我的问题'
)
const word2 = ref(true)
setTimeout(() => {
  word2.value = false
}, 500)
showLoading()

setTimeout(() => {
  hideLoading()
}, 2000)
</script>

<style lang="scss">
@import '@/styles/base.scss';
.outer {
  width: 300px;
  height: 100px;
  margin: 100px;
  background-color: rgba(253, 253, 150, 0.5);
}
.demo01 {
  width: 400px;
  // height: 400px;
  padding: 10px;
  white-space: pre-wrap;
  word-wrap: break-word;
  word-break: normal;
}
.demo02 {
  width: 600px;
  height: 100px;
  padding: 10px;
  white-space: nowrap;
}
</style>