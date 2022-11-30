import { createRouter, createWebHashHistory } from 'vue-router'
import Layout from '@/views/layout'
const routes = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('@views/login/index')
  },
  {
    name: '404',
    path: '/404',
    component: () => import('@/views/404/index')
  },
  {
    path: '/',
    name: '首页',
    component: Layout,
    children: [
      // {
      //   path: 'dashboard',
      //   name: 'Dashboard',
      //   component: () => import('@/views/dashboard/index'),
      //   meta: { title: 'Dashboard', icon: 'dashboard' }
      // }
    ]
  },
  { path: '/:pathMatch(.*)', redirect: '/404' }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
