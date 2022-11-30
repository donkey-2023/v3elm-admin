import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import router from './index'
import store from '@/store'

NProgress.configure({ showSpinner: false }) // 不显示右上角螺旋加载提示

const whiteList = ['/login', '/404']

router.beforeEach((to, from, next) => {
  NProgress.start() //开启进度条

  const token = store.getters.token

  if (token) {
    // 已登录的情况下不允许跳转到登录页
    if (to.path === '/login') {
      next({ path: '/' })
    } else {
      next()
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

router.afterEach(() => {
  NProgress.done() //完成进度条
})
