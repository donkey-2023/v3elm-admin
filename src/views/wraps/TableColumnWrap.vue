<template>
  <to-be-rendered></to-be-rendered>
</template>

<script setup>
import { h, useSlots } from 'vue'
import { isNotEmpty } from '@/utils/verify'
import { useStore } from 'vuex'

const columnsOption = []
const slots = useSlots()
// 过滤注释了的代码
const defaultSlot = slots.default().filter(item => !!item.props)
isNotEmpty(defaultSlot) &&
  defaultSlot.forEach((item, index) => {
    const label = item.props.type === 'selection' ? '复选框' : '序号'
    columnsOption.push({
      label: item.props.label || label,
      visible: true,
      order: index,
      props: item.props
    })
  })

const store = useStore()
// 支持表格列隐藏和表头排序
const myRender = () => {
  return h(() => {
    // 获取用户调整后的列配置数据
    const adjustedColumns = store.getters.adjustedColumns
    const arr = isNotEmpty(adjustedColumns) ? adjustedColumns : columnsOption
    const result = []

    isNotEmpty(arr) &&
      arr.forEach(item1 => {
        const i = defaultSlot.findIndex(item2 => item2.props.label === item1.props.label)
        i > -1 && item1.visible && result.push(defaultSlot[i])
      })
    return result
  })
}
const toBeRendered = myRender()
defineExpose({
  columnsOption
})
</script>

<style>
</style>