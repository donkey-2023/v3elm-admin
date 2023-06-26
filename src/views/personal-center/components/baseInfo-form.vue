<template>
  <el-form ref="ruleFormRef" :model="dataForm" :rules="rules" label-width="70px" size="medium">
    <el-form-item label="姓名" prop="name">
      <el-input v-model="dataForm.name" />
    </el-form-item>
    <el-form-item label="性别">
      <el-radio-group v-model="dataForm.sex">
        <el-radio label="1">男</el-radio>
        <el-radio label="0">女</el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="电话" prop="phone">
      <el-input v-model="dataForm.phone" maxlength="11" />
    </el-form-item>
    <el-form-item label="生日" prop="birthday">
      <el-date-picker
        v-model="dataForm.birthday"
        type="date"
        format="YYYY-MM-DD"
        value-format="YYYY-MM-DD"
      />
    </el-form-item>
    <el-form-item label="邮箱" prop="email">
      <el-input v-model="dataForm.email" />
    </el-form-item>
    <el-form-item label="户籍" prop="county">
      <el-input v-model="dataForm.county" />
    </el-form-item>
  </el-form>
  <div class="btn-wrapper" :class="deviceType === 'mobile' && 'mobile'">
    <el-button type="primary" @click="submitForm">提交</el-button>
    <el-button @click="reset">重置</el-button>
  </div>
</template>
  
<script setup>
import { ref, reactive, computed } from 'vue'
import { useStore } from 'vuex'

const store = useStore()
const deviceType = computed(() => store.getters.deviceType)
const userInfo = computed(() => store.getters.userInfo)
let dataForm = reactive(JSON.parse(JSON.stringify(userInfo.value)))

const rules = reactive({
  name: [{ required: true, message: '不能为空', trigger: 'blur' }],
  phone: [{ required: true, message: '不能为空', trigger: 'blur' }],
  birthday: [{ required: true, message: '不能为空', trigger: 'blur' }],
  email: [{ required: true, message: '不能为空', trigger: 'blur' }],
  county: [{ required: true, message: '不能为空', trigger: 'blur' }]
})

const ruleFormRef = ref(null)
const submitForm = async () => {
  if (!ruleFormRef.value) return
  await ruleFormRef.value.validate(valid => {
    if (valid) {
      store.commit('user/setUserInfo', JSON.parse(JSON.stringify(dataForm)))
      ElMessage.success('提交成功（仅供演示）！')
    }
  })
}

const reset = () => {
  for (let key of Object.keys(dataForm)) {
    dataForm[key] = userInfo.value[key]
  }
  ruleFormRef.value.clearValidate()
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