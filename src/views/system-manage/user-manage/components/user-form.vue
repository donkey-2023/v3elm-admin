<template>
  <el-card shadow="never">
    <template #header>
      <span>用户列表</span>
    </template>
    <div class="form-wrap">
      <el-form label-width="100px" :model="dataForm" inline="true" size="medium">
        <el-form-item label="用户名称">
          <el-input v-model="dataForm.userName" />
        </el-form-item>
        <el-form-item label="手机号码">
          <el-input v-model="dataForm.phone" />
        </el-form-item>
      </el-form>
      <div class="btn-wrapper" :class="deviceType === 'mobile' && 'mobile'">
        <el-button type="primary" @click="query">
          <el-icon>
            <Search />
          </el-icon>
          <span>查询</span>
        </el-button>
        <el-button @click="reset">
          <el-icon>
            <Refresh />
          </el-icon>
          <span>重置</span>
        </el-button>
      </div>
    </div>
    <div ref="tableWrapRef" class="table-wrap">
      <column-setting-wrap
        v-if="stgDlgVisible"
        :columnWrapRef="columnWrapRef"
        @close="stgDlgVisible = false"
      ></column-setting-wrap>
      <div class="tool-bar">
        <div class="left-part">
          <el-button type="success" @click="add" plain>
            <el-icon>
              <Plus />
            </el-icon>
            <span>新增</span>
          </el-button>
          <el-button
            type="danger"
            @click="del"
            :disabled="!selection || selection.length === 0"
            plain
          >
            <el-icon>
              <Delete />
            </el-icon>
            <span>删除</span>
          </el-button>
        </div>
        <div class="right-part">
          <full-screen-wrap :tableWrapRef="tableWrapRef"></full-screen-wrap>
          <el-icon @click="stgDlgVisible = true">
            <svg-icon icon="setting"></svg-icon>
          </el-icon>
        </div>
      </div>
      <el-table
        ref="tableRef"
        :data="tableData"
        row-key="id"
        @selection-change="onSelectionChange"
        border
        style="width: 100%;"
      >
        <table-column-wrap ref="columnWrapRef" :key="$store.getters.key">
          <el-table-column type="selection" label width="60" align="center" />
          <el-table-column type="index" width="60" align="center" />
          <el-table-column prop="userName" label="用户名称" width="100" align="center" />
          <el-table-column prop="phone" label="手机号码" width="150" align="center" />
          <el-table-column prop="sex" label="性别" width="100" align="center">
            <template #default="{ row}">
              <span v-if="row.sex === '1'" type="text">男</span>
              <span v-else type="text">女</span>
            </template>
          </el-table-column>
          <el-table-column prop="deptName" label="部门名称" width="150" align="center" />
          <el-table-column prop="status" label="状态" width="180" align="center">
            <template #default="{ row}">
              <el-tag v-if="row.status === '1'" type="success">正常</el-tag>
              <el-tag v-else type="danger">禁用</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="creatTime" label="创建时间" width="200" align="center" />
          <el-table-column label="操作" width="200" align="center">
            <template #default="scope">
              <div class="btn-icon-wrap">
                <el-icon class="btn-icon" @click.prevent="update(scope.row)">
                  <Edit />
                </el-icon>
                <el-icon class="btn-icon" style="color: red;" @click.prevent="del(scope.row,1)">
                  <Delete />
                </el-icon>
              </div>
            </template>
          </el-table-column>
        </table-column-wrap>
      </el-table>
      <add-or-update v-if="aouVisible" :initData="initData" @close="aouVisible = false"></add-or-update>
    </div>
  </el-card>
</template>

<script setup>
import { ref, reactive, computed } from 'vue'
import { useStore } from 'vuex'
import $http from '@/utils/http/index'
import TableColumnWrap from '@/views/wraps/TableColumnWrap.vue'
import ColumnSettingWrap from '@/views/wraps/ColumnSettingWrap.vue'
import FullScreenWrap from '@/views/wraps/FullScreenWrap.vue'
import AddOrUpdate from '../add-or-update.vue'
import mitt from '@/utils/mitt'

const store = useStore()
const deviceType = computed(() => store.getters.deviceType)
const dataForm = reactive({
  userName: '',
  phone: ''
})

let arr = []
// 查询
const tableData = ref([])
const query = () => {
  $http.post('/loadUsersInfo', dataForm).then(res => {
    arr = res.data || []
    tableData.value = arr.filter(item => {
      const condition1 = dataForm.userName ? item.userName.indexOf(dataForm.userName) > -1 : true
      const condition2 = dataForm.phone ? item.phone.indexOf(dataForm.phone) > -1 : true
      return condition1 && condition2
    })
  })
}

mitt.on('clickDeptTreeNode', deptId => {
  tableData.value = arr.filter(item => {
    const condition1 = dataForm.userName ? item.userName.indexOf(dataForm.userName) > -1 : true
    const condition2 = dataForm.phone ? item.phone.indexOf(dataForm.phone) > -1 : true
    const conditio3 = item.deptId.indexOf(deptId) > -1
    return condition1 && condition2 && conditio3
  })
})
query()

// 重置
const reset = () => {
  dataForm.userName = ''
  dataForm.phone = ''
}

const tableRef = ref(null)
const selection = ref(null)
const onSelectionChange = rows => {
  selection.value = rows
}

const aouVisible = ref(false)
const initData = ref({})
const add = () => {
  aouVisible.value = true
  initData.value = {
    type: 'add'
  }
}
const update = row => {
  aouVisible.value = true
  initData.value = {
    type: 'edit',
    ...row
  }
}

const del = (row, length) => {
  const ln = length ? length : selection.value && selection.value.length
  ElMessageBox.confirm(`是否删除${ln > 1 ? ln : '此'}条数据？`, '提示', {
    showCancelButton: 'true',
    cancelButtonText: '取消',
    confirmButtonText: '确认',
    type: 'warning'
  })
    .then(() => {
      ElMessage({
        type: 'success',
        message: '删除成功（仅供演示）！'
      })
    })
    .catch(() => {})
}

const tableWrapRef = ref(null)
const columnWrapRef = ref(null)
const stgDlgVisible = ref(false)
</script>

<style lang="scss" scoped>
.form-wrap {
  padding-top: 10px;
  border-bottom: solid 1px #e4e7ed;
  background: #fff;
  overflow: hidden;
  .btn-wrapper {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    padding-bottom: 15px;
    width: 100%;
    ::v-deep .el-form-item__content {
      flex-wrap: nowrap;
      justify-content: center;
    }

    &.mobile {
      justify-content: center;
      width: 100%;
      ::v-deep .el-button {
        width: 30%;
        margin-right: 20px;
      }
    }
  }
}
::v-deep .el-select.el-select--medium {
  width: 90%;
}
.table-wrap {
  margin-top: 10px;
  padding: 10px;
  background: #fff;
  .tool-bar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    .left-part {
      display: flex;
      justify-content: flex-start;
      align-items: center;
    }
    .right-part {
      display: flex;
      justify-content: flex-end;
      align-items: center;
      .el-icon {
        margin-left: 10px;
        font-size: 22px;
        cursor: pointer;
        &:hover {
          color: #53a8ff;
        }
      }
    }
  }
}
.btn-icon-wrap {
  display: flex;
  justify-content: space-around;
  padding: 0 20px;
  width: 100%;
  .btn-icon {
    font-size: 18px;
    vertical-align: middle;
    cursor: pointer;
  }
}
::v-deep .el-table__row--level-0 td:first-child {
  .cell {
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
::v-deep .el-table__row--level-1 {
  .cell {
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>