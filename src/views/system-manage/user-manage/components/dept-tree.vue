<template>
  <el-card shadow="never" class="dept-tree" :class="deviceType === 'pc' ? 'pc' : ''">
    <template #header>
      <span>部门列表</span>
    </template>
    <el-input
      v-model="filterText"
      placeholder="请输入部门名称"
      :prefix-icon="Search"
      style="margin-bottom: 10px;"
      @input="onInput"
    >
      <template #prefix>
        <el-icon>
          <Search></Search>
        </el-icon>
      </template>
    </el-input>
    <el-tree
      ref="treeRef"
      :data="deptData"
      :props="{
              label:'deptName',
              value:'id'
            }"
      :filter-node-method="filterNode"
      @node-click="handleNodeClick"
    />
  </el-card>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useStore } from 'vuex'
import $http from '@/utils/http/index'
import mitt from '@/utils/mitt'

const store = useStore()
const deviceType = computed(() => store.getters.deviceType)

// 加载部门下拉树数据
const deptData = ref([])
const queryDeptInfo = () => {
  $http.post('/queryDeptInfo').then(res => {
    deptData.value = res.data
  })
}
queryDeptInfo()

// 树节点过滤
const filterText = ref('')
const treeRef = ref(null)
const onInput = val => {
  treeRef.value.filter(val)
}
const filterNode = (value, data) => {
  if (!value) return true
  return data.deptName.includes(value)
}

// 处理树节点的点击事件
const handleNodeClick = node => {
  mitt.emit('clickDeptTreeNode', node.id)
}
</script>

<style lang="scss" scoped>
.dept-tree {
  &.pc {
    height: 100%;
  }
}
</style>