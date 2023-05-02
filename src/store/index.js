import { createStore } from 'vuex'
import app from './modules/app'
import sideBar from './modules/sideBar'
import menu from './modules/menu'
import user from './modules/user'

export default createStore({
  modules: {
    app,
    sideBar,
    menu,
    user
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
    userInfo: state => state.user.userInfo
  }
})
