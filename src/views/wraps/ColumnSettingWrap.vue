<template>
  <div class="column-setting">
    <el-dialog
      :model-value="true"
      title="自定义列"
      :width="deviceType === 'mobile' ? '90%' : '30%'"
      align-center
      @close="handleClose"
    >
      <el-scrollbar max-height="60vh">
        <draggable v-model="data" class="wrapper" @end="onEnd" item-key="index">
          <template #item="{ element }">
            <div class="item">
              <el-checkbox v-model="element.visible" label size="large" />
              <span class="text">{{ element.label }}</span>
            </div>
          </template>
        </draggable>
      </el-scrollbar>

      <template #footer>
        <div class="dialog-footer">
          <el-button @click="set('0')">重置</el-button>
          <el-button type="primary" @click="set">确定</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { computed, reactive } from 'vue'
import { useStore } from 'vuex'
import { isNotEmpty } from '@/utils/verify'
import draggable from 'vuedraggable'

const store = useStore()
const adjustedColumns = store.getters.adjustedColumns
const deviceType = computed(() => store.getters.deviceType)

const props = defineProps({
  columnsOption: {
    type: Array,
    default: []
  }
})

const emits = defineEmits(['close'])
const handleClose = () => {
  emits('close')
}
let data = []
if (isNotEmpty(adjustedColumns)) {
  data = reactive(JSON.parse(JSON.stringify(adjustedColumns)))
} else {
  data = reactive(JSON.parse(JSON.stringify(props.columnsOption)))
}
const dataStr = JSON.stringify(data)

const set = type => {
  // 判断表格列是否有变化
  if (JSON.stringify(data) !== dataStr) {
    store.dispatch('column/updateCache', type === '0' ? [] : JSON.parse(JSON.stringify(data)))
  }
  emits('close')
}
//拖拽结束事件
const onEnd = ({ oldIndex, newIndex }) => {
  const dragItem = data[oldIndex]

  data.splice(oldIndex < newIndex ? newIndex + 1 : newIndex, 0, dragItem)
  data.splice(oldIndex < newIndex ? oldIndex : oldIndex + 1, 1)
  data.forEach((item, index) => {
    item.order = index
  })
}
</script>

<style lang="scss" scoped>
.column-setting {
  ::v-deep .el-dialog__header {
    border-bottom: 1px solid #dee2e6;
    margin-right: 0;
  }
  ::v-deep .el-dialog__body {
    padding: 10px 0 10px 20px;
    .wrapper {
      .item {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        font-size: 16px;
        .text {
          margin-left: 10px;
        }
      }
    }
  }

  ::v-deep .el-dialog__footer {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    border-top: 1px solid #dee2e6;
    padding: 15px;
  }
}
</style>