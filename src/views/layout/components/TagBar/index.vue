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
        <arrow-down />
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
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { isNotEmpty } from '@/utils/verify'
import { ArrowDown } from '@element-plus/icons-vue'
import { getElementStyle, getPixelNum } from '@utils/index'
import mitt from '@/utils/mitt'

const store = useStore()
const router = useRouter()

const tabList = ref([
  { tabName: '关闭当前标签', iconName: 'close', command: 'rmCurTab' },
  { tabName: '关闭左侧标签', iconName: 'to-left', command: 'rmLeftTabs' },
  { tabName: '关闭右侧标签', iconName: 'to-right', command: 'rmRightTabs' },
  { tabName: '关闭其他标签', iconName: 'others', command: 'rmOtherTabs' },
  { tabName: '关闭全部标签', iconName: 'horizontal-line', command: 'rmAllTabs' }
])

const activeTab = computed(() => store.getters.activeMenu)
const visitedTabList = computed(() => {
  if (isNotEmpty(store.getters.visitedMenuList)) {
    return store.getters.visitedMenuList
  } else if (isNotEmpty(activeTab.value)) {
    return [activeTab.value]
  }
})

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

const allTagsRef = []
const setTagRef = el => {
  if (!el) return
  if (allTagsRef.length > 0) {
    const index = allTagsRef.findIndex(item => item.dataset.path === el.dataset.path)
    if (index === -1) {
      allTagsRef.push(el)
    } else {
      allTagsRef[index] = el
    }
  } else {
    allTagsRef.push(el)
  }
}

onMounted(() => {
  mitt.on('showActiveTag', path => {
    if (['/', '/login'].includes(path)) return
    showActiveTab(path)
  })
})
onBeforeUnmount(() => {
  mitt.off('showActiveTag')
})

const scrollBarRef = ref(null)
// 将当前标签页移动到可视区之内
const showActiveTab = path => {
  const index = allTagsRef.findIndex(item => item.dataset.path === path)
  if (index === -1) return

  let activeTagRef = allTagsRef[index]
  console.log('activeTagRef', activeTagRef)
  const activeTagRect = activeTagRef.getBoundingClientRect()
  if (!scrollBarRef.value) return
  const wrapRef = scrollBarRef.value.$el
  const viewRef = wrapRef.children[0]

  const scrollBarRect = wrapRef.getBoundingClientRect()
  let diff = 0
  if (activeTagRect.left < scrollBarRect.left) {
    diff = scrollBarRect.left - activeTagRect.left
  } else if (activeTagRect.right > scrollBarRect.right) {
    diff = scrollBarRect.right - activeTagRect.right
  }

  const viewStyle = getElementStyle(viewRef)
  const left = getPixelNum(viewStyle.left)

  viewRef.style.left = `${left + diff}px`
  // 调整滚动条
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
    border: solid 1px #d8dce5;
    border-radius: 6px;
    box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
    .icon-wrapper {
      padding: 10px;
      cursor: pointer;
    }
  }
}
</style>