<template>
  <el-form ref="ruleFormRef" :model="dataForm" :rules="rules" label-width="100px" size="medium">
    <el-form-item label="旧密码" prop="oldPsd">
      <el-input v-model="dataForm.oldPsd" type="password" />
    </el-form-item>
    <el-form-item label="新密码" prop="newPsd">
      <el-input v-model="dataForm.newPsd" type="password" />
    </el-form-item>
    <el-form-item label="确认密码" prop="confirmPsd">
      <el-input v-model="dataForm.confirmPsd" type="password" />
    </el-form-item>
  </el-form>
  <div class="btn-wrapper" :class="deviceType === 'mobile' && 'mobile'">
    <el-button type="primary" @click="submitForm">提交</el-button>
    <el-button @click="close">关闭</el-button>
  </div>
</template>

<script setup>
import { ref, reactive, computed } from 'vue'
import { useStore } from 'vuex'

const store = useStore()
const deviceType = computed(() => store.getters.deviceType)
let dataForm = reactive({
  oldPsd: '',
  newPsd: '',
  confirmPsd: ''
})

const rules = reactive({
  oldPsd: [{ required: true, message: '不能为空', trigger: 'blur' }],
  newPsd: [{ required: true, message: '不能为空', trigger: 'blur' }],
  confirmPsd: [{ required: true, message: '不能为空', trigger: 'blur' }]
})

const ruleFormRef = ref(null)
const submitForm = async () => {
  if (!ruleFormRef.value) return
  await ruleFormRef.value.validate(valid => {
    if (valid) {
      if (dataForm.newPsd !== dataForm.confirmPsd) {
        ElMessage.warning('新密码和确认密码不一致')
        return
      }
      ElMessage.warning('操作失败，仅供演示！')
    }
  })
}

const activeMenu = computed(() => store.getters.activeMenu)
const close = () => {
  store.commit('menu/removeSingleTab', activeMenu.value)
}
</script>

<style lang="scss" scoped>
.el-form {
  padding: 20px 10px 20px 0;
  ::v-deep .el-form-item__label {
    font-size: 16px;
  }
}
.btn-wrapper {
  padding: 0 10px 40px 70px;
  ::v-deep .el-button {
    margin-right: 20px;
    width: 45%;
  }
  &.mobile {
    margin-top: -10px;
    padding-left: 24px;
    ::v-deep .el-button {
      margin: 0 0 15px;
      width: 100%;
    }
  }
}
</style>