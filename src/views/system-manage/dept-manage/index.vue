<template>
  <div>
    <div class="form-wrap">
      <el-form label-width="100px" :model="dataForm" inline="true" size="medium">
        <el-form-item label="部门名称">
          <el-input v-model="dataForm.deptName" />
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="dataForm.status">
            <el-option label="请选择" value></el-option>
            <el-option label="正常" value="1"></el-option>
            <el-option label="禁用" value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item :class="deviceType === 'mobile' && 'btn-wrapper'">
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
        </el-form-item>
      </el-form>
    </div>
    <div ref="tableWrapRef" class="table-wrap">
      <column-setting-wrap
        v-if="dialogVisible"
        :columnsOption="columnsOption"
        @close="dialogVisible = false"
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
            @click="deleteRow"
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
          <el-icon @click="toggleFullScreen">
            <svg-icon :icon="isFull? 'fullscreen-exit2':'fullscreen2' "></svg-icon>
          </el-icon>
          <el-icon @click="dialogVisible = true">
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
          <el-table-column prop="order" label="序号" width="60" align="center" />
          <el-table-column prop="deptName" label="部门名称" align="center" />
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
                <el-icon class="btn-icon" @click.prevent="updateRow(scope.row)">
                  <Edit />
                </el-icon>
                <el-icon
                  class="btn-icon"
                  style="color: red;"
                  @click.prevent="deleteRow(scope.row,scope.$index)"
                >
                  <Delete />
                </el-icon>
              </div>
            </template>
          </el-table-column>
        </table-column-wrap>
      </el-table>
      <add-or-update v-if="visible" :initData="initData" @close="visible = false"></add-or-update>
    </div>
  </div>
</template>
    
<script setup>
import { ref, reactive, computed, watch } from 'vue'
import { useStore } from 'vuex'
import screenfull from 'screenfull'
import $http from '@/utils/http/index'
import TableColumnWrap from '@/views/wraps/TableColumnWrap.vue'
import ColumnSettingWrap from '@/views/wraps/ColumnSettingWrap.vue'
import AddOrUpdate from './add-or-update.vue'

const store = useStore()
const deviceType = computed(() => store.getters.deviceType)
const dataForm = reactive({
  deptName: '',
  status: ''
})

// 查询
const tableData = ref([])
const query = () => {
  $http.post('/queryDeptInfo', dataForm).then(res => {
    tableData.value = res.data || []
  })
}
query()

// 重置
const reset = () => {
  dataForm.deptName = ''
  dataForm.status = ''
}

const tableRef = ref(null)
const selection = ref(null)
const onSelectionChange = rows => {
  selection.value = rows
}
const visible = ref(false)
const initData = ref({})
const add = () => {
  visible.value = true
  initData.value = {
    type: 'add'
  }
}
const updateRow = row => {
  visible.value = true
  initData.value = {
    type: 'edit',
    ...row
  }
}
const deleteRow = row => {
  ElMessageBox.confirm('是否删除数据？', '提示', {
    showCancelButton: 'true',
    cancelButtonText: '取消',
    confirmButtonText: '确认',
    callback: action => {
      action === 'confirm' &&
        ElMessage({
          type: 'success',
          message: '删除成功（仅供演示）！'
        })
    }
  })
}

// 全屏切换
const isFull = ref(false)
const tableWrapRef = ref(null)
const toggleFullScreen = () => {
  if (screenfull.isEnabled) {
    if (!isFull.value) {
      screenfull.request(tableWrapRef.value)
    } else {
      screenfull.exit(tableWrapRef.value)
    }
    isFull.value = !isFull.value
  }
}

const columnWrapRef = ref(null)
const dialogVisible = ref(false)
const columnsOption = ref([])
// 获取表格列配置信息
watch(
  () => columnWrapRef.value,
  newValue => {
    columnsOption.value = newValue ? newValue.columnsOption : []
  },
  {
    deep: true
  }
)
</script>
    
<style lang="scss" scoped>
.form-wrap {
  padding-top: 20px;
  background: #fff;
  .btn-wrapper {
    width: 100%;
    ::v-deep .el-form-item__content {
      flex-wrap: nowrap;
      justify-content: center;
    }
    ::v-deep .el-button {
      width: 40%;
    }
  }
}
::v-deep .el-select .el-input__inner {
  width: 200px;
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