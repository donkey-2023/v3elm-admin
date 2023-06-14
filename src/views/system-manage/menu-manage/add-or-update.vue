<template>
  <el-dialog
    :model-value="true"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :title="initData.type === 'add' ? '新增' : '修改' "
    :width="deviceType === 'mobile' ? '90%' : '30%'"
    align-center
    @close="handleClose"
  >
    <el-form ref="ruleFormRef" :model="dataForm" :rules="rules" label-width="100px" size="medium">
      <el-form-item label="上级菜单" prop="parentMenu">
        <el-tree-select
          v-model="dataForm.parentMenu"
          :data="menuData"
          :render-after-expand="false"
          placeholder="请选择"
          :props="{
            label:'name',
            value:'id'
          }"
          check-strictly
        />
      </el-form-item>
      <el-form-item label="菜单名称" prop="name">
        <el-input v-model="dataForm.name" />
      </el-form-item>
      <el-form-item label="状态">
        <el-radio-group v-model="dataForm.status">
          <el-radio label="1">正常</el-radio>
          <el-radio label="0">禁用</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="排序">
        <el-input-number v-model="dataForm.order"></el-input-number>
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="handleClose">取消</el-button>
        <el-button type="primary" @click="submit">确定</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup>
import { computed, reactive, ref } from 'vue'
import { useStore } from 'vuex'
import $http from '@/utils/http/index'

const store = useStore()
const deviceType = computed(() => store.getters.deviceType)
const props = defineProps({
  initData: {
    type: Object,
    default: {}
  }
})

let dataForm = reactive({ status: '0', order: '1' })
const rules = reactive({
  parentMenu: [{ required: true, message: '不能为空', trigger: 'change' }],
  name: [{ required: true, message: '不能为空', trigger: 'blur' }]
})
if (props.initData.type === 'edit') {
  dataForm = reactive({ parentMenu: props.initData.pid || '0', ...props.initData })
}

// 加载部门下拉树数据
const menuData = ref([])
const queryDeptInfo = () => {
  $http.post('/getUserMenus').then(res => {
    menuData.value = [
      {
        id: '0',
        name: '顶级菜单',
        children: res.data || []
      }
    ]
  })
}
queryDeptInfo()

const ruleFormRef = ref(null)
const submit = async () => {
  if (!ruleFormRef.value) return
  await ruleFormRef.value.validate(valid => {
    if (valid) {
      ElMessage.success('提交成功（仅供演示）！')
      emits('close')
    }
  })
}

const emits = defineEmits(['close'])
const handleClose = () => {
  emits('close')
}
</script>

<style lang="scss" scoped>
.el-input.el-input--medium {
  width: 85%;
}
::v-deep .el-select.el-select--medium {
  width: 85%;
  .el-input.el-input--medium {
    width: 100%;
    .el-input__inner {
      width: 100%;
    }
  }
}
</style>