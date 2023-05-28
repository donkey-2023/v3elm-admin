<template>
  <to-be-rendered></to-be-rendered>
</template>

<script setup>
import { h, useSlots } from 'vue'
import { isNotEmpty } from '@/utils/verify'
import { useStore } from 'vuex'

const columnsOption = []
const slots = useSlots()
const defaultSlot = slots.default()
isNotEmpty(defaultSlot) &&
  defaultSlot.forEach((item, index) => {
    columnsOption.push({
      label: item.props.label || '序号',
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
        columnsOption[i].visible = item1.visible
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