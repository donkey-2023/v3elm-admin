import { createRouter, createWebHashHistory } from 'vue-router'
import Layout from '@/views/layout'
const routes = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('@views/login/index')
  },
  {
    path: '/',
    name: '首页',
    component: Layout,
    children: [
      {
        name: 'Dashboard',
        path: '/dashboard',
        meta: { title: 'Dashboard', icon: 'dashboard' }
      },
      {
        name: '个人中心',
        path: '/personalCenter',
        meta: { title: '个人中心', icon: '' },
        component: () => import('@/views/personal-center/index')
      },
      {
        name: '404',
        path: '/404',
        component: () => import('@/views/404/index')
      }
    ]
  }
  // { path: '/:pathMatch(.*)', redirect: '/404' }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
