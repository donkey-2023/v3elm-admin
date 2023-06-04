<template>
  <div class="tagbar-wrapper">
    <scroll-bar ref="scrollBarRef" class="scroll-bar">
      <div class="elm-tab-wrapper">
        <div
          v-for="item in visitedTabList"
          :key="item.path"
          :data-path="item.path"
          :ref="setTagRef"
          class="elm-tab"
          :class="activeTab.path === item.path ? 'active': ''"
          @click="clickTab(item)"
        >
          <div class="text ellipsis">{{ item.name }}</div>
          <div @click.stop="removeTab(item)" class="icon-wrapper">
            <el-icon>
              <Close />
            </el-icon>
          </div>
        </div>
      </div>
    </scroll-bar>
    <el-dropdown
      placement="bottom-start"
      class="drop-down"
      trigger="click"
      @command="handleCommand"
    >
      <el-icon class="icon-wrapper">
        <el-icon>
          <svg-icon icon="menu2"></svg-icon>
        </el-icon>
      </el-icon>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item
            v-for="(item,index) in tabList"
            :key="index"
            :command="item.command"
            :divided="index > 0"
          >
            <el-icon>
              <svg-icon :icon="item.iconName"></svg-icon>
            </el-icon>
            <span>{{ item.tabName }}</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script setup>
import { computed, onBeforeUnmount, ref } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { isNotEmpty } from '@/utils/verify'
import { getElementStyle, getNumOfPixelVal } from '@utils/index'
import mitt from '@/utils/mitt'

const tabList = ref([
  { tabName: '关闭当前标签', iconName: 'close', command: 'rmCurTab' },
  { tabName: '关闭左侧标签', iconName: 'to-left', command: 'rmLeftTabs' },
  { tabName: '关闭右侧标签', iconName: 'to-right', command: 'rmRightTabs' },
  { tabName: '关闭其他标签', iconName: 'others', command: 'rmOtherTabs' },
  { tabName: '关闭全部标签', iconName: 'horizontal-line', command: 'rmAllTabs' }
])

const store = useStore()
const activeTab = computed(() => store.getters.activeMenu)
const visitedTabList = computed(() => {
  if (isNotEmpty(store.getters.visitedMenuList)) {
    return store.getters.visitedMenuList
  } else if (isNotEmpty(activeTab.value)) {
    return [activeTab.value]
  }
})

const router = useRouter()
// 点击标签,须显示对应的页面，并重新设置当前页
const clickTab = item => {
  activeTab.value.path !== item.path && router.push(item.path)
}
// 关闭单个标签
const removeTab = item => {
  store.commit('menu/removeSingleTab', item)
}

const handleCommand = command => {
  if (command === 'rmCurTab') {
    store.commit('menu/removeSingleTab', activeTab.value)
  } else if (command === 'rmLeftTabs') {
    store.commit('menu/removeSomeTabs', 'left')
  } else if (command === 'rmRightTabs') {
    store.commit('menu/removeSomeTabs', 'right')
  } else if (command === 'rmOtherTabs') {
    store.commit('menu/removeOtherTabs')
  } else if (command === 'rmAllTabs') {
    store.commit('menu/removeAllTabs')
  }
  showActiveTab()
}

// 将所有已打开的标签的ref保存到数组中
// 判断ref是否已经存在于数组中,不存在就添加，否则就替换
const allTabsRef = []
const setTagRef = el => {
  if (!el) return
  if (allTabsRef.length > 0) {
    const index = allTabsRef.findIndex(item => item.dataset.path === el.dataset.path)
    if (index === -1) {
      allTabsRef.push(el)
    } else {
      allTabsRef[index] = el
    }
  } else {
    allTabsRef.push(el)
  }
}

mitt.on('showActiveTab', path => {
  if (['/', '/login'].includes(path)) return
  showActiveTab(path)
})
onBeforeUnmount(() => {
  mitt.off('showActiveTab')
})

// 根据path查询标签的ref
const findTabRef = path => {
  const index = allTabsRef.findIndex(item => item.dataset.path === path)
  return index > -1 ? allTabsRef[index] : null
}

// 计算当前标签activeTab的左侧与滚动条组件最外层盒子wrapBox左侧的偏移量
// 或计算当前标签activeTab的右侧与滚动条组件最外层盒子wrapBox右侧的偏移量
const calcDiff = (activeTabRect, wrapBoxRect) => {
  let diff = 0
  if (activeTabRect.left < wrapBoxRect.left) {
    diff = wrapBoxRect.left - activeTabRect.left
  } else if (activeTabRect.right > wrapBoxRect.right) {
    diff = wrapBoxRect.right - activeTabRect.right
  }
  return diff
}

const scrollBarRef = ref(null)
// 根据activeTab相较于滚动条组件外层盒子wrapBox的偏移量
// 来调整滚动条组件viewBox的左偏移量，从而保证activeTab始终可见
const showActiveTab = path => {
  const activeTabRef = findTabRef(path)
  if (!activeTabRef || !scrollBarRef.value) return

  const activeTabRect = activeTabRef.getBoundingClientRect()

  // 获取滚动条组件的最外层盒子wrapBox对应的dom节点
  const wrapBoxRef = scrollBarRef.value.$el
  const wrapBoxRect = wrapBoxRef.getBoundingClientRect()

  // 计算activeTab相较于wrapBox的偏移量
  const diff = calcDiff(activeTabRect, wrapBoxRect)
  if (diff == 0) return

  // 获取滚动条组件的内容区盒子viewBox对应的dom节点（viewBox实际宽度不小于wrapBox的宽度）
  const viewBoxRef = wrapBoxRef.children[0]
  // 获取滚动条组件的内容区盒子viewBox的左偏移量的数值
  const left = getNumOfPixelVal(getElementStyle(viewBoxRef).left)

  // 重新设置滚动条组件的内容区盒子viewBox的左偏移量
  viewBoxRef.style.left = `${left + diff}px`
  // 同时得重新调整滚动条的位置
  scrollBarRef.value.init()
}
</script>

<style lang="scss" scoped>
.tagbar-wrapper {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 40px;
  background-color: #fff;
  padding: 4px 10px;
  box-sizing: border-box;
  .scroll-bar {
    width: calc(100% - 45px);
    height: 100%;
    .elm-tab-wrapper {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-wrap: nowrap;
      .elm-tab {
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 0 10px;
        height: 32px;
        cursor: pointer;
        border: 1px solid #d8dce5;
        color: #495060;
        font-size: 14px;
        border-radius: 4px;
        box-sizing: border-box;
        cursor: pointer;
        &.active {
          background-color: #42b983;
          color: #fff;
        }
        &:not(:last-child) {
          margin-right: 5px;
        }

        .text {
          min-width: 60px;
          max-width: 100px;
        }
        .icon-wrapper {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 16px;
          height: 16px;
          margin-left: 4px;
          &:hover {
            border-radius: 50%;
            color: #fff;
            background-color: #b4bccc;
          }
        }
      }
    }
  }
  .drop-down {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 40px;
    height: 90%;
    font-size: 22px;
    .icon-wrapper {
      padding: 10px;
      cursor: pointer;
      &:hover {
        color: #53a8ff;
      }
    }
  }
}
</style>