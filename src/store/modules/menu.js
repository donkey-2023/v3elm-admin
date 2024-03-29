import { MENUS_LIST, ACTIVE_MENU, EFFECTIVE_TIME } from '@/utils/constant'
import { isNotEmpty } from '@/utils/verify'
import $http from '@/utils/http/index'
import router from '@/router'

const state = () => ({
  menuList: JSON.parse(localStorage.getItem(MENUS_LIST)) || [], // 后台返回的菜单集合
  addRouteFlag: false, // 是否添加动态路由
  asyncRoutes: [], // 处理后的动态路由集合
  activeMenu: JSON.parse(localStorage.getItem(ACTIVE_MENU)) || {}, //当前菜单
  visitedMenuList: [] // 已浏览的菜单集合
})

const mutations = {
  setMenuList(state, data) {
    state.menuList = data
    localStorage.setItem(MENUS_LIST, JSON.stringify(data))
    localStorage.setItem(EFFECTIVE_TIME, Date.now())
  },
  clearMenuList(state) {
    state.menuList = []
    state.visitedMenuList = []
    localStorage.removeItem(MENUS_LIST)
  },
  clearActiveMenu(state) {
    state.activeMenu = {}
    localStorage.removeItem(ACTIVE_MENU)
  },
  setActiveMenu(state, data) {
    state.activeMenu = data
    localStorage.setItem(ACTIVE_MENU, JSON.stringify(data))

    const index = state.visitedMenuList.findIndex(item => item.path === data.path)
    index === -1 && state.visitedMenuList.push(data)
  },
  // 关闭单个标签
  removeSingleTab(state, data) {
    const arr = JSON.parse(JSON.stringify(state.visitedMenuList))
    if (!isNotEmpty(arr)) {
      return
    }
    const index = arr.findIndex(item => item.path === data.path)
    index > -1 && arr.splice(index, 1)
    if (state.activeMenu.path === data.path) {
      const l = arr.length
      if (l > 0) {
        state.activeMenu = arr[l - 1]
        localStorage.setItem(ACTIVE_MENU, JSON.stringify(arr[l - 1]))
        router.push(state.activeMenu.path)
      } else {
        mutations.clearActiveMenu(state)
        router.push('/')
      }
    }
    index > -1 && state.visitedMenuList.splice(index, 1)
  },
  // 关闭左侧或右侧的标签
  removeSomeTabs(state, type) {
    const arr = state.visitedMenuList
    if (!isNotEmpty(arr)) {
      return
    }
    const index = arr.findIndex(item => item.path === state.activeMenu.path)
    if (type === 'left') {
      arr.splice(0, index)
    } else if (type === 'right') {
      arr.splice(index + 1)
    }
  },
  // 关闭其他标签
  removeOtherTabs(state) {
    state.visitedMenuList = [state.activeMenu]
  },
  // 关闭全部标签
  removeAllTabs(state) {
    if (isNotEmpty(state.visitedMenuList)) {
      mutations.clearActiveMenu(state)
      state.visitedMenuList = []
      router.push('/')
    }
  },
  generateAsyncRoutes(state) {
    if (state.addRouteFlag || !isNotEmpty(state.menuList)) {
      return
    }

    state.menuList.forEach(item => {
      const parent = generateRoute({ ...item, fullName: item.name })
      if (isNotEmpty(item.children)) {
        fmtChildrenRoute(parent, item.children)
      }
      state.asyncRoutes.push(parent)
    })
    state.addRouteFlag = true
  }
}

const actions = {
  getUserMenus({ commit }, params = {}) {
    return new Promise((resovle, reject) => {
      $http
        .post('/getUserMenus', params, { cancelDuplicateRequest: true, loading: false })
        .then(res => {
          commit('setMenuList', res.data)
          resovle()
        })
        .catch(error => {
          reject(error)
        })
    })
  }
}

function fmtChildrenRoute(parent1, children) {
  children.forEach(item => {
    const parent2 = generateRoute({ ...item, fullName: parent1.fullName + '/' + item.name })
    if (isNotEmpty(item.children)) {
      fmtChildrenRoute(parent2, item.children)
    } else {
      if (isNotEmpty(parent1.children)) {
        parent1.children.push(parent2)
      } else {
        parent1.children = [parent2]
      }
    }
  })
}

function generateRoute(menu) {
  const obj = { ...menu, children: [] }

  if (menu.url) {
    const URL = menu.url.indexOf('/') > -1 ? menu.url : '/' + menu.url
    obj.component = () => import(`@/views${URL}/index.vue`)
  } else {
    obj.component = () => import(`@/views/layout/index.vue`)
  }
  return obj
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
