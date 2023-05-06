import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import router from './index'
import store from '@/store'
import { isNotNull } from '@/utils/verify'
import mitt from '@/utils/mitt'

NProgress.configure({ showSpinner: false }) // 不显示右上角螺旋加载提示

const whiteList = ['/login']

router.beforeEach(async (to, from, next) => {
  NProgress.start() //开启进度条

  const token = store.getters.token
  if (token) {
    // 已登录的情况下不允许跳转到登录页
    if (to.path === '/login') {
      next({ path: '/' })
    } else {
      // 未添加动态路由
      if (!store.getters.addRouteFlag) {
        await store.dispatch('menu/getUserMenus')
        addAsyncRoutes(to.path, next)
      } else {
        next()
      }
    }
  } else {
    // 未登录
    if (whiteList.includes(to.path)) {
      next()
    } else {
      // 重定向到登录页面
      let path = to.path === '/' ? '/login' : `/login?redirect=${to.path}`
      next(path)
    }
  }
})

function addAsyncRoutes(path, next) {
  store.commit('menu/generateAsyncRoutes')
  const asyncRoutes = store.getters.asyncRoutes

  if (isNotNull(asyncRoutes)) {
    asyncRoutes.forEach(item => {
      router.addRoute(item)
    })
    // 解决bug：对于addRoute添加的路由，F5刷新时会白屏
    router.addRoute({ path: '/:pathMatch(.*)', redirect: '/404' })
    next({ path: path, replace: true }) //路由进行重定向放行
  } else {
    router.addRoute({ path: '/:pathMatch(.*)', redirect: '/404' })
    next()
  }
}
router.afterEach(to => {
  NProgress.done() //完成进度条
  const token = store.getters.token
  if (token && !['/login', '/'].includes(to.path)) {
    store.commit('menu/setActiveMenu', to)
    setTimeout(() => {
      mitt.emit('showActiveTab', to.path)
    }, 0)
  }
})
