<template>
  <el-dialog
    :model-value="true"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :title="initData.type === 'add' ? '新增' : '修改' "
    :width="deviceType === 'mobile' ? '90%' : '40%'"
    align-center
    @close="handleClose"
  >
    <el-form ref="ruleFormRef" :model="dataForm" :rules="rules" label-width="100px" size="medium">
      <el-form-item label="角色名称" prop="roleName">
        <el-input v-model="dataForm.roleName" />
      </el-form-item>
      <el-form-item label="角色值" prop="roleVal">
        <el-input v-model="dataForm.roleVal" />
      </el-form-item>
      <el-form-item label="状态">
        <el-radio-group v-model="dataForm.status">
          <el-radio label="1">启用</el-radio>
          <el-radio label="0">禁用</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="描述" prop="remark">
        <el-input v-model="dataForm.remark" type="textarea" />
      </el-form-item>
      <el-form-item label="菜单权限">
        <div class="tree-container">
          <div class="checkbox-wrap">
            <el-checkbox @change="switchExpandAll" label="展开/折叠" size="large" />
            <el-checkbox @change="switchCheckAll" label="全选/全不选" size="large" />
          </div>
          <div class="tree-wrap">
            <el-tree
              ref="treeRef"
              :data="menuData"
              node-key="id"
              show-checkbox
              :props="{
              label:'name',
              value:'id'
            }"
            />
          </div>
        </div>
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
import { isNotEmpty } from '@/utils/verify'

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
  roleName: [{ required: true, message: '不能为空', trigger: 'blur' }],
  roleVal: [{ required: true, message: '不能为空', trigger: 'blur' }]
})
if (props.initData.type === 'edit') {
  dataForm = reactive({ ...props.initData })
}

// 加载部门下拉树数据
const menuData = ref([])
const queryDeptInfo = () => {
  $http.post('/getUserMenus').then(res => {
    menuData.value = res.data
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

const treeRef = ref(null)
// 全部展开/全部折叠
const switchExpandAll = val => {
  expandAllFn(menuData.value, val)
}
const expandAllFn = (arr, val) => {
  arr.forEach(item => {
    treeRef.value.store.nodesMap[item.id].expanded = val
    isNotEmpty(arr) && expandAllFn(item.children, val)
  })
}

// 全部选中/全不选中
const switchCheckAll = val => {
  menuData.value.forEach(item => {
    treeRef.value.setChecked(item.id, val, true)
  })
}
</script>
  
<style lang="scss" scoped>
.el-input.el-input--medium {
  width: 90%;
}
.el-textarea.el-input--medium {
  width: 90%;
}
::v-deep .el-select.el-select--medium {
  width: 90% !important;
}
.tree-container {
  width: 90%;
  padding: 0;
  .checkbox-wrap {
    margin-top: -2px;
  }
  .tree-wrap {
    padding: 5px 0;
    border: solid 1px #f1f1f1;
    border-radius: 5px;
  }
}
</style>