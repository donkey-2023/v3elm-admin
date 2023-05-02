<template>
  <div class="tagbar-wrapper">
    <scroll-bar class="scroll-bar">
      <div class="elm-tab-wrapper">
        <div
          v-for="item in visitedTabList"
          :key="item.path"
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

    <div class="btn-wrapper"></div>
  </div>
</template>

<script setup>
import { computed, watch, ref } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { isNotEmpty } from '@/utils/verify'
const store = useStore()
const router = useRouter()

const activeTab = computed(() => store.getters.activeMenu)
const visitedTabList = computed(() => {
  if (isNotEmpty(store.getters.visitedMenuList)) {
    return store.getters.visitedMenuList
  } else if (isNotEmpty(activeTab.value)) {
    store.commit('menu/setActiveMenu', activeTab.value)
    return [activeTab.value]
  }
})

// 点击标签
const clickTab = item => {
  activeTab.value.path !== item.path && router.push(item.path) && store.commit('menu/setActiveMenu', item)
}
// 关闭标签
const removeTab = item => {
  store.commit('menu/removeTab', item)
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
    width: 40%;
    height: 32px;
    .elm-tab-wrapper {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-wrap: nowrap;
      .elm-tab {
        display: flex;
        justify-content: center;
        align-items: center;
        margin-right: 5px;
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
}
</style>