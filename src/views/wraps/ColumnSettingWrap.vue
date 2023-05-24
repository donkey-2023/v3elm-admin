<template>
  <el-dialog v-model="dialogVisible" title="Tips" width="30%" :before-close="handleClose">
    <span>This is a message</span>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="close">Cancel</el-button>
        <el-button type="primary" @click="close">Confirm</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
const props = defineProps({
  dialogVisible: {
    type: Boolean,
    default: false
  },
  columnsOption: {
    type: Array,
    default: []
  }
})
const emits = defineEmits(['close'])
const close = () => {
  emits('close')
}
</script>

<style lang="scss" scoped>
</style>