import { createStore } from 'vuex'
import app from './modules/app'
import menu from './modules/menu'
import user from './modules/user'

export default createStore({
  modules: {
    app,
    menu,
    user
  },
  getters: {
    token: state => state.app.token,
    logouting: state => state.app.logouting,
    menus: state => state.menu.menuList,
    activeMenu: state => state.menu.activeMenu,
    isCollapse: state => state.menu.isCollapse,
    asyncRoutes: state => state.menu.asyncRoutes,
    addRouteFlag: state => state.menu.addRouteFlag,
    userInfo: state => state.user.userInfo
  }
})
