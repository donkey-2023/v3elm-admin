import { createStore } from 'vuex'
import app from './modules/app'
import sideBar from './modules/sideBar'
import menu from './modules/menu'
import user from './modules/user'
import column from './modules/column'

export default createStore({
  modules: {
    app,
    sideBar,
    menu,
    user,
    column
  },
  getters: {
    token: state => state.app.token,
    logouting: state => state.app.logouting,
    deviceType: state => state.app.deviceType,
    isCollapse: state => state.sideBar.isCollapse,
    activeMenu: state => state.menu.activeMenu,
    visitedMenuList: state => state.menu.visitedMenuList,
    asyncRoutes: state => state.menu.asyncRoutes,
    addRouteFlag: state => state.menu.addRouteFlag,
    userInfo: state => state.user.userInfo,
    adjustedColumns: state => {
      const pagePath = state.menu.activeMenu.path
      const index = state.column.arr.findIndex(item => item.pagePath === pagePath)
      return index > -1 ? state.column.arr[index].adjustedColumns : ''
    },
    key: state => {
      const pagePath = state.menu.activeMenu.path
      const index = state.column.arr.findIndex(item => item.pagePath === pagePath)
      return index > -1 ? state.column.arr[index].key : ''
    }
  }
})
