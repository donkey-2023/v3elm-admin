<template>
  <div ref="containerRef" class="container">
    <el-popover :visible="visible" placement="bottom" :width="width" trigger="click">
      <template #reference>
        <slot></slot>
      </template>
      <div class="wrap">
        <div class="search-box">
          <el-input
            v-model="iconName"
            placeholder="请输入图标名称"
            :suffix-icon="Search"
            @input="onInput"
          />
        </div>
        <el-scrollbar max-height="30vh">
          <div class="data-list">
            <div class="item" v-for="(item,index) in dataList" :key="index" @click="onClick(item)">
              <el-icon class="icon-wrapper">
                <svg-icon :icon="item"></svg-icon>
              </el-icon>
              <div class="icon-name">{{ item }}</div>
            </div>
          </div>
        </el-scrollbar>
      </div>
    </el-popover>
  </div>
</template>
<script setup>
import { svgList } from '@/icons'
import { ref, nextTick } from 'vue'
import { Search } from '@element-plus/icons-vue'

const dataList = ref(svgList)
// 根据外层盒子的宽度来设置popover的宽度
const containerRef = ref(null)
const width = ref(0)
const iconName = ref('')
nextTick(() => {
  const $box = containerRef.value.getBoundingClientRect()
  width.value = $box.width - 30
})

const emits = defineEmits(['clickIcon'])
const props = defineProps({
  visible: {
    type: Boolean,
    default: false
  }
})
// 处理菜单点击事件
const onClick = iconName => {
  emits('clickIcon', iconName)
}
// 根据输入的菜单名称过滤数据
const onInput = val => {
  dataList.value = svgList.filter(item => item.toLowerCase().indexOf(val.toLowerCase()) > -1)
}
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
  ::v-deep .el-input.el-input--medium {
    width: 95%;
  }
  .wrap {
    position: relative;
    padding: 20px;
    .search-box {
      position: absolute;
      top: 0;
      left: 0;
      z-index: 10;
    }
  }
}
.data-list {
  padding: 0 10px;
  display: flex;
  flex-wrap: wrap;
  .item {
    width: 33%;
    height: 50px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    font-size: 16px;
    cursor: pointer;
    .icon-wrapper {
      margin-right: 10px;
    }
  }
}
</style>