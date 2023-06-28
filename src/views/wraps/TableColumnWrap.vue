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
    const fixed = item.props.fixed || item.props.fixed === ''
    // 固定左列的顺序值为1，普通列的顺序值为2，固定右列的顺序值为3
    // 结合第52行，从而保证“自定义列”设置页面从上到下的显示排序为：固定左列 ->  普通列 -> 固定右列
    let fixedOrder = 2
    if (fixed) {
      fixedOrder = item.props.fixed === 'right' ? 3 : 1
    }
    const label = item.props.type === 'selection' ? '复选框' : '序号'
    columnsOption.push({
      label: item.props.label || label,
      fixed,
      fixedOrder,
      visible: true,
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
  columnsOption: columnsOption.sort((a, b) => a.fixedOrder - b.fixedOrder)
})
</script>

<style>
</style>