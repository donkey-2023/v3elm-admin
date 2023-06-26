<template>
  <el-dialog
    :model-value="true"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :title="initData.type === 'add' ? '新增' : '修改' "
    :width="deviceType === 'mobile' ? '90%' : '50%'"
    align-center
    @close="handleClose"
  >
    <el-form ref="ruleFormRef" :model="dataForm" :rules="rules" label-width="100px" size="medium">
      <el-row>
        <el-col :span="12">
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
        </el-col>
        <el-col :span="12">
          <el-form-item label="菜单名称" prop="name">
            <el-input v-model="dataForm.name" />
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="图标" prop="icon">
            <menu-icon @clickIcon="clickIcon" @click="showPop" :visible="popVisible">
              <el-input
                v-model="dataForm.icon"
                readonly
                placeholder="点击选择图标"
                :prefix-icon="Search"
              />
            </menu-icon>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="权限标识" prop="auth">
            <el-input v-model="dataForm.auth" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="组件路径" prop="path">
            <el-input v-model="dataForm.path" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="状态">
            <el-radio-group v-model="dataForm.status">
              <el-radio label="1">启用</el-radio>
              <el-radio label="0">禁用</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="排序">
            <el-input-number v-model="dataForm.order"></el-input-number>
          </el-form-item>
        </el-col>
      </el-row>
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
import MenuIcon from './menu-icon.vue'
import { Search } from '@element-plus/icons-vue'

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
  name: [{ required: true, message: '不能为空', trigger: 'blur' }],
  icon: [{ required: true, message: '不能为空', trigger: 'blur' }]
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

// 点击图标输入框，显示popover
const popVisible = ref(false)
const showPop = () => {
  popVisible.value = true
}
// 显示已选中的图标名称
const clickIcon = name => {
  dataForm.icon = name
  // 清除图标的表单校验
  ruleFormRef.value.clearValidate('icon')
  popVisible.value = false
}
</script>

<style lang="scss" scoped>
.el-input.el-input--medium {
  width: 90%;
}
::v-deep .el-select.el-select--medium {
  width: 90%;
}
</style>