<template>
  <div class="column-setting">
    <el-dialog
      :model-value="true"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      title="自定义列"
      :width="deviceType === 'mobile' ? '90%' : '28%'"
      align-center
      @close="handleClose"
    >
      <el-scrollbar max-height="60vh">
        <draggable
          v-model="data"
          class="wrapper"
          chosen-class="chosen"
          force-fallback="true"
          @end="onEnd"
          item-key="index"
          handle=".right"
        >
          <template #item="{ element }">
            <div class="item">
              <div class="left">
                <el-checkbox v-model="element.visible" label size="large" />
                <span class="text">{{ element.label }}</span>
              </div>
              <div class="right">
                <el-icon>
                  <Rank></Rank>
                </el-icon>
              </div>
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
  if (type === '0') {
    // 重置 && 判断表格列是否与默认配置一致
    JSON.stringify(props.columnsOption) !== dataStr && store.dispatch('column/updateCache', [])
  } else {
    // 确定 && 判断表格列是否有改动
    JSON.stringify(data) !== dataStr && store.dispatch('column/updateCache', JSON.parse(JSON.stringify(data)))
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
    padding: 10px 0 10px 10px;
    .wrapper {
      .item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin: 0 10px 10px 0;
        padding: 6px 6px 6px 10px;
        background-color: #fdfdfd;
        border: solid 1px #eee;
        border-radius: 8px;
        cursor: not-allowed;
        .left {
          display: flex;
          justify-content: flex-start;
          align-items: center;
          font-size: 16px;
          width: calc(100% - 60px);
          .el-checkbox__inner {
            transform: scale(1.1);
          }
          .text {
            margin-left: 10px;
          }
        }
        .right {
          display: flex;
          justify-content: flex-start;
          align-items: center;
          height: 40px;
          padding: 0 18px;
          cursor: move;
          .el-icon {
            font-size: 20px;
          }
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
.chosen {
  border: solid 2px #3089dc !important;
}
</style>