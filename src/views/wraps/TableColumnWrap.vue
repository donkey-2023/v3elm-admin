<template>
  <to-be-rendered></to-be-rendered>
</template>

<script setup>
import { h, useSlots, reactive } from 'vue'
import { isNotEmpty } from '@/utils/verify'

const columnsOption = reactive([])
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

// 支持表格列隐藏和表头排序
const render = () =>
  h(() => {
    const result = []
    isNotEmpty(columnsOption) &&
      columnsOption.forEach(item1 => {
        if (!item1.visible) return
        const i = defaultSlot.findIndex(item2 => item2.props.label === item1.props.label)
        i > -1 && result.push(defaultSlot[i])
      })
    return result
  })
const toBeRendered = render()

defineExpose({
  columnsOption,
  render
})
</script>

<style>
</style>